import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import emailjs from "emailjs-com";
import { useParams } from "react-router-dom";
import axios from "axios";
import Notification from "../components/Notification/Notification";

export const MovieDetail = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const [text, setText] = useState("");
  const [type, setType] = useState("");

  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`https://api.tvmaze.com/shows/${id}`).then((res) => {
      console.log(res.data);
      setMovie(res.data);
    });
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    setSubmitting(true);
    e.preventDefault();
    const templateParams = {
      name: formData.name,
      email: formData.email,
      date: formData.date,
      time: formData.time,
      movieName: movie.name,
    };
    console.log(templateParams);

    emailjs
      .send(
        import.meta.env.VITE_SERVICE_KEY,
        import.meta.env.VITE_TEMPLATE_KEY,
        templateParams,
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log("Email sent successfully", response);
          setText("Booking Confirmed");
          setType("success");
          closeModal();
          setSubmitting(false);
          setFormData({
            name: "",
            email: "",
            date: "",
            time: "",
          });
        },
        (error) => {
          setText("Booking Failed");
          setType("error");
          console.error("Email could not be sent", error);
          setSubmitting(false);
          setFormData({
            name: "",
            email: "",
            date: "",
            time: "",
          });
        }
      );
  };

  if (!movie) {
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
        </svg>{" "}
      </div>
    );
  }

  return (
    <>
      {modalIsOpen ? (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-[#5f5f5f4f]"
          onClick={closeModal}
        ></div>
      ) : (
        ""
      )}
      <Notification message={text} type={type} />
      <div className="flex flex-col md:flex-row mx-auto px-10 my-10 gap-6">
        <img
          src={movie.image.original}
          alt=""
          className="w-[90vw] md:w-[500px]"
        />
        <div className="flex flex-col gap-3">
          <p>
            <b>Name :</b> {movie.name}
          </p>
          <p>
            <b>Description:</b> {parse(movie.summary)}
          </p>
          <p>
            <b>Language:</b> {movie.language}
          </p>
          <p>
            <b>Rating:</b> {movie.rating.average}
          </p>
          <button
            className="bg-blue-900 text-white md:w-fit md:px-3 py-2 font-bold rounded-lg hover:bg-blue-800"
            onClick={openModal}
          >
            Book Now
          </button>
        </div>{" "}
      </div>
      {modalIsOpen ? (
        <div className="bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-fit p-10 flex flex-col  items-center">
          <h2 className="font-bold text-3xl mb-[30px]">Book Now</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col text-[20px] gap-10"
          >
            <label className="flex flex-col md:row">
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border-2 border-black ml-5 px-2 py-1"
              />
            </label>
            <label className="flex flex-col md:row">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border-2 border-black ml-5 px-2 py-1"
              />
            </label>
            <label className="flex flex-col md:row">
              Date:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border-2 border-black ml-5 px-2 py-1"
              />
            </label>
            <label className="flex flex-col md:row">
              Time:
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="border-2 border-black ml-5 px-2 py-1"
              />
            </label>
            <button
              type="submit"
              className={`py-2 px-3 ${
                submitting
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-900 hover:bg-blue-800 cursor-pointer"
              } rounded-xl text-white `}
              disabled={submitting ? true : false}
            >
              Confirm Booking
            </button>
            <div
              className="absolute top-3 right-3 cursor-pointer"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
