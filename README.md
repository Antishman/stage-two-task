# **Books Collection RESTful API**

This project is a RESTful API built with Node.js and SQLite for managing a collection of books. It allows users to perform CRUD operations, validate data, and integrates a database for persistent storage. The API is deployed on [Render](https://render.com).

---

## **Features**
- Perform CRUD operations on books:
  - **GET /books**: Fetch all books.
  - **POST /books**: Add a new book.
  - **PUT /books/:id**: Update a book by ID.
  - **DELETE /books/:id**: Delete a book by ID.
- Input validation using **Joi**.
- SQLite integration for persistent storage.
- Custom endpoints:
  - **GET /books/recommendations**: Suggest a random book.
  - **POST /books/favorite**: Mark a book as favorite.

---

## **Technologies Used**
- **Node.js**: Backend runtime.
- **Express.js**: Web framework.
- **SQLite**: Database for data persistence.
- **Joi**: Data validation library.
- **Nodemon**: Development utility for live reload.
- **Render**: Cloud platform for deployment.

---

## **Setup Instructions**

### Prerequisites
1. [Node.js](https://nodejs.org/) installed (v16 or newer recommended).
2. [SQLite3](https://sqlite.org/index.html) installed (if using locally).
3. [Postman](https://www.postman.com/) or any REST client for testing API endpoints.

---

### Local Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Antishman/stage-two-task.git
   cd stage-two-task
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up the Database**:
   Ensure the SQLite database file (`db/books.db`) exists. Create it manually if needed:
   ```bash
   mkdir db
   touch db/books.db
   ```

4. **Run the Server**:
   - Start the server normally:
     ```bash
     npm start
     ```
   - Start the server in development mode (with live reload):
     ```bash
     npm run dev
     ```

5. **Access the API**:
   Open your browser or API testing tool (e.g., Postman) and navigate to:
   ```
   http://localhost:3000
   ```

---

### Deployment on Render
1. **Push Code to GitHub**:
   ```bash
   git push origin main
   ```

2. **Deploy on Render**:
   - Create a new Web Service in your Render dashboard.
   - Connect your GitHub repository.
   - Add the following **postinstall** script in `package.json` to rebuild `sqlite3`:
     ```json
     "postinstall": "npm rebuild sqlite3"
     ```

3. **Access Deployed API**:
   Render will provide a public URL for the API, e.g., `https://stage-two-task.onrender.com`.

---

## **API Endpoints**

### **Books Management**
| Method | Endpoint                  | Description                      |
|--------|---------------------------|----------------------------------|
| GET    | `/books`                  | Fetch all books.                |
| POST   | `/books`                  | Add a new book.                 |
| PUT    | `/books/:id`              | Update a book by ID.            |
| DELETE | `/books/:id`              | Delete a book by ID.            |

### **Custom Endpoints**
| Method | Endpoint                  | Description                      |
|--------|---------------------------|----------------------------------|
| GET    | `/books/recommendations`  | Suggest a random book.          |
| POST   | `/books/favorite`         | Mark a book as favorite.        |

---

## **Data Validation**
All requests are validated using **Joi**. Validation rules:

| Field            | Requirement                        |
|-------------------|------------------------------------|
| `title`          | Required, string.                 |
| `author`         | Required, string.                 |
| `isbn`           | Required, string, 13 characters.  |
| `published_year` | Required, integer, 4 digits.      |

---

## **Testing with Postman**
1. Import the API into Postman by creating a new collection.
2. Test each endpoint using appropriate HTTP methods and request bodies.
3. Example:
   - **POST /books**:
     ```json
     {
         "title": "Sample Book",
         "author": "Sample Author",
         "isbn": "1234567890123",
         "published_year": 2024
     }
     ```

---

## **Project Structure**
```
.
├── db
│   └── books.db                # SQLite database file
├── routes
│   └── books.js                # API route definitions
├── server.js                   # Main server file
├── package.json                # Node.js configuration
└── README.md                   # Project documentation
```

---

## **Known Issues**
1. **SQLite on Render**:
   SQLite databases on Render are ephemeral. Use Render's **persistent disk** or switch to PostgreSQL for production.

2. **Validation Errors**:
   Ensure request bodies follow the validation schema to avoid `400 Bad Request` errors.

---

## **Future Improvements**
- Add user authentication for secure book management.
- Integrate a frontend for easier interaction.
- Switch to PostgreSQL for better scalability.

---

## **License**
This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

Feel free to modify this template as needed! Let me know if you need additional sections.