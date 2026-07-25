<script>
  import { createEventDispatcher, onMount, onDestroy } from "svelte";
  import { playTickSound } from '../soundEffects.js';

  export let stageData;

  const dispatch = createEventDispatcher();

  let timeLeft = 45;
  let timerInterval;
  let isRevealing = false;
  let selectedIndex = null;
  let correctIndex = null;

  let isBgAnimating = false;
  let bgUrl = '';
  let effectType = '';

  let animateKey = stageData.stage;
  let shuffledOptions = [];

  function initStage() {
    if (!stageData.options[0].originalId) {
      stageData.options.forEach((opt, idx) => {
        opt.originalId = String.fromCharCode(97 + idx); // 'a', 'b', 'c'
      });
    }
    shuffledOptions = [...stageData.options].sort(() => Math.random() - 0.5);
    resetTimer();
  }

  $: {
    if (animateKey !== stageData.stage) {
      animateKey = stageData.stage;
      initStage();
    }
  }

  function resetTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timeLeft = 45;
    isRevealing = false;
    isBgAnimating = false;
    bgUrl = '';
    effectType = '';
    selectedIndex = null;
    correctIndex = null;
    
    timerInterval = setInterval(() => {
      timeLeft -= 1;
      
      // Play tick sound if time is above 0, or maybe even at 0.
      if (timeLeft > 0) {
        playTickSound();
      }
      
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        handleTimeout();
      }
    }, 1000);
  }

  function handleTimeout() {
    isRevealing = true;
    correctIndex = shuffledOptions.findIndex(o => o.points === 0);
    setTimeout(() => {
      dispatch("timeout", stageData.stage);
    }, 1000);
  }

  onMount(() => {
    initStage();
  });

  onDestroy(() => {
    if (timerInterval) clearInterval(timerInterval);
  });

  function handleSelect(option, index) {
    if (isBgAnimating || isRevealing) return;
    if (timerInterval) clearInterval(timerInterval);
    
    isBgAnimating = true;
    
    let letter = option.originalId;
    let stage = stageData.stage;
    
    bgUrl = new URL(`../../assets/tahap-${stage}-jawaban-${letter}.webp`, import.meta.url).href;
    
    if (option.points === 0) {
      effectType = 'success';
    } else if (option.points === -40) {
      effectType = 'danger';
    } else {
      effectType = 'warning';
    }
    
    setTimeout(() => {
      isBgAnimating = false;
      isRevealing = true;
      selectedIndex = index;
      correctIndex = shuffledOptions.findIndex(o => o.points === 0);
      
      setTimeout(() => {
        dispatch("select", option);
      }, 1000);
    }, 3000);
  }
</script>

{#if bgUrl}
  <div class="dynamic-bg-layer fade-in {effectType}">
    <div class="bg-image" style="background-image: url('{bgUrl}');"></div>
    <div class="bg-overlay"></div>
  </div>
{/if}

{#key animateKey}
<div class="game-layout fade-in">
  <div class="timer-badge {timeLeft <= 5 ? 'timer-danger' : ''}">
    <span class="timer-icon">⏳</span>
    <span class="timer-text">{timeLeft}s</span>
  </div>
  <div class="options-container" style="visibility: {isBgAnimating ? 'hidden' : 'visible'};">
    {#each shuffledOptions as option, i (option.originalId)}
      <button
        class="option-btn bounce-in {isRevealing && correctIndex === i ? 'correct-highlight' : ''} {isRevealing && correctIndex !== i ? 'hidden-wrong-option' : ''}"
        style="animation-delay: {isRevealing && correctIndex === i ? '0s' : (0.1 + i * 0.15) + 's'};"
        on:click={() => handleSelect(option, i)}
      >
        <span class="option-letter">{String.fromCharCode(65 + i)}</span>
        <span class="option-text">{option.text}</span>
      </button>
    {/each}
  </div>

  <div class="dialogue-container slide-up">
    <div class="dialogue-box">
      <h3 class="dialogue-title">{stageData.title}</h3>
      <div class="dialogue-text"></div>
      <div class="dialogue-tail"></div>
    </div>
  </div>
</div>
{/key}

<style>
  .timer-badge {
    position: absolute;
    top: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    border: 4px solid var(--primary-blue);
    border-radius: 99px;
    padding: 0.5rem 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--primary-blue-dark);
    box-shadow:
      0 6px 0 var(--primary-blue),
      0 10px 15px rgba(0, 0, 0, 0.1);
    z-index: 20;
    transition: all 0.3s ease;
  }

  .timer-danger {
    border-color: var(--danger-color);
    color: var(--danger-color);
    box-shadow:
      0 6px 0 var(--danger-color),
      0 10px 15px rgba(0, 0, 0, 0.1);
    animation: pulseDanger 1s infinite;
  }

  @keyframes pulseDanger {
    0% {
      transform: translateX(-50%) scale(1);
    }
    50% {
      transform: translateX(-50%) scale(1.1);
    }
    100% {
      transform: translateX(-50%) scale(1);
    }
  }

  .game-layout {
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-end;
    justify-content: space-between;
    height: 100%;
    padding: 0 2rem 2rem 2rem;
    gap: 2rem;
  }

  .options-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 350px;
    z-index: 10;
  }

  .option-btn {
    background: white;
    border: 4px solid var(--primary-blue);
    border-radius: 20px;
    padding: 1rem;
    text-align: left;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    box-shadow:
      0 6px 0 var(--primary-blue),
      0 10px 15px rgba(0, 0, 0, 0.1);
    color: var(--text-primary);
    opacity: 0; /* Hidden before animation */
  }

  .option-btn:hover {
    transform: translateY(2px);
    box-shadow:
      0 4px 0 var(--primary-blue),
      0 5px 10px rgba(0, 0, 0, 0.1);
    background: #f0fdfa;
    border-color: #0d9488;
  }

  .option-btn:hover .option-letter {
    background: #0d9488;
    color: white;
  }

  .option-btn:active {
    transform: translateY(6px);
    box-shadow: 0 0 0 var(--primary-blue);
  }

  .option-letter {
    background: var(--primary-blue-light);
    color: var(--primary-blue-dark);
    font-weight: 800;
    font-size: 1.2rem;
    min-width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s ease;
  }

  .option-text {
    font-size: 1.05rem;
    font-weight: 600;
    line-height: 1.4;
  }

  .dialogue-container {
    flex: 1;
    max-width: 800px;
    position: relative;
    z-index: 10;
  }

  .dialogue-box {
    background: white;
    border: 5px solid var(--primary-blue);
    border-radius: 24px;
    padding: 1.5rem 2rem;
    box-shadow:
      0 8px 0 var(--primary-blue),
      0 15px 20px rgba(0, 0, 0, 0.2);
    position: relative;
    margin-top: 3rem;
  }

  .dialogue-tail {
    position: absolute;
    bottom: -20px;
    right: 50px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 25px solid var(--primary-blue);
  }

  .dialogue-tail::after {
    content: "";
    position: absolute;
    bottom: 6px;
    left: -14px;
    width: 0;
    height: 0;
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-top: 18px solid white;
  }

  .dialogue-title {
    font-size: 1.5rem;
    color: var(--primary-blue-dark);
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .dialogue-text {
    font-size: 1.15rem;
    font-weight: 500;
    color: var(--text-primary);
  }

  .dialogue-text p {
    margin-bottom: 0.75rem;
  }
  .dialogue-text p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    .timer-badge {
      top: 1.5rem;
      padding: 0.3rem 0.8rem;
      font-size: 1.25rem;
      border-width: 3px;
      box-shadow:
        0 4px 0 var(--primary-blue),
        0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .timer-danger {
      border-color: var(--danger-color);
      box-shadow:
        0 3px 0 var(--danger-color),
        0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .game-layout {
      flex-direction: column-reverse;
      align-items: center;
      justify-content: flex-end;
      padding: 0 0.5rem 0.5rem 0.5rem;
      gap: 0.15rem; /* Reduce gap from dialogue to options */
    }

    .options-container {
      width: 100%;
      gap: 0.65rem; /* Increase gap between options */
    }

    .option-btn {
      padding: 0.4rem 0.6rem;
      border-radius: 10px;
      border-width: 2px;
      box-shadow:
        0 3px 0 var(--primary-blue),
        0 4px 6px rgba(0, 0, 0, 0.1);
      gap: 0.4rem;
    }

    .option-btn:hover {
      box-shadow:
        0 2px 0 var(--primary-blue),
        0 3px 5px rgba(0, 0, 0, 0.1);
    }

    .option-btn:active {
      box-shadow: 0 0 0 var(--primary-blue);
    }

    .option-letter {
      min-width: 20px;
      height: 20px;
      font-size: 0.7rem;
    }

    .option-text {
      font-size: 0.75rem;
      line-height: 1.25;
    }

    .dialogue-box {
      padding: 0.75rem 1rem;
      border-width: 3px;
      border-radius: 16px;
      box-shadow:
        0 4px 0 var(--primary-blue),
        0 6px 8px rgba(0, 0, 0, 0.15);
      margin-top: 4.5rem;
    }

    .dialogue-title {
      font-size: 1.15rem;
      margin-bottom: 0;
      text-align: center;
    }

    .dialogue-text {
      font-size: 0.75rem;
      line-height: 1.35;
    }

    .dialogue-text p {
      margin-bottom: 0.25rem;
    }

    .dialogue-tail {
      display: none;
    }
  }

  /* Bounce Animation for Options */
  .bounce-in {
    animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  }

  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.8) translateY(30px);
    }
    50% {
      opacity: 1;
      transform: scale(1.05) translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  /* Highlight States */
  .correct-highlight {
    background: #dcfce7 !important;
    border-color: #16a34a !important;
    box-shadow: 0 4px 0 #15803d, 0 5px 10px rgba(0, 0, 0, 0.1) !important;
    animation: correctPulse 1s forwards;
    transform: translateY(2px);
    opacity: 1 !important;
  }
  .correct-highlight .option-letter {
    background: #16a34a !important;
    color: white !important;
  }

  .wrong-highlight {
    background: #fee2e2 !important;
    border-color: #dc2626 !important;
    box-shadow: 0 4px 0 #b91c1c, 0 5px 10px rgba(0, 0, 0, 0.1) !important;
    transform: translateY(2px);
    opacity: 1 !important;
  }
  .wrong-highlight .option-letter {
    background: #dc2626 !important;
    color: white !important;
  }

  .hidden-wrong-option {
    visibility: hidden !important;
    pointer-events: none !important;
  }

  @keyframes correctPulse {
    0% { transform: scale(1) translateY(2px); opacity: 1; }
    50% { transform: scale(1.02) translateY(2px); opacity: 1; }
    100% { transform: scale(1) translateY(2px); opacity: 1; }
  }

  /* Dynamic Background Effects */
  .dynamic-bg-layer {
    position: fixed;
    inset: 0;
    z-index: -10;
    overflow: hidden;
  }
  
  .bg-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center bottom;
    background-repeat: no-repeat;
  }
  
  .bg-overlay {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 3s ease;
  }
  
  /* Success: Cinematic zoom & golden glow */
  .dynamic-bg-layer.success .bg-image {
    animation: cinematicZoom 3s ease-out forwards;
  }
  .dynamic-bg-layer.success .bg-overlay {
    background: radial-gradient(circle, transparent 50%, rgba(253, 224, 71, 0.3) 100%);
    opacity: 1;
  }
  
  /* Danger: Shake & dark red vignette */
  .dynamic-bg-layer.danger .bg-image {
    animation: scaryShake 3s ease-in-out forwards;
  }
  .dynamic-bg-layer.danger .bg-overlay {
    background: radial-gradient(circle, transparent 30%, rgba(153, 27, 27, 0.7) 100%);
    opacity: 1;
  }

  /* Warning: Slight dim */
  .dynamic-bg-layer.warning .bg-image {
    animation: slightZoom 3s ease-out forwards;
  }
  .dynamic-bg-layer.warning .bg-overlay {
    background: radial-gradient(circle, transparent 50%, rgba(0, 0, 0, 0.5) 100%);
    opacity: 1;
  }

  @keyframes cinematicZoom {
    0% { transform: scale(1); filter: brightness(1); }
    100% { transform: scale(1.15); filter: brightness(1.2); }
  }

  @keyframes slightZoom {
    0% { transform: scale(1); filter: brightness(1); }
    100% { transform: scale(1.05); filter: brightness(0.7); }
  }

  @keyframes scaryShake {
    0% { transform: scale(1) translate(0, 0); filter: grayscale(0) brightness(1); }
    10% { transform: scale(1.1) translate(-5px, 5px); filter: grayscale(0.2) brightness(0.9); }
    20% { transform: scale(1.1) translate(5px, -5px); filter: grayscale(0.4) brightness(0.8); }
    30% { transform: scale(1.1) translate(-5px, -5px); filter: grayscale(0.6) brightness(0.7); }
    40% { transform: scale(1.1) translate(5px, 5px); filter: grayscale(0.7) brightness(0.6); }
    50% { transform: scale(1.1) translate(-3px, 3px); filter: grayscale(0.8) brightness(0.5); }
    100% { transform: scale(1.15) translate(0, 0); filter: grayscale(1) brightness(0.3); }
  }
</style>
