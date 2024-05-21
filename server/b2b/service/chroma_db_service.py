# VECTOR DB
import asyncio
import configparser
import chromadb
from langchain_community.vectorstores import Chroma
from chromadb.utils import embedding_functions
from chromadb.config import Settings
from langchain_community.document_loaders import WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.agents.agent_toolkits import create_retriever_tool
from langchain.agents.openai_functions_agent.base import OpenAIFunctionsAgent
from langchain.schema.messages import SystemMessage
from langchain.prompts import MessagesPlaceholder
from langchain_community.chat_models import ChatOpenAI
from langchain.agents import AgentExecutor
from langchain_community.document_loaders import PyPDFLoader
from langchain.prompts import MessagesPlaceholder
from langchain.agents import AgentExecutor
from langchain.agents.openai_functions_agent.agent_token_buffer_memory import (
        AgentTokenBufferMemory,
    )
from langchain_community.embeddings.sentence_transformer import (
    SentenceTransformerEmbeddings,
)

# FAST API
from fastapi import Depends

# ETC
import os
import datetime
import uuid
import random
from dotenv import load_dotenv
from b2b.dto.chroma_dto import AddDataDTO
from b2b.service.user_service import get_clientid_in_jwt
from b2b.setting import setting

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
CHROMA_DB_IP_ADDRESS = os.getenv("CHROMA_DB_IP_ADDRESS")
KEYWORD_BASE_URL = os.getenv("KEYWORD_BASE_URL")

CONFIG_FILE_PATH = "b2b/util/openai_config.ini"
config = configparser.ConfigParser()
config.read(CONFIG_FILE_PATH)

# description: 원격 EC2 인스턴스에서 ChromaDB에 연결
chroma_client = chromadb.HttpClient(host=CHROMA_DB_IP_ADDRESS, port=8000, settings=Settings(allow_reset=True, anonymized_telemetry=False))
sentence_transformer_ef = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")
stf_embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")

def check_db_heartbeat():
    chroma_client.heartbeat()

# description: DB에서 검색하는 함수
async def search_db_query_by_chain(query, name):
    config_normal = config['BOT_NORMAL']

    langchain_chroma = Chroma(
        # PersistentClient를 전달합니다.
        client=chroma_client,
        # 사용할 컬렉션의 이름을 지정합니다.
        collection_name=name,
        # 임베딩 함수를 전달합니다.
        embedding_function=stf_embeddings,
    )

    retriever = langchain_chroma.as_retriever() # 리트리버 초기화
    llm = ChatOpenAI(temperature=config_normal['TEMPERATURE'],  # 창의성 (0.0 ~ 2.0)
                            max_tokens=config_normal['MAX_TOKENS'],  # 최대 토큰수
                            model_name=config_normal['MODEL_NAME'],  # 모델명
                            openai_api_key=OPENAI_API_KEY
                            )

    tool = create_retriever_tool(
        retriever,
        "cusomter_service",
        "Searches and returns documents regarding the customer service guide.",
    )

    tools = [tool]

    system_message = SystemMessage(
        content=(
            "You are a nice customer service agent."
            "Do your best to answer the questions."
            "Feel free to use any tools available to look up "
            "You provide a service that provides answers to questions"
            "relevant information, only if necessary"
            # 할루시네이션.
            "If you don't know the answer, just say that you don't know. Don't try to make up an answer."
            # 한국어
            "Make sure to answer in Korean."
        )
    )

    prompt = OpenAIFunctionsAgent.create_prompt(
        system_message=system_message,
    )

    # 위에서 만든 llm, tools, prompt를 바탕으로 에이전트 만들어주기 
    agent = OpenAIFunctionsAgent(llm=llm, tools=tools, prompt=prompt)


    agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True,
    return_intermediate_steps=True,
    )

    result = agent_executor({"input": query})
    return result["output"]

async def search_db_query(query, collection_name):
    collection = chroma_client.get_or_create_collection(
        name=collection_name,
        embedding_function=sentence_transformer_ef,
        metadata={"hnsw:space": "cosine"}
    )

    result = collection.query(
        query_texts=query,
        n_results=3
    )
    return result

async def add_db_data_pdf(custom_data: AddDataDTO):
    client_id = await get_clientid_in_jwt(custom_data.jwt_token)
    text_splitter = RecursiveCharacterTextSplitter(chunk_size = 500, chunk_overlap = 0)

    collection = chroma_client.get_or_create_collection(
        name=client_id,
        embedding_function=sentence_transformer_ef,
        metadata={"hnsw:space": "cosine"}
    )

    filename = os.path.join(setting.UPLOAD_DIR, custom_data.data)
    loader = PyPDFLoader(filename)
    docs = loader.load_and_split(text_splitter)

    chromadb_input_data(collection, docs)

    os.remove(filename)

    return True

async def add_db_data_url(custom_data: AddDataDTO):
    client_id = await get_clientid_in_jwt(custom_data.jwt_token)
    text_splitter = RecursiveCharacterTextSplitter(chunk_size = 500, chunk_overlap = 0)

    collection = chroma_client.get_or_create_collection(
        name=client_id,
        embedding_function=sentence_transformer_ef,
        metadata={"hnsw:space": "cosine"}
    )

    loader = WebBaseLoader(custom_data.data)
    docs = loader.load_and_split(text_splitter)

    chromadb_input_data(collection, docs)

    return True

async def add_db_data_keyword(custom_data: AddDataDTO):
    client_id = await get_clientid_in_jwt(custom_data.jwt_token)
    text_splitter = RecursiveCharacterTextSplitter(chunk_size = 500, chunk_overlap = 0)

    collection = chroma_client.get_or_create_collection(
        name=client_id,
        embedding_function=sentence_transformer_ef,
        metadata={"hnsw:space": "cosine"}
    )

    word_list = [custom_data.data.strip() for word in custom_data.data.split(',')]
    for word in word_list:
        keyword_url = KEYWORD_BASE_URL + word
        loader = WebBaseLoader(keyword_url)
        docs = loader.load_and_split(text_splitter)
        chromadb_input_data(collection, docs)

    return True

def chromadb_input_data(collection, docs):
    for i, doc in enumerate(docs):
        doc.metadata["chunk_id"] = i  # Chunk ID 추가
        # 무작위로 임의의 페이지 번호를 삽입합니다.
        doc.metadata["page_number"] = random.randint(0, 5)
        collection.add(
            ids=[str(uuid.uuid1())],
            metadatas=doc.metadata,
            documents=doc.page_content,
        )

def chromadb_reset_data(collection):
    chroma_client.delete_collection(name=collection)

def get_chroma_client():
    return chroma_client
