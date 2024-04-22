import datetime

from fastapi.encoders import jsonable_encoder
from database import MongoClient
from database import User


async def find_user_by_google_email(email: str) -> User:
    user = await MongoClient.get_client().user.userinfo.find_one({
        'email': email
    })
    if not user:
        print('No User')
        return None

    return user


async def create_user_by_google_email(user: User) -> User:
    user = User(
        email=user.email,
        user_picture=user.user_picture,
        name=user.name,
        company_name=user.company_name,
        create_time=int(datetime.datetime.now().timestamp()),
        sign_up_flag = user.sign_up_flag
    )

    user = jsonable_encoder(user)
    new_user = await MongoClient.get_client()['user']['userinfo'].insert_one(user)
    created_user = await MongoClient.get_client().user.userinfo.find_one({
        "_id": new_user.inserted_id
    })
    return created_user