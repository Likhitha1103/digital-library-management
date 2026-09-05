import React from 'react';

export function StatCard({ title, value, subtitle, icon: Icon, color = 'indigo' }) {
  const colorMap = {
    indigo: 'from-indigo-600/20 to-purple-600/20 border-indigo-500/30 text-indigo-400',
    emerald: 'from-emerald-600/20 to-teal-600/20 border-emerald-500/30 text-emerald-400',
    amber: 'from-amber-600/20 to-yellow-600/20 border-amber-500/30 text-amber-400',
    purple: 'from-purple-600/20 to-pink-600/20 border-purple-500/30 text-purple-400',
    rose: 'from-rose-600/20 to-red-600/20 border-rose-500/30 text-rose-400',
  };

  return (
    <div className={`glass-card rounded-2xl p-5 border bg-gradient-to-br ${colorMap[color] || colorMap.indigo} flex items-center justify-between`}>
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{value}</h3>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
