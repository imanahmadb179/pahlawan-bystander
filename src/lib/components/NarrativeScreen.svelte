<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { playNarrativeSound, playTypingSound } from '../soundEffects.js';
  
  export let title = '';
  export let narrative = '';
  
  const dispatch = createEventDispatcher();
  
  let paragraphs = [];
  let displayTexts = [];
  let showNextButton = false;
  let typeInterval;
  
  onMount(() => {
    playNarrativeSound();
    paragraphs = narrative.split("\n\n");
    displayTexts = paragraphs.map(() => "");
    
    let pIndex = 0;
    let cIndex = 0;
    
    typeInterval = setInterval(() => {
      if (pIndex >= paragraphs.length) {
        clearInterval(typeInterval);
        showNextButton = true;
        return;
      }
      
      let currentText = paragraphs[pIndex];
      let char = currentText.charAt(cIndex);
      displayTexts[pIndex] += char;
      
      if (char !== ' ' && char !== '\n') {
        playTypingSound();
      }
      
      cIndex++;
      
      if (cIndex >= currentText.length) {
        pIndex++;
        cIndex = 0;
      }
      
      displayTexts = displayTexts;
    }, 60);
  });
  
  onDestroy(() => {
    if (typeInterval) clearInterval(typeInterval);
  });
  
  function handleNext() {
    dispatch('continue');
  }
</script>

<div class="narrative-layout fade-in">
  <div class="dialogues-wrapper">
    {#each paragraphs as paragraph, i}
      {#if displayTexts[i].length > 0}
        <div class="dialogue-container">
          <div class="dialogue-box">
            {#if i === 0}
              <h3 class="dialogue-title">Narasi</h3>
            {/if}
            <div class="dialogue-text">
              <p class="type-text">{displayTexts[i]}</p>
            </div>
            {#if i === paragraphs.length - 1}
              <div class="dialogue-tail"></div>
            {/if}
          </div>
        </div>
      {/if}
    {/each}
  </div>
  
  <div class="action-container">
    {#if showNextButton}
      <button class="option-btn btn-lanjut pop-in" on:click={handleNext}>
        <svg width="45" height="30" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" class="btn-icon">
          <rect x="2" y="4" width="36" height="30" rx="4" fill="#334155" stroke="#94a3b8" stroke-width="3"/>
          <line x1="2" y1="12" x2="38" y2="12" stroke="#475569" stroke-width="1"/>
          <line x1="2" y1="22" x2="38" y2="22" stroke="#475569" stroke-width="1"/>
          <path d="M 4 18 L 12 18 L 16 8 L 22 28 L 26 18 L 36 18" stroke="#38bdf8" stroke-width="2" fill="none"/>
          <path d="M 39 12 L 53 19 L 39 26 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
        </svg>
        <span class="option-text">MENGERTI</span>
      </button>
    {/if}
  </div>
</div>

<style>
  .narrative-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding: 2rem;
    gap: 1.5rem;
    width: 100%;
  }

  .dialogues-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    max-width: 800px;
    position: relative;
    z-index: 10;
  }

  .dialogue-container {
    width: 100%;
    position: relative;
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
  }

  .dialogue-title {
    font-size: 1.5rem;
    color: var(--primary-blue-dark);
    margin-bottom: 1rem;
    text-align: center;
    border-bottom: 3px dashed var(--primary-blue-light);
    padding-bottom: 0.5rem;
  }

  .dialogue-text {
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--text-primary);
    line-height: 1.6;
    text-align: left;
  }

  .type-text {
    margin: 0;
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

  .action-container {
    margin-top: 0.5rem;
    min-height: 70px; /* Pre-allocate space for button so layout doesn't jump */
    display: flex;
    justify-content: center;
    width: 100%;
  }

  /* BUTTON STYLES COPIED FROM INTROSCREEN/FEEDBACKSCREEN */
  .option-btn {
    border: 3px solid #1e3a5f;
    border-radius: 12px;
    padding: 0.8rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: 'Fredoka', sans-serif;
    font-weight: 800;
    font-size: 1.5rem;
    color: white;
    text-shadow: 1px 2px 0 rgba(0,0,0,0.3);
    cursor: pointer;
    transition: transform 0.1s, box-shadow 0.1s;
  }

  .btn-lanjut {
    background: linear-gradient(to bottom, #a5f3fc, #06b6d4);
    border-color: #164e63;
    box-shadow: inset 0 3px 0 rgba(255,255,255,0.6), 0 5px 0 #164e63, 0 8px 15px rgba(0,0,0,0.2);
  }
  
  .btn-lanjut:hover {
    transform: translateY(2px);
    box-shadow: inset 0 3px 0 rgba(255,255,255,0.6), 0 3px 0 #164e63, 0 4px 10px rgba(0,0,0,0.2);
  }

  .btn-icon {
    filter: drop-shadow(1px 2px 0 rgba(0,0,0,0.2));
  }

  .option-text {
    font-size: 1.5rem;
    letter-spacing: 0.5px;
  }

  .fade-in {
    animation: fadeIn 0.4s ease-out forwards;
  }

  .slide-down {
    animation: slideDown 0.3s ease-out forwards;
  }
  
  .pop-in {
    animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes popIn {
    0% { transform: scale(0.8); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }

  @media (max-width: 768px) {
    .narrative-layout {
      padding: 1rem;
      justify-content: flex-start;
      gap: 0.75rem;
    }

    .dialogues-wrapper {
      gap: 0.75rem;
    }

    .dialogue-box {
      padding: 0.75rem 1.25rem;
      border-width: 3px;
      border-radius: 20px;
      box-shadow:
        0 6px 0 var(--primary-blue),
        0 8px 10px rgba(0, 0, 0, 0.15);
    }

    .dialogue-title {
      font-size: 1.15rem;
      margin-bottom: 0.5rem;
      padding-bottom: 0.25rem;
    }

    .dialogue-text {
      font-size: 1rem;
      line-height: 1.4;
    }
    
    .action-container {
      width: 100%;
      margin-top: 0;
      min-height: 50px;
    }
    
    .btn-lanjut {
      background: linear-gradient(180deg, #b4ec51 0%, #65a30d 100%);
      color: white;
      border: 4px solid white !important;
      border-radius: 99px;
      width: 100%;
      padding: 0.6rem 1rem;
      box-shadow:
        inset 0 6px 0 rgba(255, 255, 255, 0.4),
        inset 0 -6px 0 rgba(0, 0, 0, 0.1),
        0 6px 0 #3f6212,
        0 10px 15px rgba(0, 0, 0, 0.2);
      text-shadow: 0 3px 0 #3f6212;
    }

    .btn-lanjut .option-text {
      font-size: 1.4rem !important;
      font-weight: 900;
    }

    .btn-lanjut .btn-icon {
      filter: drop-shadow(0 2px 0 #3f6212);
    }
    
    .dialogue-tail {
      display: none;
    }
  }
</style>
