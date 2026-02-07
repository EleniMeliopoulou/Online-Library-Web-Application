import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Books = ({ data }) => {
  const nav = useNavigate();
  const [userId, setUserId] = useState(() => localStorage.getItem("userId"));
  const [message, setMessage] = useState("");

  const imageUrl =
    !data.image || data.image.trim() === "" || data.image === "null"
      ? "/default.jpg"
      : data.image;

      const handleBorrow = async () => {
        if (!userId || userId === "null") {
          setMessage("You must login first");
          return;
        }
      
        try {
          const response = await fetch(
            `http://localhost:8080/borrow?userId=${userId}&bookId=${data.id}`,
            {
              method: "POST",
            }
          );
      
          if (!response.ok) {
            const errMsg = await response.text();
            throw new Error(errMsg || "Something went wrong");
          }
      
          const result = await response.text();
          setMessage(result);
        } catch (error) {
          setMessage(`Error: ${error.message}`);
        }
      };

    const handleReturn = async () => {
      const username = localStorage.getItem("username");
      if (!username) {
        setMessage("Username not found. Try again with a different username.");
        return;
      }
    
      try {
        const response = await fetch(`http://localhost:8080/returned?username=${username}&bookId=${data.id}`, {
          method: "POST",
        });
    
        if (!response.ok) {
          const errMsg = await response.text();
          throw new Error(errMsg || "Error while returning book");
        }
    
        const result = await response.text();
        setMessage(result);
      } catch (error) {
        setMessage("Return failed: " + error.message);
      }
    };


  return (
    <div className="cards">
      <img
        className="bookcover"
        src={imageUrl}
        alt={data.title}
        onClick={() => nav(`/results/${encodeURIComponent(data.title)}`)}
      />
      <h3>{data.title}</h3>
      <button className="borrow_button" onClick={handleBorrow} disabled={!userId}>Borrow</button>
      <button className="return_button" onClick={handleReturn} disabled={!userId}>Return</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Books;