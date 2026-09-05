import React, { useState, useEffect } from 'react';
import { ToastProvider, useToast } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ReaderModal } from './components/ReaderModal';

import { LandingPage } from './pages/LandingPage';
import { BrowsePage } from './pages/BrowsePage';
import { BookDetailPage } from './pages/BookDetailPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

import { fetchBooks, fetchFavorites, toggleFavorite, borrowBook } from './services/api';

function AppContent() {
  const [activeTab, setActiveTab] = useState('landing'); // 'landing', 'browse', 'detail', 'dashboard', 'profile', 'admin', 'login', 'signup', 'forgot'
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [readingBook, setReadingBook] = useState(null);
  const [browseSearchQuery, setBrowseSearchQuery] = useState('');
  
  // Default Demo User logged in as Student
  const [currentUser, setCurrentUser] = useState({
    id: "user-student",
    email: "student@library.com",
    name: "Alex Morgan",
    role: "Student",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    memberSince: "2024-02-10",
    department: "Computer Science"
  });

  const [favorites, setFavorites] = useState(['book-1', 'book-6', 'book-13']);
  const { addToast } = useToast();

  const loadBooksData = () => {
    fetchBooks()
      .then(setBooks)
      .catch((err) => console.error('Failed to load books:', err));
  };

  useEffect(() => {
    loadBooksData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchFavorites(currentUser.id)
        .then(setFavorites)
        .catch(() => setFavorites([]));
    } else {
      setFavorites([]);
    }
  }, [currentUser]);

  const handleToggleFavorite = async (bookId) => {
    if (!currentUser) {
      addToast('Please sign in to save favorite books', 'error');
      setActiveTab('login');
      return;
    }

    try {
      const res = await toggleFavorite(currentUser.id, bookId);
      if (res.isFavorite) {
        setFavorites(prev => [...prev, bookId]);
        addToast('Added to your favorite wishlist!');
      } else {
        setFavorites(prev => prev.filter(id => id !== bookId));
        addToast('Removed from favorites');
      }
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleBorrow = async (bookId) => {
    if (!currentUser) {
      addToast('Please sign in to borrow books', 'error');
      setActiveTab('login');
      return;
    }

    try {
      const res = await borrowBook(currentUser.id, bookId);
      addToast('Book borrowed successfully for 14 days! Check your dashboard.');
      loadBooksData();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleSelectBook = (bookId) => {
    setSelectedBookId(bookId);
    setActiveTab('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadBook = (book) => {
    setReadingBook(book);
  };

  const handleSearchSubmit = (query) => {
    setBrowseSearchQuery(query);
    setActiveTab('browse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedBook = books.find(b => b.id === selectedBookId);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100">
      <div>
        <Navbar
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSelectBook={handleSelectBook}
          onSearchSubmit={handleSearchSubmit}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          {activeTab === 'landing' && (
            <LandingPage
              books={books}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectBook={handleSelectBook}
              onReadBook={handleReadBook}
              onBorrowBook={handleBorrow}
              onNavigateBrowse={(q) => {
                setBrowseSearchQuery(q || '');
                setActiveTab('browse');
              }}
              currentUser={currentUser}
              onStartLogin={() => setActiveTab('login')}
            />
          )}

          {activeTab === 'browse' && (
            <BrowsePage
              books={books}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectBook={handleSelectBook}
              onReadBook={handleReadBook}
              onBorrowBook={handleBorrow}
              currentUser={currentUser}
              initialSearch={browseSearchQuery}
            />
          )}

          {activeTab === 'detail' && (
            <BookDetailPage
              book={selectedBook}
              onBack={() => setActiveTab('browse')}
              isFavorite={selectedBookId ? favorites.includes(selectedBookId) : false}
              onToggleFavorite={handleToggleFavorite}
              onReadBook={handleReadBook}
              onBorrowBook={handleBorrow}
              currentUser={currentUser}
            />
          )}

          {activeTab === 'dashboard' && (
            <DashboardPage
              currentUser={currentUser}
              books={books}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectBook={handleSelectBook}
              onReadBook={handleReadBook}
              onBorrowBook={handleBorrow}
              onNavigateBrowse={(q) => {
                setBrowseSearchQuery(q || '');
                setActiveTab('browse');
              }}
            />
          )}

          {activeTab === 'profile' && (
            <ProfilePage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          )}

          {activeTab === 'admin' && (
            <AdminDashboard
              books={books}
              onRefreshBooks={loadBooksData}
            />
          )}

          {activeTab === 'login' && (
            <LoginPage
              onLoginSuccess={(user) => {
                setCurrentUser(user);
                setActiveTab('dashboard');
              }}
              onNavigateSignup={() => setActiveTab('signup')}
              onNavigateForgot={() => setActiveTab('forgot')}
            />
          )}

          {activeTab === 'signup' && (
            <SignupPage
              onSignupSuccess={(user) => {
                setCurrentUser(user);
                setActiveTab('dashboard');
              }}
              onNavigateLogin={() => setActiveTab('login')}
            />
          )}

          {activeTab === 'forgot' && (
            <ForgotPasswordPage
              onNavigateLogin={() => setActiveTab('login')}
            />
          )}
        </main>
      </div>

      <Footer />

      {/* Fullscreen Interactive E-Book Reader Modal */}
      {readingBook && (
        <ReaderModal
          book={readingBook}
          onClose={() => setReadingBook(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
