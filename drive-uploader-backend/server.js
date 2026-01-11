require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const googleBooksRoutes = require('./routes/googleBooksRoutes'); // Google Books API proxy

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// ================= MONGODB =================
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));


// ================= BOOK SCHEMA =================
const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  olid: String,      // Google Books Volume ID
  coverUrl: String,
  category: { type: String, default: 'General' },
  status: { type: String, enum: ['pending', 'approved'], default: 'pending' }
}, { timestamps: true });

const Book = mongoose.model('Book', BookSchema);


// ================= ROUTES =================

// 🔹 Fetch all saved books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});


// 🔹 Save a book from Google Books
app.post('/books', async (req, res) => {
  try {
    const { title, author, coverUrl, category, olid } = req.body;

    const exists = await Book.findOne({ title: new RegExp(`^${title}$`, 'i') });
    if (exists) {
      return res.status(409).json({ message: 'Book already saved' });
    }

    const book = await Book.create({
      title,
      author,
      coverUrl,
      category,
      olid,
      status: 'pending'
    });

    res.status(201).json(book);
  } catch (error) {
    console.error('❌ Save error:', error);
    res.status(500).json({ message: 'Failed to save book' });
  }
});


// 🔹 Delete book
app.delete('/books/:id', async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Book not found' });

    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});


// 🔹 Google Books API Proxy
app.use('/api/googlebooks', googleBooksRoutes);


// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
