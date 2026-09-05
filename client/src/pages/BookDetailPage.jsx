import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, BookOpen, Bookmark, Heart, Clock, ShieldCheck, MessageSquare, Send } from 'lucide-react';
import { fetchReviews, addReview } from '../services/api';
import { useToast } from '../components/Toast';

export function BookDetailPage({ book, onBack, isFavorite, onToggleFavorite, onReadBook, onBorrowBook, currentUser }) {
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (book) {
      fetchReviews(book.id)
        .then(setReviews)
        .catch(() => setReviews([]));
    }
  }, [book]);

  if (!book) return null;

  const isAvailable = book.availableCopies > 0;

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!currentUser) {
      addToast('Please sign in to submit a review', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await addReview({
        bookId: book.id,
        userId: currentUser.id,
        userName: currentUser.name,
        rating: newRating,
        comment: newComment
      });

      setReviews(prev => [res.review, ...prev]);
      book.rating = res.newRating;
      setNewComment('');
      addToast('Review submitted successfully!');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in max-w-6xl mx-auto">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-xl glass-panel border border-slate-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Catalog</span>
      </button>

      {/* Book Primary Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 relative overflow-hidden flex flex-col md:flex-row gap-8">
        
        {/* Cover Art Box with Image */}
        <div className={`w-full md:w-72 h-96 rounded-2xl bg-gradient-to-br ${book.coverGradient} p-6 flex flex-col justify-between shadow-2xl shrink-0 relative overflow-hidden group`}>
          {book.coverImage && (
            <img
              src={book.coverImage}
              alt={book.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 mix-blend-overlay"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          <div className="flex items-center justify-between z-10">
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 uppercase tracking-wider">
              {book.genre}
            </span>
            <button
              onClick={() => onToggleFavorite(book.id)}
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                isFavorite ? 'bg-rose-500 text-white' : 'bg-black/40 text-white/80 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
          </div>

          <div className="text-center py-6 z-10">
            <BookOpen className="w-16 h-16 text-white mx-auto mb-3 drop-shadow-lg" />
            <h3 className="text-lg font-extrabold text-white drop-shadow-lg line-clamp-3">
              {book.title}
            </h3>
          </div>

          <div className="flex items-center justify-between text-xs text-white/90 pt-3 border-t border-white/20 z-10">
            <span className="font-semibold">ISBN: {book.isbn.slice(0, 10)}...</span>
            <span className="font-bold text-amber-300">★ {book.rating}</span>
          </div>
        </div>

        {/* Details & Actions Column */}
        <div className="flex-1 space-y-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-3 flex-wrap gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {book.genre}
              </span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                isAvailable ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}>
                {isAvailable ? `${book.availableCopies} Copies Available` : 'Currently Out of Stock'}
              </span>
              <span className="text-xs text-slate-400 font-medium">Published: {book.publishYear}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              {book.title}
            </h1>
            
            <p className="text-base text-indigo-300 font-medium">
              By <span className="text-white font-semibold">{book.author}</span>
            </p>

            <p className="text-sm text-slate-300 leading-relaxed pt-2">
              {book.description}
            </p>

            {/* Topics Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {book.topics && book.topics.map(topic => (
                <span key={topic} className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
                  #{topic}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-center">
            <div>
              <div className="text-xs text-slate-400">Rating</div>
              <div className="text-lg font-bold text-amber-400 flex items-center justify-center space-x-1">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{book.rating} / 5</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Page Count</div>
              <div className="text-lg font-bold text-white">{book.pageCount || 350} p.</div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Total Stock</div>
              <div className="text-lg font-bold text-indigo-300">{book.totalCopies} copies</div>
            </div>
          </div>

          {/* Main Action Buttons */}
          <div className="flex items-center space-x-4 pt-2">
            <button
              onClick={() => onReadBook(book)}
              className="flex-1 py-3.5 rounded-2xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-sm font-bold transition-all flex items-center justify-center space-x-2 shadow-lg"
            >
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <span>Read Digital Edition</span>
            </button>

            <button
              disabled={!isAvailable}
              onClick={() => onBorrowBook(book.id)}
              className={`flex-1 py-3.5 rounded-2xl text-sm font-bold transition-all flex items-center justify-center space-x-2 shadow-xl ${
                isAvailable 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/30 hover:scale-[1.02]' 
                  : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
              }`}
            >
              <Bookmark className="w-5 h-5" />
              <span>{isAvailable ? 'Borrow Volume (14 Days)' : 'Out of Stock'}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Chapters Preview Teaser */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <span>Included Chapters & Contents</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {book.chapters && book.chapters.map((ch, idx) => (
            <div key={idx} className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-semibold text-indigo-300">{ch.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-3">{ch.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews & Community Comments Section */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            <span>Reader Reviews ({reviews.length})</span>
          </h3>
          <span className="text-xs text-slate-400">Share your academic notes with peers</span>
        </div>

        {/* Add Review Form */}
        <form onSubmit={handleReviewSubmit} className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Your Rating:</span>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewRating(star)}
                  className="p-1 transition-transform hover:scale-125"
                >
                  <Star className={`w-4 h-4 ${star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                </button>
              ))}
            </div>
          </div>

          <textarea
            placeholder="Write your review or reflections on this book..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all flex items-center space-x-1.5 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Review</span>
            </button>
          </div>
        </form>

        {/* Existing Reviews List */}
        <div className="space-y-4 pt-2">
          {reviews.length > 0 ? (
            reviews.map((rev) => (
              <div key={rev.id} className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-600/30 text-indigo-300 text-xs font-bold flex items-center justify-center border border-indigo-500/30">
                      {rev.userName ? rev.userName[0].toUpperCase() : 'U'}
                    </div>
                    <span className="text-xs font-bold text-white">{rev.userName}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <span className="flex items-center text-amber-400 font-semibold">
                      ★ {rev.rating}
                    </span>
                    <span>• {rev.date}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-9">{rev.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500 text-center py-4">No reviews submitted yet. Be the first to review this book!</p>
          )}
        </div>
      </div>

    </div>
  );
}
