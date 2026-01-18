from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from dataBase.db import SessionLocal
from dataBase import models

router = APIRouter(prefix="/genres", tags=["Genres"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("")
def create_genre(name: str, db: Session = Depends(get_db)):
    genre = models.Genre(name=name)
    db.add(genre)
    db.commit()
    db.refresh(genre)
    return genre

@router.get("")
def get_genres(db: Session = Depends(get_db)):
    return db.query(models.Genre).all()
