/**
 * Royal Indian Ambient Audio Engine
 * Supports Web Audio API synthesized Raga / Tanpura Drone + Sitar Harmonics
 */

class RoyalAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private gainNode: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private melodyInterval: NodeJS.Timeout | null = null;
  private volume: number = 0.6;
  private listeners: ((playing: boolean) => void)[] = [];

  constructor() {
    // Initialized lazily on first user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
  }

  public subscribe(callback: (playing: boolean) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying));
  }

  public async start(): Promise<boolean> {
    try {
      this.initContext();
      if (!this.ctx || !this.gainNode) return false;

      if (this.ctx.state === "suspended") {
        await this.ctx.resume();
      }

      if (this.isPlaying) return true;

      // Indian Tanpura Pa-Sa tuning in D (Sa = 146.83 Hz, Pa = 220 Hz)
      // Creates sacred, majestic temple / royal palace aura
      const freqs = [146.83, 220.0, 293.66, 440.0];

      this.oscillators = [];

      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.gainNode) return;
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();

        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Gentle shimmering vibrato LFO
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.15, this.ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.5, this.ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        const baseVol = idx === 0 ? 0.25 : 0.15;
        oscGain.gain.setValueAtTime(baseVol, this.ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(this.gainNode);
        osc.start();
        this.oscillators.push(osc);
      });

      // Gentle Shehnai / Bansuri Raag Yaman melodic plucks at interval
      const ragaNotes = [
        293.66, // D4 (Sa)
        329.63, // E4 (Re)
        369.99, // F#4 (Ga)
        415.30, // G#4 (Teevra Ma)
        440.00, // A4 (Pa)
        493.88, // B4 (Dha)
        554.37, // C#5 (Ni)
        587.33, // D5 (Taar Sa)
      ];

      let noteIdx = 0;
      this.melodyInterval = setInterval(() => {
        if (!this.ctx || !this.gainNode || !this.isPlaying) return;
        
        // Pick raga notes in melodic sequence
        const noteFreq = ragaNotes[noteIdx % ragaNotes.length];
        noteIdx = (noteIdx + Math.floor(Math.random() * 3) + 1) % ragaNotes.length;

        const fluteOsc = this.ctx.createOscillator();
        const fluteGain = this.ctx.createGain();
        
        fluteOsc.type = "sine";
        fluteOsc.frequency.setValueAtTime(noteFreq, this.ctx.currentTime);
        
        // Gentle attack, warm sustain, long gentle release
        const now = this.ctx.currentTime;
        fluteGain.gain.setValueAtTime(0.001, now);
        fluteGain.gain.exponentialRampToValueAtTime(0.12, now + 0.8);
        fluteGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

        fluteOsc.connect(fluteGain);
        fluteGain.connect(this.gainNode);
        fluteOsc.start(now);
        fluteOsc.stop(now + 3.3);
      }, 3400);

      this.isPlaying = true;
      this.notify();
      return true;
    } catch (e) {
      console.error("Audio autoplay handling:", e);
      return false;
    }
  }

  public pause() {
    if (this.melodyInterval) {
      clearInterval(this.melodyInterval);
      this.melodyInterval = null;
    }

    this.oscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Already stopped
      }
    });
    this.oscillators = [];

    if (this.ctx && this.ctx.state === "running") {
      this.ctx.suspend();
    }

    this.isPlaying = false;
    this.notify();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const audioEngine = typeof window !== "undefined" ? new RoyalAudioEngine() : null;
