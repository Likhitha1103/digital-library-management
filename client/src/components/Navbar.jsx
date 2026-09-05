import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Search, User, LogOut, ShieldAlert, BookMarked, LayoutDashboard, Compass, Sparkles, ChevronDown } from 'lucide-react';
import { fetchBooks } from '../services/api';

export function Navbar({ currentUser, setCurrentUser, activeTab, setActiveTab, onSelectBook, onSearchSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      fetchBooks({ search: searchQuery })
        .then(data => {
          setSuggestions(data.slice(0, 5));
          setShowDropdown(true);
        })
        .catch(() => setSuggestions([]));
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchForm = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery);
      setShowDropdown(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('landing');
    setUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('landing')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-300">
                Digital Scrolls
              </span>
              <span className="block text-xs font-semibold text-indigo-400 tracking-wider uppercase">
                Library Management
              </span>
            </div>
          </div>

          {/* Realtime Autocomplete Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative" ref={searchRef}>
            <form onSubmit={handleSearchForm} className="w-full relative">
              <input
                type="text"
                placeholder="Search by title, author, or genre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length > 1 && setShowDropdown(true)}
                className="w-full bg-slate-900/90 border border-slate-700/80 text-slate-100 placeholder-slate-400 text-sm rounded-full pl-11 pr-4 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            </form>

            {/* Instant Search Suggestions Dropdown */}
            {showDropdown && suggestions.length > 0 && (
              <div className="absolute top-12 left-0 right-0 glass-panel bg-slate-900/95 rounded-2xl shadow-2xl border border-slate-700/80 overflow-hidden z-50 animate-fade-in">
                <div className="p-2 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider px-3">
                  Matching Books
                </div>
                <div className="divide-y divide-slate-800/50">
                  {suggestions.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => {
                        onSelectBook(b.id);
                        setShowDropdown(false);
                        setSearchQuery('');
                      }}
                      className="p-3 hover:bg-indigo-600/10 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div>
                        <div className="text-sm font-medium text-white">{b.title}</div>
                        <div className="text-xs text-slate-400">{b.author} • <span className="text-indigo-400">{b.genre}</span></div>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300">
                        ★ {b.rating}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1 sm:space-x-3">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center space-x-1.5 ${
                activeTab === 'browse'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span className="hidden sm:inline">Browse</span>
            </button>

            {currentUser && (
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center space-x-1.5 ${
                  activeTab === 'dashboard'
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
            )}

            {currentUser && currentUser.role === 'Admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center space-x-1.5 ${
                  activeTab === 'admin'
                    ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                    : 'text-purple-300 hover:text-white hover:bg-purple-900/30'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span className="hidden sm:inline">Admin Hub</span>
              </button>
            )}

            {/* Profile Dropdown or Auth Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-slate-800 border border-slate-700/60 transition-all ml-2"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/50"
                  />
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hidden md:inline">
                    {currentUser.role}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-12 w-56 glass-panel bg-slate-900/95 rounded-2xl shadow-2xl border border-slate-700/80 p-2 z-50 animate-fade-in">
                    <div className="px-3 py-2 border-b border-slate-800">
                      <p className="text-sm font-semibold text-white truncate">{currentUser.name}</p>
                      <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-slate-800/80 hover:text-white flex items-center space-x-2 mt-1"
                    >
                      <User className="w-4 h-4 text-indigo-400" />
                      <span>My Profile & ID</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-950/40 hover:text-red-300 flex items-center space-x-2 mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('login')}
                className="ml-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30 hover:scale-105 transition-all flex items-center space-x-1.5"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
