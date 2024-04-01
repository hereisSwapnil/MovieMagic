import React, { useEffect, useState } from "react";
import { MovieCard } from "../components/MovieCard/MovieCard";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export const Movie = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  console.log(query);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!query) {
      axios.get("https://api.tvmaze.com/shows").then((res) => {
        console.log(res.data);
        setMovies(res.data);
      });
    } else {
      axios
        .get(`https://api.tvmaze.com/search/shows?q=${query}`)
        .then((res) => {
          console.log(res.data);
          setMovies(res.data);
        });
    }
  }, [query]);

  if (movies.length === 0) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg
          width="100"
          height="100"
          viewBox="0 0 45 45"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#000000"
        >
          <g
            fill="none"
            fill-rule="evenodd"
            transform="translate(1 1)"
            stroke-width="2"
          >
            <circle cx="22" cy="22" r="6" stroke-opacity="0">
              <animate
                attributeName="r"
                begin="1.5s"
                dur="3s"
                values="6;22"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                begin="1.5s"
                dur="3s"
                values="1;0"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-width"
                begin="1.5s"
                dur="3s"
                values="2;0"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="22" cy="22" r="6" stroke-opacity="0">
              <animate
                attributeName="r"
                begin="3s"
                dur="3s"
                values="6;22"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                begin="3s"
                dur="3s"
                values="1;0"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-width"
                begin="3s"
                dur="3s"
                values="2;0"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="22" cy="22" r="8">
              <animate
                attributeName="r"
                begin="0s"
                dur="1.5s"
                values="6;1;2;3;4;5;6"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </svg>
      </div>
    );
  }
  return (
    <>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {movies.length > 0 &&
            movies.map((movie) => (
              <MovieCard
                key={query ? movie.show.id : movie.id}
                movie={query ? movie.show : movie}
              />
            ))}
        </div>
      </div>
    </>
  );
};
