import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Calendar, 
  ArrowUpRight, 
  Coffee, 
  CreditCard,
  QrCode,
  Banknote
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { Order, MenuItem } from '../../../types';

interface AnalyticsViewProps {
  orders: Order[];
  menuItems: MenuItem[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ orders, menuItems }) => {
  const [timeRange, setTimeRange] = useState<'7days' | 'month' | 'today'>('7days');

  // Weekly Revenue Sample Data
  const weeklySalesData = [
    { day: 'Sun', sales: 12400, orders: 34 },
    { day: 'Mon', sales: 9800, orders: 26 },
    { day: 'Tue', sales: 11200, orders: 31 },
    { day: 'Wed', sales: 10450, orders: 29 },
    { day: 'Thu', sales: 13800, orders: 38 },
    { day: 'Fri', sales: 16900, orders: 48 },
    { day: 'Sat', sales: 19450, orders: 56 },
  ];

  // Category Distribution
  const categoryData = [
    { name: 'Cold Coffee', value: 48, color: '#C89D5C' },
    { name: 'Snacks & Momo', value: 32, color: '#D97706' },
    { name: 'Hot Coffee', value: 12, color: '#854D0E' },
    { name: 'Beverages & Teas', value: 8, color: '#059669' },
  ];

  // Peak Hours Traffic
  const peakHoursData = [
    { hour: '7 AM', visits: 12 },
    { hour: '9 AM', visits: 28 },
    { hour: '11 AM', visits: 42 },
    { hour: '1 PM', visits: 68 },
    { hour: '3 PM', visits: 54 },
    { hour: '5 PM', visits: 76 },
    { hour: '7 PM', visits: 62 },
    { hour: '8:30 PM', visits: 24 },
  ];

  // Payment Breakdown
  const paymentBreakdown = [
    { method: 'Fonepay (QR)', percentage: 65, icon: QrCode, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40' },
    { method: 'Cash', percentage: 25, icon: Banknote, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40' },
    { method: 'Card', percentage: 10, icon: CreditCard, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40' },
  ];

  const totalCalculatedSales = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const avgOrderValue = Math.round(totalCalculatedSales / (orders.length || 1));

  return (
    <div className="space-y-6">
      {/* Header & Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
            Sales & Revenue Analytics
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Financial trends, top selling cold brews & momo, and peak customer traffic hours
          </p>
        </div>

        {/* Time Selector */}
        <div className="flex items-center gap-1 p-1 bg-stone-200/70 dark:bg-stone-800 rounded-xl">
          <button
            onClick={() => setTimeRange('today')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              timeRange === 'today'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setTimeRange('7days')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              timeRange === '7days'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              timeRange === 'month'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
              रू {totalCalculatedSales.toLocaleString()}
            </span>
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+18.4% vs last week</span>
          </p>
        </div>

        <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Average Ticket (AOV)
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
              रू {avgOrderValue}
            </span>
          </div>
          <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-1">
            Approx 2.4 items per ticket
          </p>
        </div>

        <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Digital QR Ratio
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
              65%
            </span>
          </div>
          <p className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold mt-1">
            Fonepay & mobile banking
          </p>
        </div>

        <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Customer Retention
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
              74%
            </span>
          </div>
          <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold mt-1">
            Returning Kathmandu regulars
          </p>
        </div>
      </div>

      {/* Revenue Over Time Chart */}
      <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
              Weekly Revenue Trajectory
            </h3>
            <p className="text-xs text-stone-400">Daily gross revenue in Nepali Rupees (रू)</p>
          </div>
          <div className="text-xs font-bold text-[#C89D5C] bg-[#FAF3E8] dark:bg-[#2A1810] px-3 py-1 rounded-full border border-[#C89D5C]/30 self-start">
            Peak Day: Saturday (रू 19,450)
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklySalesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C89D5C" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#C89D5C" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="day" stroke="#888888" fontSize={11} tickLine={false} />
              <YAxis stroke="#888888" fontSize={11} tickLine={false} tickFormatter={(v) => `रू${v/1000}k`} />
              <Tooltip
                formatter={(value: any) => [`रू ${Number(value).toLocaleString()}`, 'Revenue']}
                contentStyle={{ 
                  backgroundColor: '#1C140E', 
                  borderRadius: '12px', 
                  border: '1px solid #3D281B', 
                  color: '#FAF7F2',
                  fontSize: '12px'
                }}
              />
              <Area type="monotone" dataKey="sales" stroke="#C89D5C" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Section: Category Distribution & Peak Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 mb-1">
              Sales by Menu Category
            </h3>
            <p className="text-xs text-stone-400 mb-4">Volume breakdown across beverage and food stations</p>

            <div className="h-56 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: any) => [`${v}%`, 'Share']}
                    contentStyle={{ 
                      backgroundColor: '#1C140E', 
                      borderRadius: '12px', 
                      border: '1px solid #3D281B', 
                      color: '#FAF7F2',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 text-xs">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                <span className="text-stone-600 dark:text-stone-400 truncate">{cat.name}:</span>
                <span className="font-bold text-stone-900 dark:text-stone-100">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Hours Traffic */}
        <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 mb-1">
              Peak Hours Traffic (Kathmandu Time)
            </h3>
            <p className="text-xs text-stone-400 mb-4">Guest footfall and dine-in patterns throughout the day</p>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peakHoursData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="hour" stroke="#888888" fontSize={10} tickLine={false} />
                  <YAxis stroke="#888888" fontSize={10} tickLine={false} />
                  <Tooltip
                    formatter={(v: any) => [`${v} guests`, 'Traffic']}
                    contentStyle={{ 
                      backgroundColor: '#1C140E', 
                      borderRadius: '12px', 
                      border: '1px solid #3D281B', 
                      color: '#FAF7F2',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="visits" fill="#C89D5C" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500 mt-4 pt-4 border-t border-stone-100 dark:border-stone-800">
            <span>Peak Hour: <strong>5:00 PM – 7:00 PM</strong> (Evening Social & Coffee)</span>
            <span className="text-[#C89D5C] font-semibold">Terrace is 90% occupied</span>
          </div>
        </div>
      </div>

      {/* Payment Methods Split */}
      <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-xs">
        <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 mb-1">
          Settlement & Payment Channels
        </h3>
        <p className="text-xs text-stone-400 mb-4">How customers pay at Sip Café register</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentBreakdown.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.method}
                className="p-4 rounded-2xl bg-stone-50 dark:bg-[#150E0A] border border-stone-200 dark:border-stone-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-stone-900 dark:text-stone-100">{item.method}</div>
                    <div className="text-[10px] text-stone-400">Instant Verification</div>
                  </div>
                </div>
                <div className="text-right font-serif font-bold text-base text-[#C89D5C]">
                  {item.percentage}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
