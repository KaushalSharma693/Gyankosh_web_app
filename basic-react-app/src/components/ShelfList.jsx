import React, { useState, useEffect, useRef } from 'react';
import ShelfBooks from './ShelfBooks';
import axios from 'axios';

const GOOGLE_BOOKS_API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

const ShelfList = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [savedTitles, setSavedTitles] = useState(new Set());
  const [sortKey, setSortKey] = useState('title');
  const cache = useRef(new Map());

  useEffect(() => {
    const fetchSavedBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/books');
        const titles = new Set(res.data.map((b) => b.title.toLowerCase()));
        setSavedTitles(titles);
      } catch (err) {
        console.error('Error loading saved books');
      }
    };
    fetchSavedBooks();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
        !loading &&
        books.length < totalItems
      ) {
        setPage((p) => p + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [books, loading, totalItems]);

  useEffect(() => {
    if (query) fetchBooks(query, page);
  }, [page]);

  const fetchBooks = async (q, p) => {
    const cacheKey = `${q}:${p}`;
    if (cache.current.has(cacheKey)) {
      const data = cache.current.get(cacheKey);
      setBooks((prev) => p === 0 ? data.items : [...prev, ...data.items]);
      setTotalItems(data.totalItems);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&startIndex=${p * 20}&maxResults=20&key=${GOOGLE_BOOKS_API_KEY}`);
      const data = res.data;
      cache.current.set(cacheKey, data);
      setBooks((prev) => p === 0 ? data.items : [...prev, ...data.items]);
      setTotalItems(data.totalItems || 0);
    } catch (err) {
      console.error('Google Books fetch error:', err);
    }
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setBooks([]);
    setPage(0);
    fetchBooks(query, 0);
  };

  const handleSave = async ({ title, author, coverUrl }) => {
    try {
      const imageRes = await fetch(coverUrl);
      const imageBlob = await imageRes.blob();
      const imageFile = new File([imageBlob], `${title}.jpg`, { type: imageBlob.type });

      const formData = new FormData();
      formData.append('title', title);
      formData.append('pdf', new Blob([], { type: 'application/pdf' }));
      formData.append('image', imageFile);
      formData.append('status', 'approved');
      formData.append('category', 'GoogleBooks');

      await axios.post('http://localhost:5000/upload', formData);
      alert(`✅ Saved "${title}" to your library`);
      setSavedTitles((prev) => new Set([...prev, title.toLowerCase()]));
    } catch (err) {
      console.error('Save failed:', err);
      alert('❌ Failed to save book');
    }
  };

  const sortedBooks = [...books].sort((a, b) => {
    const aInfo = a.volumeInfo;
    const bInfo = b.volumeInfo;
    if (sortKey === 'title') return (aInfo.title || '').localeCompare(bInfo.title || '');
    if (sortKey === 'author') return (aInfo.authors?.[0] || '').localeCompare(bInfo.authors?.[0] || '');
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow sticky top-0 z-10 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">📚 Google Books Search</h2>
        <form onSubmit={handleSearch} className="flex w-full sm:w-auto gap-2">
          <input
            type="text"
            placeholder="Search books or authors..."
            className="border p-2 rounded w-full sm:w-72"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Search
          </button>
        </form>
      </header>

      <main className="p-4">
        {loading && <p className="text-gray-600">🔍 Searching...</p>}
        {!loading && books.length > 0 && (
          <ShelfBooks books={sortedBooks} onSave={handleSave} savedTitles={savedTitles} />
        )}
        {!loading && books.length === 0 && query && (
          <p className="text-red-600">No books found.</p>
        )}
      </main>
    </div>
  );
};

export default ShelfList;
