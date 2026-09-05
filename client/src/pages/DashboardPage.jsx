import React, { useState, useEffect } from 'react';
import { LayoutDashboard, BookOpen, Clock, AlertTriangle, RotateCcw, CheckCircle, Heart, Bookmark, ArrowRight, ShieldAlert } from 'lucide-react';
import { fetchLoans, returnBook, renewLoan } from '../services/api';
import { StatCard } from '../components/StatCard';
import { BookCard } from '../components/BookCard';
import { useToast } from '../components/Toast';

export function DashboardPage({ currentUser, books, favorites, onToggleFavorite, onSelectBook, onReadBook, onBorrowBook, onNavigateBrowse }) {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const loadUserLoans = () => {
    if (!currentUser) return;
    setLoading(true);
    fetchLoans(currentUser.id)
      .then(setLoans)
      .catch(() => setLoans([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUserLoans();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="glass-panel p-12 text-center rounded-3xl space-y-4 max-w-lg mx-auto my-12 border border-slate-800">
        <ShieldAlert className="w-12 h-12 text-indigo-400 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Authentication Required</h2>
        <p className="text-sm text-slate-400">Please sign in to access your personal digital library dashboard, active borrowings, and saved reading lists.</p>
      </div>
    );
  }

  const activeLoans = loans.filter(l => l.status === 'Active' || l.status === 'Overdue');
  const overdueLoans = loans.filter(l => l.status === 'Overdue');
  const totalFines = overdueLoans.reduce((sum, l) => sum + (l.fineAmount || 4.50), 0);

  const favoriteBooksList = books.filter(b => favorites.includes(b.id));

  const handleReturn = async (loanId) => {
    try {
      await returnBook(loanId);
      addToast('Book returned successfully!');
      loadUserLoans();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleRenew = async (loanId) => {
    try {
      await renewLoan(loanId);
      addToast('Loan extended by +7 days!');
      loadUserLoans();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      
      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-indigo-500/30 shadow-lg shrink-0"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Welcome back, {currentUser.name}!</h1>
            </div>
            <p className="text-xs text-indigo-300 font-semibold mt-1">
              Member Role: <span className="text-white px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30">{currentUser.role}</span> • Department: {currentUser.department || 'General Library'}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateBrowse('')}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 hover:scale-105 transition-all flex items-center space-x-2 shrink-0"
        >
          <BookOpen className="w-4 h-4" />
          <span>Explore More Books</span>
        </button>
      </div>

      {/* KPI Cards Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Loans" value={activeLoans.length} subtitle="Currently borrowed" icon={Bookmark} color="indigo" />
        <StatCard title="Overdue Items" value={overdueLoans.length} subtitle={`$${totalFines.toFixed(2)} total fine`} icon={AlertTriangle} color={overdueLoans.length > 0 ? 'rose' : 'emerald'} />
        <StatCard title="Saved Favorites" value={favorites.length} subtitle="Personal wishlist" icon={Heart} color="purple" />
        <StatCard title="Books Returned" value={loans.filter(l => l.status === 'Returned').length} subtitle="Completed readings" icon={CheckCircle} color="emerald" />
      </div>

      {/* Active Borrowings Table Section */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Clock className="w-5 h-5 text-indigo-400" />
              <span>Active Book Borrowings ({activeLoans.length})</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">Manage active loans, extend due dates, or submit returns</p>
          </div>
        </div>

        {activeLoans.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Book Title</th>
                  <th className="py-3 px-4">Borrow Date</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs font-medium">
                {activeLoans.map((loan) => {
                  const targetBook = books.find(b => b.id === loan.bookId);
                  const isOverdue = loan.status === 'Overdue';
                  return (
                    <tr key={loan.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-10 rounded-lg bg-gradient-to-br ${targetBook ? targetBook.coverGradient : 'from-indigo-600 to-purple-800'} flex items-center justify-center text-white shrink-0`}>
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div>
                            <div 
                              onClick={() => onSelectBook(loan.bookId)}
                              className="font-bold text-white hover:text-indigo-400 cursor-pointer text-sm line-clamp-1"
                            >
                              {loan.bookTitle}
                            </div>
                            <div className="text-[11px] text-slate-400">{targetBook ? targetBook.author : 'Library Book'}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-slate-300">{loan.borrowDate}</td>
                      <td className="py-4 px-4 text-slate-300 font-semibold">{loan.dueDate}</td>

                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          isOverdue ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {isOverdue ? `Overdue ($${(loan.fineAmount || 4.50).toFixed(2)})` : 'Active'}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          {targetBook && (
                            <button
                              onClick={() => onReadBook(targetBook)}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30 transition-all flex items-center space-x-1"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Read</span>
                            </button>
                          )}

                          <button
                            onClick={() => handleRenew(loan.id)}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all flex items-center space-x-1"
                            title="Renew for 7 extra days"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Renew</span>
                          </button>

                          <button
                            onClick={() => handleReturn(loan.id)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition-all flex items-center space-x-1"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Return</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">You currently have no active book loans</p>
            <p className="text-xs text-slate-400">Browse the catalog to borrow digital scrolls for up to 14 days.</p>
          </div>
        )}
      </div>

      {/* Favorites Wishlist Shelf */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <span>Saved Favorites ({favoriteBooksList.length})</span>
          </h2>
        </div>

        {favoriteBooksList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoriteBooksList.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
                onSelectBook={onSelectBook}
                onReadBook={onReadBook}
                onBorrowBook={onBorrowBook}
                currentUser={currentUser}
              />
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 text-center py-6">No books saved to favorites yet. Click the heart icon on any book card to add it here!</p>
        )}
      </div>

    </div>
  );
}
