/**
 * Web Audio API synthesizer for Mystic Food Tarot
 * Pure client-side synthesis: Zero external audio files required, instant playback
 */

class MysticSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    try {
      const stored = localStorage.getItem('food_tarot_sound_muted');
      if (stored === 'true') {
        this.isMuted = true;
      }
    } catch {
      // ignore
    }
  }

  private initContext(): AudioContext | null {
    if (this.isMuted) return null;
    try {
      if (!this.ctx || this.ctx.state === 'suspended') {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('food_tarot_sound_muted', String(this.isMuted));
    } catch {
      // ignore
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Tibetan Singing Bowl sound: Deep fundamental with rich, slow-decaying shimmering overtones
   */
  public playSingingBowl(): void {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.35, now);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);
      masterGain.connect(ctx.destination);

      // Frequencies for an authentic Tibetan Singing Bowl chord (E3 base)
      const partials = [
        { freq: 164.8, gain: 0.6 }, // Base E3
        { freq: 329.6, gain: 0.35 }, // E4
        { freq: 520.0, gain: 0.25 }, // Subtle overtone
        { freq: 830.6, gain: 0.15 }, // High shimmer
      ];

      partials.forEach(({ freq, gain }) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Subtle vibrato / beat
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(2.5, now);
        lfoGain.gain.setValueAtTime(1.5, now);
        lfo.connect(osc.frequency);
        lfo.start(now);
        lfo.stop(now + 3.2);

        oscGain.gain.setValueAtTime(gain, now);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 3.2);
      });
    } catch {
      // ignore audio context failures
    }
  }

  /**
   * Mystic Candle lighting sound: ethereal spark and soft bell
   */
  public playCandleSpark(): void {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.3, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.85);
    } catch {
      // ignore
    }
  }

  /**
   * Card Shuffle & Energy Gather sound
   */
  public playCardShuffle(): void {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Arpeggiated high chime frequencies
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const startTime = now + idx * 0.08;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.18, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.65);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Card Reveal fanfare: Celestial chord with divine gong
   */
  public playCardReveal(): void {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Celestial Pentatonic Major Arcana Chord: F#3, C#4, F#4, A#4, C#5
      const notes = [185.0, 277.18, 369.99, 466.16, 554.37];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const startTime = now + idx * 0.05;
        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.22, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 2.3);
      });
    } catch {
      // ignore
    }
  }
}

export const tarotAudio = new MysticSoundEngine();
