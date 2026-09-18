import React, { useState } from 'react';
import { 
  Tag, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Percent, 
  Sparkles, 
  X,
  Copy,
  Check
} from 'lucide-react';
import { Offer } from '../../../types';
import { ConfirmationModal } from '../ConfirmationModal';

interface OffersViewProps {
  offers: Offer[];
  onSaveOffer: (offer: Offer) => void;
  onDeleteOffer: (offerId: string) => void;
  onToggleOfferStatus: (offerId: string) => void;
}

export const OffersView: React.FC<OffersViewProps> = ({
  offers,
  onSaveOffer,
  onDeleteOffer,
  onToggleOfferStatus,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [offerToDelete, setOfferToDelete] = useState<Offer | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'flat'>('percentage');
  const [discountValue, setDiscountValue] = useState<number>(20);
  const [validUntil, setValidUntil] = useState('2026-10-31');
  const [minOrderAmount, setMinOrderAmount] = useState<number>(300);
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleOpenAdd = () => {
    setEditingOffer(null);
    setTitle('Dasani 20% OFF');
    setCode('DASANI20');
    setDiscountType('percentage');
    setDiscountValue(20);
    setValidUntil('2026-10-31');
    setMinOrderAmount(300);
    setDescription('Get 20% off on all cold coffees and beverages during afternoon hours.');
    setIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setTitle(offer.title);
    setCode(offer.code);
    setDiscountType(offer.discountType);
    setDiscountValue(offer.discountValue);
    setValidUntil(offer.validUntil);
    setMinOrderAmount(offer.minOrderAmount);
    setDescription(offer.description);
    setIsActive(offer.isActive);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !code.trim()) {
      alert('Please fill in both offer title and promo code.');
      return;
    }

    const offerToSave: Offer = {
      id: editingOffer ? editingOffer.id : `off-${Date.now()}`,
      title: title.trim(),
      code: code.trim().toUpperCase(),
      discountType,
      discountValue: Number(discountValue),
      validUntil,
      minOrderAmount: Number(minOrderAmount),
      isActive,
      description: description.trim(),
      timesUsed: editingOffer ? editingOffer.timesUsed : 0
    };

    onSaveOffer(offerToSave);
    setIsModalOpen(false);
  };

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(codeText);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
            Offers & Discounts Management
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Create and publish promotional discount codes, seasonal deals, and festival offers
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Offer</span>
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`bg-white dark:bg-[#1C140E] border rounded-3xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden ${
              offer.isActive
                ? 'border-stone-200 dark:border-stone-800'
                : 'border-stone-200/60 dark:border-stone-800/60 opacity-60'
            }`}
          >
            {/* Top Accent Strip */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 ${
              offer.isActive ? 'bg-gradient-to-r from-[#C89D5C] to-[#E3C38C]' : 'bg-stone-300 dark:bg-stone-700'
            }`} />

            <div className="space-y-4">
              {/* Status & Discount badge */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => onToggleOfferStatus(offer.id)}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer ${
                    offer.isActive
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
                  }`}
                  title="Click to toggle active status"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${offer.isActive ? 'bg-emerald-500' : 'bg-stone-400'}`} />
                  <span>{offer.isActive ? 'Active Promo' : 'Paused'}</span>
                </button>

                <span className="text-sm font-extrabold font-serif text-[#C89D5C]">
                  {offer.discountType === 'percentage' ? `${offer.discountValue}% OFF` : `रू ${offer.discountValue} FLAT`}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  {offer.title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                  {offer.description}
                </p>
              </div>

              {/* Promo Code Box */}
              <div className="p-3 bg-[#FAF7F2] dark:bg-[#150E0A] rounded-2xl border border-dashed border-[#C89D5C]/60 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Promo Code</div>
                  <div className="font-mono font-bold text-base text-[#1C140E] dark:text-[#FAF7F2] tracking-wider">
                    {offer.code}
                  </div>
                </div>
                <button
                  onClick={() => handleCopyCode(offer.code)}
                  className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors"
                  title="Copy promo code"
                >
                  {copiedCode === offer.code ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Offer Details */}
              <div className="text-[11px] text-stone-500 space-y-1 pt-1">
                <div className="flex items-center justify-between">
                  <span>Minimum Order:</span>
                  <span className="font-semibold text-stone-700 dark:text-stone-300">रू {offer.minOrderAmount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Valid Until:</span>
                  <span className="font-semibold text-stone-700 dark:text-stone-300">{offer.validUntil}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Times Redeemed:</span>
                  <span className="font-semibold text-stone-700 dark:text-stone-300">{offer.timesUsed} times</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <button
                onClick={() => onToggleOfferStatus(offer.id)}
                className="text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
              >
                {offer.isActive ? 'Disable Deal' : 'Enable Deal'}
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(offer)}
                  className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-[#C89D5C] hover:text-[#1C140E] text-stone-700 dark:text-stone-300 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setOfferToDelete(offer)}
                  className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                  title="Delete offer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={offerToDelete !== null}
        title="Delete Special Offer?"
        message={`Are you sure you want to delete "${offerToDelete?.title}" (${offerToDelete?.code})? Customers will no longer be able to use this promotional discount code.`}
        confirmText="Yes, Delete Offer"
        cancelText="Cancel"
        onConfirm={() => {
          if (offerToDelete) {
            onDeleteOffer(offerToDelete.id);
            setOfferToDelete(null);
          }
        }}
        onCancel={() => setOfferToDelete(null)}
      />

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-stone-900 dark:text-stone-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <div>
                <h3 className="font-serif font-bold text-xl">
                  {editingOffer ? 'Edit Discount Deal' : 'Create Special Offer'}
                </h3>
                <p className="text-xs text-stone-400">Configure promo banner and checkout discounts</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Offer Title * (e.g. Dasani 20% OFF)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dasani 20% OFF or Monsoon Momo Special"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Promo Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DASANI20"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl font-mono uppercase focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Discount Type</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                  >
                    <option value="percentage">Percentage (% OFF)</option>
                    <option value="flat">Flat Amount (रू OFF)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold block mb-1">
                    Value {discountType === 'percentage' ? '(%)' : '(रू)'}
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Min Order (रू)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={minOrderAmount}
                    onChange={(e) => setMinOrderAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Expiry Date</label>
                  <input
                    type="date"
                    required
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Offer Terms / Description</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Valid on all cold drinks and iced coffees during afternoon study hours."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 p-3 rounded-xl border border-stone-200 dark:border-stone-800 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-900/40">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-[#C89D5C] focus:ring-[#C89D5C]"
                  />
                  <div>
                    <div className="font-bold">Active and Available to Customers</div>
                    <div className="text-[10px] text-stone-400">Can be applied to in-house bills & website orders</div>
                  </div>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] text-xs font-bold uppercase tracking-wider"
                >
                  {editingOffer ? 'Save Offer' : 'Publish Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
