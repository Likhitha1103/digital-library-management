import React, { useState, useMemo } from 'react';
import { Search, Filter, LayoutGrid, List, SlidersHorizontal, Sparkles, BookX } from 'lucide-react';
import { BookCard } from '../components/BookCard';

export function BrowsePage({ books, favorites, onToggleFavorite, onSelectBook, onReadBook, onBorrowBook, currentUser, initialSearch = '' }) {
  const [search, setSearch] = useState(initialSearch);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'year', 'title'
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list'

  const genres = ['All', 'Technology', 'Biography', 'Science', 'Philosophy', 'Classic Literature', 'Fantasy & Sci-Fi', 'Design & Architecture', 'History'];

  const filteredBooks = useMemo(() => {
    let result = [...books];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q) ||
        (b.topics && b.topics.some(t => t.toLowerCase().includes(q)))
      );
    }

    if (selectedGenre !== 'All') {
      result = result.filter(b => b.genre.toLowerCase() === selectedGenre.toLowerCase());
    }

    if (onlyAvailable) {
      result = result.filter(b => b.availableCopies > 0);
    }

    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'year') {
      result.sort((a, b) => b.publishYear - a.publishYear);
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [books, search, selectedGenre, sortBy, onlyAvailable]);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Page Title & Search Header */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Digital Archive Search</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Browse Library Catalog</h1>
        </div>

        {/* Filters & Control Toolbar */}
        <div className="glass-panel p-4 rounded-2xl space-y-4 border border-slate-800">
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search catalog by title, author..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 text-white placeholder-slate-400 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>

            {/* Sort & Availability Selectors */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              
              <label className="flex items-center space-x-2 text-xs font-medium text-slate-300 bg-slate-900/60 px-3 py-2 rounded-xl border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyAvailable}
                  onChange={(e) => setOnlyAvailable(e.target.checked)}
                  className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Available Copies Only</span>
              </label>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
              >
                <option value="rating">Sort by Rating (Highest)</option>
                <option value="year">Sort by Publish Year (Newest)</option>
                <option value="title">Sort by Title (A-Z)</option>
              </select>

              {/* Grid vs List View Toggle */}
              <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-800">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'grid' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'list' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* Genre Category Pills Scrollbar */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-2 no-scrollbar">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedGenre === g
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Catalog Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Showing <strong className="text-white">{filteredBooks.length}</strong> volumes found</span>
        {selectedGenre !== 'All' && <span>Category: <strong className="text-indigo-400">{selectedGenre}</strong></span>}
      </div>

      {/* Book Grid / List Output */}
      {filteredBooks.length > 0 ? (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6' : 'space-y-4'}>
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              viewMode={viewMode}
              isFavorite={favorites.includes(book.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectBook={onSelectBook}
              onReadBook={onReadBook}
              onBorrowBook={onBorrowBook}
              currentUser={currentUser}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 text-center rounded-3xl space-y-4 border border-slate-800 my-8">
          <BookX className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-xl font-bold text-white">No Digital Volumes Found</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            No matching books found for "{search}" under {selectedGenre}. Try adjusting your search keywords or clearing filter preferences.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedGenre('All');
              setOnlyAvailable(false);
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 text-indigo-400 hover:bg-indigo-600/20 text-xs font-semibold border border-indigo-500/30 transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
