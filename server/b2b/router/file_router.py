import os
import uuid

from fastapi import APIRouter, Depends, UploadFile, HTTPException, File
import b2b.service as service
from fastapi.security import OAuth2PasswordBearer
from b2b.setting import setting
from b2b.dto import RemoveFileDto

file_router = APIRouter(
    prefix="/file",
    tags=["file"],
    # dependencies=[Depends(get_token_header)],
    # responses={404: {"description": "Not found"}},
)

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@file_router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(400, detail="Invalid document type")

    content = await file.read()
    filename = f"{str(uuid.uuid4())}.pdf"  # uuid로 유니크한 파일명으로 변경
    with open(os.path.join(setting.UPLOAD_DIR, filename), "wb") as fp:
        fp.write(content)  # 서버 로컬 스토리지에 이미지 저장 (쓰기)

    return {"filename": filename}

@file_router.post("/delete-pdf")
async def upload_pdf(filename: RemoveFileDto):
    os.remove(setting.UPLOAD_DIR+"/"+filename.filename)
    return {f"message: remove {filename.filename}"}
