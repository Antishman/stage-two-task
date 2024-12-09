const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const booksRoutes = require('./routes/books');
const authRoutes = require('./auth/auth.routes'); // Authentication routes
const { authenticate } = require('./auth/auth.middleware');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes); // Authentication routes for signup/login
app.use('/books', booksRoutes); // CRUD and recommendations routes

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Books API with Authentication and RBAC!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
