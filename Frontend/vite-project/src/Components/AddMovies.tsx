import { useState } from "react";

export default function AddMovies() {
  const [form, setForm] = useState({
    title: "",
    release_year: "",
    image_link: "",
    video_link: "",
    director: "",
    actors: "",
    genres: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

 
 const payload = {
    title: form.title,
    release_year: Number(form.release_year),
    director_name: form.director,
    actor_names: form.actors.split(",").map(a => a.trim()),
    genre_names: form.genres.split(",").map(g => g.trim()),
    image_link: form.image_link || null,
    video_link: form.video_link || null,
  };

    await fetch("http://127.0.0.1:8000/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("Movie added successfully");
  }

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-16">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border p-8">
        <h1 className="text-2xl font-semibold mb-6 text-slate-800">
          Add Movie
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input
            name="title"
            placeholder="Movie title"
            onChange={handleChange}
            className="form-input"
          />

          <input
            name="release_year"
            type="number"
            placeholder="Release year"
            onChange={handleChange}
            className="form-input"
          />

          <input
            name="director"
            placeholder="Director name"
            onChange={handleChange}
            className="form-input"
          />

          <input
            name="actors"
            placeholder="Actors (comma separated)"
            onChange={handleChange}
            className="form-input"
          />

          <input
            name="genres"
            placeholder="Genres (comma separated)"
            onChange={handleChange}
            className="form-input"
          />

          <input
            name="image_link"
            placeholder="Poster image URL"
            onChange={handleChange}
            className="form-input md:col-span-2"
          />

          <input
            name="video_link"
            placeholder="Trailer video URL"
            onChange={handleChange}
            className="form-input md:col-span-2"
          />

          <button
            type="submit"
            className="md:col-span-2 mt-4 py-2.5 rounded-md
              bg-slate-800 text-white font-medium
              hover:bg-slate-700 transition"
          >
            Save Movie
          </button>
        </form>
      </div>
    </div>
  );
}
