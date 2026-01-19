import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Movies from "./Components/Movieinventory";
import AddMovies from "./Components/AddMovies";
import Directors from "./Components/DiresctorInventory";
import Actors from "./Components/ActorInventory";
import GenreInventory from "./Components/GenreInventory";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />}>
          <Route index element={<Navigate to="movies" replace />} />
          <Route path="movies" element={<Movies />} />
          <Route path="addMovies" element={<AddMovies />} />
          <Route path="directors" element={<Directors />} />
          <Route path="actors" element={<Actors />} />
          <Route path="genres" element={<GenreInventory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
