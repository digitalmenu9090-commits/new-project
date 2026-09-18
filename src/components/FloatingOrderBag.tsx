import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from './WebsiteOrderModal';

interface FloatingOrderBagProps {
  cart: CartItem[];
  onOpenOrderModal: () => void;
}

export const FloatingOrderBag: React.FC<FloatingOrderBagProps> = ({
  cart,
  onOpenOrderModal,
}) => {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, { item, quantity }) => {
    const priceNum = parseInt(item.price.replace(/\D/g, ''), 10) || 160;
    return sum + priceNum * quantity;
  }, 0);

  if (totalCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.9 }}
        className="fixed bottom-6 left-4 sm:left-6 z-40"
      >
        <button
          onClick={onOpenOrderModal}
          className="group flex items-center gap-3 px-4 sm:px-5 py-3 rounded-full bg-[#1C140E] hover:bg-[#2A1810] text-white shadow-2xl border border-[#C89D5C]/50 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="View current order bag"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#C89D5C] text-[#1C140E] flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-[#1C140E]">
              {totalCount}
            </span>
          </div>

          <div className="flex flex-col text-left pr-1">
            <span className="text-[10px] text-[#C89D5C] font-bold uppercase tracking-wider leading-none">
              Your Order Bag
            </span>
            <span className="text-xs sm:text-sm font-serif font-bold text-[#FAF7F2] mt-0.5">
              रू {totalPrice.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-1 pl-2 border-l border-white/10 text-xs font-bold text-[#C89D5C]">
            <span className="hidden sm:inline">Checkout</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
