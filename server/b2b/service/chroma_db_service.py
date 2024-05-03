# VECTOR DB
import chromadb
from chromadb.utils import embedding_functions
from chromadb.config import Settings
from langchain.document_loaders import WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# FAST API
from fastapi import Depends

# ETC
import os
import datetime
import uuid
import random
from dotenv import load_dotenv
from dto.chroma_dto import AddDataDTO
from user_service import get_clientid_in_jwt

load_dotenv()
CHROMA_DB_IP_ADDRESS = os.getenv("CHROMA_DB_IP_ADDRESS")
KEYWORD_BASE_URL = os.getenv("KEYWORD_BASE_URL")

# description: 원격 EC2 인스턴스에서 ChromaDB에 연결
chroma_client = chromadb.HttpClient(host=CHROMA_DB_IP_ADDRESS, port=8000, settings=Settings(allow_reset=True, anonymized_telemetry=False))
sentence_transformer_ef = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")

def check_db_heartbeat():
    chroma_client.heartbeat()

# description: DB에서 검색하는 함수
async def search_db_query(query, collection_name):
    collection = chroma_client.get_or_create_collection(
        name=collection_name,
        embedding_function=sentence_transformer_ef,
        metadata={"hnsw:space": "cosine"}
    )

    result = collection.query(
        query_texts=query,
        n_results=5
    )
    return result

# description: DB에 저장하는 함수
async def add_db_data(custom_data: AddDataDTO):
    client_id = get_clientid_in_jwt(custom_data.jwt_token)

    collection = chroma_client.get_or_create_collection(
        name=client_id,
        embedding_function=sentence_transformer_ef,
        metadata={"hnsw:space": "cosine"}
    )

    if custom_data.data_type == "keyword":
        custom_data.data = KEYWORD_BASE_URL + custom_data.data

    if custom_data.data_type == "url" or custom_data.data_type == "keyword":
        # url로 가져오기
        loader = WebBaseLoader(custom_data.data)

        text_splitter = RecursiveCharacterTextSplitter(chunk_size = 500, chunk_overlap = 0)
        docs = loader.load_and_split(text_splitter)

        for i, doc in enumerate(docs):
            doc.metadata["chunk_id"] = i  # Chunk ID 추가
            # 무작위로 임의의 페이지 번호를 삽입합니다.
            doc.metadata["page_number"] = random.randint(0, 5)
            collection.add(
                ids=[str(uuid.uuid1())],
                metadatas=doc.metadata,
                documents=doc.page_content,
            )
        
    return True

def get_chroma_client():
    return chroma_client
