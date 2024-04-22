from datetime import datetime, timedelta, timezone
from jose import jwt
import util

import database.repo
from setting import setting
from typing import Annotated, Union
from database.models.user import User


async def get_user(google_email: str) -> dict:
    current_user = await database.repo.find_user_by_google_email(google_email)
    return current_user


async def create_jwt_token(data: dict, expires_delta: Union[timedelta, None] = None):
    data['_id'] = str(data['_id'])
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, setting.JWT_SECRET, algorithm=setting.ALGORITHM)
    return encoded_jwt


async def insert_userinfo(userinfo: dict):
    ''' /login-google 요청이 들어왔을 때 구글로부터 받은 credential을 DB에 넣을때 사용 '''
    user = await util.userinfo_to_user(userinfo)
    created_user = await database.repo.create_user_by_google_email(user)
    return created_user


async def sign_up(user: User):
    ''' 유저 정보를 추가 입력했을 때, DB에 넣는 함수 '''
    user.sign_up_flag = True
    created_user = await database.repo.create_user_by_google_email(user)
    return created_user