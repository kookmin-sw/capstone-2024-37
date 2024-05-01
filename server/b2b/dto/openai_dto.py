from pydantic import BaseModel

class PromptRequest(BaseModel):
    collection_name: str
    prompt: str