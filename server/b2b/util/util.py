from jose import jwt
from database import User
from setting import setting


async def userinfo_to_user(userinfo) -> User:
    user = User(
        email=userinfo['email'],
        user_picture=userinfo['picture'],
        name=userinfo['name'],
        company_name='',
        create_time=None,
        sign_up_flag=False
    )
    return user


async def decode_token(token) -> dict:
    decoded_jwt = jwt.decode(token, setting.JWT_SECRET, algorithms=setting.ALGORITHM)
    return decoded_jwt
