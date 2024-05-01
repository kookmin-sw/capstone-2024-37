from pydantic import BaseModel

class payload(BaseModel):
    data: str
    msg: str