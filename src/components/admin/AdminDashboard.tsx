import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Store,
  Clock,
  LogOut,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ShoppingBag,
  Coffee,
  DollarSign,
  Users,
  Settings as SettingsIcon,
  Tag,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Bell,
  Sparkles,
  Phone,
  Save,
  RefreshCw,
  Percent,
  Check,
  X,
  FileText
} from 'lucide-react';
import {
  Category,
  MenuItem,
  CafeSettings,
  Order,
  Customer,
  Offer,
  OrderStatus
} from '../../types';
import { ConfirmationModal } from './ConfirmationModal';

interface AdminDashboardProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  offers: Offer[];
  setOffers: React.Dispatch<React.SetStateAction<Offer[]>>;
  settings: CafeSettings;
  setSettings: React.Dispatch<React.SetStateAction<CafeSettings>>;
  onExitToWebsite: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  categories,
  setCategories,
  menuItems,
  setMenuItems,
  orders,
  setOrders,
  customers,
  setCustomers,
  offers,
  setOffers,
  settings,
  setSettings,
  onExitToWebsite,
  onLogout,
}) => {
  // Navigation tab
  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'orders' | 'settings' | 'offers'>('overview');

  // Real-time clock in Asia/Kathmandu
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          timeZone: 'Asia/Kathmandu',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Modals state
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(null);

  // Search & Filter in Menu
  const [menuSearch, setMenuSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // New Item Form State
  const [newItemForm, setNewItemForm] = useState<Partial<MenuItem>>({
    name: '',
    price: '',
    description: '',
    category_id: categories[0]?.id || 'cat-coffee',
    is_available: true,
    is_popular: false,
    dietary: 'beverage',
    image_url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
  });

  // Store Settings Form State
  const [tempSettings, setTempSettings] = useState<CafeSettings>({ ...settings });
  const [settingsSavedMessage, setSettingsSavedMessage] = useState('');

  // Update temp settings if prop changes
  useEffect(() => {
    setTempSettings({ ...settings });
  }, [settings]);

  // Order filters
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Quick toggle cafe open/close status
  const handleToggleCafeOpen = () => {
    setSettings(prev => ({
      ...prev,
      is_force_closed: !prev.is_force_closed,
    }));
  };

  const isCafeOpen = !settings.is_force_closed;

  // Toggle item availability
  const handleToggleItemAvailability = (id: string) => {
    setMenuItems(prev =>
      prev.map(item => (item.id === id ? { ...item, is_available: !item.is_available } : item))
    );
  };

  // Toggle item popular
  const handleToggleItemPopular = (id: string) => {
    setMenuItems(prev =>
      prev.map(item => (item.id === id ? { ...item, is_popular: !item.is_popular } : item))
    );
  };

  // Delete item
  const handleConfirmDeleteItem = () => {
    if (itemToDelete) {
      setMenuItems(prev => prev.filter(item => item.id !== itemToDelete));
      setItemToDelete(null);
    }
  };

  // Save new item
  const handleCreateMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemForm.name || !newItemForm.price) return;

    const created: MenuItem = {
      id: `item-${Date.now()}`,
      name: newItemForm.name,
      price: newItemForm.price,
      description: newItemForm.description || '',
      category_id: newItemForm.category_id || categories[0]?.id || 'cat-coffee',
      image_url: newItemForm.image_url || 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
      is_available: newItemForm.is_available ?? true,
      is_popular: newItemForm.is_popular ?? false,
      dietary: newItemForm.dietary || 'beverage',
      created_at: new Date().toISOString(),
    };

    setMenuItems(prev => [created, ...prev]);
    setIsAddingNewItem(false);
    setNewItemForm({
      name: '',
      price: '',
      description: '',
      category_id: categories[0]?.id || 'cat-coffee',
      is_available: true,
      is_popular: false,
      dietary: 'beverage',
      image_url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
    });
  };

  // Save edited item
  const handleSaveEditedItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setMenuItems(prev =>
      prev.map(item => (item.id === editingItem.id ? editingItem : item))
    );
    setEditingItem(null);
  };

  // Update order status
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Save settings
  const handleSaveCafeSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings(tempSettings);
    setSettingsSavedMessage('Cafe settings & announcement updated successfully!');
    setTimeout(() => setSettingsSavedMessage(''), 3000);
  };

  // Calculate metrics
  const totalSales = orders
    .filter(o => o.status === 'Completed' || o.paymentStatus === 'Paid')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingOrders = orders.filter(o => o.status === 'Pending');
  const activeOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Preparing');

  // Filtered menu items
  const filteredMenuItems = menuItems.filter(item => {
    const matchesCategory = selectedCategoryFilter === 'all' || item.category_id === selectedCategoryFilter;
    const matchesSearch = item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(menuSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filtered orders
  const filteredOrders = orders.filter(order => {
    if (orderStatusFilter === 'all') return true;
    return order.status === orderStatusFilter;
  });

  return (
    <div className="min-h-screen bg-[#F5F2EC] text-stone-900 flex flex-col font-sans">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-[#1C140E] text-white border-b border-[#3D281B] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#C89D5C] text-[#1C140E] font-serif font-black flex items-center justify-center text-base shadow-xs">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-bold text-base text-[#FAF7F2] leading-none">
                SIP CAFE Owner Portal
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-[#C89D5C]/20 text-[#C89D5C] text-[10px] font-bold tracking-wider uppercase border border-[#C89D5C]/40">
                Authorized
              </span>
            </div>
            <p className="text-[11px] text-stone-400 mt-0.5 font-medium">
              Pipalbot, Kathmandu · Administrative Management
            </p>
          </div>
        </div>

        {/* Center/Right Controls */}
        <div className="flex items-center flex-wrap gap-2.5 sm:gap-3">
          {/* Real-time Clock */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-stone-300">
            <Clock className="w-3.5 h-3.5 text-[#C89D5C]" />
            <span>{currentTime || 'Kathmandu, NP'}</span>
          </div>

          {/* Quick Store Open/Closed Toggle */}
          <button
            onClick={handleToggleCafeOpen}
            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
              isCafeOpen
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/50'
                : 'bg-rose-950/60 text-rose-300 border-rose-500/50'
            }`}
            title="Click to toggle store open/closed status"
          >
            <span className={`w-2 h-2 rounded-full ${isCafeOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
            <span>{isCafeOpen ? 'Store: OPEN' : 'Store: CLOSED'}</span>
          </button>

          {/* THE KEY BUTTON: "Back to Live Website" */}
          <button
            onClick={onExitToWebsite}
            className="px-3.5 py-1.5 rounded-xl bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Return to the public website storefront view"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>View Live Website</span>
          </button>

          {/* Logout button */}
          <button
            onClick={onLogout}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border border-white/5"
            title="Sign out of owner portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Navigation Sub-bar */}
      <nav className="bg-white border-b border-stone-200 px-4 sm:px-8 py-2 overflow-x-auto shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#2A1810] text-[#C89D5C]'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Overview & Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'menu'
                ? 'bg-[#2A1810] text-[#C89D5C]'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span>Menu & Prices ({menuItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap relative ${
              activeTab === 'orders'
                ? 'bg-[#2A1810] text-[#C89D5C]'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
            {pendingOrders.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-black text-[10px] font-black">
                {pendingOrders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-[#2A1810] text-[#C89D5C]'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            <span>Store Settings & Banner</span>
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'offers'
                ? 'bg-[#2A1810] text-[#C89D5C]'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Percent className="w-4 h-4" />
            <span>Offers & Discounts</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* ======================= TAB: OVERVIEW ======================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 text-xs font-semibold mb-2">
                  <span>Total Sales (Settled)</span>
                  <DollarSign className="w-4 h-4 text-[#C89D5C]" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  रू {totalSales.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-600 font-medium mt-1">
                  Active register revenue
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 text-xs font-semibold mb-2">
                  <span>Pending Orders</span>
                  <ShoppingBag className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  {pendingOrders.length}
                </div>
                <div className="text-[11px] text-amber-600 font-medium mt-1">
                  Requires barista action
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 text-xs font-semibold mb-2">
                  <span>Menu Items Live</span>
                  <Coffee className="w-4 h-4 text-[#C89D5C]" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  {menuItems.filter(i => i.is_available).length}
                  <span className="text-xs font-sans text-stone-400 font-normal"> / {menuItems.length} total</span>
                </div>
                <div className="text-[11px] text-stone-500 font-medium mt-1">
                  Across {categories.length} categories
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 text-xs font-semibold mb-2">
                  <span>Cafe Status</span>
                  <Store className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${isCafeOpen ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  <span>{isCafeOpen ? 'Open Now' : 'Closed'}</span>
                </div>
                <div className="text-[11px] text-stone-500 font-medium mt-1">
                  {settings.opening_time} – {settings.closing_time}
                </div>
              </div>
            </div>

            {/* Quick Actions and Announcement Banner Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions Column */}
              <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-4">
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('menu');
                      setIsAddingNewItem(true);
                    }}
                    className="p-3 bg-stone-50 hover:bg-stone-100 rounded-2xl border border-stone-200 text-left transition-all cursor-pointer"
                  >
                    <Plus className="w-5 h-5 text-[#C89D5C] mb-1.5" />
                    <div className="text-xs font-bold text-stone-900">Add Menu Item</div>
                    <div className="text-[10px] text-stone-400">Add drink, momo or food</div>
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className="p-3 bg-stone-50 hover:bg-stone-100 rounded-2xl border border-stone-200 text-left transition-all cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5 text-amber-500 mb-1.5" />
                    <div className="text-xs font-bold text-stone-900">Broadcast Banner</div>
                    <div className="text-[10px] text-stone-400">Update announcement</div>
                  </button>

                  <button
                    onClick={handleToggleCafeOpen}
                    className="p-3 bg-stone-50 hover:bg-stone-100 rounded-2xl border border-stone-200 text-left transition-all cursor-pointer"
                  >
                    <Store className="w-5 h-5 text-blue-500 mb-1.5" />
                    <div className="text-xs font-bold text-stone-900">Toggle Open/Close</div>
                    <div className="text-[10px] text-stone-400">Currently {isCafeOpen ? 'Open' : 'Closed'}</div>
                  </button>

                  <button
                    onClick={onExitToWebsite}
                    className="p-3 bg-[#FAF3E8] hover:bg-[#F5E8D4] rounded-2xl border border-[#C89D5C]/40 text-left transition-all cursor-pointer"
                  >
                    <Eye className="w-5 h-5 text-[#C89D5C] mb-1.5" />
                    <div className="text-xs font-bold text-stone-900">Live Website</div>
                    <div className="text-[10px] text-stone-500">Preview as customer</div>
                  </button>
                </div>
              </div>

              {/* Active Orders List */}
              <div className="lg:col-span-2 p-6 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-stone-900">
                      Recent Orders Queue
                    </h3>
                    <p className="text-xs text-stone-400">Live kitchen & counter orders</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-[#C89D5C] font-bold hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="divide-y divide-stone-100">
                  {orders.slice(0, 4).map(order => (
                    <div key={order.id} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-stone-900">{order.customerName}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-mono">
                            {order.orderNumber}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            order.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                            order.status === 'Preparing' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'Ready' ? 'bg-purple-100 text-purple-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="text-xs text-stone-500 mt-1">
                          {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs font-serif font-bold text-stone-900">
                          रू {order.totalAmount}
                        </div>
                        <button
                          onClick={() => setSelectedReceiptOrder(order)}
                          className="text-[10px] text-[#C89D5C] hover:underline font-medium"
                        >
                          View Receipt
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB: MENU MANAGEMENT ======================= */}
        {activeTab === 'menu' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Top Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-stone-200 shadow-xs">
              <div>
                <h2 className="font-serif font-bold text-xl text-stone-900">
                  Menu Items & Pricing
                </h2>
                <p className="text-xs text-stone-500">
                  Manage drinks, momos, appetizing bites, edit prices, and mark sold-out items
                </p>
              </div>

              <button
                onClick={() => setIsAddingNewItem(true)}
                className="px-4 py-2.5 rounded-xl bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Item</span>
              </button>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search item by name or ingredients..."
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-[#C89D5C]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                <button
                  onClick={() => setSelectedCategoryFilter('all')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategoryFilter === 'all'
                      ? 'bg-[#2A1810] text-[#C89D5C]'
                      : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  All Items ({menuItems.length})
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryFilter(cat.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                      selectedCategoryFilter === cat.id
                        ? 'bg-[#2A1810] text-[#C89D5C]'
                        : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMenuItems.map(item => (
                <div
                  key={item.id}
                  className={`p-4 bg-white rounded-2xl border transition-all shadow-xs flex flex-col justify-between gap-3 ${
                    item.is_available ? 'border-stone-200' : 'border-rose-200 bg-stone-50/70 opacity-80'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-100"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-sm text-stone-900 truncate">
                          {item.name}
                        </span>
                        {item.is_popular && (
                          <span className="px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold shrink-0">
                            ★ Popular
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-serif font-bold text-[#C89D5C] mt-0.5">
                        रू {item.price}
                      </div>

                      <p className="text-[11px] text-stone-500 line-clamp-2 mt-1 leading-snug">
                        {item.description || 'No description provided.'}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Status row */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2 text-xs">
                    {/* In Stock toggle */}
                    <button
                      onClick={() => handleToggleItemAvailability(item.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        item.is_available
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                      }`}
                      title="Toggle availability"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${item.is_available ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      <span>{item.is_available ? 'In Stock' : 'Sold Out'}</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleToggleItemPopular(item.id)}
                        className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                          item.is_popular ? 'text-amber-500 bg-amber-50' : 'text-stone-400 hover:text-stone-700'
                        }`}
                        title="Toggle customer favorite / popular"
                      >
                        ★
                      </button>

                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                        title="Edit item and price"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setItemToDelete(item.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= TAB: ORDERS ======================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
              <div>
                <h2 className="font-serif font-bold text-xl text-stone-900">
                  Customer Orders Pipeline
                </h2>
                <p className="text-xs text-stone-500">
                  Manage real-time counter, dine-in, takeaway and WhatsApp delivery orders
                </p>
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {(['all', 'Pending', 'Preparing', 'Ready', 'Completed'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setOrderStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      orderStatusFilter === status
                        ? 'bg-[#2A1810] text-[#C89D5C]'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {status === 'all' ? 'All Orders' : status}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-3">
              {filteredOrders.map(order => (
                <div
                  key={order.id}
                  className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-serif font-bold text-sm text-stone-900">
                        {order.customerName}
                      </span>
                      <span className="font-mono text-xs text-stone-400">
                        ({order.customerPhone})
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[11px] font-bold">
                        {order.orderType} {order.tableNumber ? `· Table ${order.tableNumber}` : ''}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        order.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                        order.status === 'Preparing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Ready' ? 'bg-purple-100 text-purple-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        ● {order.status}
                      </span>
                    </div>

                    <div className="text-xs text-stone-600">
                      {order.items.map(item => `${item.quantity}x ${item.name}`).join(' + ')}
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-stone-100">
                    <div className="text-left md:text-right">
                      <div className="text-base font-serif font-bold text-[#C89D5C]">
                        रू {order.totalAmount}
                      </div>
                      <div className="text-[10px] text-stone-400">
                        {order.paymentMethod} · {order.paymentStatus}
                      </div>
                    </div>

                    {/* Status Action Buttons */}
                    <div className="flex items-center gap-1.5">
                      {order.status === 'Pending' && (
                        <button
                          onClick={() => handleUpdateOrderStatus(order.id, 'Preparing')}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all"
                        >
                          Start Preparing
                        </button>
                      )}

                      {order.status === 'Preparing' && (
                        <button
                          onClick={() => handleUpdateOrderStatus(order.id, 'Ready')}
                          className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all"
                        >
                          Mark Ready
                        </button>
                      )}

                      {order.status === 'Ready' && (
                        <button
                          onClick={() => handleUpdateOrderStatus(order.id, 'Completed')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all"
                        >
                          Complete Order
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedReceiptOrder(order)}
                        className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                        title="View Thermal Receipt"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= TAB: STORE SETTINGS & BANNER ======================= */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-150">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
              <div>
                <h2 className="font-serif font-bold text-xl text-stone-900">
                  Cafe Settings & Public Announcement
                </h2>
                <p className="text-xs text-stone-500">
                  Update cafe operating details, phones, timings, and broadcast special announcements
                </p>
              </div>

              {settingsSavedMessage && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{settingsSavedMessage}</span>
                </div>
              )}

              <form onSubmit={handleSaveCafeSettings} className="space-y-5">
                {/* Announcement Banner Section */}
                <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#C89D5C]" />
                      <span className="font-serif font-bold text-sm text-stone-900">
                        Public Website Announcement Banner
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tempSettings.announcement_enabled ?? false}
                        onChange={(e) => setTempSettings(prev => ({ ...prev, announcement_enabled: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C89D5C]"></div>
                    </label>
                  </div>
                  <p className="text-xs text-stone-600">
                    Display a highlighted banner at the very top of the website for all visitors.
                  </p>
                  <input
                    type="text"
                    value={tempSettings.announcement_text || ''}
                    onChange={(e) => setTempSettings(prev => ({ ...prev, announcement_text: e.target.value }))}
                    placeholder="e.g., Special 15% discount on all iced coffees this weekend!"
                    className="w-full px-3.5 py-2.5 bg-white border border-amber-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-[#C89D5C]"
                  />
                </div>

                {/* Cafe Contacts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Primary Phone
                    </label>
                    <input
                      type="text"
                      value={tempSettings.phone}
                      onChange={(e) => setTempSettings(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-[#C89D5C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Secondary Phone
                    </label>
                    <input
                      type="text"
                      value={tempSettings.secondary_phone || ''}
                      onChange={(e) => setTempSettings(prev => ({ ...prev, secondary_phone: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-[#C89D5C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={tempSettings.whatsapp}
                      onChange={(e) => setTempSettings(prev => ({ ...prev, whatsapp: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-[#C89D5C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Physical Address
                    </label>
                    <input
                      type="text"
                      value={tempSettings.address}
                      onChange={(e) => setTempSettings(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-[#C89D5C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Opening Time
                    </label>
                    <input
                      type="text"
                      value={tempSettings.opening_time}
                      onChange={(e) => setTempSettings(prev => ({ ...prev, opening_time: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-[#C89D5C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Closing Time
                    </label>
                    <input
                      type="text"
                      value={tempSettings.closing_time}
                      onChange={(e) => setTempSettings(prev => ({ ...prev, closing_time: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-[#C89D5C]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save All Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ======================= TAB: OFFERS & DISCOUNTS ======================= */}
        {activeTab === 'offers' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex items-center justify-between">
              <div>
                <h2 className="font-serif font-bold text-xl text-stone-900">
                  Offers & Promo Codes
                </h2>
                <p className="text-xs text-stone-500">
                  Active discounts applicable on customer orders and bills
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {offers.map(offer => (
                <div key={offer.id} className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#C89D5C] bg-[#FAF3E8] px-2.5 py-1 rounded-md border border-[#C89D5C]/30">
                      {offer.code}
                    </span>
                    <span className="text-sm font-serif font-bold text-stone-900">
                      {offer.discountType === 'percentage' ? `${offer.discountValue}% OFF` : `रू ${offer.discountValue} OFF`}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-stone-900">{offer.title}</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">{offer.description}</p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                    <span>Min order: रू {offer.minOrderAmount}</span>
                    <span className={offer.isActive ? 'text-emerald-600 font-bold' : 'text-stone-400'}>
                      {offer.isActive ? '● Active' : '○ Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Delete Item Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!itemToDelete}
        title="Delete Menu Item?"
        message="Are you sure you want to delete this item from your menu? It will be removed from the catalog and website."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDeleteItem}
        onCancel={() => setItemToDelete(null)}
      />

      {/* Add New Item Modal */}
      {isAddingNewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-stone-900">Add New Menu Item</h3>
              <button onClick={() => setIsAddingNewItem(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMenuItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Item Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Iced Caramel Macchiato"
                  value={newItemForm.name}
                  onChange={(e) => setNewItemForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Price (रू)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 220 or 150/190"
                    value={newItemForm.price}
                    onChange={(e) => setNewItemForm(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Category</label>
                  <select
                    value={newItemForm.category_id}
                    onChange={(e) => setNewItemForm(prev => ({ ...prev, category_id: e.target.value }))}
                    className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden bg-white"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Item details, ingredients..."
                  value={newItemForm.description}
                  onChange={(e) => setNewItemForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newItemForm.image_url}
                  onChange={(e) => setNewItemForm(prev => ({ ...prev, image_url: e.target.value }))}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newItemForm.is_popular}
                    onChange={(e) => setNewItemForm(prev => ({ ...prev, is_popular: e.target.checked }))}
                    className="rounded text-[#C89D5C]"
                  />
                  <span>Mark as Popular</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newItemForm.is_available}
                    onChange={(e) => setNewItemForm(prev => ({ ...prev, is_available: e.target.checked }))}
                    className="rounded text-[#C89D5C]"
                  />
                  <span>In Stock</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddingNewItem(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] rounded-xl"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-stone-900">Edit Menu Item</h3>
              <button onClick={() => setEditingItem(null)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Item Name</label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Price (रू)</label>
                  <input
                    type="text"
                    required
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                    className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Category</label>
                  <select
                    value={editingItem.category_id}
                    onChange={(e) => setEditingItem({ ...editingItem, category_id: e.target.value })}
                    className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden bg-white"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={editingItem.image_url}
                  onChange={(e) => setEditingItem({ ...editingItem, image_url: e.target.value })}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.is_popular}
                    onChange={(e) => setEditingItem({ ...editingItem, is_popular: e.target.checked })}
                    className="rounded text-[#C89D5C]"
                  />
                  <span>Popular Item</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.is_available}
                    onChange={(e) => setEditingItem({ ...editingItem, is_available: e.target.checked })}
                    className="rounded text-[#C89D5C]"
                  />
                  <span>In Stock</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] rounded-xl"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Receipt View Modal */}
      {selectedReceiptOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-stone-900 font-mono text-xs">
            <div className="text-center border-b border-dashed border-stone-300 pb-3">
              <h4 className="font-serif font-bold text-base text-stone-900">SIP CAFE</h4>
              <p className="text-[11px] text-stone-500">Pipalbot, Kathmandu · 9767560484</p>
              <div className="mt-2 text-[10px] text-stone-400">
                {selectedReceiptOrder.orderNumber} · {selectedReceiptOrder.createdAt}
              </div>
            </div>

            <div className="space-y-2 border-b border-dashed border-stone-300 pb-3">
              <div className="flex justify-between font-bold">
                <span>Customer:</span>
                <span>{selectedReceiptOrder.customerName}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Type:</span>
                <span>{selectedReceiptOrder.orderType}</span>
              </div>
              <div className="pt-2 space-y-1">
                {selectedReceiptOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{item.quantity}x {item.name}</span>
                    <span>रू {item.totalPrice}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-1 border-b border-dashed border-stone-300 pb-3 font-bold">
              <div className="flex justify-between text-sm text-[#C89D5C]">
                <span>TOTAL:</span>
                <span>रू {selectedReceiptOrder.totalAmount}</span>
              </div>
              <div className="flex justify-between text-[10px] text-stone-500">
                <span>Payment:</span>
                <span>{selectedReceiptOrder.paymentMethod} ({selectedReceiptOrder.paymentStatus})</span>
              </div>
            </div>

            <div className="text-center text-[10px] text-stone-400">
              Thank you for visiting SIP CAFE!
            </div>

            <button
              onClick={() => setSelectedReceiptOrder(null)}
              className="w-full py-2 bg-stone-900 text-white rounded-xl text-xs font-bold"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
