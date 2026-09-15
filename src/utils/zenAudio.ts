// Zen Audio Engine: Web Audio API synthesis for Tibetan Singing Bowl & Ambient Rain
// Zero external audio files required, 100% offline-ready, smooth anti-pop gain ramps.

export interface ZenAudioStatus {
  isRainPlaying: boolean;
  isBowlDronePlaying: boolean;
  isPlaying: boolean;
  volume: number;
}

class ZenAudioManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  
  // Rain generator nodes
  private rainSource: AudioBufferSourceNode | null = null;
  private rainGain: GainNode | null = null;
  private isRainPlaying: boolean = false;

  // Continuous singing bowl drone nodes
  private bowlOscillators: OscillatorNode[] = [];
  private bowlGains: GainNode[] = [];
  private bowlMasterGain: GainNode | null = null;
  private isBowlDronePlaying: boolean = false;

  // State
  private volume: number = 0.7;
  private timerId: NodeJS.Timeout | null = null;
  private listeners: Array<(status: ZenAudioStatus) => void> = [];

  public subscribe(listener: (status: ZenAudioStatus) => void): () => void {
    this.listeners.push(listener);
    listener(this.getStatus());
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    const status = this.getStatus();
    this.listeners.forEach((l) => {
      try {
        l(status);
      } catch {}
    });
  }

  // Initialize or resume AudioContext
  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Strike a Tibetan Singing Bowl once with realistic acoustic harmonics & dual-mode beating
  public strikeBowl(fundamental = 432) {
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // Harmonic ratios characteristic of handcrafted bronze singing bowls
    // Mode 1: 1.0 (fundamental)
    // Mode 2: ~2.76
    // Mode 3: ~5.40
    // Mode 4: ~8.90
    const harmonics = [
      { freqRatio: 1.0, gain: 0.8, decay: 10.0, detune: 0 },
      { freqRatio: 1.0, gain: 0.7, decay: 10.5, detune: 2.2 }, // Beating effect (wah-wah ~2Hz)
      { freqRatio: 2.76, gain: 0.45, decay: 6.5, detune: -1.5 },
      { freqRatio: 2.78, gain: 0.35, decay: 6.2, detune: 1.8 },
      { freqRatio: 5.4, gain: 0.18, decay: 4.0, detune: 0 },
      { freqRatio: 8.9, gain: 0.08, decay: 2.2, detune: 0 },
    ];

    const strikeMaster = ctx.createGain();
    strikeMaster.gain.setValueAtTime(0.7, now);
    strikeMaster.connect(this.masterGain!);

    harmonics.forEach(({ freqRatio, gain, decay, detune }) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(fundamental * freqRatio, now);
      if (detune !== 0) {
        osc.detune.setValueAtTime(detune * 10, now);
      }

      // Attack: subtle initial strike mallet click
      oscGain.gain.setValueAtTime(0.001, now);
      oscGain.gain.exponentialRampToValueAtTime(gain, now + 0.04);
      // Long exponential decay
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(oscGain);
      oscGain.connect(strikeMaster);

      osc.start(now);
      osc.stop(now + decay + 0.5);
    });
  }

  // Start continuous meditative singing bowl drone
  public startBowlDrone(fundamental = 216) {
    if (this.isBowlDronePlaying) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;

    this.bowlMasterGain = ctx.createGain();
    this.bowlMasterGain.gain.setValueAtTime(0.001, now);
    this.bowlMasterGain.gain.exponentialRampToValueAtTime(0.35, now + 2.5); // Smooth 2.5s fade-in
    this.bowlMasterGain.connect(this.masterGain!);

    // Overtones for warm resonant drone
    const droneTones = [
      { freq: fundamental, gain: 0.6, detune: -1 },
      { freq: fundamental, gain: 0.6, detune: 1.5 },
      { freq: fundamental * 2, gain: 0.25, detune: 0 },
      { freq: fundamental * 3, gain: 0.12, detune: 2 },
      { freq: fundamental * 432 / 216, gain: 0.3, detune: -2 },
    ];

    this.bowlOscillators = [];
    this.bowlGains = [];

    droneTones.forEach(({ freq, gain, detune }) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.detune.setValueAtTime(detune * 10, now);

      // Subtle LFO modulation to give human rim-rubbing movement
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.2, now); // 0.2 Hz slow circular rubbing cycle
      lfoGain.gain.setValueAtTime(0.15, now);
      lfo.connect(lfoGain.gain);

      g.gain.setValueAtTime(gain, now);

      osc.connect(g);
      g.connect(this.bowlMasterGain!);

      osc.start(now);
      this.bowlOscillators.push(osc);
      this.bowlGains.push(g);
    });

    this.isBowlDronePlaying = true;
    this.notify();
  }

  // Stop continuous bowl drone with smooth fade-out
  public stopBowlDrone() {
    if (!this.isBowlDronePlaying || !this.bowlMasterGain || !this.ctx) return;
    const now = this.ctx.currentTime;
    
    this.bowlMasterGain.gain.cancelScheduledValues(now);
    this.bowlMasterGain.gain.setValueAtTime(this.bowlMasterGain.gain.value, now);
    this.bowlMasterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8); // 1.8s smooth fade-out

    setTimeout(() => {
      this.bowlOscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      this.bowlOscillators = [];
      this.bowlGains = [];
      this.bowlMasterGain = null;
      this.isBowlDronePlaying = false;
      this.notify();
    }, 2000);
  }

  // Start realistic peaceful rain sound
  public startRain() {
    if (this.isRainPlaying) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // Generate 5 seconds of looping pink/brown noise for rain ambience
    const bufferSize = ctx.sampleRate * 5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brown/pink filter formula for soft rainfall timbre
      lastOut = (lastOut + 0.025 * white) / 1.025;
      data[i] = lastOut * 3.5;
    }

    this.rainSource = ctx.createBufferSource();
    this.rainSource.buffer = buffer;
    this.rainSource.loop = true;

    // Bandpass filter to sculpt warm rain drops
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1100, now);
    filter.Q.setValueAtTime(0.6, now);

    this.rainGain = ctx.createGain();
    this.rainGain.gain.setValueAtTime(0.001, now);
    this.rainGain.gain.exponentialRampToValueAtTime(0.25, now + 2.0); // 2.0s fade-in

    this.rainSource.connect(filter);
    filter.connect(this.rainGain);
    this.rainGain.connect(this.masterGain!);

    this.rainSource.start(now);
    this.isRainPlaying = true;
    this.notify();
  }

  // Stop rain with smooth fade-out
  public stopRain() {
    if (!this.isRainPlaying || !this.rainGain || !this.ctx) return;
    const now = this.ctx.currentTime;

    this.rainGain.gain.cancelScheduledValues(now);
    this.rainGain.gain.setValueAtTime(this.rainGain.gain.value, now);
    this.rainGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

    setTimeout(() => {
      if (this.rainSource) {
        try {
          this.rainSource.stop();
          this.rainSource.disconnect();
        } catch {}
        this.rainSource = null;
      }
      this.rainGain = null;
      this.isRainPlaying = false;
      this.notify();
    }, 1700);
  }

  // Set master volume (0.0 to 1.0)
  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(this.volume, now + 0.08);
    }
    this.notify();
  }

  // Stop all sounds
  public stopAll() {
    this.stopBowlDrone();
    this.stopRain();
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  // Sleep timer in minutes (0 = infinite)
  public setTimer(minutes: number, onExpire?: () => void) {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (minutes > 0) {
      this.timerId = setTimeout(() => {
        this.stopAll();
        if (onExpire) onExpire();
      }, minutes * 60 * 1000);
    }
  }

  public getStatus() {
    return {
      isRainPlaying: this.isRainPlaying,
      isBowlDronePlaying: this.isBowlDronePlaying,
      isPlaying: this.isRainPlaying || this.isBowlDronePlaying,
      volume: this.volume,
    };
  }
}

export const zenAudio = new ZenAudioManager();
