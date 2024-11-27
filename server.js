const express = require('express');
const bodyParser = require('body-parser');
const booksRouter = require('./routes/books');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/books', booksRouter);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
