from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.movie import MovieCreate
from dataBase.db import SessionLocal
from dataBase import models


router = APIRouter(prefix="/movies", tags=["Movies"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_or_create_director(db: Session, name: str):
    director = db.query(models.Director).filter_by(name=name).first()
    if not director:
        director = models.Director(name=name)
        db.add(director)
        db.commit()
        db.refresh(director)
    return director


def get_or_create_actor(db: Session, name: str):
    actor = db.query(models.Actor).filter_by(name=name).first()
    if not actor:
        actor = models.Actor(name=name)
        db.add(actor)
        db.commit()
        db.refresh(actor)
    return actor


def get_or_create_genre(db: Session, name: str):
    genre = db.query(models.Genre).filter_by(name=name).first()
    if not genre:
        genre = models.Genre(name=name)
        db.add(genre)
        db.commit()
        db.refresh(genre)
    return genre


@router.post("")
def create_movie(payload: MovieCreate, db: Session = Depends(get_db)):
    director = get_or_create_director(db, payload.director_name)

    actors = [get_or_create_actor(db, name) for name in payload.actor_names]
    genres = [get_or_create_genre(db, name) for name in payload.genre_names]

    movie = models.Movie(
        title=payload.title,
        release_year=payload.release_year,
        image_link=payload.image_link,
        video_link=payload.video_link,
        director_id=director.id
    )

    movie.actors = actors
    movie.genres = genres

    db.add(movie)
    db.commit()
    db.refresh(movie)

    return movie
