import React, { useState } from 'react';
import { BookOpen, User, Lock, ShieldCheck, ArrowRight, Sparkles, Key, CheckCircle } from 'lucide-react';
import { loginUser } from '../services/api';
import { useToast } from '../components/Toast';

export function LoginPage({ onLoginSuccess, onNavigateSignup, onNavigateForgot }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser({ email, role });
      addToast(`Logged in as ${res.user.name} (${res.user.role})!`);
      onLoginSuccess(res.user);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (targetRole, targetEmail, targetPass) => {
    setRole(targetRole);
    setEmail(targetEmail);
    setPassword(targetPass);

    loginUser({ email: targetEmail, role: targetRole })
      .then((res) => {
        addToast(`Instant Sign-In Successful as ${res.user.name} (${res.user.role})!`);
        onLoginSuccess(res.user);
      })
      .catch((err) => addToast(err.message, 'error'));
  };

  return (
    <div className="max-w-md mx-auto my-6 space-y-6 animate-fade-in">
      
      {/* Prominent Login Credentials Guide Card */}
      <div className="glass-panel bg-gradient-to-r from-indigo-900/90 via-slate-900 to-purple-950 p-5 rounded-3xl border border-indigo-500/50 shadow-2xl space-y-3">
        <div className="flex items-center space-x-2 text-indigo-300">
          <Key className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">Default Sign-In Credentials</h3>
        </div>
        <p className="text-[11px] text-slate-300">Click any card below for 1-click instant login:</p>
        
        <div className="grid grid-cols-1 gap-2 text-xs">
          <div 
            onClick={() => handleQuickFill('Student', 'student@library.com', 'student123')}
            className="p-3 bg-slate-900/80 hover:bg-indigo-600/20 border border-slate-700 hover:border-indigo-500/40 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
          >
            <div>
              <div className="font-bold text-white group-hover:text-indigo-300">🎓 Student Account</div>
              <div className="text-[11px] text-slate-400 font-mono">student@library.com • Pass: student123</div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Click to Login
            </span>
          </div>

          <div 
            onClick={() => handleQuickFill('Teacher', 'teacher@library.com', 'teacher123')}
            className="p-3 bg-slate-900/80 hover:bg-amber-600/20 border border-slate-700 hover:border-amber-500/40 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
          >
            <div>
              <div className="font-bold text-white group-hover:text-amber-300">👨‍🏫 Teacher / Faculty Account</div>
              <div className="text-[11px] text-slate-400 font-mono">teacher@library.com • Pass: teacher123</div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Click to Login
            </span>
          </div>

          <div 
            onClick={() => handleQuickFill('Admin', 'admin@library.com', 'admin123')}
            className="p-3 bg-slate-900/80 hover:bg-purple-600/20 border border-slate-700 hover:border-purple-500/40 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
          >
            <div>
              <div className="font-bold text-white group-hover:text-purple-300">⚡ Admin / Head Librarian</div>
              <div className="text-[11px] text-slate-400 font-mono">admin@library.com • Pass: admin123</div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Click to Login
            </span>
          </div>
        </div>
      </div>

      {/* Main Login Form */}
      <div className="glass-panel p-8 rounded-3xl border border-indigo-500/30 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/30">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Sign In to Digital Scrolls</h2>
          <p className="text-xs text-slate-400">Access your borrowed books, 5+ chapter reader, and dashboard</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800">
          {['Student', 'Teacher', 'Admin'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all ${
                role === r ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="student@library.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <button
                type="button"
                onClick={onNavigateForgot}
                className="text-xs text-indigo-400 hover:underline"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-extrabold shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-400">
            Don't have a library account yet?{' '}
            <button onClick={onNavigateSignup} className="text-indigo-400 font-bold hover:underline">
              Create New Account
            </button>
          </p>
        </div>
      </div>

    </div>
  );
}
