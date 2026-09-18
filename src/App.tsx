import React, { useState, useEffect } from 'react';
import {
  getStoredCategories,
  saveCategories,
  getStoredMenuItems,
  saveMenuItems,
  getStoredCafeSettings,
  saveCafeSettings,
  getStoredOrders,
  saveOrders,
  getStoredCustomers,
  saveCustomers,
  getStoredOffers,
  saveOffers,
  getStoredServices,
  saveServices,
  getStoredAdminProfile,
  saveAdminProfile,
  getStoredAdminPassword,
  saveAdminPassword,
  resetAllToDefault
} from './utils/storage';
import {
  Category,
  MenuItem,
  CafeSettings,
  Order,
  Customer,
  Offer,
  CafeService,
  AdminProfile
} from './types';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboardLayout } from './components/admin/AdminDashboardLayout';

export default function App() {
  // Admin Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('sip_cafe_admin_logged_in') === 'true';
  });

  // Core Data States
  const [categories, setCategories] = useState<Category[]>(getStoredCategories);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(getStoredMenuItems);
  const [orders, setOrders] = useState<Order[]>(getStoredOrders);
  const [customers, setCustomers] = useState<Customer[]>(getStoredCustomers);
  const [offers, setOffers] = useState<Offer[]>(getStoredOffers);
  const [services, setServices] = useState<CafeService[]>(getStoredServices);
  const [settings, setSettings] = useState<CafeSettings>(getStoredCafeSettings);
  const [adminProfile, setAdminProfile] = useState<AdminProfile>(getStoredAdminProfile);
  const [adminPassword, setAdminPassword] = useState<string>(getStoredAdminPassword);

  // Persistence Sync
  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  useEffect(() => {
    saveMenuItems(menuItems);
  }, [menuItems]);

  useEffect(() => {
    saveOrders(orders);
  }, [orders]);

  useEffect(() => {
    saveCustomers(customers);
  }, [customers]);

  useEffect(() => {
    saveOffers(offers);
  }, [offers]);

  useEffect(() => {
    saveServices(services);
  }, [services]);

  useEffect(() => {
    saveCafeSettings(settings);
  }, [settings]);

  useEffect(() => {
    saveAdminProfile(adminProfile);
  }, [adminProfile]);

  useEffect(() => {
    saveAdminPassword(adminPassword);
  }, [adminPassword]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('sip_cafe_admin_logged_in');
    setIsAdminLoggedIn(false);
  };

  // Handle Reset All Data
  const handleResetAllData = () => {
    resetAllToDefault();
    setCategories(getStoredCategories());
    setMenuItems(getStoredMenuItems());
    setOrders(getStoredOrders());
    setCustomers(getStoredCustomers());
    setOffers(getStoredOffers());
    setServices(getStoredServices());
    setSettings(getStoredCafeSettings());
    setAdminProfile(getStoredAdminProfile());
  };

  // Handle Export Full Backup JSON
  const handleExportData = () => {
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      cafe: settings,
      menu: menuItems,
      categories,
      orders,
      customers,
      offers,
      services,
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sip_cafe_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // If not logged in, render the secure Admin Login screen
  if (!isAdminLoggedIn) {
    return <AdminLogin onLoginSuccess={() => setIsAdminLoggedIn(true)} />;
  }

  // Once authenticated, render the full SIP CAFE Admin Dashboard
  return (
    <AdminDashboardLayout
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
      services={services}
      setServices={setServices}
      settings={settings}
      setSettings={setSettings}
      adminProfile={adminProfile}
      setAdminProfile={setAdminProfile}
      adminPassword={adminPassword}
      setAdminPassword={setAdminPassword}
      onLogout={handleLogout}
      onResetAllData={handleResetAllData}
      onExportData={handleExportData}
    />
  );
}
