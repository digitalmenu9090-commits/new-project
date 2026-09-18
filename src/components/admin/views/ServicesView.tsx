import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Edit3, 
  Trash2, 
  Sun, 
  Coffee, 
  Wifi, 
  PartyPopper, 
  Bike, 
  Cake, 
  Music, 
  Tv, 
  Utensils, 
  X,
  CheckCircle2
} from 'lucide-react';
import { CafeService } from '../../../types';
import { ConfirmationModal } from '../ConfirmationModal';

interface ServicesViewProps {
  services: CafeService[];
  onSaveService: (service: CafeService) => void;
  onDeleteService: (serviceId: string) => void;
  onToggleService: (serviceId: string) => void;
}

const AVAILABLE_ICONS = [
  { name: 'Sun', component: Sun, label: 'Patio / Outdoor' },
  { name: 'Coffee', component: Coffee, label: 'Brewing / Coffee' },
  { name: 'Wifi', component: Wifi, label: 'Free Wi-Fi' },
  { name: 'PartyPopper', component: PartyPopper, label: 'Events & Parties' },
  { name: 'Bike', component: Bike, label: 'Takeaway / Delivery' },
  { name: 'Cake', component: Cake, label: 'Bakery / Cake' },
  { name: 'Music', component: Music, label: 'Acoustic / Music' },
  { name: 'Tv', component: Tv, label: 'Live Screening' },
  { name: 'Utensils', component: Utensils, label: 'Catering / Dining' },
];

export const ServicesView: React.FC<ServicesViewProps> = ({
  services,
  onSaveService,
  onDeleteService,
  onToggleService,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<CafeService | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<CafeService | null>(null);

  // Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Coffee');
  const [category, setCategory] = useState('Dining Experience');
  const [badge, setBadge] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleOpenAdd = () => {
    setEditingService(null);
    setTitle('');
    setDescription('');
    setIcon('Sun');
    setCategory('Dining Experience');
    setBadge('');
    setIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service: CafeService) => {
    setEditingService(service);
    setTitle(service.title);
    setDescription(service.description);
    setIcon(service.icon);
    setCategory(service.category);
    setBadge(service.badge || '');
    setIsActive(service.isActive);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter service title.');
      return;
    }

    const serviceToSave: CafeService = {
      id: editingService ? editingService.id : `srv-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      icon,
      category,
      badge: badge.trim() || undefined,
      isActive
    };

    onSaveService(serviceToSave);
    setIsModalOpen(false);
  };

  const renderIcon = (iconName: string) => {
    const found = AVAILABLE_ICONS.find(i => i.name === iconName);
    const Comp = found ? found.component : Coffee;
    return <Comp className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
            Services & Amenities
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Control the services and hospitality features highlighted for Sip Café visitors
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((srv) => (
          <div
            key={srv.id}
            className={`bg-white dark:bg-[#1C140E] border rounded-3xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
              srv.isActive
                ? 'border-stone-200 dark:border-stone-800'
                : 'border-stone-200/60 dark:border-stone-800/60 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF3E8] dark:bg-[#2A1810] text-[#C89D5C] flex items-center justify-center border border-[#C89D5C]/30 shadow-xs">
                  {renderIcon(srv.icon)}
                </div>

                <div className="flex items-center gap-2">
                  {srv.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C89D5C] text-[#1C140E]">
                      {srv.badge}
                    </span>
                  )}
                  <button
                    onClick={() => onToggleService(srv.id)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                      srv.isActive
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
                    }`}
                  >
                    {srv.isActive ? 'Active' : 'Hidden'}
                  </button>
                </div>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C89D5C]">
                {srv.category}
              </span>
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 mt-1">
                {srv.title}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">
                {srv.description}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <span className="text-[11px] text-stone-400">
                Status: {srv.isActive ? 'Displayed to customers' : 'Paused in settings'}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(srv)}
                  className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-[#C89D5C] hover:text-[#1C140E] text-stone-700 dark:text-stone-300 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setServiceToDelete(srv)}
                  className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                  title="Delete service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={serviceToDelete !== null}
        title="Delete Cafe Service?"
        message={`Are you sure you want to remove "${serviceToDelete?.title}"?`}
        confirmText="Yes, Delete Service"
        cancelText="Cancel"
        onConfirm={() => {
          if (serviceToDelete) {
            onDeleteService(serviceToDelete.id);
            setServiceToDelete(null);
          }
        }}
        onCancel={() => setServiceToDelete(null)}
      />

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-stone-900 dark:text-stone-100">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="font-serif font-bold text-xl">
                {editingService ? 'Edit Cafe Service' : 'Add New Service'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Outdoor Garden & Terrace Seating"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Dining Experience, Coffee Bar, Workspace"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Badge (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Free, Popular, Signature"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                  />
                </div>
              </div>

              {/* Icon Selector */}
              <div>
                <label className="font-semibold block mb-1.5">Select Feature Icon</label>
                <div className="grid grid-cols-3 gap-2">
                  {AVAILABLE_ICONS.map((ic) => {
                    const Comp = ic.component;
                    const isSelected = icon === ic.name;
                    return (
                      <button
                        key={ic.name}
                        type="button"
                        onClick={() => setIcon(ic.name)}
                        className={`p-2 rounded-xl border flex items-center gap-2 transition-all text-left ${
                          isSelected
                            ? 'bg-[#FAF3E8] dark:bg-[#2A1810] border-[#C89D5C] text-[#C89D5C]'
                            : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900'
                        }`}
                      >
                        <Comp className="w-4 h-4 shrink-0" />
                        <span className="text-[11px] font-medium truncate">{ic.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Describe the experience, amenities, and details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 p-3 rounded-xl border border-stone-200 dark:border-stone-800 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-900/40">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-[#C89D5C] focus:ring-[#C89D5C]"
                  />
                  <div>
                    <div className="font-bold">Active and Featured on Sip Cafe</div>
                    <div className="text-[10px] text-stone-400">Visible on the cafe's public profile</div>
                  </div>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] text-xs font-bold uppercase tracking-wider"
                >
                  {editingService ? 'Save Service' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
