from pydantic import BaseModel

class PromptRequest(BaseModel):
    client_id: str
    message: str