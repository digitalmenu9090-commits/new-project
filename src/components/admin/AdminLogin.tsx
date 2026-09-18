import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Coffee, ArrowRight, ShieldCheck, Sparkles, KeyRound } from 'lucide-react';
import { getStoredAdminPassword } from '../../utils/storage';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const correctPassword = getStoredAdminPassword();
      if (password.trim() === correctPassword || password.trim() === 'sipcafe9090') {
        localStorage.setItem('sip_cafe_admin_logged_in', 'true');
        onLoginSuccess();
      } else {
        setError('Incorrect password. Access restricted to Sip Café management.');
        setIsLoading(false);
      }
    }, 300);
  };

  const handleQuickFill = () => {
    const pw = getStoredAdminPassword();
    setPassword(pw);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#120B07] text-[#1C1917] dark:text-[#FAF7F2] flex items-center justify-center p-4 selection:bg-[#C89D5C]/30 selection:text-[#2A1810]">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#C89D5C]/15 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#5A3A22]/20 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-white dark:bg-[#1C140E] border border-[#E8DFC8] dark:border-[#3D281B] rounded-3xl p-8 sm:p-10 shadow-2xl shadow-stone-900/10 dark:shadow-black/60">
          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2A1810] to-[#422212] border-2 border-[#C89D5C] flex items-center justify-center text-[#C89D5C] shadow-lg mb-4 transform hover:scale-105 transition-transform">
              <Coffee className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#FAF3E8] dark:bg-[#2A1810] text-[#C89D5C] border border-[#C89D5C]/30 mb-2">
              <ShieldCheck className="w-3 h-3" />
              <span>Management Portal</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917] dark:text-[#FAF7F2] tracking-wide">
              SIP CAFÉ
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-xs leading-relaxed">
              Administrative control center for Kathmandu store operations, live menu, and orders.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {error && (
              <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs rounded-xl flex items-center gap-2.5 animate-in fade-in">
                <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Admin Security Key
                </label>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="text-[11px] text-[#C89D5C] hover:underline font-medium inline-flex items-center gap-1"
                  title="Auto-fill default passkey for testing"
                >
                  <KeyRound className="w-3 h-3" />
                  <span>Use default</span>
                </button>
              </div>

              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                  placeholder="Enter administrator password"
                  className="w-full pl-10 pr-11 py-3 bg-[#FAF7F2] dark:bg-[#140D09] border border-[#E0D5C3] dark:border-[#3D281B] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C89D5C] focus:border-transparent text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-0.5"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#2A1810] via-[#3B2215] to-[#2A1810] hover:from-[#3D2316] hover:to-[#3D2316] text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-stone-900/10 dark:shadow-black/50 transition-all active:scale-[0.99] border border-[#C89D5C]/30 disabled:opacity-60 cursor-pointer"
            >
              <span>{isLoading ? 'Verifying Credentials...' : 'Access Admin Dashboard'}</span>
              <ArrowRight className="w-4 h-4 text-[#C89D5C]" />
            </button>
          </form>

          {/* Helper Footnote */}
          <div className="mt-6 pt-5 border-t border-stone-100 dark:border-stone-800/60 text-center">
            <p className="text-[11px] text-stone-400 dark:text-stone-500">
              Default password: <code className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono">sipcafe9090</code>
            </p>
          </div>
        </div>

        {/* Brand Signoff */}
        <p className="text-center text-xs text-stone-400 dark:text-stone-600 mt-6 font-medium">
          SIP CAFÉ • Pipalbot, Kathmandu, Nepal
        </p>
      </div>
    </div>
  );
};
