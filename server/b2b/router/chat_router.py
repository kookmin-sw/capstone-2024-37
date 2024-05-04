# app/routers/chat.py
import configparser
import os

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, status
from langchain_community.chat_models import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from datetime import datetime

from dto.openai_dto import PromptRequest
from util import openai_prompt

import service.chroma_db_service as vectordb


chat_router = APIRouter(
    prefix="/chat",
    tags=["chat"]
)

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

CONFIG_FILE_PATH = "b2b/util/openai_config.ini"
config = configparser.ConfigParser()
config.read(CONFIG_FILE_PATH)

@chat_router.post("/chatbot") 
async def get_langchain_rag(data: PromptRequest):
    config_normal = config['BOT_NORMAL']

    chat_model = ChatOpenAI(temperature=config_normal['TEMPERATURE'],  # 창의성 (0.0 ~ 2.0)
                            max_tokens=config_normal['MAX_TOKENS'],  # 최대 토큰수
                            model_name=config_normal['MODEL_NAME'],  # 모델명
                            openai_api_key=OPENAI_API_KEY  # API 키
                            )
    question = data.message
    collection = data.client_id

    db_data = await vectordb.search_db_query(question, collection)  # vector db에서 검색

    standard_template = openai_prompt.Template.standard_template

    prompt = PromptTemplate.from_template(standard_template)
    response = chat_model.predict(prompt.format(output_language="Korean", question=question, data=db_data))
    # print(response)
    return response