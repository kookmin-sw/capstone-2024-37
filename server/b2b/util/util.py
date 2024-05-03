import uuid
from jose import jwt
from database import User
from setting import setting
from dto.login_dto import loginDto


async def loginDto_to_user(login_dto: loginDto) -> User:
    user = User(
        type=login_dto.type,
        email=login_dto.email,
        picture=login_dto.picture,
        name=login_dto.name,
        company_name=login_dto.company_name,
        create_time=None,
        client_id=str(uuid.uuid4()).upper().replace("-", "")
    )
    return user


async def decode_token(token) -> dict:
    decoded_jwt = jwt.decode(token, setting.JWT_SECRET, algorithms=setting.ALGORITHM)
    return decoded_jwt
