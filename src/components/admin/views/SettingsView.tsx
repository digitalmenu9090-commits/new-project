import React, { useState } from 'react';
import { 
  Settings, 
  Store, 
  Clock, 
  Phone, 
  MapPin, 
  Shield, 
  KeyRound, 
  Moon, 
  Sun, 
  Download, 
  RotateCcw, 
  Save, 
  Check, 
  AlertCircle,
  Megaphone,
  Share2,
  Lock
} from 'lucide-react';
import { CafeSettings, AdminProfile } from '../../../types';
import { ConfirmationModal } from '../ConfirmationModal';

interface SettingsViewProps {
  settings: CafeSettings;
  adminProfile: AdminProfile;
  adminPassword: string;
  theme: 'light' | 'dark';
  onSaveSettings: (settings: CafeSettings) => void;
  onSaveAdminProfile: (profile: AdminProfile) => void;
  onChangePassword: (newPw: string) => void;
  onToggleTheme: () => void;
  onResetAllData: () => void;
  onExportData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  adminProfile,
  adminPassword,
  theme,
  onSaveSettings,
  onSaveAdminProfile,
  onChangePassword,
  onToggleTheme,
  onResetAllData,
  onExportData,
}) => {
  const [activeTab, setActiveTab] = useState<'cafe' | 'profile' | 'system'>('cafe');

  // Cafe Settings Local Form
  const [cafeForm, setCafeForm] = useState<CafeSettings>(settings);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Profile Form
  const [profileForm, setProfileForm] = useState<AdminProfile>(adminProfile);
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Password Form
  const [currentPwInput, setCurrentPwInput] = useState('');
  const [newPwInput, setNewPwInput] = useState('');
  const [confirmPwInput, setConfirmPwInput] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState(false);

  // Reset Confirmation Modal
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleCafeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(cafeForm);
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 3000);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveAdminProfile(profileForm);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPwError('');
    setPwSuccess(false);

    if (currentPwInput !== adminPassword) {
      setPwError('Current password is incorrect.');
      return;
    }

    if (newPwInput.length < 6) {
      setPwError('New password must be at least 6 characters.');
      return;
    }

    if (newPwInput !== confirmPwInput) {
      setPwError('New passwords do not match.');
      return;
    }

    onChangePassword(newPwInput);
    setPwSuccess(true);
    setCurrentPwInput('');
    setNewPwInput('');
    setConfirmPwInput('');
    setTimeout(() => setPwSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
          Settings & Configuration
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Manage Sip Café operating hours, contact numbers, public announcement banner, and security
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('cafe')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'cafe'
              ? 'bg-[#2A1810] dark:bg-[#FAF7F2] text-white dark:text-[#1C140E] shadow-xs'
              : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Cafe & Website Settings</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-[#2A1810] dark:bg-[#FAF7F2] text-white dark:text-[#1C140E] shadow-xs'
              : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Admin Profile & Password</span>
        </button>

        <button
          onClick={() => setActiveTab('system')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'system'
              ? 'bg-[#2A1810] dark:bg-[#FAF7F2] text-white dark:text-[#1C140E] shadow-xs'
              : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>System & Theme Preferences</span>
        </button>
      </div>

      {/* TAB 1: CAFE & WEBSITE SETTINGS */}
      {activeTab === 'cafe' && (
        <form onSubmit={handleCafeSubmit} className="space-y-6">
          {settingsSuccess && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Sip Café business settings successfully saved and synced!</span>
            </div>
          )}

          {/* Store Info */}
          <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-800 pb-3">
              Cafe Business Identity
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold block mb-1">Cafe Name</label>
                <input
                  type="text"
                  required
                  value={cafeForm.cafe_name}
                  onChange={(e) => setCafeForm({ ...cafeForm, cafe_name: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Physical Address</label>
                <input
                  type="text"
                  required
                  value={cafeForm.address}
                  onChange={(e) => setCafeForm({ ...cafeForm, address: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Primary Phone</label>
                <input
                  type="text"
                  required
                  value={cafeForm.phone}
                  onChange={(e) => setCafeForm({ ...cafeForm, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl font-mono focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Secondary Phone</label>
                <input
                  type="text"
                  value={cafeForm.secondary_phone || ''}
                  onChange={(e) => setCafeForm({ ...cafeForm, secondary_phone: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl font-mono focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">WhatsApp Direct Order Number</label>
                <input
                  type="text"
                  required
                  value={cafeForm.whatsapp}
                  onChange={(e) => setCafeForm({ ...cafeForm, whatsapp: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl font-mono focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Google Maps Link</label>
                <input
                  type="text"
                  value={cafeForm.maps_url}
                  onChange={(e) => setCafeForm({ ...cafeForm, maps_url: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Operating Hours & Holiday Mode */}
          <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-800 pb-3">
              Operating Hours & Storefront Status
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-semibold block mb-1">Opening Time</label>
                <input
                  type="text"
                  placeholder="e.g. 7:00 AM"
                  value={cafeForm.opening_time}
                  onChange={(e) => setCafeForm({ ...cafeForm, opening_time: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Closing Time</label>
                <input
                  type="text"
                  placeholder="e.g. 9:00 PM"
                  value={cafeForm.closing_time}
                  onChange={(e) => setCafeForm({ ...cafeForm, closing_time: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Opening Days</label>
                <input
                  type="text"
                  placeholder="e.g. Every Day"
                  value={cafeForm.opening_days}
                  onChange={(e) => setCafeForm({ ...cafeForm, opening_days: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>
            </div>

            {/* Emergency Temporary Close */}
            <div className="pt-2">
              <label className="flex items-center gap-3 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cafeForm.is_force_closed || false}
                  onChange={(e) => setCafeForm({ ...cafeForm, is_force_closed: e.target.checked })}
                  className="w-5 h-5 rounded text-rose-600 focus:ring-rose-500"
                />
                <div>
                  <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                    Emergency Closure / Holiday Mode
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Force displays "CLOSED TODAY" on customer portals regardless of the current time.
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Announcement Banner */}
          <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-[#C89D5C]" />
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  Public Announcement Banner
                </h3>
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={cafeForm.announcement_enabled || false}
                  onChange={(e) => setCafeForm({ ...cafeForm, announcement_enabled: e.target.checked })}
                  className="w-4 h-4 rounded text-[#C89D5C] focus:ring-[#C89D5C]"
                />
                <span>Broadcast to Website</span>
              </label>
            </div>

            <div className="text-xs">
              <label className="font-semibold block mb-1">Announcement Text</label>
              <input
                type="text"
                placeholder="e.g. Celebrate Dashain with 20% off on all cold coffees! Open all week."
                value={cafeForm.announcement_text || ''}
                onChange={(e) => setCafeForm({ ...cafeForm, announcement_text: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Website Settings</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: ADMIN PROFILE & PASSWORD */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          {/* Admin Profile Form */}
          <form onSubmit={handleProfileSubmit} className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-800 pb-3">
              Administrator Profile Information
            </h3>

            {profileSuccess && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Admin profile details updated successfully!</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold block mb-1">Admin / Owner Name</label>
                <input
                  type="text"
                  required
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Administrative Role</label>
                <input
                  type="text"
                  value={profileForm.role}
                  onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl font-mono focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold uppercase tracking-wider"
              >
                Update Profile
              </button>
            </div>
          </form>

          {/* Change Password Form */}
          <form onSubmit={handlePasswordSubmit} className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
              <KeyRound className="w-5 h-5 text-[#C89D5C]" />
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                Security & Password Update
              </h3>
            </div>

            {pwError && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{pwError}</span>
              </div>
            )}

            {pwSuccess && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Admin security password updated successfully!</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-semibold block mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter current password"
                  value={currentPwInput}
                  onChange={(e) => setCurrentPwInput(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={newPwInput}
                  onChange={(e) => setNewPwInput(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Re-type new password"
                  value={confirmPwInput}
                  onChange={(e) => setConfirmPwInput(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] text-stone-400">
                Default factory passkey: <code className="font-mono">sipcafe9090</code>
              </span>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] text-xs font-bold uppercase tracking-wider"
              >
                Change Admin Password
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: SYSTEM & THEME */}
      {activeTab === 'system' && (
        <div className="space-y-6">
          {/* Appearance / Theme Mode */}
          <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-800 pb-3">
              Dashboard Appearance
            </h3>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                  Theme Mode ({theme === 'dark' ? 'Rich Espresso Dark' : 'Warm Cream Light'})
                </div>
                <div className="text-[11px] text-stone-500">
                  Switch between dark espresso coffee tones and crisp warm cream layout.
                </div>
              </div>

              <button
                onClick={onToggleTheme}
                className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 hover:bg-[#C89D5C] hover:text-[#1C140E] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
                <span>Switch to {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </div>

          {/* Data Backup & Factory Reset */}
          <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-800 pb-3">
              Data Management & Backup
            </h3>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <div>
                  <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                    Export Full Dashboard Backup (JSON)
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Download a secure JSON copy of all menu items, orders, offers, and settings.
                  </div>
                </div>
                <button
                  onClick={onExportData}
                  className="px-4 py-2 rounded-xl bg-stone-800 dark:bg-stone-700 text-white text-xs font-bold flex items-center gap-2 self-start cursor-pointer hover:bg-stone-700"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Backup</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50">
                <div>
                  <div className="font-bold text-xs text-rose-800 dark:text-rose-300">
                    Reset Database to Fresh Sip Café Defaults
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400">
                    Restores initial menu items, sample orders, and default settings.
                  </div>
                </div>
                <button
                  onClick={() => setIsResetConfirmOpen(true)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 self-start cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All Data</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Reset */}
      <ConfirmationModal
        isOpen={isResetConfirmOpen}
        title="Reset All Sip Cafe Data?"
        message="This will reset menu items, orders, offers, and settings back to default setup. Are you sure you want to proceed?"
        confirmText="Reset Everything"
        cancelText="Cancel"
        onConfirm={() => {
          onResetAllData();
          setIsResetConfirmOpen(false);
        }}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
};
