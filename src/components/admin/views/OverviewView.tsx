import React from 'react';
import { 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle2, 
  Plus, 
  ArrowUpRight, 
  Coffee, 
  AlertCircle, 
  Sparkles,
  ExternalLink,
  Tag
} from 'lucide-react';
import { Order, MenuItem, Customer, Offer, CafeSettings, OrderStatus } from '../../../types';
import { getCafeOpenStatus } from '../../../utils/storage';

interface OverviewViewProps {
  orders: Order[];
  menuItems: MenuItem[];
  customers: Customer[];
  offers: Offer[];
  settings: CafeSettings;
  onNavigate: (tab: string) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onAddNewOrder: () => void;
  onAddNewMenuItem: () => void;
  onAddNewOffer: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  orders,
  menuItems,
  customers,
  offers,
  settings,
  onNavigate,
  onUpdateOrderStatus,
  onAddNewOrder,
  onAddNewMenuItem,
  onAddNewOffer
}) => {
  const cafeStatus = getCafeOpenStatus(settings.opening_time, settings.closing_time, settings.is_force_closed);

  // Computed Metrics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending');
  const preparingOrders = orders.filter(o => o.status === 'Preparing');
  const completedOrders = orders.filter(o => o.status === 'Completed');
  
  // Today's total sales
  const todaySales = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const activeOffersCount = offers.filter(o => o.isActive).length;
  const activeMenuCount = menuItems.filter(m => m.is_available).length;

  const statusColors: Record<OrderStatus, string> = {
    Pending: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    Preparing: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300 dark:border-blue-800',
    Ready: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300 dark:border-purple-800',
    Completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    Cancelled: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-800',
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Welcome Banner & Quick Bar */}
      <div className="bg-gradient-to-r from-[#2A1810] via-[#3B2215] to-[#24130A] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-[#C89D5C]/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C89D5C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase ${
                cafeStatus.isOpen 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}>
                <span className={`w-2 h-2 rounded-full ${cafeStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                {cafeStatus.currentStatusText}
              </span>
              <span className="text-xs text-stone-300">
                Kathmandu Local Time
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#FAF7F2]">
              Sip Café Command Center
            </h1>
            <p className="text-sm text-[#D7C9B8] mt-1 max-w-xl">
              {settings.address} • Operating hours: {settings.opening_time} to {settings.closing_time}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onAddNewOrder}
              className="px-4 py-2.5 rounded-xl bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Order</span>
            </button>
            <button
              onClick={onAddNewMenuItem}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-white/20 transition-colors cursor-pointer"
            >
              <Coffee className="w-4 h-4 text-[#C89D5C]" />
              <span>Add Item</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Orders */}
        <div 
          onClick={() => onNavigate('orders')}
          className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-2xl p-5 hover:border-[#C89D5C]/50 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Total Orders
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
              {totalOrders}
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center">
              +12% today
            </span>
          </div>
          <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-1">
            Across Dine-in & Takeaway
          </p>
        </div>

        {/* Today's Sales */}
        <div 
          onClick={() => onNavigate('analytics')}
          className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-2xl p-5 hover:border-[#C89D5C]/50 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Today's Sales
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
              रू {todaySales.toLocaleString()}
            </span>
          </div>
          <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-1">
            Nepali Rupee (NPR)
          </p>
        </div>

        {/* Total Customers */}
        <div 
          onClick={() => onNavigate('customers')}
          className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-2xl p-5 hover:border-[#C89D5C]/50 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Total Customers
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
              {customers.length}
            </span>
            <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
              Verified Profiles
            </span>
          </div>
          <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-1">
            Loyalty & contact history
          </p>
        </div>

        {/* Pending Orders */}
        <div 
          onClick={() => onNavigate('orders')}
          className={`bg-white dark:bg-[#1C140E] border rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer group ${
            pendingOrders.length > 0 
              ? 'border-amber-300 dark:border-amber-700/70 bg-amber-50/20' 
              : 'border-stone-200 dark:border-stone-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Pending Orders
            </span>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
              pendingOrders.length > 0
                ? 'bg-amber-500 text-white animate-pulse'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-400'
            }`}>
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-amber-900 dark:text-amber-200">
              {pendingOrders.length}
            </span>
            {pendingOrders.length > 0 && (
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                Needs attention
              </span>
            )}
          </div>
          <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-1">
            {preparingOrders.length} currently preparing
          </p>
        </div>

        {/* Completed Orders */}
        <div 
          onClick={() => onNavigate('orders')}
          className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-2xl p-5 hover:border-[#C89D5C]/50 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Completed Orders
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
              {completedOrders.length}
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              Fulfilled
            </span>
          </div>
          <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-1">
            100% order accuracy
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Section (2 Cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
                Recent Orders
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Live incoming orders from dine-in tables & takeaways
              </p>
            </div>
            <button
              onClick={() => onNavigate('orders')}
              className="text-xs font-bold text-[#C89D5C] hover:underline flex items-center gap-1"
            >
              <span>View all orders</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-400 uppercase tracking-wider font-semibold">
                  <th className="pb-3 font-semibold">Order</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Type</th>
                  <th className="pb-3 font-semibold">Amount</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/30 transition-colors">
                    <td className="py-3.5 font-medium text-stone-900 dark:text-stone-100">
                      <div>{order.orderNumber}</div>
                      <div className="text-[10px] text-stone-400">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </div>
                    </td>
                    <td className="py-3.5">
                      <div className="font-semibold text-stone-800 dark:text-stone-200">{order.customerName}</div>
                      <div className="text-[10px] text-stone-400">{order.customerPhone}</div>
                    </td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                        {order.orderType} {order.tableNumber ? `(${order.tableNumber})` : ''}
                      </span>
                    </td>
                    <td className="py-3.5 font-semibold text-stone-900 dark:text-stone-100">
                      रू {order.totalAmount}
                    </td>
                    <td className="py-3.5">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="text-[11px] font-semibold bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg px-2 py-1 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-1 focus:ring-[#C89D5C]"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Ready">Ready</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Insights & Offers Summary (1 Col) */}
        <div className="space-y-6">
          {/* Active Offers & Discounts Card */}
          <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#C89D5C]" />
                <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100">
                  Active Offers & Deals
                </h3>
              </div>
              <button
                onClick={() => onNavigate('offers')}
                className="text-xs font-bold text-[#C89D5C] hover:underline"
              >
                Manage ({activeOffersCount})
              </button>
            </div>

            <div className="space-y-3">
              {offers.slice(0, 3).map((offer) => (
                <div 
                  key={offer.id}
                  className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#150E0A] border border-stone-200/80 dark:border-stone-800 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-stone-900 dark:text-stone-100">
                        {offer.title}
                      </span>
                      {offer.isActive ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                      )}
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                      Code: <span className="font-bold text-[#C89D5C]">{offer.code}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-stone-900 dark:text-stone-100">
                      {offer.discountType === 'percentage' ? `${offer.discountValue}%` : `रू ${offer.discountValue}`} OFF
                    </span>
                    <div className="text-[10px] text-stone-400">
                      {offer.timesUsed} used
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onAddNewOffer}
              className="w-full mt-4 py-2 px-3 border border-dashed border-[#C89D5C]/60 hover:border-[#C89D5C] text-[#C89D5C] hover:bg-[#C89D5C]/5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Discount Deal</span>
            </button>
          </div>

          {/* Menu Snapshot */}
          <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#C89D5C]" />
                <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100">
                  Top Menu Items
                </h3>
              </div>
              <button
                onClick={() => onNavigate('menu')}
                className="text-xs font-bold text-[#C89D5C] hover:underline"
              >
                All Items ({menuItems.length})
              </button>
            </div>

            <div className="space-y-3">
              {menuItems.slice(0, 4).map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-11 h-11 rounded-xl object-cover border border-stone-200 dark:border-stone-700 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                        {item.name}
                      </span>
                      {item.is_popular && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold">
                          HOT
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#C89D5C] font-semibold">
                      रू {item.price}
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                    item.is_available 
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' 
                      : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                  }`}>
                    {item.is_available ? 'In Stock' : 'Sold Out'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
