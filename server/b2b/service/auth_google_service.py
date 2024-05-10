from datetime import datetime, timedelta, timezone
from jose import jwt
import b2b.util as util

import b2b.database.repo
from b2b.setting import setting
from typing import Annotated, Union
from b2b.dto.login_dto import loginDto
from b2b.database.models.user import User


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
    user = await util.loginDto_to_user(userinfo)
    created_user = await b2b.database.repo.create_user_by_google_email(user)
    return created_user


async def sign_up(login_dto: loginDto):
    user: User = await util.loginDto_to_user(login_dto)
    created_user: User = await b2b.database.repo.create_user_by_google_email(user)
    return created_user
