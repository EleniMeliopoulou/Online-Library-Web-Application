import React, { useEffect, useState } from "react";
import Books from "./Books";
import BookList from "./BookList";

const BooksByGenre = ({ groupByGenre = true }) => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:8080/getallbooks");
        if (!res.ok) throw new Error("Couldn't get all books");
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBooks();
  }, []);

  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  if (!groupByGenre) {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "10px" }}>
        {books.slice(0, 500).map((book, index) => (
          <Books key={index} data={book} />
        ))}
      </div>
    );
  }

  const booksByGenre = books.reduce((acc, book) => {
    const genre = book.genre || "Unknown";
    if (!acc[genre]) acc[genre] = [];
    acc[genre].push(book);
    return acc;
  }, {});

  return (
    <div className="booklists-wrapper" style={{marginLeft:"45px"}}>
      {Object.entries(booksByGenre).map(([genre, genreBooks]) => (
        <BookList key={genre} title={genre} books={genreBooks} />
      ))}
    </div>
  );
};

export default BooksByGenre;