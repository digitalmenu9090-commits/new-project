import React from 'react';
import { Shield, Sliders, Eye, LogOut, Sparkles } from 'lucide-react';

interface AdminQuickBarProps {
  onOpenDashboard: () => void;
  onLogout: () => void;
}

export const AdminQuickBar: React.FC<AdminQuickBarProps> = ({ onOpenDashboard, onLogout }) => {
  return (
    <aside
      aria-label="Admin quick controls"
      className="fixed bottom-5 left-5 z-50 flex items-center shadow-2xl rounded-2xl bg-[#1C140E]/95 backdrop-blur-md border border-[#C89D5C]/40 text-[#FAF7F2] p-1.5 transition-all hover:border-[#C89D5C]"
    >
      <div className="flex items-center gap-2 pl-3 pr-2 py-1 text-xs">
        <div className="flex items-center gap-1.5 font-semibold text-[#E8C58C]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">Admin Mode Active</span>
          <span className="sm:hidden">Admin</span>
        </div>

        <div className="h-4 w-px bg-white/20 mx-1" />

        {/* Button: Open Dashboard */}
        <button
          onClick={onOpenDashboard}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] font-bold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95"
          title="Open Admin Control Center"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </button>

        {/* Button: Logout */}
        <button
          onClick={onLogout}
          className="p-1.5 rounded-xl text-rose-300 hover:text-rose-100 hover:bg-rose-950/50 transition-colors"
          title="Exit Admin / Log Out"
          aria-label="Log Out of Admin"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
