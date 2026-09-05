import React, { useState, useEffect } from 'react';
import { X, BookOpen, Sun, Moon, Coffee, ChevronLeft, ChevronRight, BookmarkCheck, List, Clock, FileText } from 'lucide-react';

export function ReaderModal({ book, onClose }) {
  const [selectedChapterIdx, setSelectedChapterIdx] = useState(0);
  const [theme, setTheme] = useState('dark'); // 'dark', 'sepia', 'light'
  const [fontSize, setFontSize] = useState('text-base'); // 'text-sm', 'text-base', 'text-lg', 'text-xl'
  const [bookmarked, setBookmarked] = useState(false);

  if (!book) return null;

  const chapters = book.chapters && book.chapters.length > 0 ? book.chapters : [
    {
      title: 'Chapter 1: Overview & Insights',
      content: `Welcome to the digital edition of "${book.title}" by ${book.author}.\n\nCategory: ${book.genre}\nPublished: ${book.publishYear}\nISBN: ${book.isbn}\n\n${book.description}`
    }
  ];

  const currentChapter = chapters[selectedChapterIdx] || chapters[0];

  const wordCount = currentChapter.content.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.ceil(wordCount / 200); // Average 200 wpm

  const getThemeClass = () => {
    switch (theme) {
      case 'light': return 'bg-white text-slate-900 border-slate-200';
      case 'sepia': return 'bg-[#fbf0d9] text-[#4a3b2c] border-[#e2d5bd]';
      case 'dark': default: return 'bg-slate-950 text-slate-100 border-slate-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className={`w-full max-w-5xl h-[94vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-colors duration-300 ${getThemeClass()}`}>
        
        {/* Top Reader Toolbar */}
        <div className={`px-4 sm:px-6 py-4 border-b flex items-center justify-between shrink-0 ${
          theme === 'light' ? 'bg-slate-50 border-slate-200' : theme === 'sepia' ? 'bg-[#f4e6c9] border-[#e2d5bd]' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center space-x-3 truncate pr-4">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${book.coverGradient} flex items-center justify-center text-white shrink-0 shadow-md`}>
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="truncate">
              <h3 className="text-sm font-bold truncate">{book.title}</h3>
              <p className="text-xs opacity-75 truncate">By {book.author} • <span className="font-semibold text-indigo-400">{book.genre}</span></p>
            </div>
          </div>

          {/* Reader Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Reading Stats Badge */}
            <div className="hidden lg:flex items-center space-x-3 px-3 py-1.5 rounded-xl bg-black/10 text-xs opacity-80 font-medium">
              <span className="flex items-center space-x-1">
                <FileText className="w-3.5 h-3.5" />
                <span>{wordCount.toLocaleString()} words</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>~{readingTime} min read</span>
              </span>
            </div>

            {/* Theme Toggle Buttons */}
            <div className="flex items-center bg-black/10 rounded-xl p-1 space-x-1">
              <button
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded-lg transition-all ${theme === 'light' ? 'bg-white shadow text-slate-900' : 'opacity-60 hover:opacity-100'}`}
                title="Light Theme"
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme('sepia')}
                className={`p-1.5 rounded-lg transition-all ${theme === 'sepia' ? 'bg-[#e8d7b8] text-[#4a3b2c] shadow' : 'opacity-60 hover:opacity-100'}`}
                title="Sepia Reader"
              >
                <Coffee className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-lg transition-all ${theme === 'dark' ? 'bg-slate-800 text-white shadow' : 'opacity-60 hover:opacity-100'}`}
                title="Dark Mode"
              >
                <Moon className="w-4 h-4" />
              </button>
            </div>

            {/* Font Size Controls */}
            <div className="hidden sm:flex items-center bg-black/10 rounded-xl p-1 space-x-1">
              <button
                onClick={() => setFontSize('text-sm')}
                className={`px-2 py-1 text-xs font-bold rounded-lg ${fontSize === 'text-sm' ? 'bg-indigo-600 text-white' : 'opacity-70'}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('text-base')}
                className={`px-2 py-1 text-xs font-bold rounded-lg ${fontSize === 'text-base' ? 'bg-indigo-600 text-white' : 'opacity-70'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('text-lg')}
                className={`px-2 py-1 text-xs font-bold rounded-lg ${fontSize === 'text-lg' ? 'bg-indigo-600 text-white' : 'opacity-70'}`}
              >
                A+
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-xl border transition-all ${
                bookmarked ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'opacity-70 hover:opacity-100'
              }`}
              title="Bookmark Page"
            >
              <BookmarkCheck className="w-4 h-4" />
            </button>

            {/* Close modal */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl opacity-70 hover:opacity-100 hover:bg-black/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reader Layout Body */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Chapter Sidebar */}
          <div className={`hidden md:block w-80 border-r p-4 overflow-y-auto shrink-0 ${
            theme === 'light' ? 'bg-slate-50 border-slate-200' : theme === 'sepia' ? 'bg-[#f5e7cc] border-[#e2d5bd]' : 'bg-slate-900/60 border-slate-800'
          }`}>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider mb-4 opacity-75">
              <List className="w-4 h-4 text-indigo-400" />
              <span>Table of Contents ({chapters.length} Chapters)</span>
            </div>
            <div className="space-y-1.5">
              {chapters.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedChapterIdx(idx)}
                  className={`w-full text-left p-3.5 rounded-2xl text-xs font-medium transition-all ${
                    selectedChapterIdx === idx
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'opacity-80 hover:opacity-100 hover:bg-black/5'
                  }`}
                >
                  <div className="font-bold line-clamp-2">{ch.title}</div>
                  <div className="text-[10px] opacity-75 mt-1">Section {idx + 1} • ~{Math.ceil((ch.content.split(/\s+/).length) / 200)} min read</div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Book Reader Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Mobile Chapter Selector */}
            <div className="md:hidden px-4 py-2 border-b border-black/10 flex items-center justify-between text-xs">
              <span className="font-semibold opacity-80">Select Chapter:</span>
              <select
                value={selectedChapterIdx}
                onChange={(e) => setSelectedChapterIdx(Number(e.target.value))}
                className="bg-transparent border border-black/20 rounded-lg px-2 py-1 text-xs font-medium max-w-[200px]"
              >
                {chapters.map((ch, idx) => (
                  <option key={idx} value={idx}>{ch.title}</option>
                ))}
              </select>
            </div>

            {/* Scrollable Chapter Longform Prose */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-12 max-w-4xl mx-auto w-full space-y-8">
              
              <div className="border-b border-black/15 pb-6 mb-8">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-indigo-500 mb-2">
                  <span>{book.genre}</span>
                  <span>•</span>
                  <span>Chapter {selectedChapterIdx + 1} of {chapters.length}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-serif leading-tight">{currentChapter.title}</h2>
                <div className="flex items-center space-x-3 text-xs opacity-75 mt-3">
                  <span>By {book.author}</span>
                  <span>•</span>
                  <span>{wordCount.toLocaleString()} words</span>
                  <span>•</span>
                  <span>{readingTime} minute read</span>
                </div>
              </div>

              {/* Render Multi-Section Paragraphs cleanly */}
              <div className={`font-serif leading-relaxed space-y-6 ${fontSize}`}>
                {currentChapter.content.split('\n\n').map((paragraph, pIdx) => {
                  const isHeading = paragraph.startsWith('SECTION') || paragraph.startsWith('EXECUTIVE') || paragraph.startsWith('Book') || paragraph.startsWith('Chapter');
                  
                  if (isHeading) {
                    return (
                      <div key={pIdx} className="pt-6 pb-2 border-b border-black/10">
                        <h3 className="text-lg sm:text-xl font-bold font-sans text-indigo-500 uppercase tracking-wide">
                          {paragraph}
                        </h3>
                      </div>
                    );
                  }

                  return (
                    <p key={pIdx} className="indent-4 leading-loose opacity-95">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

            </div>

            {/* Bottom Chapter Navigation Bar */}
            <div className={`px-6 py-4 border-t flex items-center justify-between shrink-0 ${
              theme === 'light' ? 'bg-slate-50 border-slate-200' : theme === 'sepia' ? 'bg-[#f4e6c9] border-[#e2d5bd]' : 'bg-slate-900 border-slate-800'
            }`}>
              <button
                disabled={selectedChapterIdx === 0}
                onClick={() => setSelectedChapterIdx(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl text-xs font-bold border flex items-center space-x-1.5 disabled:opacity-30 transition-all hover:bg-black/5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Chapter</span>
              </button>

              <span className="text-xs font-bold opacity-80">
                Chapter {selectedChapterIdx + 1} of {chapters.length}
              </span>

              <button
                disabled={selectedChapterIdx === chapters.length - 1}
                onClick={() => setSelectedChapterIdx(prev => Math.min(chapters.length - 1, prev + 1))}
                className="px-4 py-2 rounded-xl text-xs font-bold border flex items-center space-x-1.5 disabled:opacity-30 transition-all hover:bg-black/5"
              >
                <span>Next Chapter</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
