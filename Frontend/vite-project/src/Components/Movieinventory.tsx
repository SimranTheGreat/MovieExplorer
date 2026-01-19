import { useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  release_year: number;
  image_link?: string;
  video_link?: string;
  director_id?: number;
};

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch("http://127.0.0.1:8000/movies");
        const data = await res.json();
        console.log("Movies API response:", data);
        setMovies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="p-6">Loading movies…</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Movies</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map(movie => (
          <div
            key={movie.id}
            className="rounded-lg border bg-white shadow-sm overflow-hidden"
          >
            {movie.image_link && (
              <img
                src={movie.image_link}
                alt={movie.title}
                className="h-64 w-full object-cover"
              />
            )}

            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">{movie.title}</h2>

              <p className="text-sm text-gray-600">
                Release Year: {movie.release_year}
              </p>

              <p className="text-sm">
                <strong>Director ID:</strong>{" "}
                {movie.director_id ?? "—"}
              </p>

              {movie.video_link && (
                <a
                  href={movie.video_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline"
                >
                  Watch Trailer
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
