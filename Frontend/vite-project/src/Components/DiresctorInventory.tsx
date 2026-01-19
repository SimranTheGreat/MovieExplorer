import { useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  release_year: number;
};

type Director = {
  id: number;
  name: string;
  movies?: Movie[];
};

export default function Directors() {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchDirectors() {
      try {
        const res = await fetch("http://127.0.0.1:8000/directors");
        const data: Director[] = await res.json();
        setDirectors(data);
      } catch (err) {
        console.error("Failed to fetch directors", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDirectors();
  }, []);

  if (loading) {
    return <div className="p-6">Loading directors…</div>;
  }

  if (!directors.length) {
    return <div className="p-6">No directors found.</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Directors</h1>

      <div className="space-y-6">
        {directors.map((director) => (
          <div
            key={director.id}
            className="border rounded-lg bg-white p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold mb-2">{director.name}</h2>

            {director.movies && director.movies.length > 0 ? (
              <ul className="list-disc list-inside text-sm text-slate-700">
                {director.movies.map((movie) => (
                  <li key={movie.id}>
                    {movie.title} ({movie.release_year})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">No movies added yet.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
