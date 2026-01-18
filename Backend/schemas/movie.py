
from pydantic import BaseModel
from typing import List, Optional

class MovieCreate(BaseModel):
    title: str
    release_year: int
    director_name: str
    actor_names: List[str]
    genre_names: List[str]
    image_link: Optional[str] = None
    video_link: Optional[str] = None
