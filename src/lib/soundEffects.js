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
  playTone(523.25, 'sine', 0, 0.3); // C5
  playTone(659.25, 'sine', 0.1, 0.3); // E5
  playTone(783.99, 'sine', 0.2, 0.3); // G5
  playTone(1046.50, 'sine', 0.3, 0.4); // C6
}

export function playWarningSound() {
  playTone(392.00, 'triangle', 0, 0.3); // G4
  playTone(329.63, 'triangle', 0.2, 0.4); // E4
}

export function playWrongSound() {
  playTone(207.65, 'sawtooth', 0, 0.25, 0.05); // G#3
  playTone(196.00, 'sawtooth', 0.2, 0.25, 0.05); // G3
  playTone(185.00, 'sawtooth', 0.4, 0.5, 0.05); // F#3
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
