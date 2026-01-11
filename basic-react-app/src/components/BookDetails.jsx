// src/components/BookDetails.jsx
import React from 'react';
import './BookDetails.css';

const BookDetails = ({ title, author, coverUrl, previewLink, bookId, onSave, isSaved }) => {
  const safeTitle = title || 'Untitled';
  const safeAuthor = author || 'Unknown Author';
  const safeCoverUrl = coverUrl || 'https://via.placeholder.com/200x270?text=No+Cover';
  const safePreviewLink = previewLink || `https://books.google.com/books?id=${bookId}`;

  const handleSaveClick = () => {
    onSave({
      title: safeTitle,
      author: safeAuthor,
      coverUrl: safeCoverUrl,
      previewLink: safePreviewLink,
      googleId: bookId,
    });
  };

  return (
    <div className="book-card">
      <img
        src={safeCoverUrl}
        alt={safeTitle}
        className="book-img"
      />
      <div className="book-content">
        <h3 className="book-title">{safeTitle}</h3>
        <p className="book-author">AUTHOR BY: {safeAuthor}</p>

        <a
          href={safePreviewLink}
          target="_blank"
          rel="noopener noreferrer"
          className="book-link"
        >
          Preview on Google Books →
        </a>

        {isSaved ? (
          <div className="saved-text">✅ Saved</div>
        ) : (
          <button onClick={handleSaveClick} className="save-button">
            Save to My Library
          </button>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
