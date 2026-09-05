import React, { useState } from 'react';
import { KeyRound, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useToast } from '../components/Toast';

export function ForgotPasswordPage({ onNavigateLogin }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { addToast } = useToast();

  const handleReset = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    addToast('Password reset link sent to your email!');
  };

  return (
    <div className="max-w-md mx-auto my-8 space-y-6 animate-fade-in">
      <div className="glass-panel p-8 rounded-3xl border border-indigo-500/30 space-y-6 shadow-2xl relative">
        <button
          onClick={onNavigateLogin}
          className="text-xs font-semibold text-slate-400 hover:text-white flex items-center space-x-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Login</span>
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center mx-auto text-indigo-400">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Reset Password</h2>
          <p className="text-xs text-slate-400">Enter your library email to receive a password reset token</p>
        </div>

        {sent ? (
          <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-emerald-200">Reset Email Dispatched</h4>
            <p className="text-xs text-emerald-300">Check your inbox ({email}) for instructions to create a new password.</p>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Registered Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="student@library.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-extrabold shadow-lg shadow-indigo-600/30 transition-all"
            >
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
