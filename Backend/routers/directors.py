from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from typing import List

from dataBase.db import SessionLocal
from dataBase import models
from schemas.director import DirectorOut

router = APIRouter(prefix="/directors", tags=["Directors"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("")
def create_director(name: str, db: Session = Depends(get_db)):
    director = models.Director(name=name)
    db.add(director)
    db.commit()
    db.refresh(director)
    return director


@router.get("", response_model=List[DirectorOut])
def get_directors(db: Session = Depends(get_db)):
    return (
        db.query(models.Director)
        .options(joinedload(models.Director.movies))
        .all()
    )
