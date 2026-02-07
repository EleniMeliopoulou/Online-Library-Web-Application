import React, { useEffect, useState } from "react";
import Books from "../Books";

const MyBorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    if (!userId) return;
  
    fetch(`http://localhost:8080/borrowed?userId=${userId}`)
      .then((res) => res.json())
      .then((books) => {
       console.log("Borrowed books:", books);
        setBorrowedBooks(books); 
      })
      .catch((err) => {
        console.error("Failed to fetch borrowed books:", err);
      });
  }, [userId]);

  return (
    <div className="textBody">
      <h2>My Borrowed Books</h2>
      <div style={{ display: "flex"}}>
        {borrowedBooks.length > 0 ? (
          borrowedBooks.map((book) => (
            <Books key={book.id} data={book} />
          ))
        ) : (
          <p>You haven't borrowed any books yet...</p>
        )}
      </div>
    </div>
  );
};

export default MyBorrowedBooks;