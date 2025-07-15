# Library Management System - Backend

A full-stack Library Management System built with Node.js, Express, MongoDB, and JWT authentication.

## Features

- 🔐 **Authentication**: User registration, login, JWT tokens, role-based access
- 📚 **Book Management**: CRUD operations, search, filter, admin controls
- 👤 **User Management**: Admin can manage users, view profiles
- 🔄 **Book Issue/Return**: Request, approve, return, track fines
- 📊 **Reports**: Issued books, overdue, transaction history

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library_management
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=24h
```

### 3. Start MongoDB
Make sure MongoDB is running on your system. You can use MongoDB Compass for GUI.

### 4. Run the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (Protected)

### Books (Public)
- `GET /api/books` - Get all books (with search/filter)
- `GET /api/books/:id` - Get single book

### Books (Admin Only)
- `POST /api/books` - Add new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/profile/:id` - Get user profile with issued books

### Book Issues
- `POST /api/borrow/request` - Request to borrow book (User)
- `GET /api/borrow/my-books` - Get user's borrowed books (User)
- `GET /api/borrow` - Get all book issues (Admin)
- `GET /api/borrow/overdue` - Get overdue books (Admin)
- `PUT /api/borrow/approve/:id` - Approve book issue (Admin)
- `PUT /api/borrow/return/:id` - Return book (Admin)

## Testing with Postman

### 1. Register Admin User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@library.com",
  "password": "password123",
  "role": "admin"
}
```

### 2. Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@library.com",
  "password": "password123"
}
```

### 3. Add Book (with JWT token)
```
POST http://localhost:5000/api/books
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0743273565",
  "description": "A story of the fabulously wealthy Jay Gatsby",
  "category": "Fiction",
  "publishedYear": 1925,
  "totalCopies": 5,
  "location": "Shelf A1"
}
```

### 4. Get All Books
```
GET http://localhost:5000/api/books
```

## Database Schema

### User
- name, email, password (hashed), role, createdAt

### Book
- title, author, isbn, description, category, publishedYear, totalCopies, availableCopies, location, addedBy, createdAt, updatedAt

### BookIssue
- book, user, issuedBy, issuedDate, dueDate, returnDate, returnedTo, status, fine, finePaid, notes

## Error Handling

The API returns consistent error responses:
```json
{
  "success": false,
  "error": "Error message"
}
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation
- Error handling middleware 