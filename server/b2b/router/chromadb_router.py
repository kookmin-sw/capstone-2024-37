import configparser
import os

from fastapi import APIRouter, HTTPException, Depends, status

from b2b.dto.chroma_dto import AddDataDTO
from b2b.service.chroma_db_service import *
from b2b.dto.chroma_dto import ResetDataDTO

chromadb_router = APIRouter(
    prefix="/chromadb",
    tags=["chromadb"]
)

@chromadb_router.post("/add-data-url", status_code=status.HTTP_201_CREATED)
async def add_chroma_db_data_url(data: AddDataDTO, chroma_client=Depends(get_chroma_client)):
    try:
        await add_db_data_url(data)
        return {"message": "Added url successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@chromadb_router.post("/add-data-pdf", status_code=status.HTTP_201_CREATED)
async def add_chroma_db_data_pdf(data: AddDataDTO, chroma_client=Depends(get_chroma_client)):
    try:
        await add_db_data_pdf(data)
        return {"message": "Added pdf successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@chromadb_router.post("/add-data-keyword", status_code=status.HTTP_201_CREATED)
async def add_chroma_db_data_keyword(data: AddDataDTO, chroma_client=Depends(get_chroma_client)):
    try:
        await add_db_data_keyword(data)
        return {"message": "Added keyword successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@chromadb_router.post("/reset-data")
async def reset_chroma_db_data(data: ResetDataDTO):
    collection = data.client_id
    try:
        await chromadb_reset_data(collection)
        return {"message": "reset successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))