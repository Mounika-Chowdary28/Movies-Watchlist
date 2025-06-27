import { useState } from "react";
import genreids from "../Utility/genre";

function Watchlist({ watchlist, setwatchlist, RemoveWatchlist }) {
  const [search, setsearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");

  const handleSearch = (e) => {
    setsearch(e.target.value);
  };

  const sortIncreasing = () => {
    let sorted = [...watchlist].sort(
      (a, b) => a.vote_average - b.vote_average
    );
    setwatchlist(sorted);
  };

  const sortDecreasing = () => {
    let sorted = [...watchlist].sort(
      (a, b) => b.vote_average - a.vote_average
    );
    setwatchlist(sorted);
  };

  // Get unique genres from the watchlist
  const genreList = ["All Genres", ...new Set(watchlist.map((movie) => genreids[movie.genre_ids[0]]))];

  const filteredMovies = watchlist.filter((movie) => {
    const titleMatch = movie.title.toLowerCase().includes(search.toLowerCase());
    const genreMatch =
      selectedGenre === "All Genres" ||
      genreids[movie.genre_ids[0]] === selectedGenre;
    return titleMatch && genreMatch;
  });

  return (
    <>
      {/* Genre Filter Buttons */}
      <div className="flex flex-wrap justify-center m-4 gap-4">
        {genreList.map((genre) => (
          <div
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`flex justify-center items-center h-[3rem] w-[9rem] rounded-xl text-white cursor-pointer ${
              selectedGenre === genre ? "bg-blue-400" : "bg-gray-400"
            }`}
          >
            {genre}
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex justify-center m-4">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search Movies"
          className="h-[3rem] w-[18rem] bg-gray-200 p-4"
        />
      </div>

      {/* Movies Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th className="flex justify-center">
                <div onClick={sortIncreasing} className="p-2 cursor-pointer">
                  <i className="fa-solid fa-arrow-up"></i>
                </div>
                <div className="p-2">Ratings</div>
                <div onClick={sortDecreasing} className="p-2 cursor-pointer">
                  <i className="fa-solid fa-arrow-down"></i>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movie) => (
              <tr className="border-b-2" key={movie.id}>
                <td className="flex items-center px-6 py-4">
                  <img
                    className="h-[6rem] w-[10rem]"
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  />
                  <div className="mx-10">{movie.title}</div>
                </td>
                <td>{movie.vote_average}</td>
                <td>{movie.popularity}</td>
                <td>{genreids[movie.genre_ids[0]]}</td>
                <td
                  className="text-red-800 cursor-pointer"
                  onClick={() => RemoveWatchlist(movie)}
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
