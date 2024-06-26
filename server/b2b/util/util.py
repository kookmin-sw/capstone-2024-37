import uuid
from jose import jwt
from b2b.database import User
from b2b.setting import setting
from b2b.dto.login_dto import loginDto


async def loginDto_to_user(login_dto: loginDto) -> User:
    user = User(
        type=login_dto.type,
        email=login_dto.email,
        picture=login_dto.picture,
        name=login_dto.name,
        create_time=None,
        client_id=str(uuid.uuid4()).upper().replace("-", "")
    )
    return user


async def decode_token(token) -> dict:
    decoded_jwt = jwt.decode(token, setting.JWT_SECRET, algorithms=setting.ALGORITHM)
    return decoded_jwt
