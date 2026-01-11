import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookDetails from './BookDetails';
import './CategoryShelf.css'; // we'll define the scroll behavior here

const GOOGLE_BOOKS_API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

const CategoryShelf = ({ category }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${category.query}&maxResults=20&key=${GOOGLE_BOOKS_API_KEY}`
        );
        setBooks(res.data.items || []);
      } catch (err) {
        console.error('Failed to fetch books:', err);
      }
    };
    fetch();
  }, [category]);

  const handleSave = async ({ title, author, coverUrl }) => {
    try {
      const imageRes = await fetch(coverUrl);
      const imageBlob = await imageRes.blob();
      const imageFile = new File([imageBlob], `${title}.jpg`, {
        type: imageBlob.type,
      });

      const formData = new FormData();
      formData.append('title', title);
      formData.append('pdf', new Blob([], { type: 'application/pdf' }));
      formData.append('image', imageFile);

      await axios.post('http://localhost:5000/upload', formData);
      alert(`✅ Saved "${title}" to your library`);
    } catch (err) {
      console.error('Save failed:', err);
      alert('❌ Failed to save book');
    }
  };

  return (
    <div className="category-shelf">
      <h2 className="category-title">📘 {category.title}</h2>
      <div className="book-scroll-container">
        {books.map((book) => {
          const info = book.volumeInfo;
          const title = info.title || 'Untitled';
          const author = info.authors?.[0] || 'Unknown';
          const coverUrl =
            info.imageLinks?.thumbnail ||
            'https://via.placeholder.com/150x220?text=No+Cover';
          const previewLink = info.previewLink || '#';

          return (
            <div key={book.id} className="book-scroll-item">
              <BookDetails
                title={title}
                author={author}
                coverUrl={coverUrl}
                previewLink={previewLink}
                bookId={book.id}
                onSave={handleSave}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryShelf;
