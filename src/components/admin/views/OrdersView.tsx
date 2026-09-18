import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Printer, 
  Phone, 
  MapPin, 
  CreditCard, 
  Calendar,
  X,
  Coffee,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { Order, OrderStatus, MenuItem } from '../../../types';

interface OrdersViewProps {
  orders: Order[];
  menuItems: MenuItem[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onAddNewOrder: (newOrder: Omit<Order, 'id'>) => void;
  onDeleteOrder: (orderId: string) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  menuItems,
  onUpdateOrderStatus,
  onAddNewOrder,
  onDeleteOrder
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOrderDetails, setActiveOrderDetails] = useState<Order | null>(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  // New Order Form State
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newOrderType, setNewOrderType] = useState<'Dine-In' | 'Takeaway' | 'Delivery'>('Dine-In');
  const [newTableNumber, setNewTableNumber] = useState('Table 1');
  const [newPaymentMethod, setNewPaymentMethod] = useState<'Cash' | 'Fonepay (QR)' | 'Card'>('Fonepay (QR)');
  const [newOrderItems, setNewOrderItems] = useState<{ itemId: string; quantity: number }[]>([]);
  const [newNotes, setNewNotes] = useState('');

  // Filtering
  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const statusList: (OrderStatus | 'All')[] = ['All', 'Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'];

  const statusBadgeClasses: Record<OrderStatus, string> = {
    Pending: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-300 dark:border-amber-700',
    Preparing: 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border-blue-300 dark:border-blue-700',
    Ready: 'bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300 border-purple-300 dark:border-purple-700',
    Completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
    Cancelled: 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border-rose-300 dark:border-rose-700',
  };

  const handleAddItemToNewOrder = (itemId: string) => {
    const existing = newOrderItems.find(i => i.itemId === itemId);
    if (existing) {
      setNewOrderItems(newOrderItems.map(i => i.itemId === itemId ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setNewOrderItems([...newOrderItems, { itemId, quantity: 1 }]);
    }
  };

  const handleRemoveItemFromNewOrder = (itemId: string) => {
    const existing = newOrderItems.find(i => i.itemId === itemId);
    if (existing && existing.quantity > 1) {
      setNewOrderItems(newOrderItems.map(i => i.itemId === itemId ? { ...i, quantity: i.quantity - 1 } : i));
    } else {
      setNewOrderItems(newOrderItems.filter(i => i.itemId !== itemId));
    }
  };

  const handleCreateOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newOrderItems.length === 0) {
      alert('Please select at least one menu item.');
      return;
    }

    const calculatedItems = newOrderItems.map(item => {
      const menu = menuItems.find(m => m.id === item.itemId);
      const parsedPrice = parseInt(menu?.price.replace(/[^0-9]/g, '') || '180', 10);
      return {
        itemId: item.itemId,
        name: menu?.name || 'Cafe Item',
        quantity: item.quantity,
        unitPrice: parsedPrice,
        totalPrice: parsedPrice * item.quantity
      };
    });

    const subtotal = calculatedItems.reduce((acc, i) => acc + i.totalPrice, 0);

    const newOrderData: Omit<Order, 'id'> = {
      orderNumber: `#SIP-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: newCustomerName.trim() || 'Walk-in Guest',
      customerPhone: newCustomerPhone.trim() || '98XXXXXXXX',
      orderType: newOrderType,
      tableNumber: newOrderType === 'Dine-In' ? newTableNumber : undefined,
      items: calculatedItems,
      subtotal,
      discount: 0,
      totalAmount: subtotal,
      status: 'Pending',
      paymentStatus: 'Paid',
      paymentMethod: newPaymentMethod,
      createdAt: new Date().toISOString(),
      notes: newNotes.trim() || undefined
    };

    onAddNewOrder(newOrderData);
    setIsCreatingOrder(false);
    // Reset form
    setNewCustomerName('');
    setNewCustomerPhone('');
    setNewOrderItems([]);
    setNewNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
            Order Management
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Track, update status, and manage in-house dine-in & takeaway tickets
          </p>
        </div>

        <button
          onClick={() => setIsCreatingOrder(true)}
          className="px-4 py-2.5 rounded-xl bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Order Ticket</span>
        </button>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-2xl p-4 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {statusList.map((status) => {
              const count = status === 'All' 
                ? orders.length 
                : orders.filter(o => o.status === status).length;

              const isSelected = selectedStatus === status;
              return (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#2A1810] dark:bg-[#FAF7F2] text-white dark:text-[#1C140E] shadow-sm'
                      : 'bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  <span>{status}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isSelected 
                      ? 'bg-[#C89D5C] text-[#1C140E]' 
                      : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search by order #, name, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C89D5C]"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/50 text-stone-500 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Order #</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Items</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-stone-400">
                    <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="font-serif">No orders match the selected filter.</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-stone-900 dark:text-stone-100">
                      {order.orderNumber}
                      <div className="text-[10px] font-sans text-stone-400">
                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-stone-900 dark:text-stone-100">{order.customerName}</div>
                      <div className="text-[11px] text-stone-400 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-[#C89D5C]" />
                        <span>{order.customerPhone}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                        {order.orderType} {order.tableNumber ? `• ${order.tableNumber}` : ''}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-stone-800 dark:text-stone-200">
                        {order.items.map(i => `${i.quantity}x ${i.name}`).slice(0, 2).join(', ')}
                        {order.items.length > 2 && ` +${order.items.length - 2} more`}
                      </div>
                      <div className="text-[10px] text-stone-400">
                        {order.items.reduce((s, i) => s + i.quantity, 0)} total items
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-serif font-bold text-stone-900 dark:text-stone-100">
                      रू {order.totalAmount}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-[11px] font-medium text-stone-700 dark:text-stone-300">
                        <span className={`w-1.5 h-1.5 rounded-full ${order.paymentStatus === 'Paid' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <span>{order.paymentMethod}</span>
                      </div>
                      <span className="text-[10px] text-stone-400">{order.paymentStatus}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className={`text-[11px] font-bold border rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#C89D5C] cursor-pointer ${statusBadgeClasses[order.status]}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Ready">Ready</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setActiveOrderDetails(order)}
                        className="px-2.5 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-[#C89D5C] hover:text-[#1C140E] text-stone-700 dark:text-stone-300 text-[11px] font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
                        title="View Full Ticket"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Drawer / Modal */}
      {activeOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 text-stone-900 dark:text-stone-100 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-xl">
                    Order Ticket {activeOrderDetails.orderNumber}
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusBadgeClasses[activeOrderDetails.status]}`}>
                    {activeOrderDetails.status}
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-0.5">
                  Placed on {new Date(activeOrderDetails.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setActiveOrderDetails(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Location Info */}
            <div className="bg-[#FAF7F2] dark:bg-[#140D09] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">Customer:</span>
                <span className="font-bold">{activeOrderDetails.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Phone:</span>
                <span className="font-mono font-medium">{activeOrderDetails.customerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Order Format:</span>
                <span className="font-semibold text-[#C89D5C]">
                  {activeOrderDetails.orderType} {activeOrderDetails.tableNumber ? `(${activeOrderDetails.tableNumber})` : ''}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Payment:</span>
                <span className="font-semibold">
                  {activeOrderDetails.paymentMethod} • <span className="text-emerald-600 dark:text-emerald-400 font-bold">{activeOrderDetails.paymentStatus}</span>
                </span>
              </div>
              {activeOrderDetails.notes && (
                <div className="pt-2 border-t border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 italic">
                  Note: "{activeOrderDetails.notes}"
                </div>
              )}
            </div>

            {/* Order Items List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Items Ordered
              </h4>
              <div className="divide-y divide-stone-100 dark:divide-stone-800">
                {activeOrderDetails.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-[#FAF3E8] dark:bg-[#2A1810] text-[#C89D5C] font-bold flex items-center justify-center text-[11px]">
                        {item.quantity}x
                      </span>
                      <span className="font-medium text-stone-800 dark:text-stone-200">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold font-serif">रू {item.totalPrice}</div>
                      <div className="text-[10px] text-stone-400">@ रू {item.unitPrice}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal:</span>
                <span>रू {activeOrderDetails.subtotal}</span>
              </div>
              {activeOrderDetails.discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Discount:</span>
                  <span>- रू {activeOrderDetails.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-stone-900 dark:text-stone-100 pt-1.5 border-t border-stone-200 dark:border-stone-800 font-serif">
                <span>Total Amount:</span>
                <span className="text-[#C89D5C] text-lg">रू {activeOrderDetails.totalAmount}</span>
              </div>
            </div>

            {/* Status Change Action Buttons */}
            <div className="pt-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                Update Order Status
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {(['Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'] as OrderStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      onUpdateOrderStatus(activeOrderDetails.id, st);
                      setActiveOrderDetails({ ...activeOrderDetails, status: st });
                    }}
                    className={`py-2 px-1 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${
                      activeOrderDetails.status === st
                        ? 'bg-[#C89D5C] text-[#1C140E] border-[#C89D5C] shadow-sm font-extrabold'
                        : 'border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Print Simulation */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => alert(`Simulated printing thermal receipt for Order ${activeOrderDetails.orderNumber} to Sip Cafe Kitchen Printer.`)}
                className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Kitchen Ticket</span>
              </button>
              <button
                onClick={() => setActiveOrderDetails(null)}
                className="px-4 py-2 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create In-House Order Modal */}
      {isCreatingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 text-stone-900 dark:text-stone-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <div>
                <h3 className="font-serif font-bold text-xl">Create New Order Ticket</h3>
                <p className="text-xs text-stone-400">Add walk-in, dine-in, or takeaway order for Sip Café</p>
              </div>
              <button
                onClick={() => setIsCreatingOrder(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrderSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Customer Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={newCustomerName}
                    onChange={(e) => setNewCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9841234567"
                    value={newCustomerPhone}
                    onChange={(e) => setNewCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Order Type</label>
                  <select
                    value={newOrderType}
                    onChange={(e) => setNewOrderType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                  >
                    <option value="Dine-In">Dine-In</option>
                    <option value="Takeaway">Takeaway</option>
                    <option value="Delivery">Delivery</option>
                  </select>
                </div>

                {newOrderType === 'Dine-In' && (
                  <div>
                    <label className="font-semibold block mb-1">Table Number</label>
                    <input
                      type="text"
                      placeholder="e.g. Table 4 (Patio)"
                      value={newTableNumber}
                      onChange={(e) => setNewTableNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="font-semibold block mb-1">Payment Method</label>
                  <select
                    value={newPaymentMethod}
                    onChange={(e) => setNewPaymentMethod(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                  >
                    <option value="Fonepay (QR)">Fonepay (QR)</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                  </select>
                </div>
              </div>

              {/* Items Picker */}
              <div>
                <label className="font-semibold text-xs block mb-1.5">
                  Select Menu Items
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                  {menuItems.filter(m => m.is_available).map(item => {
                    const existing = newOrderItems.find(i => i.itemId === item.id);
                    return (
                      <div
                        key={item.id}
                        className={`p-2 rounded-xl border text-xs flex flex-col justify-between transition-all ${
                          existing 
                            ? 'bg-[#FAF3E8] dark:bg-[#2A1810] border-[#C89D5C]' 
                            : 'bg-white dark:bg-stone-800/60 border-stone-200 dark:border-stone-700'
                        }`}
                      >
                        <div>
                          <div className="font-bold truncate">{item.name}</div>
                          <div className="text-[11px] text-[#C89D5C] font-serif">रू {item.price}</div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-200/60 dark:border-stone-700/60">
                          {existing ? (
                            <div className="flex items-center gap-1.5 w-full justify-between">
                              <button
                                type="button"
                                onClick={() => handleRemoveItemFromNewOrder(item.id)}
                                className="w-5 h-5 rounded-md bg-stone-200 dark:bg-stone-700 flex items-center justify-center font-bold"
                              >
                                -
                              </button>
                              <span className="font-bold">{existing.quantity}</span>
                              <button
                                type="button"
                                onClick={() => handleAddItemToNewOrder(item.id)}
                                className="w-5 h-5 rounded-md bg-[#C89D5C] text-[#1C140E] flex items-center justify-center font-bold"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleAddItemToNewOrder(item.id)}
                              className="w-full py-1 text-[10px] uppercase tracking-wider font-bold rounded-lg bg-stone-100 dark:bg-stone-700 hover:bg-[#C89D5C] hover:text-[#1C140E] transition-colors"
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="font-semibold text-xs block mb-1">Special Preparation Instructions / Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Less sugar, extra ice, serve momo first..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-xs focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsCreatingOrder(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  Create Order Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
