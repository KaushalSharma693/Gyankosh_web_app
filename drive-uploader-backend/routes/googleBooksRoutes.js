const express = require('express');
const axios = require('axios');
const router = express.Router();

const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

// 🔍 Search books by title, author, or keyword
router.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query || !query.trim()) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: query,
        maxResults: 30,
        key: GOOGLE_BOOKS_API_KEY,
      },
    });

    const simplifiedBooks = response.data.items?.map((item) => {
      const volume = item.volumeInfo;
      return {
        id: item.id,
        title: volume.title || 'Untitled',
        author: volume.authors?.[0] || 'Unknown Author',
        coverUrl: volume.imageLinks?.thumbnail || 'https://via.placeholder.com/150x220?text=No+Cover',
        description: volume.description || '',
        categories: volume.categories || [],
      };
    }) || [];

    res.json({ books: simplifiedBooks });
  } catch (error) {
    console.error('❌ Google Books Search Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Google Books' });
  }
});

// 📘 Get details by Volume ID
router.get('/books/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`, {
      params: { key: GOOGLE_BOOKS_API_KEY },
    });

    const volume = response.data.volumeInfo;

    const simplifiedDetails = {
      id: response.data.id,
      title: volume.title || 'Untitled',
      author: volume.authors?.[0] || 'Unknown Author',
      coverUrl: volume.imageLinks?.thumbnail || 'https://via.placeholder.com/150x220?text=No+Cover',
      description: volume.description || '',
      categories: volume.categories || [],
      publisher: volume.publisher || '',
      publishedDate: volume.publishedDate || '',
    };

    res.json(simplifiedDetails);
  } catch (error) {
    console.error('❌ Google Books Details Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch book details' });
  }
});

module.exports = router;
