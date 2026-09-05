const express = require('express');
const cors = require('cors');
const { initDB, readDB, writeDB } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize database on server start
initDB();

// -------------------------------------------------------------
// AUTH ENDPOINTS
// -------------------------------------------------------------
app.post('/api/auth/login', (req, res) => {
  const { email, role } = req.body;
  const db = readDB();
  
  let user = db.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
  
  // Quick demo fallback by role if email doesn't match
  if (!user && role) {
    user = db.users.find(u => u.role.toLowerCase() === role.toLowerCase());
  }

  if (!user) {
    // Auto register demo user if not found
    user = {
      id: `user-${Date.now()}`,
      email: email || `${role || 'student'}@library.com`,
      name: email ? email.split('@')[0].toUpperCase() : 'Library Member',
      role: role || 'Student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      memberSince: new Date().toISOString().split('T')[0],
      department: 'General Library'
    };
    db.users.push(user);
    writeDB(db);
  }

  return res.json({ success: true, user });
});

app.post('/api/auth/signup', (req, res) => {
  const { name, email, role, department } = req.body;
  const db = readDB();

  const existing = db.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }

  const newUser = {
    id: `user-${Date.now()}`,
    email,
    name,
    role: role || 'Student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    memberSince: new Date().toISOString().split('T')[0],
    department: department || 'General'
  };

  db.users.push(newUser);
  writeDB(db);
  return res.json({ success: true, user: newUser });
});

// -------------------------------------------------------------
// BOOKS ENDPOINTS
// -------------------------------------------------------------
app.get('/api/books', (req, res) => {
  const { search, genre, sort } = req.query;
  const db = readDB();
  let result = [...db.books];

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(b => 
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.genre.toLowerCase().includes(q) ||
      (b.topics && b.topics.some(t => t.toLowerCase().includes(q)))
    );
  }

  if (genre && genre !== 'All') {
    result = result.filter(b => b.genre.toLowerCase() === genre.toLowerCase());
  }

  if (sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'year') {
    result.sort((a, b) => b.publishYear - a.publishYear);
  } else if (sort === 'title') {
    result.sort((a, b) => a.title.localeCompare(b.title));
  }

  return res.json(result);
});

app.get('/api/books/:id', (req, res) => {
  const db = readDB();
  const book = db.books.find(b => b.id === req.params.id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  return res.json(book);
});

app.post('/api/books', (req, res) => {
  const db = readDB();
  const { title, author, genre, isbn, publishYear, description, totalCopies, coverGradient, chapters, pageCount } = req.body;

  const newBook = {
    id: `book-${Date.now()}`,
    title,
    author,
    genre: genre || 'Technology',
    isbn: isbn || `978-${Math.floor(100000000 + Math.random() * 900000000)}`,
    publishYear: Number(publishYear) || 2024,
    rating: 5.0,
    totalCopies: Number(totalCopies) || 5,
    availableCopies: Number(totalCopies) || 5,
    coverGradient: coverGradient || 'from-indigo-600 to-purple-900',
    description: description || 'No detailed description provided.',
    topics: [genre || 'General', 'Library Archive'],
    pageCount: Number(pageCount) || 300,
    chapters: chapters && chapters.length > 0 ? chapters : [
      {
        title: 'Chapter 1: Introduction',
        content: `Welcome to ${title}. This is the initial chapter preview generated for this newly cataloged volume in the Digital Scrolls Archive.`
      }
    ]
  };

  db.books.unshift(newBook);
  writeDB(db);
  return res.json({ success: true, book: newBook });
});

app.put('/api/books/:id', (req, res) => {
  const db = readDB();
  const idx = db.books.findIndex(b => b.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  db.books[idx] = { ...db.books[idx], ...req.body };
  writeDB(db);
  return res.json({ success: true, book: db.books[idx] });
});

app.delete('/api/books/:id', (req, res) => {
  const db = readDB();
  db.books = db.books.filter(b => b.id !== req.params.id);
  writeDB(db);
  return res.json({ success: true });
});

// -------------------------------------------------------------
// LOANS & BORROWING ENDPOINTS
// -------------------------------------------------------------
app.get('/api/loans', (req, res) => {
  const { userId } = req.query;
  const db = readDB();
  let loans = db.loans;
  if (userId) {
    loans = loans.filter(l => l.userId === userId);
  }
  return res.json(loans);
});

app.post('/api/loans/borrow', (req, res) => {
  const { userId, bookId } = req.body;
  const db = readDB();

  const book = db.books.find(b => b.id === bookId);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  if (book.availableCopies <= 0) return res.status(400).json({ error: 'No copies available to borrow' });

  // Check if already borrowed
  const existingActive = db.loans.find(l => l.userId === userId && l.bookId === bookId && (l.status === 'Active' || l.status === 'Overdue'));
  if (existingActive) {
    return res.status(400).json({ error: 'You have already borrowed this book' });
  }

  book.availableCopies -= 1;

  const today = new Date();
  const dueDate = new Date();
  dueDate.setDate(today.getDate() + 14); // 14 days loan period

  const newLoan = {
    id: `loan-${Date.now()}`,
    userId,
    bookId,
    bookTitle: book.title,
    borrowDate: today.toISOString().split('T')[0],
    dueDate: dueDate.toISOString().split('T')[0],
    status: 'Active',
    renewedCount: 0
  };

  db.loans.unshift(newLoan);
  writeDB(db);
  return res.json({ success: true, loan: newLoan, availableCopies: book.availableCopies });
});

app.post('/api/loans/return', (req, res) => {
  const { loanId } = req.body;
  const db = readDB();

  const loan = db.loans.find(l => l.id === loanId);
  if (!loan) return res.status(404).json({ error: 'Loan record not found' });

  loan.status = 'Returned';
  loan.returnDate = new Date().toISOString().split('T')[0];

  const book = db.books.find(b => b.id === loan.bookId);
  if (book && book.availableCopies < book.totalCopies) {
    book.availableCopies += 1;
  }

  writeDB(db);
  return res.json({ success: true, loan });
});

app.post('/api/loans/renew', (req, res) => {
  const { loanId } = req.body;
  const db = readDB();

  const loan = db.loans.find(l => l.id === loanId);
  if (!loan) return res.status(404).json({ error: 'Loan record not found' });

  const currentDue = new Date(loan.dueDate);
  currentDue.setDate(currentDue.getDate() + 7); // Extend 7 days
  loan.dueDate = currentDue.toISOString().split('T')[0];
  loan.status = 'Active';
  loan.renewedCount = (loan.renewedCount || 0) + 1;

  writeDB(db);
  return res.json({ success: true, loan });
});

// -------------------------------------------------------------
// FAVORITES ENDPOINTS
// -------------------------------------------------------------
app.get('/api/favorites', (req, res) => {
  const { userId } = req.query;
  const db = readDB();
  const userFavs = db.favorites.filter(f => f.userId === userId).map(f => f.bookId);
  return res.json(userFavs);
});

app.post('/api/favorites/toggle', (req, res) => {
  const { userId, bookId } = req.body;
  const db = readDB();

  const idx = db.favorites.findIndex(f => f.userId === userId && f.bookId === bookId);
  let isFavorite = false;

  if (idx !== -1) {
    db.favorites.splice(idx, 1);
    isFavorite = false;
  } else {
    db.favorites.push({ userId, bookId });
    isFavorite = true;
  }

  writeDB(db);
  return res.json({ success: true, isFavorite });
});

// -------------------------------------------------------------
// REVIEWS ENDPOINTS
// -------------------------------------------------------------
app.get('/api/reviews/:bookId', (req, res) => {
  const db = readDB();
  const reviews = db.reviews.filter(r => r.bookId === req.params.bookId);
  return res.json(reviews);
});

app.post('/api/reviews', (req, res) => {
  const { bookId, userId, userName, rating, comment } = req.body;
  const db = readDB();

  const newReview = {
    id: `rev-${Date.now()}`,
    bookId,
    userId,
    userName: userName || 'Anonymous Reader',
    rating: Number(rating) || 5,
    comment,
    date: new Date().toISOString().split('T')[0]
  };

  db.reviews.unshift(newReview);

  // Recalculate book average rating
  const bookReviews = db.reviews.filter(r => r.bookId === bookId);
  const avg = bookReviews.reduce((sum, r) => sum + r.rating, 0) / bookReviews.length;
  const book = db.books.find(b => b.id === bookId);
  if (book) {
    book.rating = Number(avg.toFixed(2));
  }

  writeDB(db);
  return res.json({ success: true, review: newReview, newRating: book ? book.rating : 5 });
});

// -------------------------------------------------------------
// ADMIN & ANALYTICS ENDPOINTS
// -------------------------------------------------------------
app.get('/api/admin/stats', (req, res) => {
  const db = readDB();
  
  const totalBooks = db.books.length;
  const totalCopies = db.books.reduce((acc, b) => acc + b.totalCopies, 0);
  const availableCopies = db.books.reduce((acc, b) => acc + b.availableCopies, 0);
  const activeLoans = db.loans.filter(l => l.status === 'Active' || l.status === 'Overdue').length;
  const overdueLoans = db.loans.filter(l => l.status === 'Overdue').length;
  const totalUsers = db.users.length;

  // Genre breakdown
  const genres = {};
  db.books.forEach(b => {
    genres[b.genre] = (genres[b.genre] || 0) + 1;
  });

  return res.json({
    totalBooks,
    totalCopies,
    availableCopies,
    activeLoans,
    overdueLoans,
    totalUsers,
    genres
  });
});

app.get('/api/admin/users', (req, res) => {
  const db = readDB();
  return res.json(db.users);
});

app.put('/api/admin/users/:id/role', (req, res) => {
  const { role } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.role = role;
  writeDB(db);
  return res.json({ success: true, user });
});

app.listen(PORT, () => {
  console.log(`Digital Library REST Server running on http://localhost:${PORT}`);
});
