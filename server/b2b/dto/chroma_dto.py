from pydantic import BaseModel
from datetime import datetime  # datetime 클래스를 직접 임포트합니다.

class AddDataDTO(BaseModel):
    data: str
    data_type: str
    collection_name: str