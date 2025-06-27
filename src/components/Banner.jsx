import { useEffect, useState } from "react";
import axios from "axios";

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week`,
          {
            params: {
              api_key: "cc06206b5277cc03f3b5c0bf32dc3c72", // Replace with your TMDB API key
            },
          }
        );
        const results = response.data.results;
        const randomMovie = results[Math.floor(Math.random() * results.length)];
        setMovie(randomMovie);
      } catch (error) {
        console.error("Banner load failed", error);
      }
    }

    fetchMovie();
  }, []);

  if (!movie) return null;

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 w-full bg-black bg-opacity-60 text-white text-center py-4 text-2xl font-semibold">
        {movie.title}
      </div>
    </div>
  );
}

export default Banner;
