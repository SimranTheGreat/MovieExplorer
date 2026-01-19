from pydantic import BaseModel
from typing import List, Optional


class MovieByGenre(BaseModel):
    id: int
    title: str
    image_link: Optional[str] = None
    video_link: Optional[str] = None

    class Config:
        from_attributes = True


class GenreOut(BaseModel):
    id: int
    name: str
    movies: List[MovieByGenre]

    class Config:
        from_attributes = True
