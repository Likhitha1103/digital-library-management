import React from 'react';
import { Star, BookOpen, Bookmark, Heart } from 'lucide-react';

export function BookCard({ book, viewMode = 'grid', isFavorite, onToggleFavorite, onSelectBook, onReadBook, onBorrowBook, currentUser }) {
  const isAvailable = book.availableCopies > 0;

  if (viewMode === 'list') {
    return (
      <div className="glass-card rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300 hover:border-indigo-500/40">
        <div className="flex items-center space-x-4 w-full md:w-auto">
          {/* Cover Image & Gradient thumb */}
          <div 
            className={`w-20 h-28 rounded-xl bg-gradient-to-br ${book.coverGradient} flex flex-col justify-between p-2.5 shrink-0 shadow-lg relative overflow-hidden group cursor-pointer`} 
            onClick={() => onSelectBook(book.id)}
          >
            {book.coverImage && (
              <img
                src={book.coverImage}
                alt={book.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-65 mix-blend-overlay"
              />
            )}
            <div className="relative z-10 flex flex-col justify-between h-full">
              <span className="text-[9px] font-bold text-white/90 tracking-wider uppercase drop-shadow">{book.genre}</span>
              <BookOpen className="w-5 h-5 text-white/90 self-center drop-shadow" />
              <span className="text-[9px] font-bold text-amber-300 text-right drop-shadow">★ {book.rating}</span>
            </div>
          </div>

          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {book.genre}
              </span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                isAvailable ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}>
                {isAvailable ? `${book.availableCopies} available` : 'Out of Stock'}
              </span>
            </div>
            <h3 
              onClick={() => onSelectBook(book.id)} 
              className="text-base font-bold text-white hover:text-indigo-400 cursor-pointer transition-colors truncate"
            >
              {book.title}
            </h3>
            <p className="text-xs text-slate-400">By <span className="text-slate-200">{book.author}</span> • Published {book.publishYear}</p>
            <p className="text-xs text-slate-400 line-clamp-1 max-w-xl">{book.description}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 w-full md:w-auto justify-end border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
          <button
            onClick={() => onToggleFavorite(book.id)}
            className={`p-2.5 rounded-xl border transition-all ${
              isFavorite 
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' 
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-rose-400 hover:border-rose-500/30'
            }`}
            title="Add to Favorites"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
          </button>
          
          <button
            onClick={() => onReadBook(book)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 transition-all flex items-center space-x-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Read Now</span>
          </button>

          <button
            disabled={!isAvailable}
            onClick={() => onBorrowBook(book.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              isAvailable 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-600/20' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Borrow</span>
          </button>
        </div>
      </div>
    );
  }

  // Default Grid View Card with Cover Image
  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1">
      {/* Cover Image & Gradient Box */}
      <div 
        onClick={() => onSelectBook(book.id)}
        className={`h-60 bg-gradient-to-br ${book.coverGradient} p-5 flex flex-col justify-between cursor-pointer relative overflow-hidden`}
      >
        {/* Topic Cover Image Background */}
        {book.coverImage && (
          <img
            src={book.coverImage}
            alt={book.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 mix-blend-overlay"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

        <div className="flex items-center justify-between z-10">
          <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 border border-white/10 uppercase tracking-wider">
            {book.genre}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(book.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isFavorite ? 'bg-rose-500 text-white' : 'bg-black/40 text-white/80 hover:text-white hover:bg-black/60'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white' : ''}`} />
          </button>
        </div>

        <div className="z-10 text-center py-2">
          <BookOpen className="w-9 h-9 text-white mx-auto mb-2 opacity-95 group-hover:scale-110 transition-transform drop-shadow" />
          <h4 className="text-base font-extrabold text-white drop-shadow-lg line-clamp-2 px-2">
            {book.title}
          </h4>
        </div>

        <div className="flex items-center justify-between z-10 text-xs text-white/90 pt-2 border-t border-white/20">
          <span className="flex items-center space-x-1 font-bold text-amber-300 drop-shadow">
            <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>{book.rating}</span>
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            isAvailable ? 'bg-emerald-500/40 text-emerald-100 border border-emerald-500/50' : 'bg-red-500/50 text-red-100 border border-red-500/50'
          }`}>
            {isAvailable ? `${book.availableCopies} Left` : 'Borrowed'}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 
            onClick={() => onSelectBook(book.id)}
            className="text-sm font-bold text-white hover:text-indigo-400 cursor-pointer transition-colors line-clamp-1"
          >
            {book.title}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">By {book.author}</p>
          <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
            {book.description}
          </p>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between space-x-2">
          <button
            onClick={() => onReadBook(book)}
            className="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-slate-700 hover:border-indigo-500/30 transition-all flex items-center justify-center space-x-1"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Read</span>
          </button>

          <button
            disabled={!isAvailable}
            onClick={() => onBorrowBook(book.id)}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-1 ${
              isAvailable 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-600/20' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Borrow</span>
          </button>
        </div>
      </div>
    </div>
  );
}
