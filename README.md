# Advanced RESTful API with RBAC and Authentication

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
  - [Authentication Routes](#authentication-routes)
  - [Books Routes](#books-routes)
  - [Custom Endpoint](#custom-endpoint)
- [Testing with Postman](#testing-with-postman)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview
This project is a RESTful API for managing a book collection, extended to include authentication and role-based access control (RBAC). It allows users to perform CRUD operations on books, with restricted access based on roles (admin, user). Authentication is implemented using JSON Web Tokens (JWT), and sensitive data is securely managed with password hashing.

## Features
- **CRUD Operations on Books**:
  - Add, view, update, and delete books.
- **Authentication**:
  - User signup and login with JWT-based authentication.
- **Role-Based Access Control**:
  - Admin-specific routes.
  - User-specific restrictions and access.
- **Custom Endpoints**:
  - Recommend books based on user preferences.
- **Database Integration**:
  - Persistent storage using SQLite.
- **Data Validation**:
  - Input validation using `Joi`.

---

## Technologies Used
- **Node.js**
- **Express.js**
- **SQLite**
- **JWT (jsonwebtoken)**
- **Bcrypt.js**
- **Joi**

---

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/antishman/stage-two-task.git
   cd stage-two-task
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (see [Environment Variables](#environment-variables)).

4. Start the server:
   ```bash
   npm start
   ```
   For development with live reloading:
   ```bash
   npm run dev
   ```

---

## Environment Variables
Create a `.env` file in the root directory and configure the following:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=./database.sqlite
```

- **PORT**: Port where the server will run.
- **JWT_SECRET**: Secret key for JWT token generation.
- **DATABASE_URL**: Path to the SQLite database file.

---

## Database Setup
1. Initialize the database:
   ```bash
   npm run init-db
   ```

2. The database schema includes two tables:
   - `users`: For managing user authentication and roles.
   - `books`: For storing book details.

### Database Schema
```sql
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    isbn TEXT NOT NULL UNIQUE,
    published_year INTEGER NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id)
);
```

---

## API Documentation
### Authentication Routes
#### POST `/auth/signup`
**Description**: Register a new user.

**Request Body**:
```json
{
  "username": "string",
  "password": "string",
  "role": "string" // Either "admin" or "user"
}
```

**Response**:
- **201 Created**: User successfully registered.
- **400 Bad Request**: Missing or invalid fields.

#### POST `/auth/login`
**Description**: Authenticate a user and return a JWT.

**Request Body**:
```json
{
  "username": "string",
  "password": "string"
}
```

**Response**:
- **200 OK**: Returns JWT.
- **401 Unauthorized**: Invalid username or password.

### Books Routes
#### GET `/books`
**Description**: Fetch books accessible to the authenticated user.

**Response**:
- **200 OK**: Returns a list of books.
- **401 Unauthorized**: Missing or invalid JWT.

#### POST `/books`
**Description**: Add a new book (restricted to users).

**Request Body**:
```json
{
  "title": "string",
  "author": "string",
  "isbn": "string",
  "published_year": "integer"
}
```

**Response**:
- **201 Created**: Book successfully added.
- **400 Bad Request**: Missing or invalid fields.

#### PUT `/books/:id`
**Description**: Update a book by ID.

**Response**:
- **200 OK**: Book successfully updated.
- **404 Not Found**: Book not found.
- **401 Unauthorized**: Missing or invalid JWT.

#### DELETE `/books/:id`
**Description**: Delete a book by ID (restricted to admins).

**Response**:
- **200 OK**: Book successfully deleted.
- **404 Not Found**: Book not found.
- **401 Unauthorized**: Missing or invalid JWT.

### Custom Endpoint
#### GET `/books/recommendations`
**Description**: Suggest books based on user preferences.

**Response**:
- **200 OK**: Returns a recommended book.



## Deployment
This API is deployed on [Render](https://stage-two-task.onrender.com).

**Live URL**: [https://stage-two-task.onrender.com]

---

## Contributing
Contributions are welcome! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

