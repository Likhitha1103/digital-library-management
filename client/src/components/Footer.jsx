import React from 'react';
import { BookOpen, ShieldCheck, Heart, Mail, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950/80 backdrop-blur-lg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Digital Scrolls Archive</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering readers and academic researchers with instant digital access to thousands of curated volumes, manuscripts, and modern knowledge frameworks.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#browse" className="hover:text-indigo-400 transition-colors">Catalog Directory</a></li>
              <li><a href="#featured" className="hover:text-indigo-400 transition-colors">Featured Editions</a></li>
              <li><a href="#dashboard" className="hover:text-indigo-400 transition-colors">Member Portal</a></li>
              <li><a href="#admin" className="hover:text-indigo-400 transition-colors">Librarian Console</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Reading Categories</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><span className="hover:text-indigo-400 transition-colors cursor-pointer">Technology & AI</span></li>
              <li><span className="hover:text-indigo-400 transition-colors cursor-pointer">Quantum Science</span></li>
              <li><span className="hover:text-indigo-400 transition-colors cursor-pointer">Biographies</span></li>
              <li><span className="hover:text-indigo-400 transition-colors cursor-pointer">Philosophy & Classics</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Library Hours & Support</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <p className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>24/7 Digital Access</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>support@digitalscrolls.edu</span>
              </p>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 Digital Scrolls Archive. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for knowledge seekers</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
