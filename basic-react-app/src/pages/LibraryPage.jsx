// src/pages/LibraryPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookDetails from '../components/BookDetails';
import { FaBook, FaSearch } from 'react-icons/fa';
import './LibraryPage.css';

const categories = [
  { name: 'Computer Science', query: 'computer science' },
  { name: 'Information Technology', query: 'information technology' },
  { name: 'Electronics & Telecommunication', query: 'electronics and telecommunication' },
  { name: 'Electrical Engineering', query: 'electrical engineering' },
  { name: 'Mechanical Engineering', query: 'mechanical engineering' },
  { name: 'Civil Engineering', query: 'civil engineering' },
  { name: 'Chemical Engineering', query: 'chemical engineering' },
  { name: 'Biomedical Engineering', query: 'biomedical engineering' },
  { name: 'Aerospace Engineering', query: 'aerospace engineering' },
  { name: 'Automobile Engineering', query: 'automobile engineering' },
  { name: 'Mechatronics Engineering', query: 'mechatronics engineering' },
  { name: 'Mathematics', query: 'mathematics' }
];

const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [categoryResults, setCategoryResults] = useState({});
  const [pageByCategory, setPageByCategory] = useState({});

  useEffect(() => {
    categories.forEach((cat) => loadCategoryBooks(cat.name, cat.query, 0));
  }, []);

  const loadCategoryBooks = async (categoryName, query, startIndex) => {
    try {
      const res = await axios.get('http://localhost:5000/api/googlebooks/search', {
        params: { query, startIndex }
      });

      const newBooks = res.data.books || res.data.items || [];
      setCategoryResults((prev) => ({
        ...prev,
        [categoryName]: [...(prev[categoryName] || []), ...newBooks]
      }));
      setPageByCategory((prev) => ({
        ...prev,
        [categoryName]: (prev[categoryName] || 0) + 10
      }));
    } catch (err) {
      console.error(`Error loading books for ${categoryName}:`, err);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    try {
      const res = await axios.get('http://localhost:5000/api/googlebooks/search', {
        params: { query: searchTerm }
      });
      setSearchResults(res.data.books || res.data.items || []);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleSave = async (book) => {
    const info = book.volumeInfo || book;
    try {
      await axios.post('http://localhost:5000/books', {
        title: info.title,
        author: info.authors?.[0] || 'Unknown Author',
        coverUrl: info.imageLinks?.thumbnail || book.coverUrl || '',
        category: info.categories?.[0] || 'Others',
        olid: book.id,
      });
      alert('✅ Book saved!');
    } catch (err) {
      console.error('❌ Failed to save book:', err);
      alert('Failed to save book');
    }
  };

  const renderBooks = (books) => (
    <div className="book-grid">
      {books.map((book) => {
        const info = book.volumeInfo || book;
        const title = info.title || 'Untitled';
        const author = info.authors?.[0] || 'Unknown Author';
        const coverUrl =
          info.imageLinks?.thumbnail || book.coverUrl || 'https://via.placeholder.com/150x220?text=No+Cover';
        const olid = book.id;

        return (
          <BookDetails
            key={olid}
            title={title}
            author={author}
            coverUrl={coverUrl}
            previewLink={`https://books.google.com/books?id=${olid}`}
            bookId={olid}
            onSave={handleSave}
            isSaved={false}
          />
        );
      })}
    </div>
  );

  return (
    <div className="library-page">
      <div className="library-overlay">
        <h2 className="library-heading">
          <FaBook className="icon" /> Explore Library
        </h2>

        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="search-input"
            placeholder="Search by title..."
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        {searchResults.length > 0 ? (
          <>
            <h3 className="section-title">Search Results</h3>
            {renderBooks(searchResults)}
          </>
        ) : (
          categories.map((cat) => (
            <div key={cat.name} className="category-section">
              <h3 className="section-title">
                <FaBook className="icon" /> {cat.name}
              </h3>
              {categoryResults[cat.name] ? (
                <>
                  {renderBooks(categoryResults[cat.name])}
                  <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <button
                      className="load-more-btn"
                      onClick={() =>
                        loadCategoryBooks(cat.name, cat.query, pageByCategory[cat.name] || 0)
                      }
                    >
                      Load More
                    </button>
                  </div>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LibraryPage;
