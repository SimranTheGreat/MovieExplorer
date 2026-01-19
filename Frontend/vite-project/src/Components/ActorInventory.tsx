import { useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  release_year: number;
  image_link?: string;
  video_link?: string;
};

type Actor = {
  id: number;
  name: string;
  movies: Movie[];
};

export default function Actors() {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActors() {
      try {
        const res = await fetch("http://127.0.0.1:8000/actors");
        const data: Actor[] = await res.json();
        setActors(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchActors();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-600">Loading actors…</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">
      <h1 className="text-2xl font-semibold text-slate-800">
        Actors
      </h1>

      {actors.map(actor => (
        <section
          key={actor.id}
          className="border-b pb-8"
        >
          {/* Actor Name */}
          <h2 className="text-xl font-medium mb-4 text-slate-700">
            {actor.name}
          </h2>

          {/* Movies */}
          {actor.movies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {actor.movies.map(movie => (
                <div
                  key={movie.id}
                  className="flex gap-4 bg-white rounded-lg border shadow-sm p-4"
                >
                  {/* Poster */}
                  {movie.image_link ? (
                    <img
                      src={movie.image_link}
                      alt={movie.title}
                      className="w-24 h-36 object-cover rounded"
                    />
                  ) : (
                    <div className="w-24 h-36 bg-slate-200 rounded flex items-center justify-center text-xs text-slate-500">
                      No Image
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {movie.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {movie.release_year}
                      </p>
                    </div>

                    {movie.video_link && (
                      <a
                        href={movie.video_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline mt-2"
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
              No movies available.
            </p>
          )}
        </section>
      ))}
    </div>
  );
}
