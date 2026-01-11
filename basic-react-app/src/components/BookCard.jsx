// src/components/BookCard.jsx
import React from 'react';
import './BookCard.css';

const BookCard = ({ title, imageUrl, pdfUrl, category }) => {
  return (
    <div className="book-card">
      <img src={imageUrl} alt={title} className="book-img" />
      <div className="book-info">
        <h4 className="book-title">{title}</h4>
        <p className="book-category">{category}</p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noreferrer"
          className="download-btn"
        >
          📥 Download PDF
        </a>
      </div>
    </div>
  );
};

export default BookCard;
