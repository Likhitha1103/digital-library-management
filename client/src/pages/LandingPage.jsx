import React, { useState } from 'react';
import { Search, Sparkles, BookOpen, ArrowRight, ShieldCheck, Award, Users, Library, ChevronRight } from 'lucide-react';
import { BookCard } from '../components/BookCard';

export function LandingPage({ books, favorites, onToggleFavorite, onSelectBook, onReadBook, onBorrowBook, onNavigateBrowse, currentUser, onStartLogin }) {
  const [heroSearch, setHeroSearch] = useState('');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      onNavigateBrowse(heroSearch);
    } else {
      onNavigateBrowse('');
    }
  };

  const categories = [
    { name: 'Technology', count: '5 Books', gradient: 'from-blue-600 to-indigo-900', icon: '💻' },
    { name: 'Biography', count: '4 Books', gradient: 'from-amber-600 to-red-900', icon: '📜' },
    { name: 'Science', count: '3 Books', gradient: 'from-purple-600 to-cyan-900', icon: '🔬' },
    { name: 'Philosophy', count: '3 Books', gradient: 'from-emerald-700 to-teal-950', icon: '🏛️' },
    { name: 'Classic Literature', count: '4 Books', gradient: 'from-rose-600 to-pink-900', icon: '📚' },
    { name: 'Fantasy & Sci-Fi', count: '1 Book', gradient: 'from-blue-700 to-indigo-950', icon: '🪄' },
    { name: 'Design & Architecture', count: '1 Book', gradient: 'from-fuchsia-600 to-pink-950', icon: '🎨' },
    { name: 'History', count: '2 Books', gradient: 'from-amber-700 to-yellow-950', icon: '🏺' },
  ];

  const featuredBooks = books.slice(0, 4);

  return (
    <div className="space-y-20 animate-fade-in">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/20 rounded-full blur-[140px] -z-10 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-6 px-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-panel border border-indigo-500/30 text-indigo-300 text-xs font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>The Premier Digital Scrolls & Manuscript Repository</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Unlock the Universe of <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
              Knowledge & Discovery
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Borrow, read, and explore over 20+ authentic digital volumes across science, technology, classics, and philosophy. Fully integrated with instant chapter reader and academic tracking.
          </p>

          {/* Large Hero Search */}
          <form onSubmit={handleHeroSearch} className="max-w-2xl mx-auto relative group">
            <input
              type="text"
              placeholder="Search by title, author, category, or ISBN..."
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              className="w-full glass-panel bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-400 text-sm sm:text-base rounded-2xl pl-12 pr-32 py-4 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all shadow-2xl"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4.5" />
            <button
              type="submit"
              className="absolute right-2 top-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/30 hover:scale-105 transition-all flex items-center space-x-1.5"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Filter Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs text-slate-400 font-semibold mr-2">Popular Tags:</span>
            {['Clean Code', 'Quantum Physics', 'Steve Jobs', 'Stoicism', 'AI Transformers', '1984'].map((tag) => (
              <button
                key={tag}
                onClick={() => onNavigateBrowse(tag)}
                className="px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 hover:border-indigo-500/40 hover:text-indigo-300 transition-all"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* KPI Stats Ribbon */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 glass-panel rounded-3xl border border-slate-800">
          <div className="flex items-center space-x-4 p-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Library className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">22+</div>
              <div className="text-xs text-slate-400 font-medium">Curated Books</div>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">1,400+</div>
              <div className="text-xs text-slate-400 font-medium">Active Scholars</div>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">100%</div>
              <div className="text-xs text-slate-400 font-medium">Digital Verification</div>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">4.9 ★</div>
              <div className="text-xs text-slate-400 font-medium">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Editions Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Handpicked Recommendations</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Featured Digital Scrolls</h2>
          </div>
          <button
            onClick={() => onNavigateBrowse('')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 transition-colors"
          >
            <span>View All Volumes ({books.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isFavorite={favorites.includes(book.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectBook={onSelectBook}
              onReadBook={onReadBook}
              onBorrowBook={onBorrowBook}
              currentUser={currentUser}
            />
          ))}
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Explore by Subject</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Academic Knowledge Domains</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => onNavigateBrowse(cat.name)}
              className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-indigo-500/40 cursor-pointer group transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
                  {cat.count}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-4 group-hover:text-indigo-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1">Browse authenticated manuscripts</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Box */}
      {!currentUser && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="glass-panel bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 rounded-3xl p-8 sm:p-12 border border-indigo-500/30 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ready to Join the Digital Scrolls Archive?
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Create your reader membership account in seconds to borrow books, track your reading progress, write reviews, and receive custom academic recommendations.
            </p>

            <button
              onClick={onStartLogin}
              className="px-8 py-3.5 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 text-sm font-extrabold shadow-xl hover:scale-105 transition-all inline-flex items-center space-x-2"
            >
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>Get Started Now</span>
            </button>
          </div>
        </section>
      )}

    </div>
  );
}
