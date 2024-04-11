from langchain.document_loaders import WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import chromadb
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_community.embeddings.sentence_transformer import (
    SentenceTransformerEmbeddings,
)
import uuid
import random
import os
from dotenv import load_dotenv

load_dotenv()

class Data:
    def __init__(self, data, type, chunk_size = 500, chunk_overlap = 0):
        OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
        self.docs = None
        # ChromaDB의 PersistentClient를 생성
        self.persistent_client = chromadb.PersistentClient()

        self.data = data
        self.type = type
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size = chunk_size, chunk_overlap = chunk_overlap)

    def get_data(self):
        # url로 가져오기
        if self.type == "url":
            self.__get_url_data(self.data)
        elif self.type == "pdf":
            self.__get_pdf_data(self.data)

    #private
    def __get_url_data(self, url):
        loader = WebBaseLoader(url)
        self.docs = loader.load_and_split(self.text_splitter)

    #private
    def __get_pdf_data(self, pdf):
        print(pdf)

    def input_data_chromaDB(self, user_name):
        collection = self.persistent_client.get_or_create_collection(user_name)

        for i, doc in enumerate(self.docs):
            doc.metadata["chunk_id"] = i  # Chunk ID 추가
            # 무작위로 임의의 페이지 번호를 삽입
            doc.metadata["page_number"] = random.randint(0, 5)
            # collection에 추가
            collection.add(
                ids=[str(uuid.uuid1())],
                metadatas=doc.metadata,
                documents=doc.page_content, 
            )

    def use_langchain_chroma(self, user_name):
        openai_embeddings = OpenAIEmbeddings()

        # Chroma 객체를 생성합니다.
        langchain_chroma = Chroma(
            # PersistentClient를 전달합니다.
            client=self.persistent_client,
            # 사용할 컬렉션의 이름을 지정합니다.
            collection_name=user_name,
            # 임베딩 함수를 전달합니다.
            embedding_function=openai_embeddings,
        )
        return langchain_chroma


def test():
    data = Data(type = "url", data = "https://ko.wikipedia.org/wiki/%EB%82%98%EB%AC%B4%EC%9C%84%ED%82%A4")
    data.get_data()
    data.input_data_chromaDB(user_name="ganghyun")

    
    query = "채무자 관련 법에 대해 설명해줘."
    # 질의를 사용하여 유사도 검색을 수행합니다.
    docs = data.openai_lc_client.similarity_search(query)
    # 검색 결과에서 첫 번째 문서의 내용을 출력합니다.
    print(docs[0].page_content)

test()