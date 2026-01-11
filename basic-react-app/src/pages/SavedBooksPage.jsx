import { useEffect, useState } from 'react';
import axios from 'axios';

const SavedBooksPage = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/books');
      setBooks(res.data);
    } catch (err) {
      console.error('Error loading saved books');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert('❌ Failed to delete book');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📚 Saved Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book._id} className="bg-white p-4 rounded shadow">
            <img
              src={`data:image/${book.imgType};base64,${book.imgUrl}`}
              alt={book.title}
              className="w-full h-56 object-cover rounded mb-2"
            />
            <h3 className="font-semibold mb-2">{book.title}</h3>
            <div className="flex justify-between">
              <a
                href={book.pdfUrl}
                download
                className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
              >
                Download PDF
              </a>
              <button
                onClick={() => handleDelete(book._id)}
                className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedBooksPage;
