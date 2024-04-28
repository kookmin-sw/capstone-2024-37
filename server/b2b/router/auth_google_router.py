from datetime import timedelta
import google.auth.exceptions
import requests
from fastapi import APIRouter, Depends, Response
from fastapi import HTTPException, status
from google.oauth2 import id_token
from google.auth.transport import requests

''' model import '''
from database.models.user import User
from database.models.payload import payload

''' service import'''
import service

''' setting import '''
from setting import setting

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

auth_google_router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    # dependencies=[Depends(get_token_header)],
    # responses={404: {"description": "Not found"}},
)


@auth_google_router.post("/google-login")
async def google_login(token: payload):
    try:
        userinfo = id_token.verify_oauth2_token(token.data, requests.Request(), setting.GOOGLE_CLIENT_ID)
    except google.auth.exceptions.InvalidValue:
        raise HTTPException(status_code=401, detail="Token is expired")

    # 유저가 DB에 있는지 확인
    current_user: dict = await service.get_user_in_token(userinfo['email'])

    if current_user and current_user['sign_up_flag']:
        jwt_token_expires = timedelta(minutes=setting.JWT_TOKEN_EXPIRE_MINUTES)
        jwt_token = await service.create_jwt_token(current_user, expires_delta=jwt_token_expires)
        payload = {
            'data': jwt_token,
            'message': ''
        }
    elif current_user:
        payload = {
            'data': 'signUp',
            'message': 'User not found'
        }
    else:
        user = await service.insert_userinfo(userinfo)
        print(user)
        payload = {
            'data': 'signUp',
            'message': 'User not found'
        }
    return payload


@auth_google_router.post("/signUp")
async def signUp(user: User):
    signup_user = await service.sign_up(user)
    jwt_token_expires = timedelta(minutes=setting.JWT_TOKEN_EXPIRE_MINUTES)
    jwt_token = await service.create_jwt_token(signup_user, expires_delta=jwt_token_expires)
    payload = {
        'data': jwt_token,
        'message': ''
    }

    return payload