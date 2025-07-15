const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sample books data
const sampleBooks = [
  {
    _id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0743273565',
    category: 'Fiction',
    publishedYear: 1925,
    availableCopies: 3,
    totalCopies: 5,
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=120&h=180&fit=crop'
  },
  {
    _id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0446310789',
    category: 'Fiction',
    publishedYear: 1960,
    availableCopies: 2,
    totalCopies: 4,
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=120&h=180&fit=crop'
  },
  {
    _id: '3',
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0451524935',
    category: 'Science Fiction',
    publishedYear: 1949,
    availableCopies: 1,
    totalCopies: 3,
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=120&h=180&fit=crop'
  },
  {
    _id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '978-0141439518',
    category: 'Romance',
    publishedYear: 1813,
    availableCopies: 4,
    totalCopies: 6,
    coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=120&h=180&fit=crop'
  },
  {
    _id: '5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '978-0547928241',
    category: 'Fantasy',
    publishedYear: 1937,
    availableCopies: 2,
    totalCopies: 4,
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=120&h=180&fit=crop'
  },
  {
    _id: '6',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    isbn: '978-0316769488',
    category: 'Fiction',
    publishedYear: 1951,
    availableCopies: 0,
    totalCopies: 2,
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=120&h=180&fit=crop'
  }
];

// Mock auth middleware for testing
const mockAuth = (req, res, next) => {
  req.user = { id: 'test-user-id', name: 'Test User', email: 'test@example.com' };
  next();
};

const mockAdminAuth = (req, res, next) => {
  req.user = { id: 'test-admin-id', name: 'Admin User', email: 'admin@example.com', role: 'admin' };
  next();
};

// Books API endpoint
app.get('/api/books', (req, res) => {
  try {
    let books = [...sampleBooks];
    
    // Search functionality
    const search = req.query.search;
    if (search) {
      const searchLower = search.toLowerCase();
      books = books.filter(book => 
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower) ||
        book.isbn.includes(search)
      );
    }
    
    // Category filter
    const category = req.query.category;
    if (category) {
      const categories = category.split(',');
      books = books.filter(book => 
        categories.some(cat => book.category.toLowerCase() === cat.toLowerCase())
      );
    }
    
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Auth routes (simplified)
app.post('/api/auth/login', (req, res) => {
  res.json({ 
    token: 'test-token-123',
    user: { id: '1', name: 'Test User', email: 'test@example.com', role: 'user' }
  });
});

app.get('/api/auth/verify', mockAuth, (req, res) => {
  res.json({ user: req.user });
});

// Payment routes (simplified)
app.get('/api/payments/pending', mockAuth, (req, res) => {
  res.json({ pendingPayments: [] });
});

app.get('/api/payments/history', mockAuth, (req, res) => {
  res.json({ payments: [], pagination: { current: 1, total: 1, hasNext: false, hasPrev: false } });
});

app.get('/api/payments/all', mockAdminAuth, (req, res) => {
  res.json({ payments: [], pagination: { current: 1, total: 1, hasNext: false, hasPrev: false } });
});

// Feedback endpoint
app.post('/api/feedback', (req, res) => {
  try {
    const { feedback, name, email, type } = req.body;
    console.log('Feedback received:', { feedback, name, email, type });
    res.json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback' });
  }
});

// Borrow request endpoint
app.post('/api/borrow/request', mockAuth, (req, res) => {
  try {
    const { bookId } = req.body;
    console.log('Book request received for:', bookId);
    res.json({ message: 'Book request submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting book request' });
  }
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Library Management System API - Test Version' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log(`Books API available at: http://localhost:${PORT}/api/books`);
  console.log(`Payment API available at: http://localhost:${PORT}/api/payments`);
}); 