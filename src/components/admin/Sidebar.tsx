import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  UtensilsCrossed, 
  Users, 
  Tag, 
  Sparkles, 
  BarChart3, 
  Settings, 
  LogOut, 
  Coffee,
  X,
  ExternalLink,
  Phone
} from 'lucide-react';
import { AdminViewTab } from '../../types';

interface SidebarProps {
  activeTab: AdminViewTab;
  onSelectTab: (tab: AdminViewTab) => void;
  pendingOrdersCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onLogout: () => void;
  isCafeOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  pendingOrdersCount,
  isOpenMobile,
  onCloseMobile,
  onLogout,
  isCafeOpen,
}) => {
  const navItems: { id: AdminViewTab; label: string; icon: React.ElementType; badge?: number | string }[] = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Live Orders', icon: ShoppingBag, badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined },
    { id: 'menu', label: 'Menu Catalog', icon: UtensilsCrossed },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'offers', label: 'Special Offers', icon: Tag },
    { id: 'services', label: 'Cafe Services', icon: Sparkles },
    { id: 'analytics', label: 'Sales Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden animate-in fade-in"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#1C140E] border-r border-[#3D281B] text-[#FAF7F2] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Branding */}
        <div>
          <div className="p-5 border-b border-[#3D281B] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#C89D5C] to-[#8C6228] flex items-center justify-center text-[#1C140E] font-serif font-black text-xl shadow-md border border-[#FAF7F2]/20">
                S
              </div>
              <div>
                <div className="font-serif font-bold text-lg tracking-wider text-[#FAF7F2] leading-none">
                  SIP CAFÉ
                </div>
                <div className="text-[10px] text-[#C89D5C] font-semibold tracking-widest uppercase mt-1">
                  Admin Command
                </div>
              </div>
            </div>

            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-stone-400 hover:text-white lg:hidden cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Store Live Pill */}
          <div className="px-5 py-3 border-b border-[#2D1D13] bg-[#140D09]/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isCafeOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
              <span className="text-[11px] font-semibold text-stone-300">
                {isCafeOpen ? 'Cafe Open for Dine-in' : 'Store Closed'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-stone-400">Kathmandu</span>
          </div>

          {/* Nav List */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#C89D5C] to-[#B58C4F] text-[#1C140E] shadow-sm font-bold'
                      : 'text-stone-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#1C140E]' : 'text-[#C89D5C]'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-[#1C140E] text-[#FAF7F2]' : 'bg-amber-500 text-[#1C140E]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-[#3D281B] bg-[#140D09]/50 space-y-3">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-stone-400 space-y-1">
            <div className="flex items-center justify-between text-stone-300">
              <span className="font-semibold">Pipalbot, Kathmandu</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#C89D5C]">
              <Phone className="w-3 h-3" />
              <span>9767560484 / 9813779214</span>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-rose-950/40 hover:text-rose-300 border border-white/5 hover:border-rose-800/40 text-stone-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Logout of Admin</span>
          </button>
        </div>
      </aside>
    </>
  );
};
