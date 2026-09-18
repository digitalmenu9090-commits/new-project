import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDangerous = true,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${isDangerous ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400'}`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                {title}
              </h3>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          {message}
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 text-xs font-bold rounded-xl text-white shadow-sm transition-all active:scale-95 cursor-pointer ${
              isDangerous
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E]'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
