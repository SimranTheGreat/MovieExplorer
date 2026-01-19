# MovieExplorer
Backend Setup (FastAPI)
Go to backend folder
  cd backend
Create virtual environment (once)
  python -m venv venv
Activate virtual environment
Windows:
  venv\Scripts\activate
Mac / Linux:
  source venv/bin/activate
Install dependencies
  pip install -r requirements.txt
Start backend server
  uvicorn main:app --reload
Backend URLs
API root:
http://127.0.0.1:8000/
Swagger Docs:
http://127.0.0.1:8000/docs

Frontend Setup (React + Vite)
Go to frontend folder
  cd frontend
Install dependencies
  npm install
Start Vite dev server
  npm run dev
Frontend URLs
Movies page:
http://localhost:5173/home/movies
Genres page:
http://localhost:5173/home/genres
Actors page:
http://localhost:5173/home/actors
Directors page:
http://localhost:5173/home/directors
Add Movie page:
http://localhost:5173/home/addMovies

🔹 Important Notes

Backend must be running before using frontend

Data is managed via FastAPI + SQLAlchemy

Swagger UI can be used to test APIs independently

Frontend consumes APIs from http://127.0.0.1:8000

This is submission-ready, clean, and technically correct.

Create Movie API:
http://127.0.0.1:8000/docs#/Movies/create_movie_movies_post
