from datetime import datetime
from typing import Annotated

from bson import ObjectId
from pydantic import BaseModel

from database.models.object import ObjectIdPydanticAnnotation


class User(BaseModel):
    _id: Annotated[ObjectId, ObjectIdPydanticAnnotation] = None
    user_mail_address: str = ''
    company_name: str = ''
    create_time: datetime = ''