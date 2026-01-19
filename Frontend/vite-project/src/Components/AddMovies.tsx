import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type FormState = {
  title: string;
  release_year: string;
  image_link: string;
  video_link: string;
  director: string;
  actors: string;
  genres: string;
};

const initialForm: FormState = {
  title: "",
  release_year: "",
  image_link: "",
  video_link: "",
  director: "",
  actors: "",
  genres: "",
};

export default function AddMovies() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: form.title,
      release_year: Number(form.release_year),
      director_name: form.director,
      actor_names: form.actors.split(",").map((a) => a.trim()),
      genre_names: form.genres.split(",").map((g) => g.trim()),
      image_link: form.image_link || null,
      video_link: form.video_link || null,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to save movie");
      }

      setForm(initialForm);
      setShowPopup(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-16">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow border p-10">
        <h1 className="text-3xl font-semibold mb-8 text-slate-800">
          Add Movie
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            name="title"
            value={form.title}
            placeholder="Movie title"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-slate-300
              text-slate-800 placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-slate-400"
            required
          />

          <input
            name="release_year"
            type="number"
            value={form.release_year}
            placeholder="Release year"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-slate-300
              text-slate-800 placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-slate-400"
            required
          />

          <input
            name="director"
            value={form.director}
            placeholder="Director name"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-slate-300
              text-slate-800 placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-slate-400"
            required
          />

          <input
            name="image_link"
            value={form.image_link}
            placeholder="Poster image URL"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-slate-300
              text-slate-800 placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-slate-400"
          />

          <textarea
            name="actors"
            value={form.actors}
            placeholder="Actors (comma separated)"
            onChange={handleChange}
            rows={3}
            className="md:col-span-2 w-full px-4 py-3 rounded-md
              border border-slate-300 text-slate-800 placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-slate-400"
            required
          />

          <textarea
            name="genres"
            value={form.genres}
            placeholder="Genres (comma separated)"
            onChange={handleChange}
            rows={3}
            className="md:col-span-2 w-full px-4 py-3 rounded-md
              border border-slate-300 text-slate-800 placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-slate-400"
            required
          />

          <input
            name="video_link"
            value={form.video_link}
            placeholder="Trailer video URL"
            onChange={handleChange}
            className="md:col-span-2 w-full px-4 py-2 rounded-md
              border border-slate-300 text-slate-800 placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-slate-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 mt-6 py-3 rounded-md
              bg-slate-900 text-white font-semibold
              hover:bg-slate-800 transition disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Movie"}
          </button>
        </form>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">
              Success
            </h2>
            <p className="text-slate-600 mb-5">Movie saved successfully.</p>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full py-2 rounded-md
                bg-slate-800 text-white hover:bg-slate-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
