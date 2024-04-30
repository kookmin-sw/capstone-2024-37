# app/routers/chat.py
import configparser
import os

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, status
from langchain_community.chat_models import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from datetime import datetime

from server.b2b.dto.openai_dto import PromptRequest


chat_router = APIRouter(
    prefix="/chat",
    tags=["chat"]
)

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# description: load config variables from openai_config.ini file
CONFIG_FILE_PATH = "b2b/util/openai_config.ini"
config = configparser.ConfigParser()
config.read(CONFIG_FILE_PATH)

# @chat_router.post("/chatbot") 
# async def get_langchain_rag(data: PromptRequest):
#     # description: use langchain
#     config_normal = config['NESS_NORMAL']

#     chat_model = ChatOpenAI(temperature=config_normal['TEMPERATURE'],  # 창의성 (0.0 ~ 2.0)
#                             max_tokens=config_normal['MAX_TOKENS'],  # 최대 토큰수
#                             model_name=config_normal['MODEL_NAME'],  # 모델명
#                             openai_api_key=OPENAI_API_KEY  # API 키
#                             )
#     question = data.prompt

#     # vectordb.search_db_query를 비동기적으로 호출합니다.
#     schedule = await vectordb.search_db_query(question)  # vector db에서 검색

#     # description: give NESS's ideal instruction as template
#     case3_template = openai_prompt.Template.case3_template

#     prompt = PromptTemplate.from_template(case3_template)
#     response = chat_model.predict(prompt.format(output_language="Korean", question=question, schedule=schedule))
#     print(response)
#     return response