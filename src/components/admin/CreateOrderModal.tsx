import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  Check,
  User,
  Phone,
  DollarSign,
  FileText,
  MapPin,
  Coffee,
} from 'lucide-react';
import { MenuItem, Category, Customer, Order, OrderItem } from '../../types';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  categories: Category[];
  customers: Customer[];
  onSaveOrder: (order: Order, openWhatsApp?: boolean) => void;
}

export const CreateOrderModal: React.FC<CreateOrderModalProps> = ({
  isOpen,
  onClose,
  menuItems,
  categories,
  customers,
  onSaveOrder,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderType, setOrderType] = useState<'Dine-In' | 'Takeaway' | 'Delivery'>('Dine-In');
  const [tableNumber, setTableNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Fonepay (QR)' | 'Card'>('Cash');
  const [paymentStatus, setPaymentStatus] = useState<'Paid' | 'Unpaid'>('Unpaid');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [notes, setNotes] = useState('');

  // Selected items: { [itemId]: quantity }
  const [selectedItems, setSelectedItems] = useState<{ [itemId: string]: number }>({});

  // Custom ad-hoc line item
  const [showCustomItemForm, setShowCustomItemForm] = useState(false);
  const [customItemName, setCustomItemName] = useState('');
  const [customItemPrice, setCustomItemPrice] = useState('');
  const [customItems, setCustomItems] = useState<OrderItem[]>([]);

  // Search & filter for menu item picker
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  if (!isOpen) return null;

  // Filter items
  const filteredItems = menuItems.filter((item) => {
    const matchesCat = selectedCat === 'all' || item.category_id === selectedCat;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.price.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Calculate order items list
  const standardOrderItems: OrderItem[] = Object.entries(selectedItems)
    .filter(([_, qty]) => qty > 0)
    .map(([itemId, qty]) => {
      const item = menuItems.find((m) => m.id === itemId);
      const priceNum = item ? parseInt(item.price.replace(/\D/g, ''), 10) || 150 : 150;
      return {
        itemId,
        name: item?.name || 'Cafe Item',
        unitPrice: priceNum,
        totalPrice: priceNum * qty,
        quantity: qty,
      };
    });

  const allOrderItems = [...standardOrderItems, ...customItems];
  const subtotal = allOrderItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalAmount = Math.max(0, subtotal - (Number(discountAmount) || 0));

  const handleAddCustomItem = () => {
    if (!customItemName.trim() || !customItemPrice.trim()) return;
    const priceNum = parseInt(customItemPrice.replace(/\D/g, ''), 10) || 0;
    if (priceNum <= 0) return;

    setCustomItems((prev) => [
      ...prev,
      {
        itemId: `custom-${Date.now()}`,
        name: customItemName.trim(),
        unitPrice: priceNum,
        totalPrice: priceNum,
        quantity: 1,
      },
    ]);
    setCustomItemName('');
    setCustomItemPrice('');
    setShowCustomItemForm(false);
  };

  const handleSelectCustomerPreset = (c: Customer) => {
    setCustomerName(c.name);
    setCustomerPhone(c.phone);
  };

  const handleSubmit = (openWhatsApp: boolean = false) => {
    if (allOrderItems.length === 0) {
      alert('Please select at least one item or add a custom item to the order.');
      return;
    }

    const orderId = `ORD-${Date.now().toString().slice(-4)}`;
    const currentTimeStr = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kathmandu',
    });

    const combinedNotes = [
      notes.trim(),
      orderType === 'Delivery' && deliveryAddress.trim() ? `Address: ${deliveryAddress.trim()}` : '',
    ]
      .filter(Boolean)
      .join(' | ');

    const newOrder: Order = {
      id: orderId,
      orderNumber: `#${orderId}`,
      customerName: customerName.trim() || 'Walk-in Guest',
      customerPhone: customerPhone.trim() || '98XXXXXXXX',
      orderType,
      tableNumber: orderType === 'Dine-In' && tableNumber.trim() ? tableNumber.trim() : undefined,
      items: allOrderItems,
      subtotal,
      discount: Number(discountAmount) || 0,
      totalAmount,
      status: 'Pending',
      paymentStatus,
      paymentMethod,
      notes: combinedNotes || undefined,
      createdAt: currentTimeStr,
    };

    onSaveOrder(newOrder, openWhatsApp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-4 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-[#C89D5C] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900">
                Create New Order
              </h3>
              <p className="text-[11px] text-stone-500">
                Add walk-in, phone, WhatsApp, or table orders into active queue
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="overflow-y-auto space-y-5 pr-1 flex-1">
          {/* Section 1: Customer Details */}
          <div className="p-4 bg-stone-50/80 rounded-2xl border border-stone-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#C89D5C]" />
                Customer Information
              </span>
              {customers.length > 0 && (
                <div className="text-[10px] text-stone-500">
                  Quick select from {customers.length} saved customers
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Dipesh Shrestha"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">
                  Phone / WhatsApp Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g., 98XXXXXXXX"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
                />
              </div>
            </div>

            {/* Quick Customer Chips */}
            {customers.length > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5">
                <span className="text-[10px] text-stone-400 font-semibold shrink-0">Recent:</span>
                {customers.slice(0, 5).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelectCustomerPreset(c)}
                    className="px-2 py-0.5 rounded-lg bg-white border border-stone-200 text-[10px] font-semibold text-stone-600 hover:border-[#C89D5C] hover:text-[#C89D5C] transition-colors shrink-0"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Order Type, Table & Delivery */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Dining Option
              </label>
              <select
                value={orderType}
                onChange={(e) => setOrderType(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:border-[#C89D5C] focus:outline-hidden"
              >
                <option value="Dine-In">🍽️ Dine-In (Table)</option>
                <option value="Takeaway">🛍️ Takeaway / Pickup</option>
                <option value="Delivery">🛵 Delivery</option>
              </select>
            </div>

            {orderType === 'Dine-In' && (
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Table Number
                </label>
                <input
                  type="text"
                  placeholder="e.g., Table 4"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
                />
              </div>
            )}

            {orderType === 'Delivery' && (
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Delivery Address / Landmark
                </label>
                <input
                  type="text"
                  placeholder="e.g., Near Pipalbot Chowk, House 24"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
                />
              </div>
            )}

            {orderType === 'Takeaway' && (
              <div className="flex items-center text-xs text-stone-500 pt-5">
                <span>Packaged for takeaway counter</span>
              </div>
            )}
          </div>

          {/* Section 3: Item Selection & Order Cart */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <Coffee className="w-3.5 h-3.5 text-[#C89D5C]" />
                Select Menu Items
              </label>

              <button
                type="button"
                onClick={() => setShowCustomItemForm(!showCustomItemForm)}
                className="text-[11px] font-bold text-[#C89D5C] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>+ Custom Item / Extra Charge</span>
              </button>
            </div>

            {/* Custom Item Quick Form */}
            {showCustomItemForm && (
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Item Name (e.g., Extra Espresso Shot)"
                  value={customItemName}
                  onChange={(e) => setCustomItemName(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg text-xs"
                />
                <div className="w-28 relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400">
                    रू
                  </span>
                  <input
                    type="number"
                    placeholder="Price"
                    value={customItemPrice}
                    onChange={(e) => setCustomItemPrice(e.target.value)}
                    className="w-full pl-6 pr-2 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-bold"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddCustomItem}
                  className="px-3 py-1.5 bg-[#2A1810] text-[#C89D5C] rounded-lg text-xs font-bold shrink-0"
                >
                  Add Item
                </button>
              </div>
            )}

            {/* Search & Category Filter */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search item by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
                />
              </div>

              <select
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                className="px-2.5 py-1.5 bg-white border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden shrink-0"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Menu Items List Box */}
            <div className="max-h-52 overflow-y-auto border border-stone-200 rounded-2xl divide-y divide-stone-100 bg-white">
              {filteredItems.length === 0 ? (
                <div className="p-4 text-center text-xs text-stone-400">
                  No menu items found matching "{searchQuery}"
                </div>
              ) : (
                filteredItems.map((item) => {
                  const qty = selectedItems[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className={`p-2.5 px-3 flex items-center justify-between transition-colors ${
                        qty > 0 ? 'bg-amber-50/40' : 'hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-9 h-9 rounded-lg object-cover shrink-0 border border-stone-100"
                        />
                        <div className="min-w-0">
                          <span className="font-bold text-xs text-stone-900 block truncate">
                            {item.name}
                          </span>
                          <span className="text-[11px] font-serif font-bold text-[#C89D5C]">
                            रू {item.price}
                          </span>
                        </div>
                      </div>

                      {/* +/- quantity controls */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {qty > 0 ? (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedItems((prev) => ({
                                  ...prev,
                                  [item.id]: Math.max(0, (prev[item.id] || 0) - 1),
                                }));
                              }}
                              className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center font-bold text-stone-700 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center font-bold text-xs text-stone-900">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedItems((prev) => ({
                                  ...prev,
                                  [item.id]: (prev[item.id] || 0) + 1,
                                }));
                              }}
                              className="w-7 h-7 rounded-lg bg-[#2A1810] hover:bg-[#3D281B] text-[#C89D5C] flex items-center justify-center font-bold cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedItems((prev) => ({
                                ...prev,
                                [item.id]: 1,
                              }));
                            }}
                            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-[#2A1810] hover:text-[#C89D5C] text-stone-700 text-xs font-bold transition-colors cursor-pointer"
                          >
                            + Add
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Custom items list if any added */}
            {customItems.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-stone-600 block">Custom Charges:</span>
                {customItems.map((ci, idx) => (
                  <div
                    key={ci.itemId}
                    className="flex items-center justify-between p-2 bg-stone-50 rounded-xl text-xs"
                  >
                    <span className="font-semibold text-stone-800">{ci.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#C89D5C]">रू {ci.totalPrice}</span>
                      <button
                        type="button"
                        onClick={() => setCustomItems((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-stone-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 4: Payment & Notes */}
          <div className="p-4 bg-stone-50/80 rounded-2xl border border-stone-200/80 space-y-3">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#C89D5C]" />
              Payment & Settlement
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:border-[#C89D5C] focus:outline-hidden"
                >
                  <option value="Cash">💵 Cash on Counter</option>
                  <option value="Fonepay (QR)">📲 Fonepay / QR Code</option>
                  <option value="Card">💳 Credit / Debit Card</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">
                  Payment Status
                </label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:border-[#C89D5C] focus:outline-hidden"
                >
                  <option value="Unpaid">⏳ Unpaid (Collect later)</option>
                  <option value="Paid">✅ Paid (Settled)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">
                  Discount (रू)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={discountAmount || ''}
                  onChange={(e) => setDiscountAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">
                Order Remarks / Barista Notes
              </label>
              <input
                type="text"
                placeholder="e.g., Less sugar, extra hot, send with extra tissue..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer: Totals & Submit */}
        <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-500">
              {allOrderItems.reduce((s, i) => s + i.quantity, 0)} items selected
            </span>
            <div className="text-lg font-serif font-bold text-stone-900">
              Total: <span className="text-[#C89D5C]">रू {totalAmount}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => handleSubmit(false)}
              className="flex-1 sm:flex-none px-4 py-2 bg-[#2A1810] hover:bg-[#3D281B] text-[#C89D5C] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save Order</span>
            </button>

            <button
              type="button"
              onClick={() => handleSubmit(true)}
              className="flex-1 sm:flex-none px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Save & Send WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
