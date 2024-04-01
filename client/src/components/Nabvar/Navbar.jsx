import React, { useState, useEffect } from "react";
import { SearchBar } from "../SearchBar/SearchBar";

export const Navbar = () => {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`flex flex-col sm:flex-row w-full bg-blue-950 py-3 justify-around align-middle items-center ${
        isSticky ? "fixed top-0 z-10" : ""
      }`}
    >
      <h1 className="text-[40px] text-white">
        <a href="/">MovieMagic</a>
      </h1>
      <SearchBar />
    </nav>
  );
};
