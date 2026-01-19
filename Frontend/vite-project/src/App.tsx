import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Movies from "./Components/Movieinventory";
import AddMovies from "./Components/AddMovies";

export default function App() {
  return (
    <BrowserRouter>
  <Routes>
    {/* Root redirect */}
    <Route path="/" element={<Navigate to="/home" replace />} />

    {/* Layout route */}
    <Route path="/home" element={<HomePage />}>
      {/* Default page */}
      <Route index element={<Navigate to="movies" replace />} />

      {/* ✅ RELATIVE paths */}
      <Route path="movies" element={<Movies />} />
      <Route path="addMovies" element={<AddMovies />} />
    </Route>
  </Routes>
</BrowserRouter>

  );
}
