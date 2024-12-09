const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database connection
const db = new sqlite3.Database(path.resolve(__dirname, 'database.sqlite'), (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Initialize database tables
db.serialize(() => {
  // Create books table
  db.run(
    `CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      isbn TEXT NOT NULL UNIQUE,
      published_year INTEGER NOT NULL,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )`,
    (err) => {
      if (err) {
        console.error('Error creating books table:', err.message);
      }
    }
  );

  // Create users table
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )`,
    (err) => {
      if (err) {
        console.error('Error creating users table:', err.message);
      }
    }
  );
});

module.exports = db;
