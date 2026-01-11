import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard.jsx';
import './BookList.css'; // optional if needed

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get('http://localhost:5000/books');
      setBooks(res.data);
    };
    fetchBooks();
  }, []);

  return (
    <div className="page">
      <h3 className="page-title">📚 Uploaded Books</h3>
      <div className="book-grid">
        {books.map((book, index) => (
          <BookCard
            key={index}
            title={book.title}
            category={book.category}
            pdfUrl={book.pdfUrl}
            imageUrl={
              book.imgUrl
                ? `data:image/${book.imgType};base64,${book.imgUrl}`
                : 'https://via.placeholder.com/200x270?text=No+Cover'
            }
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;
