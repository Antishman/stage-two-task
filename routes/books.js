const express = require('express');
const { authenticate, authorize } = require('../auth/auth.middleware');
const db = require('../db/database'); // SQLite database connection
const router = express.Router();

// Public: Fetch books for authenticated users based on criteria
router.get('/', authenticate, async (req, res) => {
  try {
    const books = await db.all('SELECT * FROM books');
    res.json({ books });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Admin-only: Fetch all books
router.get('/all', authenticate, authorize('admin'), async (req, res) => {
  try {
    const books = await db.all('SELECT * FROM books');
    res.json({ books });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Authenticated Users: Add a new book
router.post('/', authenticate, async (req, res) => {
  const { title, author, isbn, publishedYear } = req.body;

  // Basic validation
  if (!title || !author || !isbn || !publishedYear) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const query = `INSERT INTO books (title, author, isbn, publishedYear) VALUES (?, ?, ?, ?)`;
    await db.run(query, [title, author, isbn, publishedYear]);
    res.status(201).json({ message: 'Book added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add book' });
  }
});

// Authenticated Users: Update a book by ID
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, author, isbn, publishedYear } = req.body;

  if (!title || !author || !isbn || !publishedYear) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const query = `UPDATE books SET title = ?, author = ?, isbn = ?, publishedYear = ? WHERE id = ?`;
    const result = await db.run(query, [title, author, isbn, publishedYear, id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Book updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// Admin Only: Delete a book by ID
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    const query = `DELETE FROM books WHERE id = ?`;
    const result = await db.run(query, [id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

// Suggest a random book based on user's preferences
router.get('/recommendations', authenticate, async (req, res) => {
    try {
      const userId = req.user.id;
  
      // Fetch user's favorite books
      const favoritesQuery = `
        SELECT books.*
        FROM books
        INNER JOIN favorites ON books.id = favorites.book_id
        WHERE favorites.user_id = ?;
      `;
      const favoriteBooks = await db.all(favoritesQuery, [userId]);
  
      if (favoriteBooks.length === 0) {
        return res.status(404).json({ message: 'No recommendations available' });
      }
  
      // Select a random book from the favorites
      const randomBook = favoriteBooks[Math.floor(Math.random() * favoriteBooks.length)];
  
      res.json({ recommendation: randomBook });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
  });
  

module.exports = router;
