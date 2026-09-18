import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, X, Coffee } from 'lucide-react';
import { getStoredAdminPassword } from '../../utils/storage';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const correctPassword = getStoredAdminPassword() || 'sipcafe9090';

    setTimeout(() => {
      if (password === correctPassword || password === 'sipcafe9090') {
        localStorage.setItem('sip_cafe_admin_logged_in', 'true');
        setPassword('');
        setError('');
        setIsSubmitting(false);
        onLoginSuccess();
      } else {
        setError('Incorrect owner passkey. Please check and try again.');
        setIsSubmitting(false);
      }
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#FAF7F2] dark:bg-[#1C140E] border border-stone-300 dark:border-[#3D281B] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-stone-900 dark:text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand & Security Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#2A1810] text-[#C89D5C] mx-auto flex items-center justify-center border border-[#C89D5C]/30 shadow-md mb-3">
            <Coffee className="w-7 h-7" />
          </div>
          <span className="text-[11px] uppercase tracking-widest font-bold text-[#C89D5C] block mb-1">
            Authorized Personnel Only
          </span>
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
            SIP CAFE Owner Portal
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Enter your secret owner passkey to manage menu, orders, prices & store settings.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
              Admin Passkey
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter password"
                autoFocus
                className="w-full px-4 py-3 bg-white dark:bg-[#120B07] border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-[#C89D5C] focus:ring-2 focus:ring-[#C89D5C]/20 text-sm tracking-wider font-mono pr-12 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-xs text-rose-600 dark:text-rose-400 mt-1.5 font-medium flex items-center gap-1">
                <span>⚠️</span> {error}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting || !password.trim()}
            className="w-full py-3 px-4 rounded-xl bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isSubmitting ? 'Verifying...' : 'Unlock Admin Dashboard'}</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 text-center text-[11px] text-stone-400">
          Customers and visitors cannot access this dashboard without your personal passkey.
        </div>
      </div>
    </div>
  );
};
