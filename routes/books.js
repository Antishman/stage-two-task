const express = require('express');
const db = require('../db/database');
const { validateBook } = require('../validators/bookValidator');
const router = express.Router();

// GET /books - Fetch all books
router.get('/', (req, res) => {
    db.all('SELECT * FROM books', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
});

// POST /books - Add a new book
router.post('/', (req, res) => {
    const { error } = validateBook(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { title, author, isbn, published_year } = req.body;
    const query = `INSERT INTO books (title, author, isbn, published_year) VALUES (?, ?, ?, ?)`;
    db.run(query, [title, author, isbn, published_year], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, ...req.body });
    });
});

// PUT /books/:id - Update a book
router.put('/:id', (req, res) => {
    const { error } = validateBook(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { title, author, isbn, published_year } = req.body;
    const query = `UPDATE books SET title = ?, author = ?, isbn = ?, published_year = ? WHERE id = ?`;
    db.run(query, [title, author, isbn, published_year, req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Book updated successfully' });
    });
});

// DELETE /books/:id - Remove a book
router.delete('/:id', (req, res) => {
    const query = `DELETE FROM books WHERE id = ?`;
    db.run(query, [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Book deleted successfully' });
    });
});

// Custom Endpoint: GET /books/recommendations - Recommend a random book
router.get('/recommendations', (req, res) => {
    db.get('SELECT * FROM books ORDER BY RANDOM() LIMIT 1', [], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(row || { message: 'No books available for recommendations' });
    });
});

module.exports = router;
