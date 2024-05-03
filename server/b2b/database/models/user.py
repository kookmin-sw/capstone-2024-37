from datetime import datetime
from typing import Annotated, Union

from bson import ObjectId
from pydantic import BaseModel, Field

from database.models.object import ObjectIdPydanticAnnotation


class User(BaseModel):
    _id: Annotated[ObjectId, ObjectIdPydanticAnnotation] = None
    type: str
    email: str = ''
    picture: Union[str, None] = ''
    name: Union[str, None] = ''
    company_name: str = ''
    create_time: Union[int, None]
    client_id: Union[str, None]
