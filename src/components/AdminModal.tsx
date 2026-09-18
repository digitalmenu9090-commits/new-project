import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  RotateCcw,
  Upload,
  Check,
  AlertCircle,
  Sliders,
  Sparkles,
  Phone,
  Clock,
  Eye,
  EyeOff,
  Download,
  Search,
  CheckCircle2,
  XCircle,
  Star,
  MapPin,
  Shield,
  Coffee,
  LayoutDashboard,
  Utensils,
  FolderTree,
  Settings as SettingsIcon,
  Image as ImageIcon,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { MenuItem, Category, CafeSettings, GalleryItem } from '../types';
import { resetAllToDefault, getCafeOpenStatus } from '../utils/storage';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  settings: CafeSettings;
  setSettings: React.Dispatch<React.SetStateAction<CafeSettings>>;
  gallery: GalleryItem[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
  isAdminLoggedIn?: boolean;
  setIsAdminLoggedIn?: (val: boolean) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  categories,
  setCategories,
  menuItems,
  setMenuItems,
  settings,
  setSettings,
  gallery,
  setGallery,
  isAdminLoggedIn,
  setIsAdminLoggedIn,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('sip_cafe_admin_logged_in') === 'true';
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active Tab: Overview by default
  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'categories' | 'settings' | 'hero' | 'gallery'>('overview');

  // Menu Items Filters
  const [menuSearch, setMenuSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Edit State for Menu Items
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isNewItem, setIsNewItem] = useState(false);

  // Edit State for Categories
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isNewCategory, setIsNewCategory] = useState(false);

  // Gallery Add Item State
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState('Coffee');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  // Notification Toast
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Sync external prop if provided
  React.useEffect(() => {
    if (isAdminLoggedIn !== undefined) {
      setIsAuthenticated(isAdminLoggedIn);
    }
  }, [isAdminLoggedIn]);

  // Handle Login: Password must strictly be 'sipcafe9090'
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === 'sipcafe9090') {
      setIsAuthenticated(true);
      localStorage.setItem('sip_cafe_admin_logged_in', 'true');
      setIsAdminLoggedIn?.(true);
      setAuthError('');
      setPassword('');
      showNotification('Administrator verified. Full website controls unlocked.');
    } else {
      setAuthError('Incorrect admin password. Access restricted to Sip Café management.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('sip_cafe_admin_logged_in');
    setIsAdminLoggedIn?.(false);
    setPassword('');
    showNotification('Logged out from admin control.');
  };

  // File Upload Helper
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (base64: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      showNotification('File size exceeds 15MB. Please choose a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      if (typeof reader.result === 'string') {
        const base64 = reader.result;
        callback(base64);

        try {
          await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64 })
          });
        } catch {
          // Ignore offline errors
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // --- MENU ACTIONS ---
  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (isNewItem) {
      const newItem: MenuItem = {
        ...editingItem,
        id: `item-${Date.now()}`,
        created_at: new Date().toISOString()
      };
      setMenuItems((prev) => [newItem, ...prev]);
      showNotification(`Added item "${newItem.name}"`);
    } else {
      setMenuItems((prev) =>
        prev.map((i) => (i.id === editingItem.id ? editingItem : i))
      );
      showNotification(`Updated item "${editingItem.name}"`);
    }
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setMenuItems((prev) => prev.filter((i) => i.id !== id));
      showNotification(`Deleted item "${name}"`);
    }
  };

  const handleToggleAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, is_available: !i.is_available } : i))
    );
    showNotification('Item availability updated');
  };

  const handleTogglePopular = (id: string) => {
    setMenuItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, is_popular: !i.is_popular } : i))
    );
    showNotification('Item popular badge updated');
  };

  // --- CATEGORY ACTIONS ---
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    if (isNewCategory) {
      const newCat: Category = {
        ...editingCategory,
        id: `cat-${Date.now()}`,
        sort_order: categories.length + 1
      };
      setCategories((prev) => [...prev, newCat]);
      showNotification(`Added category "${newCat.name}"`);
    } else {
      setCategories((prev) =>
        prev.map((c) => (c.id === editingCategory.id ? editingCategory : c))
      );
      showNotification(`Updated category "${editingCategory.name}"`);
    }
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id: string, name: string) => {
    if (window.confirm(`Delete category "${name}"? Items inside this category will remain.`)) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      showNotification(`Deleted category "${name}"`);
    }
  };

  // --- GALLERY ACTIONS ---
  const handleAddGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryUrl.trim()) return;

    const newItem: GalleryItem = {
      id: `g-${Date.now()}`,
      title: newGalleryTitle || 'Sip Cafe Experience',
      category: newGalleryCategory,
      image_url: newGalleryUrl,
      aspect: 'square'
    };

    setGallery((prev) => [newItem, ...prev]);
    setNewGalleryTitle('');
    setNewGalleryUrl('');
    showNotification('New photo added to gallery');
  };

  const handleDeleteGallery = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
    showNotification('Gallery item removed');
  };

  // --- RESET ALL ---
  const handleReset = () => {
    if (window.confirm('Reset menu, categories, and settings back to default authentic Kathmandu source data? Custom edits will be re-initialized.')) {
      resetAllToDefault();
      window.location.reload();
    }
  };

  // Export JSON backup
  const handleExportJSON = () => {
    const exportData = {
      categories,
      menuItems,
      settings,
      gallery,
      exportedAt: new Date().toISOString()
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sip-cafe-full-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('Full website backup downloaded');
  };

  // Filtered Menu Items
  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = selectedCategoryFilter === 'all' || item.category_id === selectedCategoryFilter;
      const matchesSearch =
        !menuSearch.trim() ||
        item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
        item.description.toLowerCase().includes(menuSearch.toLowerCase()) ||
        item.price.includes(menuSearch);
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, selectedCategoryFilter, menuSearch]);

  // Current Cafe Status
  const currentStatus = getCafeOpenStatus(
    settings.opening_time,
    settings.closing_time,
    settings.is_force_closed
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#FAF7F2] w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl border border-[#E8DFC8] flex flex-col max-h-[95vh]">
        {/* Top Header Bar */}
        <div className="bg-[#1C140E] text-[#FAF7F2] px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-[#C89D5C]/30 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#2A1810] border border-[#C89D5C] flex items-center justify-center text-[#C89D5C] shadow-xs">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base sm:text-lg tracking-wider text-[#FAF7F2]">
                  SIP CAFÉ ADMIN DASHBOARD
                </h3>
                {isAuthenticated && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Full Access
                  </span>
                )}
              </div>
              <span className="text-[10px] text-[#C89D5C] uppercase tracking-widest block">
                Exclusive Control Center · Pipalbot, Kathmandu
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated && (
              <>
                {/* VIEW PUBLIC WEBSITE BUTTON */}
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                  title="Close dashboard and view the live website as customers see it"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">View Public Website</span>
                  <span className="sm:hidden">Public</span>
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="text-xs text-rose-300 hover:text-rose-100 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/40 border border-rose-800/40 transition-colors"
                  title="Logout from Admin"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              aria-label="Close Dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Floating Notification Toast */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-emerald-800 text-white text-xs px-6 py-2.5 flex items-center gap-2 font-medium flex-shrink-0 shadow-sm border-b border-emerald-700"
            >
              <Check className="w-4 h-4 text-emerald-300" />
              <span>{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* SECURE LOGIN SCREEN */
          <div className="p-6 sm:p-12 flex flex-col items-center justify-center text-center my-auto min-h-[420px]">
            <div className="w-16 h-16 rounded-2xl bg-[#2A1810] border border-[#C89D5C] flex items-center justify-center text-[#C89D5C] mb-4 shadow-xl">
              <Lock className="w-8 h-8" />
            </div>

            <h4 className="text-2xl font-serif font-bold text-[#1C1917] mb-2">
              Sip Café Administrator Access
            </h4>
            <p className="text-sm text-[#57534E] max-w-md mb-6 leading-relaxed">
              Enter the authorized owner password to manage website menu items, live prices in रू, store timings, and public announcements.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 text-left">
              {authError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#2A1810] uppercase tracking-wider mb-1.5">
                  Admin Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter admin password"
                    autoFocus
                    className="w-full pl-4 pr-10 py-3 bg-white border border-[#D9CEBE] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C89D5C]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#2A1810] hover:bg-[#3D2314] text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md mt-2 flex items-center justify-center gap-2 active:scale-98"
              >
                <Lock className="w-4 h-4 text-[#C89D5C]" />
                <span>Enter Admin Dashboard</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 text-stone-500 hover:text-stone-800 text-xs font-medium text-center transition-colors"
              >
                ← Return to Public Website
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED FULL ADMIN DASHBOARD */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Navigation Tabs */}
            <div className="bg-[#EFE8DD] border-b border-[#E8DFC8] px-4 sm:px-6 py-2 flex items-center justify-between overflow-x-auto flex-shrink-0 gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {[
                  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                  { id: 'menu', label: `Menu Items (${menuItems.length})`, icon: Utensils },
                  { id: 'categories', label: `Categories (${categories.length})`, icon: FolderTree },
                  { id: 'settings', label: 'Cafe Settings', icon: SettingsIcon },
                  { id: 'hero', label: 'Hero & Photos', icon: ImageIcon },
                  { id: 'gallery', label: `Gallery (${gallery.length})`, icon: Layers },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as any);
                        setEditingItem(null);
                        setEditingCategory(null);
                      }}
                      className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#2A1810] text-[#FAF7F2] shadow-sm'
                          : 'text-[#57534E] hover:bg-[#E4D9C8] hover:text-[#1C1917]'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C89D5C]' : 'text-stone-400'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Utility Actions */}
              <div className="flex items-center gap-2 pl-2">
                <button
                  onClick={handleExportJSON}
                  className="px-3 py-1.5 text-xs bg-white hover:bg-stone-100 text-[#2A1810] border border-[#D9CEBE] rounded-xl font-medium flex items-center gap-1 shadow-2xs"
                  title="Download full website backup as JSON"
                >
                  <Download className="w-3.5 h-3.5 text-[#C89D5C]" />
                  <span className="hidden md:inline">Export</span>
                </button>
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl font-medium flex items-center gap-1"
                  title="Reset to default Kathmandu source data"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Reset</span>
                </button>
              </div>
            </div>

            {/* Scrollable Tab Pane Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAF7F2]">
              {/* === TAB 1: OVERVIEW DASHBOARD === */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Welcome Banner */}
                  <div className="bg-gradient-to-r from-[#2A1810] to-[#3D2314] text-[#FAF7F2] p-6 rounded-2xl border border-[#C89D5C]/30 shadow-md relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] text-[#C89D5C] uppercase tracking-widest font-bold">
                          Welcome, Sip Café Owner
                        </span>
                        <h4 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
                          Full Administrative Access Enabled
                        </h4>
                        <p className="text-xs text-[#E4D9C8]/80 max-w-xl mt-1">
                          You have total control over the menu catalog, pricing, business hours, storefront photos, and live announcement banners. Public visitors only view the published website.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={onClose}
                          className="px-4 py-2.5 rounded-xl bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Public Website</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* KPI Stat Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div
                      onClick={() => setActiveTab('menu')}
                      className="bg-white p-4 rounded-2xl border border-[#E8DFC8] shadow-xs cursor-pointer hover:border-[#C89D5C] transition-all group"
                    >
                      <div className="flex items-center justify-between text-stone-400 group-hover:text-[#C89D5C]">
                        <Utensils className="w-5 h-5" />
                        <span className="text-xs font-semibold">Manage →</span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold font-serif text-[#1C1917] mt-2">
                        {menuItems.length}
                      </div>
                      <div className="text-xs text-stone-500 font-medium mt-0.5">
                        Active Menu Items
                      </div>
                    </div>

                    <div
                      onClick={() => setActiveTab('categories')}
                      className="bg-white p-4 rounded-2xl border border-[#E8DFC8] shadow-xs cursor-pointer hover:border-[#C89D5C] transition-all group"
                    >
                      <div className="flex items-center justify-between text-stone-400 group-hover:text-[#C89D5C]">
                        <FolderTree className="w-5 h-5" />
                        <span className="text-xs font-semibold">Manage →</span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold font-serif text-[#1C1917] mt-2">
                        {categories.length}
                      </div>
                      <div className="text-xs text-stone-500 font-medium mt-0.5">
                        Menu Categories
                      </div>
                    </div>

                    <div
                      onClick={() => setActiveTab('gallery')}
                      className="bg-white p-4 rounded-2xl border border-[#E8DFC8] shadow-xs cursor-pointer hover:border-[#C89D5C] transition-all group"
                    >
                      <div className="flex items-center justify-between text-stone-400 group-hover:text-[#C89D5C]">
                        <Layers className="w-5 h-5" />
                        <span className="text-xs font-semibold">Manage →</span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold font-serif text-[#1C1917] mt-2">
                        {gallery.length}
                      </div>
                      <div className="text-xs text-stone-500 font-medium mt-0.5">
                        Gallery Photos
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#E8DFC8] shadow-xs">
                      <div className="flex items-center justify-between text-stone-400">
                        <Clock className="w-5 h-5 text-[#C89D5C]" />
                        <span className="text-[10px] font-bold uppercase text-emerald-600">Live Status</span>
                      </div>
                      <div className="text-lg sm:text-xl font-bold font-serif text-[#1C1917] mt-2 flex items-center gap-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${currentStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                        <span>{currentStatus.currentStatusText}</span>
                      </div>
                      <div className="text-xs text-stone-500 font-medium mt-0.5 truncate">
                        {settings.opening_time} – {settings.closing_time}
                      </div>
                    </div>
                  </div>

                  {/* Live Controls: Operating Status & Announcement Banner */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Live Cafe Status Override */}
                    <div className="bg-white p-5 rounded-2xl border border-[#E8DFC8] shadow-xs space-y-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#C89D5C]" />
                        <h5 className="font-serif font-bold text-base text-[#1C1917]">
                          Live Cafe Operating Status
                        </h5>
                      </div>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        Control how the cafe status appears to customers on the navigation bar and contact sections.
                      </p>

                      <div className="flex flex-col gap-2.5 pt-1">
                        <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          !settings.is_force_closed
                            ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-semibold'
                            : 'bg-stone-50 border-stone-200 text-stone-600'
                        }`}>
                          <div className="flex items-center gap-2.5">
                            <span className="w-3 h-3 rounded-full bg-emerald-500" />
                            <div>
                              <div className="text-xs font-bold">Automatic by Hours (Recommended)</div>
                              <div className="text-[11px] text-stone-500">Open automatically between {settings.opening_time} and {settings.closing_time}</div>
                            </div>
                          </div>
                          <input
                            type="radio"
                            name="cafe_status_override"
                            checked={!settings.is_force_closed}
                            onChange={() => {
                              setSettings((prev) => ({ ...prev, is_force_closed: false }));
                              showNotification('Cafe status set to automatic hours');
                            }}
                            className="text-emerald-600 focus:ring-emerald-500"
                          />
                        </label>

                        <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          settings.is_force_closed
                            ? 'bg-rose-50/70 border-rose-300 text-rose-950 font-semibold'
                            : 'bg-stone-50 border-stone-200 text-stone-600'
                        }`}>
                          <div className="flex items-center gap-2.5">
                            <span className="w-3 h-3 rounded-full bg-rose-500" />
                            <div>
                              <div className="text-xs font-bold">Temporarily Closed Today</div>
                              <div className="text-[11px] text-stone-500">Overrides the hours and displays "CLOSED TODAY" on website</div>
                            </div>
                          </div>
                          <input
                            type="radio"
                            name="cafe_status_override"
                            checked={!!settings.is_force_closed}
                            onChange={() => {
                              setSettings((prev) => ({ ...prev, is_force_closed: true }));
                              showNotification('Cafe status set to Temporarily Closed');
                            }}
                            className="text-rose-600 focus:ring-rose-500"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Announcement Banner Control */}
                    <div className="bg-white p-5 rounded-2xl border border-[#E8DFC8] shadow-xs space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#C89D5C]" />
                          <h5 className="font-serif font-bold text-base text-[#1C1917]">
                            Public Announcement Banner
                          </h5>
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#2A1810]">
                          <input
                            type="checkbox"
                            checked={!!settings.announcement_enabled}
                            onChange={(e) => {
                              setSettings((prev) => ({ ...prev, announcement_enabled: e.target.checked }));
                              showNotification(e.target.checked ? 'Announcement banner turned ON' : 'Announcement banner turned OFF');
                            }}
                            className="w-4 h-4 text-[#C89D5C] rounded focus:ring-[#C89D5C]"
                          />
                          <span>Show on Website</span>
                        </label>
                      </div>

                      <p className="text-xs text-stone-500">
                        Display a prominent announcement at the top of the website (e.g. today's special offer, holiday notice, or fresh batch alert).
                      </p>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                          Announcement Text
                        </label>
                        <input
                          type="text"
                          value={settings.announcement_text || ''}
                          onChange={(e) => setSettings((prev) => ({ ...prev, announcement_text: e.target.value }))}
                          placeholder="e.g. Welcome to Sip Cafe Pipalbot! Handcrafted cold brews & momo served fresh daily."
                          className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                        />
                      </div>

                      {/* Preview Box */}
                      {settings.announcement_enabled && (
                        <div className="pt-1">
                          <span className="text-[10px] text-stone-400 font-semibold uppercase block mb-1">Live Preview:</span>
                          <div className="bg-[#C89D5C] text-[#140D08] px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{settings.announcement_text || 'Announcement preview...'}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Action Shortcuts */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E8DFC8] shadow-xs">
                    <h5 className="font-serif font-bold text-base text-[#1C1917] mb-3">
                      Quick Control Shortcuts
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      <button
                        onClick={() => {
                          setActiveTab('menu');
                          setEditingItem({
                            id: '',
                            name: '',
                            description: '',
                            price: '',
                            image_url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
                            category_id: categories[0]?.id || 'cat-cold-coffee',
                            is_popular: false,
                            is_available: true,
                            created_at: new Date().toISOString(),
                            dietary: 'beverage'
                          });
                          setIsNewItem(true);
                        }}
                        className="p-3.5 rounded-xl border border-dashed border-[#C89D5C] hover:bg-[#FAF7F2] text-left transition-colors group"
                      >
                        <Plus className="w-4 h-4 text-[#C89D5C] mb-1 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-[#1C1917]">Add New Menu Item</div>
                        <div className="text-[11px] text-stone-500">Create item & price</div>
                      </button>

                      <button
                        onClick={() => setActiveTab('settings')}
                        className="p-3.5 rounded-xl border border-stone-200 hover:bg-[#FAF7F2] text-left transition-colors group"
                      >
                        <Phone className="w-4 h-4 text-[#C89D5C] mb-1 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-[#1C1917]">Contact Numbers</div>
                        <div className="text-[11px] text-stone-500">9767560484 / 9813779214</div>
                      </button>

                      <button
                        onClick={() => setActiveTab('hero')}
                        className="p-3.5 rounded-xl border border-stone-200 hover:bg-[#FAF7F2] text-left transition-colors group"
                      >
                        <ImageIcon className="w-4 h-4 text-[#C89D5C] mb-1 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-[#1C1917]">Hero Storefront Photo</div>
                        <div className="text-[11px] text-stone-500">Upload or change banner</div>
                      </button>

                      <button
                        onClick={onClose}
                        className="p-3.5 rounded-xl border border-stone-200 hover:bg-[#FAF7F2] text-left transition-colors group"
                      >
                        <Eye className="w-4 h-4 text-[#C89D5C] mb-1 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-[#1C1917]">View Public Website</div>
                        <div className="text-[11px] text-stone-500">Switch to customer view</div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* === TAB 2: MENU ITEMS === */}
              {activeTab === 'menu' && (
                <div>
                  {!editingItem ? (
                    <div>
                      {/* Top Bar: Search, Category Filter, and Add Button */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
                        <div>
                          <h4 className="text-xl font-serif font-bold text-[#1C1917]">
                            Menu Management
                          </h4>
                          <p className="text-xs text-[#78716C]">
                            Manage item names, exact slash prices in रू (e.g. 50/75, 125/145/195), categories, and stock availability.
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            setEditingItem({
                              id: '',
                              name: '',
                              description: '',
                              price: '',
                              image_url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
                              category_id: categories[0]?.id || 'cat-cold-coffee',
                              is_popular: false,
                              is_available: true,
                              created_at: new Date().toISOString(),
                              dietary: 'beverage'
                            });
                            setIsNewItem(true);
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#2A1810] hover:bg-[#3D2314] text-[#FAF7F2] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm shrink-0"
                        >
                          <Plus className="w-4 h-4 text-[#C89D5C]" />
                          <span>Add New Menu Item</span>
                        </button>
                      </div>

                      {/* Filters: Search + Category Selector */}
                      <div className="bg-white p-3.5 rounded-2xl border border-[#E8DFC8] mb-4 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-2xs">
                        <div className="relative w-full sm:w-72">
                          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Search by name, price, or description..."
                            value={menuSearch}
                            onChange={(e) => setMenuSearch(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C89D5C]"
                          />
                        </div>

                        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                          <button
                            onClick={() => setSelectedCategoryFilter('all')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                              selectedCategoryFilter === 'all'
                                ? 'bg-[#2A1810] text-white font-semibold'
                                : 'bg-[#FAF7F2] text-stone-600 hover:bg-stone-200'
                            }`}
                          >
                            All ({menuItems.length})
                          </button>
                          {categories.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => setSelectedCategoryFilter(c.id)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                                selectedCategoryFilter === c.id
                                  ? 'bg-[#2A1810] text-white font-semibold'
                                  : 'bg-[#FAF7F2] text-stone-600 hover:bg-stone-200'
                              }`}
                            >
                              {c.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Items List Table */}
                      <div className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-sm">
                        <div className="divide-y divide-[#F5EDE1]">
                          {filteredMenuItems.length === 0 ? (
                            <div className="p-8 text-center text-stone-400 text-xs">
                              No items found matching your filter criteria.
                            </div>
                          ) : (
                            filteredMenuItems.map((item) => {
                              const cat = categories.find((c) => c.id === item.category_id);
                              return (
                                <div
                                  key={item.id}
                                  className="p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-[#FAF7F2] transition-colors"
                                >
                                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                                    <img
                                      src={item.image_url}
                                      alt={item.name}
                                      className="w-14 h-14 rounded-xl object-cover border border-[#E8DFC8] flex-shrink-0"
                                    />
                                    <div className="min-w-0">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-serif font-bold text-sm text-[#1C1917]">
                                          {item.name}
                                        </span>
                                        {item.is_popular && (
                                          <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#2A1810] text-[#C89D5C] flex items-center gap-0.5">
                                            <Star className="w-2.5 h-2.5 fill-current" />
                                            Popular
                                          </span>
                                        )}
                                        {!item.is_available && (
                                          <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800">
                                            Sold Out
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-xs text-[#78716C] line-clamp-1 max-w-md mt-0.5">
                                        {item.description}
                                      </p>
                                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#A89F91]">
                                        <span className="text-[#C89D5C] font-semibold">{cat?.name || 'Category'}</span>
                                        <span>•</span>
                                        <span className="capitalize">{item.dietary || 'Standard'}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3 self-end sm:self-center">
                                    <div className="text-right">
                                      <span className="text-sm font-bold text-[#2A1810] font-mono">
                                        रू {item.price}
                                      </span>
                                    </div>

                                    {/* Quick Availability Toggle */}
                                    <button
                                      onClick={() => handleToggleAvailability(item.id)}
                                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors ${
                                        item.is_available
                                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                          : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                                      }`}
                                      title={item.is_available ? 'Click to mark Sold Out' : 'Click to mark In Stock'}
                                    >
                                      {item.is_available ? 'In Stock' : 'Sold Out'}
                                    </button>

                                    {/* Quick Popular Toggle */}
                                    <button
                                      onClick={() => handleTogglePopular(item.id)}
                                      className={`p-1.5 rounded-lg transition-colors ${
                                        item.is_popular
                                          ? 'text-[#C89D5C] bg-[#2A1810]'
                                          : 'text-stone-400 hover:text-stone-700 bg-stone-100'
                                      }`}
                                      title={item.is_popular ? 'Featured in Popular' : 'Mark as Popular'}
                                    >
                                      <Star className="w-3.5 h-3.5" />
                                    </button>

                                    {/* Edit Button */}
                                    <button
                                      onClick={() => {
                                        setEditingItem({ ...item });
                                        setIsNewItem(false);
                                      }}
                                      className="p-1.5 text-stone-600 hover:text-[#2A1810] hover:bg-stone-100 rounded-lg transition-colors"
                                      title="Edit item details"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                      onClick={() => handleDeleteItem(item.id, item.name)}
                                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                                      title="Delete item"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* ITEM EDIT FORM */
                    <form onSubmit={handleSaveItem} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFC8] space-y-5">
                      <div className="flex items-center justify-between border-b border-[#F5EDE1] pb-4">
                        <h4 className="text-lg font-serif font-bold text-[#1C1917]">
                          {isNewItem ? 'Add New Menu Item' : `Edit: ${editingItem.name}`}
                        </h4>
                        <button
                          type="button"
                          onClick={() => setEditingItem(null)}
                          className="text-xs text-stone-500 hover:text-stone-800"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                            Item Name *
                          </label>
                          <input
                            type="text"
                            value={editingItem.name}
                            onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                            required
                            className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                            placeholder="e.g. Chicken Momo (Steam / Fried / C-Momo)"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                            Exact Price in रू * (e.g. 50/75, 125 / 145 / 195, 300/330)
                          </label>
                          <input
                            type="text"
                            value={editingItem.price}
                            onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                            required
                            className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none font-mono"
                            placeholder="e.g. 125 / 145 / 195"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                            Category *
                          </label>
                          <select
                            value={editingItem.category_id}
                            onChange={(e) => setEditingItem({ ...editingItem, category_id: e.target.value })}
                            className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                          >
                            {categories.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                            Dietary Classification
                          </label>
                          <select
                            value={editingItem.dietary || 'veg'}
                            onChange={(e) => setEditingItem({ ...editingItem, dietary: e.target.value as any })}
                            className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                          >
                            <option value="veg">🌱 Pure Veg</option>
                            <option value="non-veg">🍗 Non-Veg</option>
                            <option value="beverage">☕ Beverage / Drink</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={editingItem.description}
                          onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                          placeholder="Authentic ingredients, flavors, and preparation..."
                        />
                      </div>

                      {/* Image Upload or URL */}
                      <div>
                        <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                          Item Image (URL or Upload Image File)
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                          <input
                            type="url"
                            value={editingItem.image_url}
                            onChange={(e) => setEditingItem({ ...editingItem, image_url: e.target.value })}
                            className="flex-1 px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                            placeholder="https://images.unsplash.com/..."
                          />

                          <label className="cursor-pointer px-4 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload File</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleFileUpload(e, (base64) =>
                                  setEditingItem({ ...editingItem, image_url: base64 })
                                )
                              }
                              className="hidden"
                            />
                          </label>

                          {editingItem.image_url && (
                            <img
                              src={editingItem.image_url}
                              alt="preview"
                              className="w-12 h-12 rounded-lg object-cover border border-stone-300 flex-shrink-0"
                            />
                          )}
                        </div>
                      </div>

                      {/* Checkboxes: Popular / Available */}
                      <div className="flex items-center gap-6 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#2A1810]">
                          <input
                            type="checkbox"
                            checked={editingItem.is_popular}
                            onChange={(e) => setEditingItem({ ...editingItem, is_popular: e.target.checked })}
                            className="w-4 h-4 text-[#2A1810] rounded focus:ring-[#C89D5C]"
                          />
                          <span>Show in Customer Favorites (POPULAR badge)</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#2A1810]">
                          <input
                            type="checkbox"
                            checked={editingItem.is_available}
                            onChange={(e) => setEditingItem({ ...editingItem, is_available: e.target.checked })}
                            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                          />
                          <span>Item Available in Stock</span>
                        </label>
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-[#F5EDE1]">
                        <button
                          type="button"
                          onClick={() => setEditingItem(null)}
                          className="px-5 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-[#2A1810] hover:bg-[#3D2314] text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-sm"
                        >
                          Save Item
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* === TAB 3: CATEGORIES === */}
              {activeTab === 'categories' && (
                <div>
                  {!editingCategory ? (
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div>
                          <h4 className="text-xl font-serif font-bold text-[#1C1917]">
                            Category Controls
                          </h4>
                          <p className="text-xs text-[#78716C]">
                            Add, reorder, and update cover images for menu sections.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setEditingCategory({
                              id: '',
                              name: '',
                              sort_order: categories.length + 1,
                              image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
                              item_count_label: 'Fresh Specialties'
                            });
                            setIsNewCategory(true);
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2A1810] hover:bg-[#3D2314] text-[#FAF7F2] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                        >
                          <Plus className="w-4 h-4 text-[#C89D5C]" />
                          <span>Add Category</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((cat) => {
                          const count = menuItems.filter((i) => i.category_id === cat.id).length;
                          return (
                            <div
                              key={cat.id}
                              className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-sm p-4 flex flex-col justify-between"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                {cat.image_url && (
                                  <img
                                    src={cat.image_url}
                                    alt={cat.name}
                                    className="w-12 h-12 rounded-xl object-cover border border-[#E8DFC8]"
                                  />
                                )}
                                <div>
                                  <h5 className="font-serif font-bold text-base text-[#1C1917]">
                                    {cat.name}
                                  </h5>
                                  <span className="text-xs text-[#78716C]">
                                    {count} {count === 1 ? 'item' : 'items'} in category
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-3 border-t border-[#F5EDE1] text-xs">
                                <span className="text-[#A89F91]">Order: #{cat.sort_order}</span>
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => {
                                      setEditingCategory({ ...cat });
                                      setIsNewCategory(false);
                                    }}
                                    className="p-1.5 text-stone-600 hover:text-[#2A1810] hover:bg-stone-100 rounded-lg"
                                    title="Edit category"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteCategory(cat.id, cat.name)}
                                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                                    title="Delete category"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    /* CATEGORY FORM */
                    <form onSubmit={handleSaveCategory} className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-4 max-w-lg">
                      <h4 className="text-lg font-serif font-bold text-[#1C1917]">
                        {isNewCategory ? 'Create New Category' : `Edit: ${editingCategory.name}`}
                      </h4>

                      <div>
                        <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                          Category Name *
                        </label>
                        <input
                          type="text"
                          value={editingCategory.name}
                          onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                          required
                          className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                          Subtitle / Label
                        </label>
                        <input
                          type="text"
                          value={editingCategory.item_count_label || ''}
                          onChange={(e) => setEditingCategory({ ...editingCategory, item_count_label: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                          placeholder="e.g. Steamed, Fried & C-Momo"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                          Cover Photography (URL or Upload)
                        </label>
                        <input
                          type="url"
                          value={editingCategory.image_url || ''}
                          onChange={(e) => setEditingCategory({ ...editingCategory, image_url: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-3">
                        <button
                          type="button"
                          onClick={() => setEditingCategory(null)}
                          className="px-4 py-2 text-xs text-stone-600 hover:bg-stone-100 rounded-xl"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#2A1810] text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-sm"
                        >
                          Save Category
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* === TAB 4: CAFE SETTINGS & CONTACT === */}
              {activeTab === 'settings' && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFC8] max-w-2xl space-y-5">
                  <h4 className="text-xl font-serif font-bold text-[#1C1917] mb-1">
                    Cafe Identity & Operating Settings
                  </h4>
                  <p className="text-xs text-stone-500 mb-4">
                    Update phone numbers, physical address, business hours, and social media handles.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                        Cafe Name
                      </label>
                      <input
                        type="text"
                        value={settings.cafe_name}
                        onChange={(e) => setSettings({ ...settings, cafe_name: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                        Address in Kathmandu
                      </label>
                      <input
                        type="text"
                        value={settings.address}
                        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                        Primary Phone Number
                      </label>
                      <input
                        type="text"
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl font-mono"
                        placeholder="9767560484"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                        Additional / Secondary Phone Number
                      </label>
                      <input
                        type="text"
                        value={settings.secondary_phone || ''}
                        onChange={(e) => setSettings({ ...settings, secondary_phone: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl font-mono"
                        placeholder="9813779214"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                        WhatsApp Number (9767560484)
                      </label>
                      <input
                        type="text"
                        value={settings.whatsapp}
                        onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                        Opening Days
                      </label>
                      <input
                        type="text"
                        value={settings.opening_days}
                        onChange={(e) => setSettings({ ...settings, opening_days: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                        placeholder="Every Day"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                        Opening Time
                      </label>
                      <input
                        type="text"
                        value={settings.opening_time}
                        onChange={(e) => setSettings({ ...settings, opening_time: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl font-mono"
                        placeholder="7:00 AM"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                        Closing Time
                      </label>
                      <input
                        type="text"
                        value={settings.closing_time}
                        onChange={(e) => setSettings({ ...settings, closing_time: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl font-mono"
                        placeholder="9:00 PM"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                      Google Maps Link
                    </label>
                    <input
                      type="url"
                      value={settings.maps_url}
                      onChange={(e) => setSettings({ ...settings, maps_url: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                      About Story / Philosophy
                    </label>
                    <textarea
                      rows={3}
                      value={settings.about_text}
                      onChange={(e) => setSettings({ ...settings, about_text: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => showNotification('Cafe Settings successfully saved')}
                      className="px-6 py-2.5 bg-[#2A1810] hover:bg-[#3D2314] text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-sm"
                    >
                      Save Cafe Settings
                    </button>
                  </div>
                </div>
              )}

              {/* === TAB 5: HERO & PHOTOS === */}
              {activeTab === 'hero' && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFC8] max-w-2xl space-y-4">
                  <h4 className="text-xl font-serif font-bold text-[#1C1917] mb-2">
                    Hero Section & Storefront Background
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                      Hero Title
                    </label>
                    <input
                      type="text"
                      value={settings.hero_title}
                      onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                      Hero Subtitle / Tagline
                    </label>
                    <input
                      type="text"
                      value={settings.hero_subtitle}
                      onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                      Hero Description Text
                    </label>
                    <textarea
                      rows={3}
                      value={settings.hero_description}
                      onChange={(e) => setSettings({ ...settings, hero_description: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                      Storefront Photo Background (URL or Upload)
                    </label>
                    <div className="flex gap-3 items-center">
                      <input
                        type="text"
                        value={settings.hero_image}
                        onChange={(e) => setSettings({ ...settings, hero_image: e.target.value })}
                        className="flex-1 px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                      />
                      <label className="cursor-pointer px-4 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 flex items-center gap-1.5 whitespace-nowrap">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleFileUpload(e, (base64) =>
                              setSettings({ ...settings, hero_image: base64 })
                            )
                          }
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Preview of Hero Image */}
                    <div className="mt-3 relative rounded-xl overflow-hidden border border-[#E8DFC8] h-48 bg-stone-100 flex items-center justify-center">
                      <img
                        src={settings.hero_image}
                        alt="Hero preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                        <span className="text-white text-xs font-medium">Live Storefront Image Preview</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSettings((prev) => ({ ...prev, hero_image: './sip_cafe_real_original.jpg' }));
                        showNotification('Restored authentic Kathmandu storefront image');
                      }}
                      className="mt-2 text-xs text-[#C89D5C] hover:underline"
                    >
                      ↺ Restore Authentic Storefront Photo (Original)
                    </button>
                  </div>

                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => showNotification('Hero presentation updated')}
                      className="px-6 py-2.5 bg-[#2A1810] hover:bg-[#3D2314] text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-sm"
                    >
                      Update Hero Section
                    </button>
                  </div>
                </div>
              )}

              {/* === TAB 6: GALLERY === */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  {/* Add New Gallery Item */}
                  <form onSubmit={handleAddGalleryItem} className="bg-white p-5 rounded-2xl border border-[#E8DFC8] space-y-3">
                    <h4 className="text-base font-serif font-bold text-[#1C1917]">
                      Add Photo to Gallery
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <input
                          type="text"
                          placeholder="Title (e.g. Kathmandu Steamed Momo)"
                          value={newGalleryTitle}
                          onChange={(e) => setNewGalleryTitle(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                        />
                      </div>
                      <div>
                        <select
                          value={newGalleryCategory}
                          onChange={(e) => setNewGalleryCategory(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                        >
                          <option value="Coffee">Coffee</option>
                          <option value="Momo">Momo</option>
                          <option value="Burger">Burger</option>
                          <option value="Katti Roll">Katti Roll</option>
                          <option value="Noodles">Noodles</option>
                          <option value="Tea">Tea</option>
                          <option value="Bakery">Bakery</option>
                          <option value="Lassi">Lassi</option>
                          <option value="Cafe Interior">Cafe Interior</option>
                          <option value="Storefront">Storefront</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="Image URL"
                          value={newGalleryUrl}
                          onChange={(e) => setNewGalleryUrl(e.target.value)}
                          required
                          className="flex-1 px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#2A1810] text-white text-xs font-semibold uppercase rounded-xl"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Gallery Items Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {gallery.map((g) => (
                      <div
                        key={g.id}
                        className="bg-white rounded-xl overflow-hidden border border-[#E8DFC8] group relative shadow-xs"
                      >
                        <img
                          src={g.image_url}
                          alt={g.title}
                          className="w-full h-36 object-cover"
                        />
                        <div className="p-2.5 flex items-center justify-between">
                          <div className="min-w-0 pr-2">
                            <h6 className="font-medium text-xs text-[#1C1917] truncate">{g.title}</h6>
                            <span className="text-[10px] text-[#C89D5C]">{g.category}</span>
                          </div>
                          <button
                            onClick={() => handleDeleteGallery(g.id)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-rose-50"
                            title="Remove photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
