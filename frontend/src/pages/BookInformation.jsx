import React, { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom";

function BookInformation() {
  const { title } = useParams();
  const [book, setBook] = useState(null); 
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(`http://localhost:8080/searchbook/${encodeURIComponent(title)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Book not found");
        return res.json();
      })
      .then(data => {
        setBook(Array.isArray(data) ? data[0] : data);
      })
      .catch((err) => setError(err.message));
  }, [title]);

  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!book) return <p style={{marginLeft: "50px"}}><strong>Loading...</strong></p>;

  const rating = parseFloat(book.rating);

  const ratingStars = (rating) => {
    const fullStars = Math.floor(rating); 
    const halfStar = rating % 1 >= 0.25 && rating % 1 <= 0.75; 
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="bi bi-star-fill" style={{ color: "#ffc107" }}></i>);
    }
    if (halfStar) {
      stars.push(<i key="half" className="bi bi-star-half" style={{ color: "#ffc107" }}></i>);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star" style={{ color: "#ccc" }}></i>);
    }

    return stars;
  };

  const imageUrl = (!book.image || book.image === "null" || book.image.trim() === "")
  ? "/default.jpg"
  : book.image;

  return (
    <div className="results-container">
      <h2 className="textlength"><em>{title}</em></h2>
      <img src={imageUrl} alt="cover" className="book-cover" />
      <hr></hr>
      <p className="textlength"><strong>Τίτλος:</strong> {book.title}</p>
      <hr></hr>
      <p><strong>Συγγραφέας:</strong> {book.author}</p>
      <hr></hr>
      <p><strong>Ημερομηνία Έκδοσης:</strong> {book.publishedDate}</p>
      <hr></hr>
      <p><strong>Κατηγορία:</strong> {book.genre}</p>
      <hr></hr>
      <p className="textlength"><strong>Περιγραφή:</strong> {book.description}</p>
      <hr></hr>
      <p><strong>Rating:</strong> {ratingStars(rating)} <span style={{ marginLeft: "0.5rem" }}>{Math.round(book.rating * 10) /10}</span></p>
      
    </div>
  )
}

export default BookInformation;