import React from "react";
import "./FeatureBook.css";

const topBooks = [
  { id: 1, title: "Fiction", img: "bookie.png" },
  { id: 2, title: "Science", img: "book2.avif" },
  { id: 3, title: "Business", img: "book3.avif" },
  { id: 4, title: "Comics", img: "book4.avif" },
  { id: 5, title: "Biographies", img: "book.avif" },
];

export default function FeaturedBook() {
  return (
    <div className="top-category-section">
      <h2 className="section-title">📚Top Categories Book</h2>

      <div className="category-wrapper">
        {topBooks.map((book) => (
          <div className="category-card" key={book.id}>
          <div className="circle">
          <div className="rotating-border"></div>
          <div className="image-fixed">
            <img src={book.img} alt={book.title} />
          </div>
          </div>
            <p>{book.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
