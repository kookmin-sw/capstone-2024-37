import configparser
import os

from fastapi import APIRouter, HTTPException, Depends, status

from dto.chroma_dto import AddDataDTO
from service.chroma_db_service import add_db_data, get_chroma_client

chromadb_router = APIRouter(
    prefix="/chromadb",
    tags=["chromadb"]
)

@chromadb_router.post("/add-data", status_code=status.HTTP_201_CREATED)
async def add_chroma_db_data(data: AddDataDTO, chroma_client=Depends(get_chroma_client)):
    try:
        await add_db_data(data)
        return {"message": "Added successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))