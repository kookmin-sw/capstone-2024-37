# app/routers/chat.py
import configparser
import os

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, status
from fastapi.responses import StreamingResponse
from langchain_community.chat_models import ChatOpenAI

from datetime import datetime

from b2b.dto.openai_dto import PromptRequest
from b2b.util import openai_prompt

import b2b.service.chroma_db_service as vectordb


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
    result = await vectordb.search_db_query(data.message, data.client_id)

    return {"message": result[1:-1]}

@chat_router.post("/chatbot-chain") 
async def get_langchain_rag(data: PromptRequest):
    result = await vectordb.search_db_query_by_chain(data.message, data.client_id)

    return {"message": result}

    