from fastapi import APIRouter, Depends
import b2b.service as service
from fastapi.security import OAuth2PasswordBearer

user_router = APIRouter(
    prefix="/user",
    tags=["user"],
    # dependencies=[Depends(get_token_header)],
    # responses={404: {"description": "Not found"}},
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@user_router.get("/me")
async def get_user(token: str = Depends(oauth2_scheme)):
    user_dict = await service.get_user_in_token(token)
    return user_dict


@user_router.get("/token")
async def get_user(token: str = Depends(oauth2_scheme)):
    return token

