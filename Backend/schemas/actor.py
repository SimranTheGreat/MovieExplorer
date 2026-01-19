from pydantic import BaseModel
from typing import List, Optional

class MovieOut(BaseModel):
    id: int
    title: str
    release_year: int
    image_link: Optional[str] = None
    video_link: Optional[str] = None

    class Config:
        orm_mode = True


class ActorOut(BaseModel):
    id: int
    name: str
    movies: List[MovieOut] = []

    class Config:
        orm_mode = True
