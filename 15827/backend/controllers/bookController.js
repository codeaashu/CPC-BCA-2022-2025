const Book = require('../models/Book');
const ActivityLog = require('../models/ActivityLog');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
  try {
    const { search, category, author, publishedYear, location, availableOnly } = req.query;
    let query = {};

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by category (support multiple, comma-separated)
    if (category) {
      const categories = category.split(',').map(c => c.trim());
      query.category = { $in: categories };
    }

    // Filter by author
    if (author) {
      query.author = { $regex: author, $options: 'i' };
    }

    // Filter by publishedYear
    if (publishedYear) {
      query.publishedYear = Number(publishedYear);
    }

    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Filter by availableOnly
    if (availableOnly === '1') {
      query.availableCopies = { $gt: 0 };
    }

    const books = await Book.find(query).populate('addedBy', 'name');
    // Add lowStock field for each book
    const booksWithLowStock = books.map(book => {
      const b = book.toObject();
      b.lowStock = b.availableCopies <= (b.minStock || 1);
      return b;
    });
    res.json(booksWithLowStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('addedBy', 'name');
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new book
// @route   POST /api/books
// @access  Private/Admin
const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      isbn,
      description,
      category,
      publishedYear,
      totalCopies,
      location
    } = req.body;

    const book = await Book.create({
      title,
      author,
      isbn,
      description,
      category,
      publishedYear,
      totalCopies,
      availableCopies: totalCopies,
      location,
      addedBy: req.user._id
    });
    // Log book creation
    await ActivityLog.create({
      user: req.user._id,
      action: 'create_book',
      details: `Created book: ${book.title}`
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    // Log book update
    await ActivityLog.create({
      user: req.user._id,
      action: 'update_book',
      details: `Updated book: ${updatedBook.title}`
    });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await book.remove();
    // Log book deletion
    await ActivityLog.create({
      user: req.user._id,
      action: 'delete_book',
      details: `Deleted book: ${book.title}`
    });
    res.json({ message: 'Book removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
}; 