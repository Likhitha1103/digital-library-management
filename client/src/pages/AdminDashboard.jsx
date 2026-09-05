import React, { useState, useEffect } from 'react';
import { ShieldAlert, Plus, Trash2, Edit3, BookOpen, Users, Bookmark, CheckCircle, X, Search, Sparkles, PieChart } from 'lucide-react';
import { fetchAdminStats, fetchAdminUsers, createBook, updateBook, deleteBook, updateUserRole } from '../services/api';
import { StatCard } from '../components/StatCard';
import { useToast } from '../components/Toast';

export function AdminDashboard({ books, onRefreshBooks }) {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('books'); // 'books', 'users', 'analytics'
  const [showAddModal, setShowAddModal] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const { addToast } = useToast();

  // New Book Form State
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: 'Technology',
    isbn: '',
    publishYear: 2024,
    totalCopies: 5,
    description: '',
    chapter1Title: 'Chapter 1: Foundations',
    chapter1Content: ''
  });

  const loadAdminData = () => {
    fetchAdminStats().then(setStats).catch(() => setStats(null));
    fetchAdminUsers().then(setUsers).catch(() => setUsers([]));
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author) {
      addToast('Please enter book title and author', 'error');
      return;
    }

    try {
      await createBook({
        ...newBook,
        chapters: [
          {
            title: newBook.chapter1Title || 'Chapter 1: Overview',
            content: newBook.chapter1Content || `Welcome to ${newBook.title}. This volume has been added to the Digital Scrolls Archive.`
          }
        ]
      });

      addToast('New book successfully cataloged!');
      setShowAddModal(false);
      onRefreshBooks();
      loadAdminData();
      setNewBook({
        title: '',
        author: '',
        genre: 'Technology',
        isbn: '',
        publishYear: 2024,
        totalCopies: 5,
        description: '',
        chapter1Title: 'Chapter 1: Foundations',
        chapter1Content: ''
      });
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book from the catalog?')) return;
    try {
      await deleteBook(id);
      addToast('Book removed from catalog');
      onRefreshBooks();
      loadAdminData();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleToggleRole = async (userId, currentRole) => {
    const nextRole = currentRole === 'Student' ? 'Teacher' : currentRole === 'Teacher' ? 'Admin' : 'Student';
    try {
      await updateUserRole(userId, nextRole);
      addToast(`User role updated to ${nextRole}`);
      loadAdminData();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.role.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-fade-in">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0 shadow-lg">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Librarian Control Hub</h1>
            <p className="text-xs text-purple-300 font-medium mt-0.5">Manage digital inventory, catalog new manuscripts, and update member permissions</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 hover:scale-105 transition-all flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Catalog New Volume</span>
        </button>
      </div>

      {/* Admin KPI Ribbon */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Volumes" value={stats.totalBooks} subtitle={`${stats.totalCopies} physical/digital copies`} icon={BookOpen} color="indigo" />
          <StatCard title="Available Stock" value={stats.availableCopies} subtitle="Ready to borrow" icon={CheckCircle} color="emerald" />
          <StatCard title="Active Loans" value={stats.activeLoans} subtitle={`${stats.overdueLoans} overdue`} icon={Bookmark} color="amber" />
          <StatCard title="Registered Members" value={stats.totalUsers} subtitle="Students, teachers, admins" icon={Users} color="purple" />
        </div>
      )}

      {/* Admin Navigation Tabs */}
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('books')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'books' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Manage Books ({books.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'users' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Manage Members ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'analytics' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <PieChart className="w-4 h-4" />
          <span>Category Distribution</span>
        </button>
      </div>

      {/* Tab Content: Manage Books */}
      {activeTab === 'books' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Book Details</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Stock (Avail / Total)</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs font-medium">
                {books.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white text-sm line-clamp-1">{b.title}</div>
                      <div className="text-slate-400 text-[11px]">By {b.author} • ISBN: {b.isbn}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold">
                        {b.genre}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      <strong className="text-emerald-400">{b.availableCopies}</strong> / {b.totalCopies} copies
                    </td>
                    <td className="py-3 px-4 text-amber-400 font-bold">★ {b.rating}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="p-2 rounded-xl bg-red-950/40 text-red-400 hover:bg-red-900/60 border border-red-500/30 transition-all"
                        title="Delete book"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Manage Users */}
      {activeTab === 'users' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search member by name or email..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Member Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4 text-right">Toggle Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs font-medium">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 flex items-center space-x-3">
                      <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                      <span className="font-bold text-white">{u.name}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{u.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        u.role === 'Admin' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : u.role === 'Teacher' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleToggleRole(u.id, u.role)}
                        className="px-3 py-1 rounded-lg bg-slate-800 text-indigo-300 text-xs font-semibold border border-indigo-500/30 hover:bg-indigo-600/20 transition-all"
                      >
                        Promote / Change Role
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Category Distribution Analytics */}
      {activeTab === 'analytics' && stats && stats.genres && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <h2 className="text-lg font-bold text-white">Genre Breakdown & Library Distribution</h2>
          <div className="space-y-4">
            {Object.entries(stats.genres).map(([genre, count]) => {
              const pct = Math.round((count / books.length) * 100);
              return (
                <div key={genre} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-200">{genre}</span>
                    <span className="text-indigo-400">{count} Volumes ({pct}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Book Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <span>Catalog New Volume</span>
              </h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddBook} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Book Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Advanced Quantum Computing"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Author Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Arthur Pendelton"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Genre / Category</label>
                  <select
                    value={newBook.genre}
                    onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Biography">Biography</option>
                    <option value="Science">Science</option>
                    <option value="Philosophy">Philosophy</option>
                    <option value="Classic Literature">Classic Literature</option>
                    <option value="Fantasy & Sci-Fi">Fantasy & Sci-Fi</option>
                    <option value="Design & Architecture">Design & Architecture</option>
                    <option value="History">History</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Publish Year</label>
                  <input
                    type="number"
                    value={newBook.publishYear}
                    onChange={(e) => setNewBook({ ...newBook, publishYear: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Total Copies</label>
                  <input
                    type="number"
                    min={1}
                    value={newBook.totalCopies}
                    onChange={(e) => setNewBook({ ...newBook, totalCopies: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Synopsis & Book Summary</label>
                <textarea
                  rows={3}
                  placeholder="Detailed summary of the manuscript..."
                  value={newBook.description}
                  onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-2 border-t border-slate-800 pt-3">
                <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Chapter 1 Reader Content</label>
                <input
                  type="text"
                  placeholder="Chapter 1 Title (e.g. Chapter 1: Introduction)"
                  value={newBook.chapter1Title}
                  onChange={(e) => setNewBook({ ...newBook, chapter1Title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <textarea
                  rows={4}
                  placeholder="Write the readable text for Chapter 1..."
                  value={newBook.chapter1Content}
                  onChange={(e) => setNewBook({ ...newBook, chapter1Content: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500 font-serif"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30"
                >
                  Save & Catalog Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
