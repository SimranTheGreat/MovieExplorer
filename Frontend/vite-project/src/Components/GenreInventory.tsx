import { useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  image_link?: string;
  video_link?: string;
};

type Genre = {
  id: number;
  name: string;
  movies: Movie[];
};

export default function GenreInventory() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch("http://127.0.0.1:8000/genres");
        const data: Genre[] = await res.json();
        setGenres(data);
      } catch (err) {
        console.error("Failed to fetch genres", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGenres();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-600">Loading genres…</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">
      <h1 className="text-2xl font-semibold text-slate-800">
        Genres
      </h1>

      {genres.map(genre => (
        <section key={genre.id} className="space-y-4">
          {/* Genre name */}
          <h2 className="text-xl font-medium text-slate-700">
            {genre.name}
          </h2>

          {/* Movies */}
          {genre.movies.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {genre.movies.map(movie => (
                <div
                  key={movie.id}
                  className="bg-white border rounded-lg overflow-hidden shadow-sm"
                >
                  {movie.image_link ? (
                    <img
                      src={movie.image_link}
                      alt={movie.title}
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="h-48 bg-slate-200 flex items-center justify-center text-sm text-slate-500">
                      No Image
                    </div>
                  )}

                  <div className="p-3 space-y-1">
                    <p className="font-medium text-slate-800">
                      {movie.title}
                    </p>

                    {movie.video_link && (
                      <a
                        href={movie.video_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Watch trailer
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No movies in this genre.
            </p>
          )}
        </section>
      ))}
    </div>
  );
}
