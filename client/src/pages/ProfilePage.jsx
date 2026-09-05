import React, { useState } from 'react';
import { User, Shield, CreditCard, Save, QrCode, Sparkles, CheckCircle2 } from 'lucide-react';
import { useToast } from '../components/Toast';

export function ProfilePage({ currentUser, setCurrentUser }) {
  const [name, setName] = useState(currentUser ? currentUser.name : '');
  const [department, setDepartment] = useState(currentUser ? currentUser.department || '' : '');
  const [bio, setBio] = useState('Passionate academic researcher exploring digital archives and computer science frameworks.');
  const { addToast } = useToast();

  if (!currentUser) return null;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setCurrentUser(prev => ({
      ...prev,
      name,
      department
    }));
    addToast('Profile information updated!');
  };

  return (
    <div className="space-y-10 animate-fade-in max-w-5xl mx-auto">
      
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Account Management</span>
        <h1 className="text-3xl font-extrabold text-white">Member Profile & Library Passport</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Virtual Digital Library Pass / ID Card */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Digital Library Card</h2>

          {/* Holographic Pass Design */}
          <div className="glass-panel bg-gradient-to-br from-indigo-900/90 via-slate-900 to-purple-950 p-6 rounded-3xl border border-indigo-500/40 shadow-2xl relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-center justify-between border-b border-indigo-500/30 pb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                  DS
                </div>
                <span className="text-xs font-extrabold text-white tracking-wider uppercase">Digital Scrolls ID</span>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                ACTIVE MEMBER
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-400/50 shadow-md"
              />
              <div className="space-y-0.5">
                <h3 className="text-base font-extrabold text-white leading-tight">{currentUser.name}</h3>
                <p className="text-xs text-indigo-300 font-semibold">{currentUser.role}</p>
                <p className="text-[10px] text-slate-400">{currentUser.department || 'General Library'}</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              <div className="flex justify-between">
                <span>Member ID:</span>
                <strong className="text-white font-mono">{currentUser.id}</strong>
              </div>
              <div className="flex justify-between">
                <span>Issued Date:</span>
                <strong className="text-white">{currentUser.memberSince || '2024-01-01'}</strong>
              </div>
              <div className="flex justify-between">
                <span>Access Level:</span>
                <strong className="text-indigo-300">Tier 1 Unlimited</strong>
              </div>
            </div>

            {/* Simulated Barcode */}
            <div className="pt-2 flex flex-col items-center justify-center space-y-1">
              <div className="h-10 w-full bg-slate-950 rounded-lg p-2 flex items-center justify-center space-x-1 border border-slate-800">
                {[4, 2, 6, 1, 3, 5, 2, 7, 3, 2, 5, 1, 4, 3, 6, 2, 4, 1, 5, 2, 3].map((w, idx) => (
                  <div key={idx} className="bg-slate-200 h-full" style={{ width: `${w * 2}px` }}></div>
                ))}
              </div>
              <span className="text-[9px] font-mono text-slate-500 tracking-widest">DS-2026-98124-ARCHIVE</span>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <User className="w-5 h-5 text-indigo-400" />
              <span>Personal Information</span>
            </h2>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Email Address (Locked)</label>
                  <input
                    type="email"
                    value={currentUser.email}
                    disabled
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Academic Department / Division</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Academic Bio / Research Interests</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
}
