import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Phone, 
  Mail, 
  Calendar, 
  ShoppingBag, 
  TrendingUp, 
  Eye, 
  Plus, 
  X, 
  Heart,
  Star
} from 'lucide-react';
import { Customer, Order } from '../../../types';

interface CustomersViewProps {
  customers: Customer[];
  orders: Order[];
  onUpdateCustomer: (customer: Customer) => void;
  onAddNewCustomer: (customer: Customer) => void;
}

export const CustomersView: React.FC<CustomersViewProps> = ({
  customers,
  orders,
  onUpdateCustomer,
  onAddNewCustomer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCustomer, setActiveCustomer] = useState<Customer | null>(null);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);

  // Add customer form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [favoriteItem, setFavoriteItem] = useState('Lutte (Iced Latte)');

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please provide customer name and phone.');
      return;
    }

    const newCust: Customer = {
      id: `cust-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      totalOrders: 1,
      totalSpent: 450,
      lastOrderDate: new Date().toISOString().split('T')[0],
      joinedDate: new Date().toISOString().split('T')[0],
      notes: notes.trim() || 'New guest at Sip Café.',
      favoriteItem: favoriteItem.trim()
    };

    onAddNewCustomer(newCust);
    setIsAddCustomerOpen(false);
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
  };

  // Get orders associated with customer by matching phone or name
  const getCustomerOrders = (customer: Customer) => {
    return orders.filter(
      o => o.customerPhone === customer.phone || o.customerName.toLowerCase() === customer.name.toLowerCase()
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
            Customer Directory
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            View customer order histories, lifetime value, and notes for regulars
          </p>
        </div>

        <button
          onClick={() => setIsAddCustomerOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Customer Profile</span>
        </button>
      </div>

      {/* Search & Stats Bar */}
      <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
            <Users className="w-4 h-4 text-[#C89D5C]" />
            <span>{customers.length} Registered Guests</span>
          </div>
          <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Avg Spend: रू {Math.round(customers.reduce((a, c) => a + c.totalSpent, 0) / (customers.length || 1))}</span>
          </div>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search by customer name, phone, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C89D5C]"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/50 text-stone-500 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Customer Name</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Total Orders</th>
                <th className="py-3.5 px-4">Total Spent (रू)</th>
                <th className="py-3.5 px-4">Favorite Drink / Dish</th>
                <th className="py-3.5 px-4">Last Visit</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-stone-900 dark:text-stone-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#FAF3E8] dark:bg-[#2A1810] text-[#C89D5C] font-serif font-bold flex items-center justify-center border border-[#C89D5C]/30 text-xs">
                        {cust.name.charAt(0)}
                      </div>
                      <div>
                        <div>{cust.name}</div>
                        <div className="text-[10px] font-normal text-stone-400">Joined: {cust.joinedDate}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-stone-800 dark:text-stone-200 flex items-center gap-1 font-mono">
                      <Phone className="w-3 h-3 text-[#C89D5C]" />
                      <span>{cust.phone}</span>
                    </div>
                    <div className="text-[10px] text-stone-400 truncate max-w-[140px]">{cust.email}</div>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-stone-900 dark:text-stone-100">
                    <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold">
                      {cust.totalOrders} orders
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">
                    रू {cust.totalSpent.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md text-[11px] bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-medium">
                      {cust.favoriteItem || 'Cold Brew'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-stone-500">
                    {cust.lastOrderDate}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setActiveCustomer(cust)}
                      className="px-2.5 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-[#C89D5C] hover:text-[#1C140E] text-stone-700 dark:text-stone-300 text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Order History</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail / Order History Modal */}
      {activeCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 text-stone-900 dark:text-stone-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <div>
                <h3 className="font-serif font-bold text-xl">{activeCustomer.name}</h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Guest since {activeCustomer.joinedDate} • {activeCustomer.totalOrders} total orders placed
                </p>
              </div>
              <button
                onClick={() => setActiveCustomer(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                <div className="text-[10px] uppercase font-bold text-stone-400">Total Spend</div>
                <div className="text-base font-serif font-bold text-[#C89D5C] mt-1">रू {activeCustomer.totalSpent}</div>
              </div>
              <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                <div className="text-[10px] uppercase font-bold text-stone-400">Total Visits</div>
                <div className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">{activeCustomer.totalOrders}</div>
              </div>
              <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                <div className="text-[10px] uppercase font-bold text-stone-400">Favorite</div>
                <div className="text-xs font-bold text-stone-900 dark:text-stone-100 mt-1 truncate">{activeCustomer.favoriteItem}</div>
              </div>
            </div>

            {/* Notes */}
            <div className="p-3 bg-[#FAF7F2] dark:bg-[#140D09] rounded-xl border border-stone-200 dark:border-stone-800 text-xs">
              <div className="font-semibold text-stone-700 dark:text-stone-300 mb-1">Barista Notes:</div>
              <p className="text-stone-600 dark:text-stone-400 italic leading-relaxed">
                "{activeCustomer.notes || 'No special notes logged.'}"
              </p>
            </div>

            {/* Order History */}
            <div>
              <h4 className="font-serif font-bold text-sm mb-2">Order History</h4>
              <div className="space-y-2">
                {getCustomerOrders(activeCustomer).length === 0 ? (
                  <div className="p-4 text-center text-xs text-stone-400 bg-stone-50 dark:bg-stone-900 rounded-xl">
                    Historical orders are archived.
                  </div>
                ) : (
                  getCustomerOrders(activeCustomer).map((order) => (
                    <div
                      key={order.id}
                      className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold">{order.orderNumber} ({order.orderType})</div>
                        <div className="text-stone-400 text-[11px]">
                          {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold font-serif">रू {order.totalAmount}</div>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{order.status}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveCustomer(null)}
                className="px-4 py-2 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {isAddCustomerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 text-stone-900 dark:text-stone-100">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="font-serif font-bold text-xl">Add New Customer</h3>
              <button
                onClick={() => setIsAddCustomerOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Phone Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 9841234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. guest@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Favorite Item</label>
                <input
                  type="text"
                  placeholder="e.g. Iced Lutte / Chicken Momo"
                  value={favoriteItem}
                  onChange={(e) => setFavoriteItem(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Preferences & Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Always asks for extra ice, prefers takeaway cup..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsAddCustomerOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] text-xs font-bold uppercase tracking-wider"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
