import { Routes, Route } from "react-router-dom";
import { Movie } from "./Pages/Movie";
import { MovieDetail } from "./Pages/MovieDetail";
import { Navbar } from "./components/Nabvar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Movie />} />
        <Route path="show/:id" element={<MovieDetail />} />
      </Routes>
    </>
  );
}

export default App;
