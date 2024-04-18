import datetime

from database import MongoClient
from database import User


async def find_user_by_google_email(google_email: str) -> User:
    user = await MongoClient.get_client().user.userinfo.find_one({
        'google_email': google_email
    })
    if not user:
        print('No User')
        return None

    return user


async def insert_user_by_google_email(google_email: str) -> User:
    user = User(
        user_mail_address=google_email,
        company_name='',
        create_time=datetime.now()
    )

    await MongoClient.get_client().user.userinfo.insert_one(user)