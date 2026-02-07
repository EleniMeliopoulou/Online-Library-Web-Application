import React from "react";
import Books from "./Books";


const BookList = ({ title, books }) => {

  return (
    <>
        <div className="booklist-container">
            <h2>{title}</h2>
            <div className="booklist-scroll">
                {books.map((book) => (
                  <Books key={book.id} data={book} />
                ))}
            </div>
        </div>
    </>
    
  );
};

export default BookList;