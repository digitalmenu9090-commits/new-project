import React, { useState } from 'react';
import { X, Percent, Check } from 'lucide-react';
import { Offer } from '../../types';

interface CreateOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (offer: Offer) => void;
}

export const CreateOfferModal: React.FC<CreateOfferModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'flat'>('percentage');
  const [discountValue, setDiscountValue] = useState<string>('15');
  const [minOrderAmount, setMinOrderAmount] = useState<string>('300');
  const [validUntil, setValidUntil] = useState('Dec 31, 2026');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !title.trim()) return;

    const newOffer: Offer = {
      id: `offer-${Date.now()}`,
      code: code.trim().toUpperCase(),
      title: title.trim(),
      description: description.trim() || `${discountValue}${discountType === 'percentage' ? '%' : ' रू'} discount on your order`,
      discountType,
      discountValue: Number(discountValue) || 10,
      minOrderAmount: Number(minOrderAmount) || 0,
      validUntil,
      isActive: true,
      timesUsed: 0,
    };

    onSave(newOffer);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-[#C89D5C] flex items-center justify-center">
              <Percent className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">
              Create New Promo Code
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Promo Code</label>
              <input
                type="text"
                required
                placeholder="e.g. SIPSPECIAL"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 border border-stone-200 rounded-xl text-xs font-mono font-bold uppercase focus:border-[#C89D5C] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Discount Type</label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as any)}
                className="w-full px-3 py-2 border border-stone-200 rounded-xl text-xs font-semibold focus:border-[#C89D5C] focus:outline-hidden bg-white"
              >
                <option value="percentage">Percentage (% OFF)</option>
                <option value="flat">Flat Rupee (रू OFF)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Discount Value {discountType === 'percentage' ? '(%)' : '(रू)'}
              </label>
              <input
                type="number"
                required
                min="1"
                placeholder={discountType === 'percentage' ? '15' : '100'}
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className="w-full px-3 py-2 border border-stone-200 rounded-xl text-xs font-bold focus:border-[#C89D5C] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Min. Order Amount (रू)
              </label>
              <input
                type="number"
                min="0"
                placeholder="250"
                value={minOrderAmount}
                onChange={(e) => setMinOrderAmount(e.target.value)}
                className="w-full px-3 py-2 border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Offer Title</label>
            <input
              type="text"
              required
              placeholder="e.g., Weekend Coffee Craze"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Description</label>
            <input
              type="text"
              placeholder="e.g., Enjoy 15% discount on orders above रू 300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
            />
          </div>

          <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#C89D5C] hover:bg-[#b58c4f] text-[#1C140E] text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>Create Offer</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
