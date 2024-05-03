from datetime import timedelta
import google.auth.exceptions
import requests
from fastapi import APIRouter, Depends, Response
from fastapi import HTTPException, status
from google.oauth2 import id_token

''' model import '''
from database.models.user import User
from dto.payload import payload
from dto.login_dto import loginDto

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


@auth_google_router.post("/sign-up")
async def sign_up(login_dto: loginDto):

    if login_dto.type == "google":
        profile_response = requests.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            headers={"Authorization": f"Bearer {login_dto.token}"},
        )
        # 토큰 만료
        if profile_response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=profile_response.reason
            )
        profile_data = profile_response.json()
        google_email = profile_data['email']

        # 유저가 DB에 있는지 확인
        current_user: dict = await service.get_user_in_db(google_email)
        if current_user:
            payload = {
                'data': 'signUp',
                'message': 'User exist'
            }
            return payload
        else:
            # DB에 없으면 새로 추가
            login_dto.email = profile_data['email']
            login_dto.name = profile_data['name']
            login_dto.picture = profile_data['picture']
            signup_user = await service.sign_up(login_dto)
            payload = {
                'data': "SignUp",
                'message': 'Success'
            }

            return payload

    elif login_dto.type == "email":
        # 유저가 DB에 있는지 확인
        current_user: dict = await service.get_user_in_db(login_dto.email)
        if current_user:
            payload = {
                'data': 'signUp',
                'message': 'User exist'
            }
            return payload
        else:
            # DB에 없으면 새로 추가
            signup_user = await service.sign_up(login_dto)
            payload = {
                'data': "signUp",
                'message': 'Success'
            }

            return payload


@auth_google_router.post("/sign-in")
async def sign_in(login_dto: loginDto):
    if login_dto.type == "google":
        profile_response = requests.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            headers={"Authorization": f"Bearer {login_dto.token}"},
        )
        if profile_response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=profile_response.reason
            )
        profile_data = profile_response.json()
        google_email = profile_data['email']

        # 유저가 DB에 있는지 확인
        current_user: dict = await service.get_user_in_db(google_email)

    elif login_dto.type == "email":
        # 유저가 DB에 있는지 확인
        current_user: dict = await service.get_user_in_db(login_dto.email)

    if current_user:
        jwt_token_expires = timedelta(minutes=setting.JWT_TOKEN_EXPIRE_MINUTES)
        jwt_token = await service.create_jwt_token(current_user, expires_delta=jwt_token_expires)
        payload = {
            'data': jwt_token,
            'message': ''
        }

        return payload
    else:
        payload = {
            'data': 'signIn',
            'message': 'User not found'
        }
        return payload