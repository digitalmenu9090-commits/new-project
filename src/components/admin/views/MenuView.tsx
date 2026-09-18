import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Upload, 
  Image as ImageIcon, 
  Check, 
  X, 
  Coffee, 
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Filter
} from 'lucide-react';
import { MenuItem, Category } from '../../../types';
import { ConfirmationModal } from '../ConfirmationModal';

interface MenuViewProps {
  menuItems: MenuItem[];
  categories: Category[];
  onSaveMenuItem: (item: MenuItem) => void;
  onDeleteMenuItem: (itemId: string) => void;
  onToggleAvailability: (itemId: string) => void;
  onTogglePopular: (itemId: string) => void;
}

export const MenuView: React.FC<MenuViewProps> = ({
  menuItems,
  categories,
  onSaveMenuItem,
  onDeleteMenuItem,
  onToggleAvailability,
  onTogglePopular,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Delete confirmation modal state
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);

  // Form states for Add/Edit
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formCategory, setFormCategory] = useState(categories[0]?.id || 'cat-cold-coffee');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formDietary, setFormDietary] = useState<'veg' | 'non-veg' | 'beverage'>('beverage');
  const [formIsPopular, setFormIsPopular] = useState(false);
  const [formIsAvailable, setFormIsAvailable] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormName('');
    setFormDesc('');
    setFormPrice('');
    setFormCategory(categories[0]?.id || 'cat-cold-coffee');
    setFormImageUrl('https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80');
    setFormDietary('beverage');
    setFormIsPopular(false);
    setFormIsAvailable(true);
    setIsEditingModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormDesc(item.description);
    setFormPrice(item.price);
    setFormCategory(item.category_id);
    setFormImageUrl(item.image_url);
    setFormDietary(item.dietary || 'beverage');
    setFormIsPopular(item.is_popular);
    setFormIsAvailable(item.is_available);
    setIsEditingModalOpen(true);
  };

  // Handle Image Upload via file reader
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB limit. Please upload an image under 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setFormImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Item Submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPrice.trim()) {
      alert('Please provide item name and price.');
      return;
    }

    const itemToSave: MenuItem = {
      id: editingItem ? editingItem.id : `menu-${Date.now()}`,
      name: formName.trim(),
      description: formDesc.trim(),
      price: formPrice.trim(),
      category_id: formCategory,
      image_url: formImageUrl.trim() || 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
      dietary: formDietary,
      is_popular: formIsPopular,
      is_available: formIsAvailable,
      created_at: editingItem ? editingItem.created_at : new Date().toISOString()
    };

    onSaveMenuItem(itemToSave);
    setIsEditingModalOpen(false);
  };

  // Filter items
  const filteredItems = menuItems.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category_id === selectedCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.price.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
            Menu Management
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Update menu prices, upload food images, toggle stock availability, and manage categories
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Menu Item</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#2A1810] dark:bg-[#FAF7F2] text-white dark:text-[#1C140E]'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
            }`}
          >
            All Items ({menuItems.length})
          </button>
          {categories.map((cat) => {
            const count = menuItems.filter(i => i.category_id === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#2A1810] dark:bg-[#FAF7F2] text-white dark:text-[#1C140E]'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-[#C89D5C] text-[#1C140E]' : 'bg-stone-200 dark:bg-stone-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search items by name, price, ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C89D5C]"
          />
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`bg-white dark:bg-[#1C140E] border rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
              item.is_available 
                ? 'border-stone-200 dark:border-stone-800' 
                : 'border-rose-200 dark:border-rose-950/60 bg-stone-50/50 dark:bg-stone-900/30'
            }`}
          >
            <div>
              {/* Image & Badges */}
              <div className="relative h-44 w-full bg-stone-100 dark:bg-stone-900 overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className={`w-full h-full object-cover transition-transform hover:scale-105 duration-300 ${
                    !item.is_available ? 'grayscale opacity-75' : ''
                  }`}
                  loading="lazy"
                />

                {/* Status Badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                  <button
                    onClick={() => onToggleAvailability(item.id)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm transition-transform active:scale-95 cursor-pointer ${
                      item.is_available
                        ? 'bg-emerald-600 text-white'
                        : 'bg-rose-600 text-white'
                    }`}
                    title="Click to toggle availability"
                  >
                    {item.is_available ? 'In Stock' : 'Sold Out'}
                  </button>

                  {item.is_popular && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C89D5C] text-[#1C140E] uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Popular</span>
                    </span>
                  )}
                </div>

                {/* Dietary Tag */}
                {item.dietary && (
                  <div className="absolute bottom-2.5 left-2.5">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                      item.dietary === 'veg' 
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40' 
                        : item.dietary === 'non-veg'
                        ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                        : 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                    }`}>
                      {item.dietary}
                    </span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base leading-snug">
                    {item.name}
                  </h3>
                  <div className="text-right shrink-0">
                    <span className="text-base font-bold font-serif text-[#C89D5C]">
                      रू {item.price}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-4 pt-0 border-t border-stone-100 dark:border-stone-800/80 mt-2 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onTogglePopular(item.id)}
                  className={`p-1.5 rounded-lg border text-[11px] font-medium transition-colors ${
                    item.is_popular
                      ? 'border-[#C89D5C] text-[#C89D5C] bg-[#C89D5C]/10'
                      : 'border-stone-200 dark:border-stone-700 text-stone-400 hover:text-stone-600'
                  }`}
                  title="Toggle Popular Badge"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-[#C89D5C] hover:text-[#1C140E] text-stone-700 dark:text-stone-300 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setItemToDelete(item)}
                  className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                  title="Delete item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal for Item Deletion */}
      <ConfirmationModal
        isOpen={itemToDelete !== null}
        title="Delete Menu Item?"
        message={`Are you sure you want to delete "${itemToDelete?.name}"? This item will be permanently removed from Sip Café's active menu.`}
        confirmText="Yes, Delete Item"
        cancelText="Cancel"
        onConfirm={() => {
          if (itemToDelete) {
            onDeleteMenuItem(itemToDelete.id);
            setItemToDelete(null);
          }
        }}
        onCancel={() => setItemToDelete(null)}
      />

      {/* Add / Edit Menu Item Modal */}
      {isEditingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#1C140E] border border-stone-200 dark:border-stone-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 text-stone-900 dark:text-stone-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <div>
                <h3 className="font-serif font-bold text-xl">
                  {editingItem ? `Edit: ${editingItem.name}` : 'Add New Menu Item'}
                </h3>
                <p className="text-xs text-stone-400">
                  Manage price, image, category, and availability
                </p>
              </div>
              <button
                onClick={() => setIsEditingModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Item Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Iced Lutte / Chicken Momo"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Price (रू / NPR) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 195 or 125/145/195"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Dietary Tag</label>
                  <select
                    value={formDietary}
                    onChange={(e) => setFormDietary(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                  >
                    <option value="beverage">Beverage (Coffee/Tea)</option>
                    <option value="veg">Vegetarian</option>
                    <option value="non-veg">Non-Vegetarian</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Description & Ingredients</label>
                <textarea
                  rows={2}
                  placeholder="Crisp iced espresso poured over ice with fresh Himalayan milk..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                />
              </div>

              {/* Food Image Upload & URL */}
              <div>
                <label className="font-semibold block mb-1.5">Food / Drink Image</label>
                <div className="flex flex-col sm:flex-row items-center gap-4 p-3 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                  <img
                    src={formImageUrl || 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80'}
                    alt="Preview"
                    className="w-20 h-20 rounded-xl object-cover border border-stone-300 dark:border-stone-700 shrink-0"
                  />
                  <div className="space-y-2 flex-1 w-full">
                    <input
                      type="text"
                      placeholder="Paste image URL (Unsplash or direct image URL)"
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-xs"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-lg bg-stone-200 dark:bg-stone-700 hover:bg-[#C89D5C] hover:text-[#1C140E] text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Device Image</span>
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageFileUpload}
                      />
                      <span className="text-[11px] text-stone-400">PNG, JPG up to 2MB</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-stone-200 dark:border-stone-800 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-900/40">
                  <input
                    type="checkbox"
                    checked={formIsAvailable}
                    onChange={(e) => setFormIsAvailable(e.target.checked)}
                    className="w-4 h-4 rounded text-[#C89D5C] focus:ring-[#C89D5C]"
                  />
                  <div>
                    <div className="font-bold">In Stock & Available</div>
                    <div className="text-[10px] text-stone-400">Ready to serve customers</div>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-stone-200 dark:border-stone-800 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-900/40">
                  <input
                    type="checkbox"
                    checked={formIsPopular}
                    onChange={(e) => setFormIsPopular(e.target.checked)}
                    className="w-4 h-4 rounded text-[#C89D5C] focus:ring-[#C89D5C]"
                  />
                  <div>
                    <div className="font-bold">Highlight as Popular</div>
                    <div className="text-[10px] text-stone-400">Show golden badge</div>
                  </div>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsEditingModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C89D5C] hover:bg-[#B58C4F] text-[#1C140E] text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  {editingItem ? 'Save Changes' : 'Add to Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
