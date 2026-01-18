from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import movies, actors, directors, genres

app = FastAPI(title="Movie Explorer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(movies.router)
app.include_router(actors.router)
app.include_router(directors.router)
app.include_router(genres.router)
