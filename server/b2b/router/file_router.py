from fastapi import APIRouter, Depends, UploadFile
import b2b.service as service
from fastapi.security import OAuth2PasswordBearer

file_router = APIRouter(
    prefix="/file",
    tags=["file"],
    # dependencies=[Depends(get_token_header)],
    # responses={404: {"description": "Not found"}},
)

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@file_router.post("upload-pdf")
async def upload_pdf(file: UploadFile):
    return file.filename