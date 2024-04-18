import jose

from database.repo import find_user_by_google_email
from datetime import datetime, timedelta
from jose import jwt
from setting import setting


async def get_user(google_email: str) -> str:
    current_user = await find_user_by_google_email(google_email)
    return current_user


async def sign_in(google_email: str):
    # 이미 유저가 있다면 -> 로그인
    current_user = await find_user_by_google_email(google_email)
    if current_user:
        current_time = datetime.utcnow()
        expire_time = current_time + timedelta(hours=1)

        payload = {
            "user_email_address": current_user.user_mail_address,
            "exp": expire_time,
            "company_name": current_user.company_name
        }

        encoded_jwt = jwt.encode(payload, setting.JWT_SECRET, algorithm="HS256")
        print(f'encoded_jwt: {encoded_jwt}')
        return encoded_jwt

async def sign_up(google_email: str):
    pass
