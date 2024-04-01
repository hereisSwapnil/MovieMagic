import React, { useState, useEffect } from "react";

const Notification = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <div
      style={{
        display: isVisible ? "block" : "none",
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: type === "error" ? "red" : "green",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        zIndex: "9999",
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
