import React, { useState } from 'react';
import { X, Plus, Trash2, Edit2, Check, FolderPlus, Tag } from 'lucide-react';
import { Category, MenuItem } from '../../types';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  menuItems: MenuItem[];
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  categories,
  setCategories,
  menuItems,
}) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editingCatName, setEditingCatName] = useState('');

  if (!isOpen) return null;

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name: newCategoryName.trim(),
      sort_order: categories.length + 1,
      item_count_label: 'Fresh items',
    };

    setCategories((prev) => [...prev, newCat]);
    setNewCategoryName('');
  };

  const handleSaveEdit = (catId: string) => {
    if (!editingCatName.trim()) return;
    setCategories((prev) =>
      prev.map((c) => (c.id === catId ? { ...c, name: editingCatName.trim() } : c))
    );
    setEditingCatId(null);
    setEditingCatName('');
  };

  const handleDeleteCategory = (catId: string) => {
    const itemsCount = menuItems.filter((i) => i.category_id === catId).length;
    if (itemsCount > 0) {
      if (
        !confirm(
          `This category has ${itemsCount} menu items associated with it. Are you sure you want to delete it?`
        )
      ) {
        return;
      }
    }
    setCategories((prev) => prev.filter((c) => c.id !== catId));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-[#C89D5C] flex items-center justify-center">
              <FolderPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">Manage Menu Categories</h3>
              <p className="text-[11px] text-stone-500">Create and organize food & beverage sections</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add new category form */}
        <form onSubmit={handleAddCategory} className="flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder="New Category Name (e.g., Cold Brews, Pastries)"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="flex-1 px-3.5 py-2 border border-stone-200 rounded-xl text-xs focus:border-[#C89D5C] focus:outline-hidden"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#2A1810] text-[#C89D5C] hover:bg-[#3D281B] rounded-xl text-xs font-bold flex items-center gap-1 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </form>

        {/* Categories list */}
        <div className="overflow-y-auto divide-y divide-stone-100 border border-stone-200 rounded-2xl flex-1 bg-white">
          {categories.map((cat) => {
            const count = menuItems.filter((i) => i.category_id === cat.id).length;
            const isEditing = editingCatId === cat.id;

            return (
              <div
                key={cat.id}
                className="p-3 px-3.5 flex items-center justify-between text-xs hover:bg-stone-50 transition-colors"
              >
                {isEditing ? (
                  <div className="flex items-center gap-2 flex-1 mr-2">
                    <input
                      type="text"
                      value={editingCatName}
                      onChange={(e) => setEditingCatName(e.target.value)}
                      autoFocus
                      className="flex-1 px-2.5 py-1 border border-[#C89D5C] rounded-lg text-xs font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => handleSaveEdit(cat.id)}
                      className="p-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingCatId(null)}
                      className="p-1 bg-stone-200 text-stone-600 rounded-lg hover:bg-stone-300"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5">
                    <Tag className="w-3.5 h-3.5 text-[#C89D5C]" />
                    <span className="font-bold text-stone-900">{cat.name}</span>
                    <span className="text-[10px] text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                      {count} items
                    </span>
                  </div>
                )}

                {!isEditing && (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCatId(cat.id);
                        setEditingCatName(cat.name);
                      }}
                      className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
                      title="Rename category"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
