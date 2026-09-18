// High-fidelity Web Audio API cafe order notification sound synthesizer
// Works across all modern browsers with no external asset dependencies

let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  try {
    if (!audioContext || audioContext.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioContext = new AudioCtx();
      }
    }
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume().catch(() => {});
    }
    return audioContext;
  } catch {
    return null;
  }
};

/**
 * Plays a pleasant, distinct cafe service bell chime (two-tone chime: 1046Hz C6 -> 1318Hz E6)
 * Designed to be audible, clear and professional for restaurant/kitchen environments.
 */
export const playNewOrderSound = (): void => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Tone 1: High crisp bell ding
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1046.5, now); // C6
    osc1.frequency.exponentialRampToValueAtTime(1046.5, now + 0.35);

    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.5);

    // Tone 2: Harmonic higher bell strike (delayed by 140ms for the iconic cafe ding-ding)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1318.5, now + 0.14); // E6
    osc2.frequency.exponentialRampToValueAtTime(1567.98, now + 0.22); // G6

    gain2.gain.setValueAtTime(0, now);
    gain2.gain.setValueAtTime(0.38, now + 0.14);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.14);
    osc2.stop(now + 0.85);

    // Gentle sparkle overtone for sweetness
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(2093.0, now + 0.15); // C7
    gain3.gain.setValueAtTime(0.08, now + 0.15);
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    osc3.connect(gain3);
    gain3.connect(ctx.destination);
    osc3.start(now + 0.15);
    osc3.stop(now + 0.6);
  } catch (err) {
    console.warn('Audio playback error', err);
  }
};

/**
 * Plays a quick, subtle confirmation click/chime for UI changes (saving prices, toggles, etc.)
 */
export const playSuccessSound = (): void => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.1); // A5

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  } catch (err) {
    console.warn('Audio error', err);
  }
};
