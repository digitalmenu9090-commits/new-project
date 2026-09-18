import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  MessageCircle,
  Clock,
  ArrowRight,
  MapPin,
  Utensils,
  Phone,
  User,
  Coffee,
  Sparkles,
} from 'lucide-react';
import { MenuItem, Order } from '../types';

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface WebsiteOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onPlaceOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    orderType: 'Dine-In' | 'Takeaway' | 'Delivery';
    tableNumber?: string;
    deliveryAddress?: string;
    paymentMethod: 'Cash' | 'Fonepay (QR)' | 'Card';
    notes?: string;
  }) => Order;
  whatsappNumber: string;
}

export const WebsiteOrderModal: React.FC<WebsiteOrderModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onPlaceOrder,
  whatsappNumber,
}) => {
  // Form state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderType, setOrderType] = useState<'Dine-In' | 'Takeaway' | 'Delivery'>('Delivery');
  const [tableNumber, setTableNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Fonepay (QR)' | 'Card'>('Cash');
  const [notes, setNotes] = useState('');

  // Placed Order Success state
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  // Calculate items total
  const subtotal = cart.reduce((sum, { item, quantity }) => {
    const priceNum = parseInt(item.price.replace(/\D/g, ''), 10) || 160;
    return sum + priceNum * quantity;
  }, 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please provide your name and phone number so we can prepare your order.');
      return;
    }

    const order = onPlaceOrder({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      orderType,
      tableNumber: orderType === 'Dine-In' ? tableNumber.trim() : undefined,
      deliveryAddress: orderType === 'Delivery' ? deliveryAddress.trim() : undefined,
      paymentMethod,
      notes: notes.trim() ? notes.trim() : (deliveryAddress ? `Delivery to: ${deliveryAddress}` : undefined),
    });

    setPlacedOrder(order);
    onClearCart();
  };

  const handleOpenWhatsAppConfirmation = () => {
    if (!placedOrder) return;
    const itemsList = placedOrder.items
      .map((i) => `• ${i.quantity}x ${i.name} (रू ${i.totalPrice})`)
      .join('\n');

    const addressOrTable =
      placedOrder.orderType === 'Dine-In' && placedOrder.tableNumber
        ? `\nTable: ${placedOrder.tableNumber}`
        : placedOrder.notes
        ? `\nAddress/Note: ${placedOrder.notes}`
        : '';

    const text = encodeURIComponent(
      `Namaste SIP CAFE! 🙏\nI just placed an order on your website:\n\n*Order #${placedOrder.id}*\nName: ${placedOrder.customerName}\nPhone: ${placedOrder.customerPhone}\nType: ${placedOrder.orderType}${addressOrTable}\n\n*Items:*\n${itemsList}\n\n*Total: रू ${placedOrder.totalAmount}*\nPayment: ${placedOrder.paymentMethod}\n\nPlease confirm my order. Thank you! ☕✨`
    );

    window.open(`https://wa.me/977${whatsappNumber}?text=${text}`, '_blank');
  };

  const handleResetAndClose = () => {
    setPlacedOrder(null);
    setCustomerName('');
    setCustomerPhone('');
    setTableNumber('');
    setDeliveryAddress('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-[#E8DFC8] flex flex-col"
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-[#1C140E] text-white flex items-center justify-between border-b border-[#3D281B]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#C89D5C] text-[#1C140E] font-serif font-bold flex items-center justify-center text-sm shadow-xs">
              <Coffee className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#FAF7F2]">
                {placedOrder ? 'Order Confirmed!' : 'Your Sip Cafe Order'}
              </h3>
              <p className="text-[11px] text-[#C89D5C]">
                {placedOrder ? 'Sent directly to the kitchen' : 'Authentic Himalayan Brews & Fresh Kitchen'}
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* ================= SUCCESS SCREEN ================= */}
          {placedOrder ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-mono font-bold tracking-wider uppercase border border-amber-300">
                  Order #{placedOrder.id}
                </span>
                <h4 className="font-serif font-bold text-2xl text-stone-900 mt-2">
                  Order Placed Successfully!
                </h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto mt-1">
                  Thank you, <strong className="text-stone-900">{placedOrder.customerName}</strong>! Your order has been recorded into SIP CAFE's live register. Our baristas are preparing it fresh.
                </p>
              </div>

              {/* Order Summary Receipt Box */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DFC8] text-left text-xs font-mono space-y-2 max-w-sm mx-auto">
                <div className="flex justify-between font-bold border-b border-dashed border-stone-300 pb-2">
                  <span>Status:</span>
                  <span className="text-emerald-700 uppercase">● {placedOrder.status}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Order Type:</span>
                  <span>{placedOrder.orderType}</span>
                </div>
                <div className="space-y-1 py-1">
                  {placedOrder.items.map((i, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{i.quantity}x {i.name}</span>
                      <span>रू {i.totalPrice}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-bold text-sm text-[#C89D5C] pt-2 border-t border-dashed border-stone-300">
                  <span>TOTAL:</span>
                  <span>रू {placedOrder.totalAmount}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 max-w-sm mx-auto">
                <button
                  onClick={handleOpenWhatsAppConfirmation}
                  className="w-full py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order to SIP CAFE WhatsApp</span>
                </button>

                <button
                  onClick={handleResetAndClose}
                  className="w-full py-2.5 px-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Back to Website Menu
                </button>
              </div>
            </div>
          ) : (
            /* ================= ORDER BAG / CHECKOUT FORM ================= */
            <div className="space-y-5">
              {/* Cart Items List */}
              {cart.length === 0 ? (
                <div className="text-center py-8 space-y-3">
                  <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto" />
                  <h4 className="font-serif font-bold text-stone-700">Your order bag is empty</h4>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    Browse our menu and click "+ Add to Order" or "Order" on any coffee, momo, or beverage!
                  </p>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-[#C89D5C] text-[#1C140E] rounded-xl text-xs font-bold shadow-xs"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitOrder} className="space-y-5">
                  {/* Selected Items */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                      <span>Selected Items ({cart.length})</span>
                      <button
                        type="button"
                        onClick={onClearCart}
                        className="text-rose-600 hover:text-rose-800 text-[11px] font-medium"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl p-2 bg-[#FAF7F2]/60 max-h-48 overflow-y-auto">
                      {cart.map(({ item, quantity }) => {
                        const priceNum = parseInt(item.price.replace(/\D/g, ''), 10) || 160;
                        const itemTotal = priceNum * quantity;
                        return (
                          <div
                            key={item.id}
                            className="p-2 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-2.5 min-w-0 flex-1">
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="w-10 h-10 rounded-lg object-cover shrink-0 border border-stone-200"
                              />
                              <div className="min-w-0">
                                <span className="font-bold text-stone-900 block truncate">
                                  {item.name}
                                </span>
                                <span className="text-[11px] text-stone-500 font-mono">
                                  रू {item.price} each
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg p-0.5 shadow-2xs">
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(item.id, -1)}
                                  className="w-5 h-5 rounded flex items-center justify-center text-stone-600 hover:bg-stone-100"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-4 text-center font-bold text-xs">
                                  {quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(item.id, 1)}
                                  className="w-5 h-5 rounded flex items-center justify-center text-stone-900 hover:bg-stone-100"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="font-serif font-bold text-xs text-[#C89D5C] w-14 text-right">
                                रू {itemTotal}
                              </span>

                              <button
                                type="button"
                                onClick={() => onRemoveItem(item.id)}
                                className="text-stone-400 hover:text-rose-600 p-1"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="space-y-3 pt-2 border-t border-stone-100">
                    <h4 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-[#C89D5C]" />
                      <span>Your Contact Details</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Aarav Sharma"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-[#C89D5C] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g., 98XXXXXXXX"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-[#C89D5C] focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Order Type & Location/Table */}
                  <div className="space-y-3 pt-2 border-t border-stone-100">
                    <h4 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-1.5">
                      <Utensils className="w-4 h-4 text-[#C89D5C]" />
                      <span>Dining Preference</span>
                    </h4>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { key: 'Delivery', label: '🛵 Delivery' },
                        { key: 'Dine-In', label: '🍽️ Dine-in' },
                        { key: 'Takeaway', label: '🛍️ Takeaway' },
                      ].map((t) => (
                        <button
                          key={t.key}
                          type="button"
                          onClick={() => setOrderType(t.key as any)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border text-center ${
                            orderType === t.key
                              ? 'bg-[#2A1810] text-[#C89D5C] border-[#2A1810]'
                              : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>

                    {orderType === 'Delivery' && (
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Delivery Address / Landmark (Kathmandu)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Pipalbot, near Central Bank, 2nd Floor"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-[#C89D5C] focus:bg-white"
                        />
                      </div>
                    )}

                    {orderType === 'Dine-In' && (
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Table Number (if seated)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Table 3"
                          value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value)}
                          className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-[#C89D5C] focus:bg-white"
                        />
                      </div>
                    )}
                  </div>

                  {/* Payment Preference */}
                  <div className="space-y-3 pt-2 border-t border-stone-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-700">Payment Method</span>
                      <div className="flex items-center gap-3 text-xs">
                        <label className="flex items-center gap-1.5 cursor-pointer font-medium text-stone-800">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === 'Cash'}
                            onChange={() => setPaymentMethod('Cash')}
                            className="text-[#C89D5C]"
                          />
                          <span>Cash on Delivery / Counter</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer font-medium text-stone-800">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === 'Fonepay (QR)'}
                            onChange={() => setPaymentMethod('Fonepay (QR)')}
                            className="text-[#C89D5C]"
                          />
                          <span>Fonepay / QR</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Special instructions (e.g., Less sugar, extra ice, chilli sauce on side)"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-[#C89D5C] focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Subtotal & Confirm Button */}
                  <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] text-stone-500 block">Total Amount to Pay</span>
                      <span className="text-xl font-serif font-bold text-[#C89D5C]">
                        रू {subtotal.toLocaleString()}
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Place Order Now</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
