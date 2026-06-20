from pydantic import BaseModel

class RankRequest(BaseModel):
    jobDescription: str