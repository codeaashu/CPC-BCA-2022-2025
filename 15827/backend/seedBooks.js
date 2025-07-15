const mongoose = require('mongoose');
const connectDB = require('./config/database');
const Book = require('./models/Book');
const User = require('./models/User');

async function seed() {
  await connectDB();

  // Find or create admin user
  let admin = await User.findOne({ role: 'admin' });
  if (!admin) {
    admin = await User.create({
      name: 'Admin User',
      email: 'admin@library.com',
      password: 'password123',
      role: 'admin',
    });
    console.log('Admin user created:', admin.email);
  } else {
    console.log('Admin user found:', admin.email);
  }

  // Books data
  const books = [

  {
    title: 'Introduction to Electrodynamics',
    author: 'David J. Griffiths',
    isbn: '9781108420419',
    description: 'A detailed look at electrodynamics.',
    category: 'Physics',
    publishedYear: 2017,
    totalCopies: 10,
    availableCopies: 10,
    location: 'Shelf A4',
    addedBy: admin._id,
  },
  {
    title: 'Classical Mechanics',
    author: 'Herbert Goldstein',
    isbn: '9780201657029',
    description: 'Comprehensive resource on classical mechanics.',
    category: 'Physics',
    publishedYear: 2011,
    totalCopies: 10,
    availableCopies: 10,
    location: 'Shelf A5',
    addedBy: admin._id,
  },
  {
    title: 'Quantum Mechanics',
    author: 'Claude Cohen-Tannoudji',
    isbn: '9780471569527',
    description: 'Explores the principles of quantum mechanics.',
    category: 'Physics',
    publishedYear: 2013,
    totalCopies: 10,
    availableCopies: 10,
    location: 'Shelf A6',
    addedBy: admin._id,
  },
  {
    title: 'Thermodynamics',
    author: 'Mark W. Zemansky',
    isbn: '9780070667098',
    description: 'Covers core thermodynamic principles.',
    category: 'Physics',
    publishedYear: 2010,
    totalCopies: 10,
    availableCopies: 10,
    location: 'Shelf A7',
    addedBy: admin._id,
  },
  {
    title: 'Optics',
    author: 'Eugene Hecht',
    isbn: '9780133977226',
    description: 'A detailed explanation of optics.',
    category: 'Physics',
    publishedYear: 2015,
    totalCopies: 10,
    availableCopies: 10,
    location: 'Shelf A8',
    addedBy: admin._id,
  },
  {
    title: 'Solid State Physics',
    author: 'Neil W. Ashcroft',
    isbn: '9780030839931',
    description: 'Solid-state theory and applications.',
    category: 'Physics',
    publishedYear: 2008,
    totalCopies: 10,
    availableCopies: 10,
    location: 'Shelf A9',
    addedBy: admin._id,
  },
  {
    title: 'The Feynman Lectures on Physics',
    author: 'Richard P. Feynman',
    isbn: '9780465023820',
    description: 'Iconic lectures on physics by Feynman.',
    category: 'Physics',
    publishedYear: 2010,
    totalCopies: 10,
    availableCopies: 10,
    location: 'Shelf A10',
    addedBy: admin._id,
  },
  ];

  // Remove existing books with same ISBNs to avoid duplicates
  for (const book of books) {
    await Book.deleteOne({ isbn: book.isbn });
  }

  // Insert books
  await Book.insertMany(books);
  console.log('Physics and Math books seeded!');
  mongoose.connection.close();
}

seed().catch((err) => {
  console.error('Seeding error:', err);
  mongoose.connection.close();
}); 