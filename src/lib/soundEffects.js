let audioCtx;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq, type, time, duration, vol = 0.1) {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.type = type;
  oscillator.frequency.value = freq;
  
  gainNode.gain.setValueAtTime(0, ctx.currentTime + time);
  gainNode.gain.linearRampToValueAtTime(vol, ctx.currentTime + time + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + duration);
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.start(ctx.currentTime + time);
  oscillator.stop(ctx.currentTime + time + duration);
}

export function playCorrectSound() {
  // Triumphant fanfare: ascending chord + bell shine
  playTone(523.25, 'sine', 0,    0.1, 0.08);   // C5
  playTone(659.25, 'sine', 0.08, 0.1, 0.1);    // E5
  playTone(783.99, 'sine', 0.16, 0.1, 0.12);   // G5
  playTone(1046.50, 'sine', 0.24, 0.5, 0.15);  // C6 - big hit
  playTone(1318.51, 'sine', 0.3,  0.4, 0.1);   // E6 shine
  playTone(1046.50, 'sine', 0.55, 0.6, 0.1);   // C6 sustain
  playTone(783.99,  'sine', 0.6,  0.4, 0.07);  // G5
}

export function playWarningSound() {
  // Tense: descending + dissonant edge
  playTone(493.88, 'triangle', 0,   0.15, 0.08); // B4
  playTone(440.00, 'triangle', 0.1, 0.15, 0.1);  // A4
  playTone(392.00, 'triangle', 0.2, 0.15, 0.1);  // G4
  playTone(349.23, 'triangle', 0.3, 0.5,  0.12); // F4
  playTone(370.00, 'sawtooth', 0.3, 0.4,  0.03); // F#4 dissonant
}

export function playWrongSound() {
  // Epic fail: deep crash + low descend
  const ctx = getAudioContext();
  const bufferSize = Math.floor(ctx.sampleRate * 0.08);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'lowpass';
  noiseFilter.frequency.value = 800;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.4, ctx.currentTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(ctx.currentTime);
  playTone(261.63, 'sawtooth', 0,    0.2, 0.1);
  playTone(220.00, 'sawtooth', 0.15, 0.2, 0.1);
  playTone(185.00, 'sawtooth', 0.3,  0.2, 0.08);
  playTone(155.56, 'sawtooth', 0.45, 0.7, 0.12);
}


export function playTimeoutSound() {
  playTone(150, 'sawtooth', 0, 0.1, 0.05); 
  playTone(130, 'sawtooth', 0.1, 0.1, 0.05); 
  playTone(110, 'sawtooth', 0.2, 0.1, 0.05); 
  playTone(90, 'sawtooth', 0.3, 0.5, 0.05); 
}

export function playWinSound() {
  playTone(523.25, 'sine', 0, 0.15, 0.1);    // C5
  playTone(659.25, 'sine', 0.15, 0.15, 0.1); // E5
  playTone(783.99, 'sine', 0.3, 0.15, 0.1);  // G5
  playTone(1046.50, 'sine', 0.45, 0.4, 0.1); // C6
  playTone(783.99, 'sine', 0.6, 0.2, 0.1);   // G5
  playTone(1046.50, 'sine', 0.8, 0.6, 0.1);  // C6
}

export function playLoseSound() {
  playTone(392.00, 'triangle', 0, 0.3, 0.1);     // G4
  playTone(369.99, 'triangle', 0.3, 0.3, 0.1);   // F#4
  playTone(349.23, 'triangle', 0.6, 0.3, 0.1);   // F4
  playTone(329.63, 'triangle', 0.9, 0.8, 0.1);   // E4
}

export function playWelcomeSound() {
  playTone(261.63, 'sine', 0, 0.5, 0.1);     // C4
  playTone(329.63, 'sine', 0.1, 0.5, 0.1);   // E4
  playTone(392.00, 'sine', 0.2, 0.5, 0.1);   // G4
  playTone(523.25, 'sine', 0.3, 0.8, 0.15);  // C5
}

export function playIntroSound() {
  playTone(440.00, 'sine', 0, 0.2, 0.05);    // A4
  playTone(554.37, 'sine', 0.1, 0.4, 0.05);  // C#5
}

export function playNarrativeSound() {
  playTone(220.00, 'triangle', 0, 1.0, 0.05);    // A3
  playTone(329.63, 'triangle', 0.2, 1.0, 0.05);  // E4
}

export function playTickSound() {
  playTone(880.00, 'square', 0, 0.05, 0.02); // High short tick (A5)
}

export function playTypingSound() {
  const ctx = getAudioContext();
  
  // Component 1: Acoustic "Thud" using low bandpass-filtered noise
  const bufferSize = ctx.sampleRate * 0.03; // 30ms 
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  
  // Tuned to a low frequency (300-400Hz) to simulate thick plastic/wood resonance
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.value = 350 + Math.random() * 50; 
  noiseFilter.Q.value = 1.0; 
  
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(1.0, ctx.currentTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
  
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(ctx.currentTime);
  
  // Component 2: Sub-bass weight (a deep sine thud)
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = 'sine'; // Sine is smoother and more natural than triangle
  osc.frequency.setValueAtTime(120, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.02);
  
  oscGain.gain.setValueAtTime(0.5, ctx.currentTime);
  oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
  
  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.04);
}

export function playPopSound() {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  // A quick sine wave sweep from low to high frequency creates a "bloop/pop" sound
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(300, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
  
  gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.15);
}
