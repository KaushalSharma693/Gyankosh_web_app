// src/pages/ProductsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductsPage.css';

const ProductsPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/books');
        setBooks(res.data);
      } catch (err) {
        console.error('Failed to fetch books:', err);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="products-page">
      <h2 className="products-heading">📚 My Library</h2>
      <div className="product-grid">
        {books.map((book, index) => (
          <div className="book-card" key={index}>
            <img
              src={
                book.imgUrl
                  ? `data:image/${book.imgType};base64,${book.imgUrl}`
                  : book.coverUrl || 'https://via.placeholder.com/200x270?text=No+Cover'
              }
              alt={book.title}
              className="book-img"
            />
            <div className="book-info">
              <h4 className="book-title">{book.title}</h4>
              <p className="book-category">{book.category || 'Uncategorized'}</p>
              {book.pdfUrl && (
                <a
                  href={book.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="download-btn"
                >
                  📥 Download PDF
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;