import fastapi
import requests
from fastapi import APIRouter, Depends, Response
from fastapi import HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from starlette.responses import RedirectResponse

from database import User
from database.repo import find_user_by_google_email
import service
from setting import setting
from jose import jwt
from pydantic import BaseModel
from google.oauth2 import id_token
from google.auth.transport import requests

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

auth_google_router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    # dependencies=[Depends(get_token_header)],
    # responses={404: {"description": "Not found"}},
)


class payload(BaseModel):
    data: str
    msg: str


@auth_google_router.post("/access-token")
async def receive_access_token(token: payload):
    return token

@auth_google_router.post("/google-login")
async def google_login(token: payload):
    idinfo = id_token.verify_oauth2_token(token.data, requests.Request(), setting.GOOGLE_CLIENT_ID)

    # 유저가 DB에 있는지 확인
    # current_user = service.get_user(google_email)

    # if current_user:
    #     payload = {
    #         'data': service.sign_in(google_email),
    #         'message': ''
    #     }
    #     response = Response(content=payload, status_code=200)
    #     return response
    # else:
    #     payload = {
    #         'data': None,
    #         'message': 'User Not Found'
    #     }
    #     response = Response(content=payload, status_code=404)
    #     return response
    return idinfo

# @auth_google_router.get("/token")
# async def get_token(token: str = Depends(oauth2_scheme)):
#     return jwt.decode(token, setting.JWT_SECRET, algorithms=["HS256"])
