import React, { useState, useEffect } from 'react';
import {
  getStoredCategories,
  saveCategories,
  getStoredMenuItems,
  saveMenuItems,
  getStoredCafeSettings,
  saveCafeSettings,
  getStoredGallery,
  getStoredOrders,
  saveOrders,
  getStoredCustomers,
  saveCustomers,
  getStoredOffers,
  saveOffers,
} from './utils/storage';
import {
  Category,
  MenuItem,
  CafeSettings,
  GalleryItem,
  Order,
  Customer,
  Offer,
} from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedCategories } from './components/FeaturedCategories';
import { MenuSection } from './components/MenuSection';
import { CustomerFavorites } from './components/CustomerFavorites';
import { CinematicBanner } from './components/CinematicBanner';
import { AboutSection } from './components/AboutSection';
import { WhySipCafe } from './components/WhySipCafe';
import { GallerySection } from './components/GallerySection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { InitialLoader } from './components/InitialLoader';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);

  // View mode: 'storefront' is the public website for customers, 'admin' is the private dashboard
  const [viewMode, setViewMode] = useState<'storefront' | 'admin'>('storefront');

  // Owner authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sip_cafe_admin_logged_in') === 'true';
    } catch {
      return false;
    }
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Core Data States
  const [categories, setCategories] = useState<Category[]>(getStoredCategories);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(getStoredMenuItems);
  const [gallery] = useState<GalleryItem[]>(getStoredGallery);
  const [settings, setSettings] = useState<CafeSettings>(getStoredCafeSettings);
  const [orders, setOrders] = useState<Order[]>(getStoredOrders);
  const [customers, setCustomers] = useState<Customer[]>(getStoredCustomers);
  const [offers, setOffers] = useState<Offer[]>(getStoredOffers);

  // Sync state changes with localStorage
  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  useEffect(() => {
    saveMenuItems(menuItems);
  }, [menuItems]);

  useEffect(() => {
    saveCafeSettings(settings);
  }, [settings]);

  useEffect(() => {
    saveOrders(orders);
  }, [orders]);

  useEffect(() => {
    saveCustomers(customers);
  }, [customers]);

  useEffect(() => {
    saveOffers(offers);
  }, [offers]);

  // Menu Selection State
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');

  // Handle Category selection from Featured or other sections
  const handleSelectCategory = (catId: string) => {
    setSelectedCategoryId(catId);
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle clicking an item from Customer Favorites
  const handleSelectFavoriteItem = (item: MenuItem) => {
    if (item.category_id) {
      setSelectedCategoryId(item.category_id);
    }
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle opening the admin portal
  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setViewMode('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsLoginModalOpen(true);
    }
  };

  // Handle successful login
  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setIsLoginModalOpen(false);
    setViewMode('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle logout
  const handleLogout = () => {
    try {
      localStorage.removeItem('sip_cafe_admin_logged_in');
    } catch {
      // Ignore
    }
    setIsAdminLoggedIn(false);
    setViewMode('storefront');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle customer placing order from menu via WhatsApp
  const handleRecordOrder = (item: MenuItem) => {
    const numericPrice = parseInt(item.price.replace(/\D/g, ''), 10) || 160;
    const orderId = `ORD-${Date.now().toString().slice(-4)}`;
    const newOrder: Order = {
      id: orderId,
      orderNumber: `#${orderId}`,
      customerName: 'WhatsApp Customer',
      customerPhone: settings.whatsapp,
      items: [
        {
          itemId: item.id,
          name: item.name,
          unitPrice: numericPrice,
          totalPrice: numericPrice,
          quantity: 1,
        },
      ],
      subtotal: numericPrice,
      discount: 0,
      totalAmount: numericPrice,
      status: 'Pending',
      createdAt: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kathmandu',
      }),
      orderType: 'Delivery',
      paymentMethod: 'Cash',
      paymentStatus: 'Unpaid',
      notes: `Order initiated from website menu for ${item.name}`,
    };

    setOrders(prev => [newOrder, ...prev]);
  };

  // Secret keyboard shortcut: Ctrl+Shift+A or Cmd+Shift+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        handleOpenAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminLoggedIn]);

  // If in Admin Mode, display the Admin Dashboard
  if (viewMode === 'admin') {
    return (
      <ErrorBoundary>
        <AdminDashboard
          categories={categories}
          setCategories={setCategories}
          menuItems={menuItems}
          setMenuItems={setMenuItems}
          orders={orders}
          setOrders={setOrders}
          customers={customers}
          setCustomers={setCustomers}
          offers={offers}
          setOffers={setOffers}
          settings={settings}
          setSettings={setSettings}
          onExitToWebsite={() => {
            setViewMode('storefront');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onLogout={handleLogout}
        />
      </ErrorBoundary>
    );
  }

  // Otherwise, display the full Public Customer-facing Website
  return (
    <ErrorBoundary>
      {loading && <InitialLoader onComplete={() => setLoading(false)} />}

      <div className="min-h-screen bg-[#FAF7F2] text-[#1C140E] selection:bg-[#C89D5C]/30 selection:text-[#140D08] flex flex-col antialiased">
        {/* Navigation Bar with Owner Access Button */}
        <Navbar
          settings={settings}
          onOpenAdmin={handleOpenAdmin}
          isAdminLoggedIn={isAdminLoggedIn}
        />

        {/* Hero Section */}
        <Hero settings={settings} />

        {/* Featured Visual Categories */}
        <FeaturedCategories
          categories={categories}
          onSelectCategory={handleSelectCategory}
        />

        {/* Complete Menu Section with Search, Dietary Filters & Ordering */}
        <MenuSection
          categories={categories}
          items={menuItems}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
          whatsappNumber={settings.whatsapp}
          onRecordOrder={handleRecordOrder}
        />

        {/* Customer Favorites */}
        <CustomerFavorites
          items={menuItems}
          onSelectItem={handleSelectFavoriteItem}
        />

        {/* Cinematic Brand Banner */}
        <CinematicBanner />

        {/* About SIP CAFE Section */}
        <AboutSection settings={settings} />

        {/* Why Choose SIP CAFE Pillars */}
        <WhySipCafe />

        {/* Authentic Photo Gallery */}
        <GallerySection gallery={gallery} />

        {/* Location, Timings & Map Directions */}
        <LocationSection settings={settings} />

        {/* Direct Contact & Social Section */}
        <ContactSection settings={settings} />

        {/* Call to Action Section */}
        <CTASection settings={settings} />

        {/* Footer with discreet Owner Access trigger */}
        <Footer
          settings={settings}
          onOpenAdmin={handleOpenAdmin}
          isAdminLoggedIn={isAdminLoggedIn}
        />

        {/* Floating WhatsApp Quick Action Button */}
        <FloatingWhatsApp whatsappNumber={settings.whatsapp} />

        {/* Persistent Floating Admin pill (ONLY shown if the owner is actively logged in) */}
        {isAdminLoggedIn && (
          <div className="fixed bottom-6 left-6 z-40">
            <button
              onClick={() => {
                setViewMode('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2.5 rounded-full bg-[#1C140E]/95 text-[#C89D5C] border border-[#C89D5C]/50 text-xs font-bold shadow-2xl hover:bg-[#2A1810] flex items-center gap-2 backdrop-blur-md transition-all active:scale-95 cursor-pointer group"
              title="You are logged in as owner. Click to open dashboard"
            >
              <ShieldCheck className="w-4 h-4 text-[#C89D5C]" />
              <span>Owner Dashboard Active</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C89D5C] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        )}

        {/* Secure Owner Password Challenge Modal */}
        <AdminLoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    </ErrorBoundary>
  );
}
