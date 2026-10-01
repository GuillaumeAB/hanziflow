// Audio Service using Web Speech API for native-quality Chinese speech
// and Web Audio API for gamified UI feedback chimes (no external audio files needed!)

class AudioService {
  private synth: SpeechSynthesis | null = null;
  private audioCtx: AudioContext | null = null;
  private chineseVoice: SpeechSynthesisVoice | null = null;
  private voicesLoaded: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prioritize high-quality Chinese voices
    this.chineseVoice =
      voices.find(v => (v.lang === 'zh-CN' || v.lang === 'zh_CN') && (v.name.includes('Natural') || v.name.includes('Xiaoxiao') || v.name.includes('Yunxi') || v.name.includes('Tingting') || v.name.includes('Sinji') || v.name.includes('Google'))) ||
      voices.find(v => v.lang.startsWith('zh-CN')) ||
      voices.find(v => v.lang.startsWith('zh')) ||
      null;
    this.voicesLoaded = true;
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Speak Chinese text using Web Speech API
   * @param text Text in Chinese characters
   * @param speed 1.0 for normal, 0.7 for slow practice
   */
  public speak(text: string, speed: number = 1.0): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth) {
        console.warn('Speech synthesis not supported');
        resolve();
        return;
      }

      this.synth.cancel(); // Stop any pending utterance

      // Filter out punctuation-only or empty
      const clean = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()！？，。、“”]/g, '').trim();
      const textToSpeak = clean || text;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'zh-CN';
      utterance.rate = Math.max(0.5, Math.min(1.5, speed));
      utterance.pitch = 1.0;

      if (this.chineseVoice) {
        utterance.voice = this.chineseVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (e) => {
        // Speech cancellation or error
        resolve();
      };

      this.synth.speak(utterance);
    });
  }

  public speakSlow(text: string): Promise<void> {
    return this.speak(text, 0.7);
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  // ==== Gamified Web Audio Synthesizer Sounds ====

  /** Pleasant ascending chime for correct answers */
  public playSuccessSound(): void {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Arpeggio E5 -> G#5 -> B5
      osc.frequency.setValueAtTime(659.25, now);
      osc.frequency.setValueAtTime(830.61, now + 0.08);
      osc.frequency.setValueAtTime(987.77, now + 0.16);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch {
      // Audio context error ignore
    }
  }

  /** Soft low chime for incorrect response */
  public playWrongSound(): void {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(329.63, now); // E4
      osc.frequency.linearRampToValueAtTime(261.63, now + 0.2); // C4

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // Audio context error ignore
    }
  }

  /** Subtle card flip / tile tap sound */
  public playClickSound(): void {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Audio context error ignore
    }
  }

  /** Victory fanfare chord sequence on completing a lesson */
  public playCompleteFanfare(): void {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const now = ctx.currentTime + index * 0.1;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.5);
      });
    } catch {
      // Audio context error ignore
    }
  }
}

export const audioService = new AudioService();
