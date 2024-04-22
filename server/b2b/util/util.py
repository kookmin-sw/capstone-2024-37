from database import User


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