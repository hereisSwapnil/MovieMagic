import React from "react";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";

export const MovieCard = ({ key, movie }) => {
  const navigate = useNavigate();
  const truncateDescription = (description, maxLength) => {
    return description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description;
  };

  return (
    <div
      key={key}
      className="bg-[#b9b9b957] w-[300px] rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 mx-auto my-3"
    >
      {movie.image && movie.image.medium ? (
        <img
          src={movie.image.medium}
          alt=""
          className="rounded-t-xl w-[300px]"
        />
      ) : (
        <img
          src="https://images.placeholders.dev/?height=421&width=300"
          alt=""
          className="rounded-t-xl w-[300px]"
        />
      )}
      <div className="p-3 flex flex-col justify-between h-[150px]">
        <h1 className="font-bold text-lg">{movie.name}</h1>
        <p className="text-md font-thin">
          {parse(truncateDescription(movie.summary, 40))}
        </p>
        <button
          className="bg-blue-900 py-2 px-3 cursor-pointer rounded-xl text-white hover:bg-blue-800"
          onClick={() => {
            navigate(`/show/${movie.id}`);
          }}
        >
          More Info...
        </button>
      </div>
    </div>
  );
};
