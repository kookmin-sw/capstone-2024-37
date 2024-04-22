from datetime import datetime
from typing import Annotated, Union

from bson import ObjectId
from pydantic import BaseModel, Field

from database.models.object import ObjectIdPydanticAnnotation


class User(BaseModel):
    _id: Annotated[ObjectId, ObjectIdPydanticAnnotation] = None
    email: str = ''
    user_picture: str = ''
    name: str = ''
    company_name: str = ''
    create_time: Union[int, None]
    sign_up_flag: bool = Field(default=False)
