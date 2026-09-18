import React, { useState, useEffect } from 'react';
import { 
  Menu as MenuIcon, 
  Sun, 
  Moon, 
  Plus, 
  Search, 
  Clock, 
  Bell, 
  ShieldCheck, 
  LogOut, 
  ExternalLink, 
  Coffee, 
  X, 
  Phone, 
  MapPin, 
  Sparkles 
} from 'lucide-react';
import { 
  AdminViewTab, 
  MenuItem, 
  Category, 
  Order, 
  Customer, 
  Offer, 
  CafeService, 
  CafeSettings, 
  AdminProfile 
} from '../../types';
import { Sidebar } from './Sidebar';
import { OverviewView } from './views/OverviewView';
import { OrdersView } from './views/OrdersView';
import { MenuView } from './views/MenuView';
import { CustomersView } from './views/CustomersView';
import { OffersView } from './views/OffersView';
import { ServicesView } from './views/ServicesView';
import { AnalyticsView } from './views/AnalyticsView';
import { SettingsView } from './views/SettingsView';
import { ConfirmationModal } from './ConfirmationModal';

interface AdminDashboardLayoutProps {
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
  services: CafeService[];
  setServices: React.Dispatch<React.SetStateAction<CafeService[]>>;
  settings: CafeSettings;
  setSettings: React.Dispatch<React.SetStateAction<CafeSettings>>;
  adminProfile: AdminProfile;
  setAdminProfile: React.Dispatch<React.SetStateAction<AdminProfile>>;
  adminPassword: string;
  setAdminPassword: React.Dispatch<React.SetStateAction<string>>;
  onLogout: () => void;
  onResetAllData: () => void;
  onExportData: () => void;
}

export const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({
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
  services,
  setServices,
  settings,
  setSettings,
  adminProfile,
  setAdminProfile,
  adminPassword,
  setAdminPassword,
  onLogout,
  onResetAllData,
  onExportData,
}) => {
  const [activeTab, setActiveTab] = useState<AdminViewTab>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isPublicPreviewOpen, setIsPublicPreviewOpen] = useState(false);
  
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('sip_cafe_theme') as 'light' | 'dark') || 'light';
  });

  // Realtime Kathmandu clock
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

  // Sync theme class to html root
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('sip_cafe_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Pending orders count for notifications & badges
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;

  // --- Handlers for Menu Items ---
  const handleSaveMenuItem = (item: MenuItem) => {
    setMenuItems(prev => {
      const exists = prev.some(i => i.id === item.id);
      if (exists) {
        return prev.map(i => (i.id === item.id ? item : i));
      }
      return [item, ...prev];
    });
  };

  const handleDeleteMenuItem = (itemId: string) => {
    setMenuItems(prev => prev.filter(i => i.id !== itemId));
  };

  const handleToggleAvailability = (itemId: string) => {
    setMenuItems(prev =>
      prev.map(i => (i.id === itemId ? { ...i, is_available: !i.is_available } : i))
    );
  };

  const handleTogglePopular = (itemId: string) => {
    setMenuItems(prev =>
      prev.map(i => (i.id === itemId ? { ...i, is_popular: !i.is_popular } : i))
    );
  };

  // --- Handlers for Orders ---
  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleAddNewOrder = (newOrderData: Omit<Order, 'id'>) => {
    const newOrder: Order = {
      ...newOrderData,
      id: `ord-${Date.now()}`
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  // --- Handlers for Customers ---
  const handleUpdateCustomer = (customer: Customer) => {
    setCustomers(prev =>
      prev.map(c => (c.id === customer.id ? customer : c))
    );
  };

  const handleAddNewCustomer = (customer: Customer) => {
    setCustomers(prev => [customer, ...prev]);
  };

  // --- Handlers for Offers ---
  const handleSaveOffer = (offer: Offer) => {
    setOffers(prev => {
      const exists = prev.some(o => o.id === offer.id);
      if (exists) {
        return prev.map(o => (o.id === offer.id ? offer : o));
      }
      return [offer, ...prev];
    });
  };

  const handleDeleteOffer = (offerId: string) => {
    setOffers(prev => prev.filter(o => o.id !== offerId));
  };

  const handleToggleOfferStatus = (offerId: string) => {
    setOffers(prev =>
      prev.map(o => (o.id === offerId ? { ...o, isActive: !o.isActive } : o))
    );
  };

  // --- Handlers for Services ---
  const handleSaveService = (service: CafeService) => {
    setServices(prev => {
      const exists = prev.some(s => s.id === service.id);
      if (exists) {
        return prev.map(s => (s.id === service.id ? service : s));
      }
      return [...prev, service];
    });
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(prev => prev.filter(s => s.id !== serviceId));
  };

  const handleToggleService = (serviceId: string) => {
    setServices(prev =>
      prev.map(s => (s.id === serviceId ? { ...s, isActive: !s.isActive } : s))
    );
  };

  // Quick toggle cafe open/close status
  const handleToggleCafeOpen = () => {
    setSettings(prev => ({
      ...prev,
      is_force_closed: !prev.is_force_closed
    }));
  };

  const isCafeOpen = !settings.is_force_closed;

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#120B07] text-stone-900 dark:text-stone-100 flex transition-colors duration-200">
      {/* Permanent / Responsive Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        pendingOrdersCount={pendingOrdersCount}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onLogout={() => setIsLogoutModalOpen(true)}
        isCafeOpen={isCafeOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#1C140E]/90 backdrop-blur-md border-b border-stone-200 dark:border-[#3D281B] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 lg:hidden cursor-pointer"
              aria-label="Open sidebar menu"
            >
              <MenuIcon className="w-5 h-5" />
            </button>

            {/* Quick Status Pill */}
            <button
              onClick={handleToggleCafeOpen}
              className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                isCafeOpen
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800'
              }`}
              title="Click to toggle store open/closed status"
            >
              <span className={`w-2 h-2 rounded-full ${isCafeOpen ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              <span>{isCafeOpen ? 'Store Open' : 'Store Closed'}</span>
            </button>

            {/* Public announcement banner indicator */}
            {settings.announcement_enabled && settings.announcement_text && (
              <span className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-300/60 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300 truncate max-w-xs font-medium">
                <Sparkles className="w-3 h-3 text-[#C89D5C] shrink-0" />
                <span className="truncate">"{settings.announcement_text}"</span>
              </span>
            )}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Real-time Clock */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-mono text-stone-600 dark:text-stone-300">
              <Clock className="w-3.5 h-3.5 text-[#C89D5C]" />
              <span>{currentTime || 'Kathmandu, NP'}</span>
            </div>

            {/* View Public Preview Button ("and 1 thinl only me control and view the public") */}
            <button
              onClick={() => setIsPublicPreviewOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-[#C89D5C] hover:text-[#1C140E] text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Preview what customers see on the public side"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">View Public View</span>
            </button>

            {/* Quick Action: New Order */}
            <button
              onClick={() => setActiveTab('orders')}
              className="px-3.5 py-1.5 rounded-xl bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Order</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
            </button>

            {/* Profile Avatar */}
            <div 
              onClick={() => setActiveTab('settings')}
              className="flex items-center gap-2 pl-2 border-l border-stone-200 dark:border-stone-800 cursor-pointer"
              title="Admin Profile & Settings"
            >
              <div className="w-8 h-8 rounded-xl bg-[#2A1810] text-[#C89D5C] font-serif font-bold text-xs flex items-center justify-center border border-[#C89D5C]/40 shadow-xs">
                {adminProfile.name.charAt(0)}
              </div>
              <div className="hidden md:block text-left text-xs">
                <div className="font-bold text-stone-900 dark:text-stone-100 leading-tight">
                  {adminProfile.name}
                </div>
                <div className="text-[10px] text-[#C89D5C] font-medium leading-none">
                  {adminProfile.role}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {activeTab === 'overview' && (
            <OverviewView
              orders={orders}
              menuItems={menuItems}
              customers={customers}
              offers={offers}
              settings={settings}
              onNavigate={(tab) => setActiveTab(tab as AdminViewTab)}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onAddNewOrder={() => setActiveTab('orders')}
              onAddNewMenuItem={() => setActiveTab('menu')}
              onAddNewOffer={() => setActiveTab('offers')}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersView
              orders={orders}
              menuItems={menuItems}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onAddNewOrder={handleAddNewOrder}
              onDeleteOrder={handleDeleteOrder}
            />
          )}

          {activeTab === 'menu' && (
            <MenuView
              menuItems={menuItems}
              categories={categories}
              onSaveMenuItem={handleSaveMenuItem}
              onDeleteMenuItem={handleDeleteMenuItem}
              onToggleAvailability={handleToggleAvailability}
              onTogglePopular={handleTogglePopular}
            />
          )}

          {activeTab === 'customers' && (
            <CustomersView
              customers={customers}
              orders={orders}
              onUpdateCustomer={handleUpdateCustomer}
              onAddNewCustomer={handleAddNewCustomer}
            />
          )}

          {activeTab === 'offers' && (
            <OffersView
              offers={offers}
              onSaveOffer={handleSaveOffer}
              onDeleteOffer={handleDeleteOffer}
              onToggleOfferStatus={handleToggleOfferStatus}
            />
          )}

          {activeTab === 'services' && (
            <ServicesView
              services={services}
              onSaveService={handleSaveService}
              onDeleteService={handleDeleteService}
              onToggleService={handleToggleService}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView
              orders={orders}
              menuItems={menuItems}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              settings={settings}
              adminProfile={adminProfile}
              adminPassword={adminPassword}
              theme={theme}
              onSaveSettings={setSettings}
              onSaveAdminProfile={setAdminProfile}
              onChangePassword={setAdminPassword}
              onToggleTheme={toggleTheme}
              onResetAllData={onResetAllData}
              onExportData={onExportData}
            />
          )}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        title="Sign Out of Admin?"
        message="Are you sure you want to end your current session? You will need to enter the admin password (sipcafe9090) to re-access the dashboard."
        confirmText="Yes, Logout"
        cancelText="Stay Logged In"
        onConfirm={() => {
          setIsLogoutModalOpen(false);
          onLogout();
        }}
        onCancel={() => setIsLogoutModalOpen(false)}
      />

      {/* Public Customer Preview Modal */}
      {isPublicPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF7F2] dark:bg-[#150E0A] border border-stone-200 dark:border-stone-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col text-stone-900 dark:text-stone-100">
            {/* Top Bar */}
            <div className="p-4 bg-white dark:bg-[#1C140E] border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#C89D5C] text-[#1C140E] font-serif font-black flex items-center justify-center text-sm">
                  S
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm leading-tight">
                    Public Storefront View Preview
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    Live reflection of your menu, prices, and announcements as seen by customers
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPublicPreviewOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Preview Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Broadcast banner */}
              {settings.announcement_enabled && settings.announcement_text && (
                <div className="p-3 bg-[#FAF3E8] dark:bg-[#2A1810] border border-[#C89D5C] rounded-2xl text-center text-xs font-semibold text-[#8C6228] dark:text-[#E3C38C] flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C89D5C]" />
                  <span>{settings.announcement_text}</span>
                </div>
              )}

              {/* Cafe Header Card */}
              <div className="p-6 bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C89D5C]">
                      Pipalbot, Kathmandu
                    </span>
                    <h2 className="text-3xl font-serif font-bold mt-1 text-stone-900 dark:text-stone-100">
                      {settings.cafe_name}
                    </h2>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-md leading-relaxed">
                      {settings.about_text}
                    </p>
                  </div>

                  <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 text-xs space-y-1.5 shrink-0">
                    <div className="flex items-center gap-2 font-semibold">
                      <span className={`w-2 h-2 rounded-full ${isCafeOpen ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      <span>{isCafeOpen ? `Open Today: ${settings.opening_time} - ${settings.closing_time}` : 'Currently Closed'}</span>
                    </div>
                    <div className="text-[11px] text-stone-500 flex items-center gap-1.5 font-mono">
                      <Phone className="w-3 h-3 text-[#C89D5C]" />
                      <span>{settings.phone} / {settings.secondary_phone}</span>
                    </div>
                    <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#C89D5C]" />
                      <span>{settings.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Special Offers */}
              {offers.filter(o => o.isActive).length > 0 && (
                <div>
                  <h4 className="font-serif font-bold text-base mb-3">Live Offers & Discounts</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {offers.filter(o => o.isActive).map(offer => (
                      <div key={offer.id} className="p-4 bg-white dark:bg-[#1C140E] rounded-2xl border border-[#C89D5C]/40 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-xs">{offer.title}</div>
                          <div className="text-[11px] text-stone-400">{offer.description}</div>
                          <div className="text-[10px] text-stone-500 mt-1">Code: <span className="font-mono font-bold text-[#C89D5C]">{offer.code}</span></div>
                        </div>
                        <span className="text-sm font-serif font-bold text-[#C89D5C]">
                          {offer.discountType === 'percentage' ? `${offer.discountValue}% OFF` : `रू ${offer.discountValue} OFF`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Public Menu Items Preview */}
              <div>
                <h4 className="font-serif font-bold text-base mb-3">Menu Catalog (In Stock Items)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {menuItems.filter(i => i.is_available).map(item => (
                    <div key={item.id} className="p-3 bg-white dark:bg-[#1C140E] rounded-2xl border border-stone-200 dark:border-stone-800 flex items-center gap-3">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-stone-400 line-clamp-1">
                          {item.description}
                        </div>
                        <div className="text-xs font-serif font-bold text-[#C89D5C] mt-1">
                          रू {item.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="p-4 bg-white dark:bg-[#1C140E] border-t border-stone-200 dark:border-stone-800 flex justify-end">
              <button
                onClick={() => setIsPublicPreviewOpen(false)}
                className="px-5 py-2 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold"
              >
                Return to Admin Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
