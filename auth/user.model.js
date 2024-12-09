const db = require('../db/database'); // SQLite database connection
const bcryptjs = require('bcryptjs');

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user'))
  )
`);

const createUser = async (username, password, role = 'user') => {
  const hashedPassword = await bcryptjs.hash(password, 10);
  const query = `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`;
  await db.run(query, [username, hashedPassword, role]);
};

const findUserByUsername = async (username) => {
  const query = `SELECT * FROM users WHERE username = ?`;
  return await db.get(query, [username]);
};

module.exports = { createUser, findUserByUsername };
