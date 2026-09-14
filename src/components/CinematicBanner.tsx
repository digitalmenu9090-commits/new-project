import React from 'react';
import { motion } from 'motion/react';
import { Utensils, Coffee, Sparkles } from 'lucide-react';

export const CinematicBanner: React.FC = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#2A1810] text-[#FAF7F2] overflow-hidden border-y border-[#C89D5C]/30">
      {/* Subtle warm ambient lighting accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C89D5C]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#2D5A43]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#C89D5C] text-xs font-bold uppercase tracking-[0.25em] mb-4 border border-[#C89D5C]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Good Food • Great Coffee • Better Vibes</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#FAF7F2] tracking-tight mb-4">
            A Welcoming Space in Pipalbot
          </h2>

          <p className="text-lg sm:text-xl font-serif italic text-[#E4D9C8] mb-8 font-light max-w-2xl">
            Whether catching up with friends, working on our sunlit terrace, or grabbing your daily Himalayan brew — Sip Café is here for you.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#menu"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#C89D5C] hover:bg-[#b58c4f] text-[#1C140E] font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              <Utensils className="w-4 h-4" />
              <span>EXPLORE FULL MENU</span>
            </a>

            <a
              href="#gallery"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-transparent hover:bg-white/10 text-[#FAF7F2] border border-white/30 hover:border-[#C89D5C] font-semibold text-xs uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5"
            >
              <Coffee className="w-4 h-4 text-[#C89D5C]" />
              <span>VIEW PHOTOS</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

