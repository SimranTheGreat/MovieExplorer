import { useNavigate } from "react-router-dom";

export default function Headerbar() {
  const navigate = useNavigate();

  return (
    <header
      className="fixed top-0 w-full z-50 h-16 flex items-center px-8
      bg-gradient-to-r from-black via-zinc-900 to-red-900
      text-white shadow-lg backdrop-blur"
    >
      <div
        onClick={() => navigate("/home")}
        className="text-xl font-extrabold tracking-widest text-red-600 cursor-pointer"
      >
        MOVIEFLIX
      </div>

      <nav className="ml-auto flex gap-6 text-sm font-medium text-neutral-300">
        <button
          onClick={() => navigate("/home/movies")}
          className="hover:text-white transition-colors"
        >
          Movies
        </button>

        <button
          onClick={() => navigate("/home/genres")}
          className="hover:text-white transition-colors"
        >
          Genres
        </button>

        <button
          onClick={() => navigate("/home/directors")}
          className="hover:text-white transition-colors"
        >
          Directors
        </button>

        <button
          onClick={() => navigate("/home/actors")}
          className="hover:text-white transition-colors"
        >
          Actors
        </button>

        <button
          onClick={() => navigate("/home/addMovies")}
          className="hover:text-white transition-colors"
        >
          Add Movie
        </button>
      </nav>
    </header>
  );
}
