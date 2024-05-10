from typing import Union

from pydantic import BaseModel


class loginDto(BaseModel):
    type: str
    token: Union[str, None] = None
    company_name: Union[str, None] = None
    email: Union[str, None] = None
    password: Union[str, None] = None
    picture: Union[str, None] = None
    name: Union[str, None] = None
