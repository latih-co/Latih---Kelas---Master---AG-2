export function playSound(type) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    
    if (type === "correct") {
      // Brilliant-style crispy double-chime (G5 -> C6)
      const notes = [
        { f: 783.99, t: 0, d: 0.1 },      // G5 short
        { f: 1046.50, t: 0.08, d: 0.3 }   // C6 longer and bright
      ];
      
      notes.forEach(note => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine"; // sine gives a pure bell-like tone
        o.connect(g);
        g.connect(ctx.destination);
        
        o.frequency.setValueAtTime(note.f, now + note.t);
        
        g.gain.setValueAtTime(0, now + note.t);
        // Extremely fast attack for a percussive "strike"
        g.gain.linearRampToValueAtTime(0.4, now + note.t + 0.015);
        // Exponential decay for resonance
        g.gain.exponentialRampToValueAtTime(0.01, now + note.t + note.d);
        
        o.start(now + note.t);
        o.stop(now + note.t + note.d);
      });
      
    } else if (type === "wrong") {
      // Soft, dull 'bloop' - not harsh
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(250, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.15);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
      
    } else if (type === "success") {
      // Sparkling fast arpeggio (C major pentatonic rising)
      const notes = [
        { f: 523.25, t: 0, d: 0.15 },    // C5
        { f: 659.25, t: 0.08, d: 0.15 }, // E5
        { f: 783.99, t: 0.16, d: 0.15 }, // G5
        { f: 1046.50, t: 0.24, d: 0.6 }  // C6 long
      ];
      
      notes.forEach(note => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.connect(g);
        g.connect(ctx.destination);
        
        o.frequency.setValueAtTime(note.f, now + note.t);
        g.gain.setValueAtTime(0, now + note.t);
        g.gain.linearRampToValueAtTime(0.25, now + note.t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.01, now + note.t + note.d);
        
        o.start(now + note.t);
        o.stop(now + note.t + note.d);
      });
    } else if (type === "click") {
      // Mechanical mouse click (very short, unpitched burst)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Square wave generates rich harmonics (like a physical switch click)
      osc.type = "square";
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      // High frequency dropping almost instantly creates the 'tick'
      osc.frequency.setValueAtTime(1000, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.01);
      
      // Bandpass filter to remove muddy lows and piercing highs
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1500, now);
      
      // Extremely short envelope (just 10-15 milliseconds)
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.1, now + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.015);
      
      osc.start(now);
      osc.stop(now + 0.015);
    }
  } catch(e) {
    console.warn("Web Audio API not supported", e);
  }
}
