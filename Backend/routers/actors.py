from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from typing import List

from dataBase.db import SessionLocal
from dataBase import models
from schemas.actor import ActorOut

router = APIRouter(prefix="/actors", tags=["Actors"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("")
def create_actor(name: str, db: Session = Depends(get_db)):
    actor = models.Actor(name=name)
    db.add(actor)
    db.commit()
    db.refresh(actor)
    return actor


@router.get("", response_model=List[ActorOut])
def get_actors(db: Session = Depends(get_db)):
    return (
        db.query(models.Actor)
        .options(joinedload(models.Actor.movies))
        .all()
    )
