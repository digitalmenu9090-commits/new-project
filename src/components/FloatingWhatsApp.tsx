import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Sparkles } from 'lucide-react';

interface FloatingWhatsAppProps {
  whatsappNumber: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ whatsappNumber }) => {
  const [showInactivityOffer, setShowInactivityOffer] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastHoverSoundRef = useRef<number>(0);

  // Subtle web audio sound effects for enhanced feedback
  const getAudioContext = () => {
    if (typeof window === 'undefined') return null;
    try {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
      return audioCtxRef.current;
    } catch {
      return null;
    }
  };

  const playHoverSound = () => {
    const nowTs = Date.now();
    // Throttle to prevent overlapping sounds on rapid jitter
    if (nowTs - lastHoverSoundRef.current < 400) return;
    lastHoverSoundRef.current = nowTs;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const now = ctx.currentTime;
      // Gentle warm upward chime (D5 to A5)
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      // Very subtle, unobtrusive volume
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch {
      // Audio playback restrictions safely handled
    }
  };

  const playClickSound = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const now = ctx.currentTime;
      // Satisfying soft tactile bubble pop
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(784, now + 0.06);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Audio playback restrictions safely handled
    }
  };

  useEffect(() => {
    // Inactivity threshold: 7 seconds of no user interaction
    const INACTIVITY_MS = 7000;

    const resetInactivityTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        setShowInactivityOffer(true);
      }, INACTIVITY_MS);
    };

    // Initialize timer
    resetInactivityTimer();

    // Listen for user activity
    const activityEvents: (keyof WindowEventMap)[] = [
      'mousemove',
      'mousedown',
      'keydown',
      'touchstart',
      'scroll'
    ];

    const handleUserActivity = () => {
      // If the offer hasn't shown yet and wasn't dismissed, reset the inactivity countdown
      if (!showInactivityOffer && !dismissed) {
        resetInactivityTimer();
      }
    };

    activityEvents.forEach((evt) => {
      window.addEventListener(evt, handleUserActivity, { passive: true });
    });

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      activityEvents.forEach((evt) => {
        window.removeEventListener(evt, handleUserActivity);
      });
    };
  }, [showInactivityOffer, dismissed]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playClickSound();
    setDismissed(true);
    setShowInactivityOffer(false);
  };

  const whatsappMessage = showInactivityOffer
    ? encodeURIComponent('Hello Sip Cafe Kathmandu, I would love to ask about your special daily cold coffee offer today!')
    : encodeURIComponent('Hello Sip Cafe Kathmandu, I would like to make an inquiry / order!');

  const isBadgeVisible = showInactivityOffer && !dismissed;

  const handleButtonMouseEnter = () => {
    if (isBadgeVisible) {
      playHoverSound();
    }
  };

  const handleButtonClick = () => {
    if (isBadgeVisible) {
      playClickSound();
      setDismissed(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Inactivity Special Offer Banner */}
      <AnimatePresence>
        {isBadgeVisible && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 15, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onMouseEnter={handleButtonMouseEnter}
            className="flex items-center gap-3 bg-white text-[#1C1917] pl-3.5 pr-2.5 py-2.5 rounded-2xl shadow-2xl border border-[#C89D5C]/30 text-xs font-medium max-w-[calc(100vw-6rem)] sm:max-w-xs relative group"
          >
            <a
              href={`https://wa.me/977${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleButtonClick}
              className="flex items-center gap-2 text-left hover:text-[#C89D5C] transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-[#C89D5C]/15 text-[#C89D5C] flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="font-semibold text-stone-900 flex items-center gap-1.5 leading-tight">
                  <span>Special Daily Offer</span>
                  <span className="bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                    New
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 leading-tight mt-0.5">
                  Ask about today's freshly brewed cold coffee deals!
                </p>
              </div>
            </a>

            <button
              onClick={handleDismiss}
              className="text-stone-400 hover:text-stone-700 hover:bg-stone-100 p-1 rounded-full transition-colors shrink-0"
              aria-label="Dismiss daily offer alert"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Floating Button */}
      <motion.a
        href={`https://wa.me/977${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={handleButtonMouseEnter}
        onClick={handleButtonClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:shadow-[#25D366]/40 transition-shadow duration-300 relative group"
        aria-label="Chat with Sip Cafe on WhatsApp"
      >
        {/* Pulse ripple */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />

        <MessageCircle className="w-7 h-7 fill-white/20 stroke-white" />

        {/* Counter Badge / Notification Dot */}
        <AnimatePresence>
          {isBadgeVisible && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              className="absolute -top-1 -right-1 flex items-center justify-center"
            >
              {/* Notification ping ripple */}
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-80" />
              {/* Counter badge badge showing '1' */}
              <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-rose-600 text-white text-[11px] font-bold shadow-md border-2 border-white">
                1
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.a>
    </div>
  );
};


