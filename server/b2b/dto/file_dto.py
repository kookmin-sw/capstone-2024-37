from pydantic import BaseModel # datetime 클래스를 직접 임포트합니다.

class RemoveFileDto(BaseModel):
    filename: str