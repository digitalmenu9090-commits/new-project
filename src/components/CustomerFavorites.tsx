import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Plus } from 'lucide-react';
import { MenuItem } from '../types';

interface CustomerFavoritesProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onAddToCart?: (item: MenuItem) => void;
}

export const CustomerFavorites: React.FC<CustomerFavoritesProps> = ({
  items,
  onSelectItem,
  onAddToCart,
}) => {
  // Use ONLY the existing items (display 3 to 5 items marked popular, or the top 4)
  const popularItems = items.filter((it) => it.is_popular);
  const displayItems = popularItems.length > 0 ? popularItems : items;

  return (
    <section id="favorites" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C89D5C]/15 border border-[#C89D5C]/30 text-[#2A1810] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C89D5C]" />
            <span>Most Loved by Regulars</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C1917] tracking-tight mb-4">
            Customer Favorites
          </h2>
          <p className="text-[#57534E] text-base sm:text-lg font-light">
            Tried, tested, and celebrated every single day at Sip Cafe Kathmandu.
          </p>
        </div>

        {/* Editorial Layout of Favorites with Large Photography */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {displayItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => onSelectItem(item)}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-[#EBE3D5] flex flex-col justify-between"
            >
              {/* Image Container with CUSTOMER FAVORITE badge */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE8DD]">
                <img
                  src={item.image_url}
                  alt={item.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Customer Favorite Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2A1810]/95 backdrop-blur-md text-[#C89D5C] text-[10px] font-bold uppercase tracking-wider shadow-md border border-[#C89D5C]/40">
                  <Sparkles className="w-3 h-3" />
                  <span>CUSTOMER FAVORITE</span>
                </div>

                {/* Exact Price Tag in रू */}
                <div className="absolute bottom-3 right-3 z-10 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#2A1810] font-bold text-xs tracking-wide shadow-lg border border-[#E8DFC8]">
                  <span className="text-[#C89D5C] mr-1">रू</span>
                  <span>{item.price}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#1C1917] group-hover:text-[#C89D5C] transition-colors mb-1.5 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#57534E] font-light line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#F5EDE1] flex items-center justify-between text-xs gap-2">
                  <span className="text-emerald-700 font-medium flex items-center gap-1 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Available Fresh
                  </span>
                  {onAddToCart ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(item);
                      }}
                      className="px-2.5 py-1 rounded-full bg-[#C89D5C] hover:bg-[#b58c4f] text-[#1C140E] font-bold text-[11px] flex items-center gap-1 shadow-2xs cursor-pointer transition-all active:scale-95"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Order</span>
                    </button>
                  ) : (
                    <span className="text-[#2A1810] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform text-[11px]">
                      <span>View item</span>
                      <ArrowRight className="w-3 h-3 text-[#C89D5C]" />
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View full menu CTA */}
        <div className="text-center mt-12">
          <a
            href="#menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#2A1810] hover:bg-[#3D2314] text-[#FAF7F2] font-semibold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-lg"
          >
            <span>See Complete Food & Beverage Menu</span>
            <ArrowRight className="w-4 h-4 text-[#C89D5C]" />
          </a>
        </div>
      </div>
    </section>
  );
};
