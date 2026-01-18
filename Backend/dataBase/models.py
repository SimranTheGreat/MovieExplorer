
from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from dataBase.db import Base


# =========================
# Association Tables
# =========================

movie_actor = Table(
    "movie_actor",
    Base.metadata,
    Column("movie_id", ForeignKey("movies.id"), primary_key=True),
    Column("actor_id", ForeignKey("actors.id"), primary_key=True),
)

movie_genre = Table(
    "movie_genre",
    Base.metadata,
    Column("movie_id", ForeignKey("movies.id"), primary_key=True),
    Column("genre_id", ForeignKey("genres.id"), primary_key=True),
)


# =========================
# Core Tables
# =========================

class Director(Base):
    __tablename__ = "directors"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    movies = relationship("Movie", back_populates="director")


class Actor(Base):
    __tablename__ = "actors"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    movies = relationship(
        "Movie",
        secondary=movie_actor,
        back_populates="actors"
    )


class Genre(Base):
    __tablename__ = "genres"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    movies = relationship(
        "Movie",
        secondary=movie_genre,
        back_populates="genres"
    )


class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    release_year = Column(Integer, nullable=False)

    image_link = Column(String, nullable=True)
    video_link = Column(String, nullable=True)

    director_id = Column(Integer, ForeignKey("directors.id"))

    director = relationship("Director", back_populates="movies")

    actors = relationship(
        "Actor",
        secondary=movie_actor,
        back_populates="movies"
    )

    genres = relationship(
        "Genre",
        secondary=movie_genre,
        back_populates="movies"
    )
