from fastapi import FastAPI, Depends, Query
from sqlalchemy.orm import Session

from dataBase.db import SessionLocal
from dataBase import models

app = FastAPI(title="Movie Management API")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/directors")
def create_director(name: str, db: Session = Depends(get_db)):
    director = models.Director(name=name)
    db.add(director)
    db.commit()
    db.refresh(director)
    return director


@app.post("/actors")
def create_actor(name: str, db: Session = Depends(get_db)):
    actor = models.Actor(name=name)
    db.add(actor)
    db.commit()
    db.refresh(actor)
    return actor


@app.post("/genres")
def create_genre(name: str, db: Session = Depends(get_db)):
    genre = models.Genre(name=name)
    db.add(genre)
    db.commit()
    db.refresh(genre)
    return genre


@app.post("/movies")
def create_movie(
    title: str,
    release_year: int,
    director_id: int,
    actor_ids: list[int],
    genre_ids: list[int],
    db: Session = Depends(get_db)
):
    movie = models.Movie(
        title=title,
        release_year=release_year,
        director_id=director_id
    )

    movie.actors = db.query(models.Actor).filter(
        models.Actor.id.in_(actor_ids)
    ).all()

    movie.genres = db.query(models.Genre).filter(
        models.Genre.id.in_(genre_ids)
    ).all()

    db.add(movie)
    db.commit()
    db.refresh(movie)
    return movie


# --------------------
# FILTER MOVIES API
# --------------------

@app.get("/movies")
def get_movies(
    genre_id: int | None = Query(default=None),
    actor_id: int | None = Query(default=None),
    director_id: int | None = Query(default=None),
    release_year: int | None = Query(default=None),
    db: Session = Depends(get_db)
):
    query = db.query(models.Movie)

    if director_id:
        query = query.filter(models.Movie.director_id == director_id)

    if release_year:
        query = query.filter(models.Movie.release_year == release_year)

    if actor_id:
        query = query.join(models.Movie.actors).filter(models.Actor.id == actor_id)

    if genre_id:
        query = query.join(models.Movie.genres).filter(models.Genre.id == genre_id)

    return query.all()
