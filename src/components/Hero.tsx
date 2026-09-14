import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Utensils, MapPin, MessageCircle, Sparkles, Maximize2, X, Phone } from 'lucide-react';
import { CafeSettings } from '../types';

interface HeroProps {
  settings: CafeSettings;
  onUpdateHeroImage?: (newUrl: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ settings }) => {
  const [showFullPhoto, setShowFullPhoto] = useState(false);

  const realStorefrontImg =
    settings.hero_image ||
    './sip_cafe_real_original.jpg';

  const cleanPhone = (settings.whatsapp || '985131996').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/977${cleanPhone.length === 10 ? cleanPhone : '985131996'}?text=${encodeURIComponent(
    'Namaste Sip Cafe! I would like to order or reserve a table at Pipalbot.'
  )}`;

  return (
    <section
      id="hero"
      className="relative text-[#FAF7F2] pt-28 pb-16 lg:pt-32 lg:pb-24 border-b border-[#2A1810] overflow-hidden min-h-[90vh] flex items-center"
    >
      {/* Real Photo Background of Sip Cafe */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={realStorefrontImg}
          alt="Authentic Sip Cafe storefront background in Pipalbot, Kathmandu"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.08] scale-105"
        />
        {/* Rich cinematic gradient layers so text is 100% legible with premium cafe ambiance */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#140D08]/96 via-[#1C140E]/88 to-[#1C140E]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#140D08] via-transparent to-[#140D08]/75" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Cafe Branding & Story */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Real Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2D5A43]/40 border border-[#2D5A43] text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-5 shadow-xs backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Open Daily: 7:00 AM – 9:00 PM</span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1 text-white">
                <MapPin className="w-3 h-3 text-[#C89D5C]" />
                Pipalbot, Kathmandu
              </span>
            </motion.div>

            {/* Primary Brand Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-none mb-3 drop-shadow-sm"
            >
              {settings.hero_title || 'SIP CAFÉ'}
            </motion.h1>

            {/* Authentic Slogan matching the real sign */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif italic text-lg sm:text-2xl text-[#E8C58C] tracking-wide mb-4 font-semibold"
            >
              "Good Food • Great Coffee • Better Vibes"
            </motion.p>

            {/* Narrative Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-[#E6DFD5] leading-relaxed max-w-xl mb-8 font-sans font-normal"
            >
              Welcome to our cozy neighborhood cafe in Pipalbot, Kathmandu. Relax on our green outdoor patio terrace, sip freshly roasted Himalayan coffee, and enjoy delicious momo, burgers, cold brews, and refreshing drinks.
            </motion.p>

            {/* Quick Feature Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full mb-8"
            >
              <div className="flex items-center gap-2 p-2.5 bg-[#241812]/85 rounded-xl border border-white/10 shadow-xs backdrop-blur-md">
                <span className="text-base">☕</span>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Specialty Coffee</div>
                  <div className="text-[10px] text-stone-300">Himalayan Brews</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 bg-[#241812]/85 rounded-xl border border-white/10 shadow-xs backdrop-blur-md">
                <span className="text-base">🌿</span>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Outdoor Terrace</div>
                  <div className="text-[10px] text-stone-300">Cozy Garden Patio</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 bg-[#241812]/85 rounded-xl border border-white/10 shadow-xs backdrop-blur-md col-span-2 sm:col-span-1">
                <span className="text-base">🥟</span>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Delicious Food</div>
                  <div className="text-[10px] text-stone-300">Momo, Burgers & Rolls</div>
                </div>
              </div>
            </motion.div>

            {/* Hero CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3 w-full"
            >
              <a
                href="#menu"
                id="hero-explore-menu-btn"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#C89D5C] hover:bg-[#b58c4f] text-[#140D08] font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <Utensils className="w-4 h-4 text-[#140D08]" />
                <span>EXPLORE MENU</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-btn"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>ORDER ON WHATSAPP</span>
              </a>

              <a
                href="#location"
                id="hero-visit-us-btn"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/25 font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-xs hover:shadow-sm backdrop-blur-md"
              >
                <MapPin className="w-4 h-4 text-[#C89D5C]" />
                <span>FIND US</span>
              </a>

              {/* Direct Call Numbers */}
              <div className="w-full flex flex-wrap items-center gap-2 pt-2 text-xs text-[#E6DFD5]">
                <span className="inline-flex items-center gap-1 text-[#E8C58C] font-semibold">
                  <Phone className="w-3 h-3" />
                  Direct Call:
                </span>
                <a
                  href={`tel:${settings.phone}`}
                  className="hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-md backdrop-blur-xs font-mono"
                >
                  {settings.phone}
                </a>
                <span className="text-white/40">•</span>
                <a
                  href={`tel:${settings.secondary_phone || '9813779214'}`}
                  className="hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-md backdrop-blur-xs font-mono"
                >
                  {settings.secondary_phone || '9813779214'}
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Prominent Real & Natural Image */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Natural Image Container with authentic lighting and frame */}
              <div
                onClick={() => setShowFullPhoto(true)}
                className="group relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-[#2A1810] cursor-pointer transition-all duration-300 hover:scale-[1.01]"
              >
                <img
                  src={realStorefrontImg}
                  alt="Sip Cafe storefront and outdoor terrace in Pipalbot, Kathmandu"
                  referrerPolicy="no-referrer"
                  className="w-full h-[400px] sm:h-[480px] lg:h-[520px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle natural daylight gradient at base for label readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-90 group-hover:opacity-100 transition-opacity" />

                {/* Top Controls: Floating Badges & Expand */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-20 pointer-events-none">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#2A1810] text-xs font-bold shadow-md pointer-events-auto">
                    <Sparkles className="w-3.5 h-3.5 text-[#C89D5C]" />
                    <span>Storefront & Terrace</span>
                  </div>

                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFullPhoto(true);
                    }}
                    className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer pointer-events-auto shadow-md"
                    title="Zoom photo full screen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Photo Caption */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#1C140E]/85 backdrop-blur-md text-white border border-white/10 shadow-lg">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="font-serif font-bold text-sm sm:text-base text-[#FAF7F2]">
                        Sip Café • Pipalbot, Kathmandu
                      </h3>
                      <p className="text-xs text-[#C89D5C] font-serif italic">
                        Good Food • Great Coffee • Better Vibes
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-white/80 bg-white/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                      Open Daily 7AM - 9PM
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute -bottom-4 -left-4 -z-10 w-full h-full rounded-3xl border-2 border-[#C89D5C]/30 hidden sm:block pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Lightbox Modal for Full View */}
      {showFullPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setShowFullPhoto(false)}
        >
          <button
            onClick={() => setShowFullPhoto(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-50 cursor-pointer"
            aria-label="Close photo"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={realStorefrontImg}
              alt="Real Sip Cafe storefront in Kathmandu"
              referrerPolicy="no-referrer"
              className="max-h-[82vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/20"
            />
            <div className="mt-3 text-center text-white/90 text-sm">
              <span className="font-bold text-[#C89D5C]">Sip Café Kathmandu</span> — Pipalbot, Open 7:00 AM to 9:00 PM
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

