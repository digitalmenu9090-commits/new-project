import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Edit2,
  Check,
  User,
  DollarSign,
  Coffee,
} from 'lucide-react';
import { Order, OrderItem, MenuItem, OrderStatus } from '../../types';

interface EditOrderModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onSave: (updatedOrder: Order) => void;
}

export const EditOrderModal: React.FC<EditOrderModalProps> = ({
  order,
  isOpen,
  onClose,
  menuItems,
  onSave,
}) => {
  if (!isOpen || !order) return null;

  const [customerName, setCustomerName] = useState(order.customerName);
  const [customerPhone, setCustomerPhone] = useState(order.customerPhone);
  const [orderType, setOrderType] = useState(order.orderType);
  const [tableNumber, setTableNumber] = useState(order.tableNumber || '');
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus);
  const [paymentMethod, setPaymentMethod] = useState(order.paymentMethod);
  const [items, setItems] = useState<OrderItem[]>(order.items);
  const [discount, setDiscount] = useState<number>(order.discount || 0);
  const [notes, setNotes] = useState(order.notes || '');

  // Add more items dropdown
  const [selectedNewItemId, setSelectedNewItemId] = useState('');

  const handleQuantityChange = (index: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((item, i) => {
          if (i === index) {
            const newQty = Math.max(1, item.quantity + delta);
            return {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPrice * newQty,
            };
          }
          return item;
        })
    );
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) {
      alert('Order must contain at least one item.');
      return;
    }
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddNewItemToOrder = () => {
    if (!selectedNewItemId) return;
    const found = menuItems.find((m) => m.id === selectedNewItemId);
    if (!found) return;

    const priceNum = parseInt(found.price.replace(/\D/g, ''), 10) || 150;

    // Check if already in items
    const existingIndex = items.findIndex((i) => i.itemId === found.id);
    if (existingIndex >= 0) {
      handleQuantityChange(existingIndex, 1);
    } else {
      setItems((prev) => [
        ...prev,
        {
          itemId: found.id,
          name: found.name,
          unitPrice: priceNum,
          totalPrice: priceNum,
          quantity: 1,
        },
      ]);
    }
    setSelectedNewItemId('');
  };

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalAmount = Math.max(0, subtotal - (Number(discount) || 0));

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: Order = {
      ...order,
      customerName: customerName.trim() || 'Guest',
      customerPhone: customerPhone.trim() || '98XXXXXXXX',
      orderType,
      tableNumber: tableNumber.trim() || undefined,
      status,
      paymentStatus,
      paymentMethod,
      items,
      subtotal,
      discount: Number(discount) || 0,
      totalAmount,
      notes: notes.trim() || undefined,
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 shrink-0">
          <div className="flex items-center gap-2">
            <Edit2 className="w-5 h-5 text-[#C89D5C]" />
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900">
                Edit Order #{order.id}
              </h3>
              <p className="text-[11px] text-stone-400">Placed at {order.createdAt}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <form onSubmit={handleFormSubmit} className="space-y-4 overflow-y-auto pr-1 flex-1">
          {/* Customer info */}
          <div className="p-3.5 bg-stone-50 rounded-2xl space-y-2.5">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#C89D5C]" />
              Customer Details
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Status & Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Order Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:border-[#C89D5C] focus:outline-hidden"
              >
                <option value="Pending">● Pending</option>
                <option value="Preparing">● Preparing</option>
                <option value="Ready">● Ready</option>
                <option value="Completed">● Completed</option>
                <option value="Cancelled">● Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Order Type</label>
              <select
                value={orderType}
                onChange={(e) => setOrderType(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:border-[#C89D5C] focus:outline-hidden"
              >
                <option value="Dine-In">🍽️ Dine-In</option>
                <option value="Takeaway">🛍️ Takeaway</option>
                <option value="Delivery">🛵 Delivery</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Table / Details</label>
              <input
                type="text"
                placeholder="e.g., Table 3"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Items In Order */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
              <Coffee className="w-3.5 h-3.5 text-[#C89D5C]" />
              Items In This Order
            </label>

            <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden bg-white">
              {items.map((it, idx) => (
                <div key={idx} className="p-2.5 px-3 flex items-center justify-between text-xs">
                  <div className="min-w-0 pr-2">
                    <span className="font-bold text-stone-900 block truncate">{it.name}</span>
                    <span className="text-[11px] text-stone-400 font-serif">
                      रू {it.unitPrice} each
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(idx, -1)}
                      className="w-6 h-6 rounded-md bg-stone-100 hover:bg-stone-200 flex items-center justify-center font-bold text-stone-700"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center font-bold">{it.quantity}</span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(idx, 1)}
                      className="w-6 h-6 rounded-md bg-[#2A1810] hover:bg-[#3D281B] text-[#C89D5C] flex items-center justify-center font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <span className="font-serif font-bold text-stone-900 w-16 text-right">
                      रू {it.totalPrice}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="p-1 text-stone-400 hover:text-rose-600 transition-colors ml-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick add item to existing order */}
            <div className="flex items-center gap-2 pt-1">
              <select
                value={selectedNewItemId}
                onChange={(e) => setSelectedNewItemId(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
              >
                <option value="">+ Add another menu item...</option>
                {menuItems.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} (रू {m.price})
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddNewItemToOrder}
                disabled={!selectedNewItemId}
                className="px-3 py-1.5 bg-[#C89D5C] hover:bg-[#b58c4f] disabled:opacity-50 text-white rounded-xl text-xs font-bold shrink-0"
              >
                Add to Order
              </button>
            </div>
          </div>

          {/* Payment & Settlement */}
          <div className="p-3.5 bg-stone-50 rounded-2xl space-y-2.5">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#C89D5C]" />
              Payment Details
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                  Payment Status
                </label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value as any)}
                  className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:border-[#C89D5C] focus:outline-hidden"
                >
                  <option value="Unpaid">⏳ Unpaid</option>
                  <option value="Paid">✅ Paid</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:border-[#C89D5C] focus:outline-hidden"
                >
                  <option value="Cash">💵 Cash</option>
                  <option value="Fonepay (QR)">📲 Fonepay / QR</option>
                  <option value="Card">💳 Card</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                  Discount (रू)
                </label>
                <input
                  type="number"
                  min="0"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                Order Notes
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Footer actions */}
          <div className="pt-2 flex items-center justify-between border-t border-stone-100">
            <div className="text-base font-serif font-bold text-stone-900">
              Updated Total: <span className="text-[#C89D5C]">रू {totalAmount}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-[#C89D5C] hover:bg-[#b58c4f] text-[#1C140E] text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
