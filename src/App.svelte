<script>
  import { onMount } from 'svelte';
  import { gameData } from './lib/gameData.js';
  import TopBar from './lib/components/TopBar.svelte';
  import Sidebar from './lib/components/Sidebar.svelte';
  import GameScreen from './lib/components/GameScreen.svelte';
  import FeedbackScreen from './lib/components/FeedbackScreen.svelte';
  import ResultScreen from './lib/components/ResultScreen.svelte';
  import WelcomeScreen from './lib/components/WelcomeScreen.svelte';
  import IntroScreen from './lib/components/IntroScreen.svelte';
  import NarrativeScreen from './lib/components/NarrativeScreen.svelte';

  let showWelcome = true;
  let gameStarted = false;
  let currentStageIndex = 0;
  let score = 100;
  /** @type {any} */
  let selectedOption = null;
  let narrativeRead = false;
  
  let isPreloading = true;
  let preloadProgress = 0;

  const imageModules = import.meta.glob('./assets/*.{webp,png,svg}', { eager: true, query: '?url', import: 'default' });
  const allImages = Object.values(imageModules);

  onMount(() => {
    let loadedCount = 0;
    const totalImages = allImages.length;
    
    if (totalImages === 0) {
      isPreloading = false;
      return;
    }

    allImages.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loadedCount++;
        preloadProgress = Math.round((loadedCount / totalImages) * 100);
        if (loadedCount === totalImages) {
          setTimeout(() => {
            isPreloading = false;
          }, 500); // slight delay for smooth transition
        }
      };
    });
  });
  
  $: isGameOver = score <= 0;
  $: hasWon = !isGameOver && currentStageIndex >= gameData.length;
  $: showResult = isGameOver || hasWon;
  $: currentStageNum = currentStageIndex + 1;
  $: isNarrativeActive = !!(gameData[currentStageIndex]?.narrative && !narrativeRead);
  
  $: {
    if (typeof document !== 'undefined') {
      if (currentStageIndex === 0 || !gameStarted || showWelcome || showResult) {
        const defaultBgUrl = new URL('./assets/bg-baru.webp', import.meta.url).href;
        document.body.style.setProperty('--global-bg', `url('${defaultBgUrl}')`);
      } else {
        const prevStageData = gameData[currentStageIndex - 1];
        const correctIndex = prevStageData.options.findIndex(o => o.points === 0);
        const letter = String.fromCharCode(97 + correctIndex);
        const bgUrl = new URL(`./assets/tahap-${prevStageData.stage}-jawaban-${letter}.webp`, import.meta.url).href;
        document.body.style.setProperty('--global-bg', `url('${bgUrl}')`);
      }
    }
  }
  
  function handleWelcomeStart() {
    showWelcome = false;
  }

  function startGame() {
    gameStarted = true;
  }

  /** @param {CustomEvent} event */
  function handleSelect(event) {
    const option = event.detail;
    selectedOption = option;
    score += option.points;
    if (score < 0) score = 0; 
  }

  function handleTimeout() {
    const currentData = gameData[currentStageIndex];
    const correctOption = currentData.options.find(o => o.points === 0);
    
    score -= 20;
    if (score < 0) score = 0;
    
    selectedOption = {
      isTimeout: true,
      points: -20,
      explanation: "WAKTU HABIS! Dalam keadaan darurat, setiap detik sangat berharga.\n\nTindakan yang paling tepat seharusnya adalah:\n\"" + correctOption.text + "\"\n\n" + correctOption.explanation
    };
  }
  
  function handleNext() {
    selectedOption = null;
    currentStageIndex++;
    narrativeRead = false;
  }
  
  function handleRestart() {
    currentStageIndex = 0;
    score = 100;
    selectedOption = null;
    gameStarted = false;
    showWelcome = true;
    narrativeRead = false;
  }
</script>

{#if isPreloading}
  <div class="preload-layer fade-in">
    <div class="loader-container">
      <div class="heartbeat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
      </div>
      <h2>Pahlawan Bystander</h2>
      <p class="loading-subtitle">Memuat aset permainan... {preloadProgress}%</p>
      <div class="progress-wrapper">
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: {preloadProgress}%"></div>
        </div>
      </div>
    </div>
  </div>
{:else}
<div class="game-wrapper fade-in">
  
  {#if showWelcome}
    <div class="ui-layer">
      <div class="main-content">
        <div class="game-area">
          <WelcomeScreen on:start={handleWelcomeStart} />
        </div>
      </div>
    </div>
  {:else if !gameStarted}
    <!-- UI Overlay Layer for Intro -->
    <div class="ui-layer">
      <div class="main-content">
        <div class="game-area">
          <IntroScreen on:start={startGame} />
        </div>
      </div>
    </div>
  {:else if !showResult}
    <!-- UI Overlay Layer -->
    <div class="ui-layer">
      <TopBar {score} step={currentStageNum} totalSteps={gameData.length} isNarrative={isNarrativeActive} />
      
      <div class="main-content">
        <Sidebar currentStage={currentStageNum} isNarrative={isNarrativeActive} />
        
        <div class="game-area">
          {#if isNarrativeActive}
            <NarrativeScreen 
              title={gameData[currentStageIndex].title}
              narrative={gameData[currentStageIndex].narrative} 
              on:continue={() => narrativeRead = true}
            />
          {:else}
            <GameScreen 
              stageData={gameData[currentStageIndex]} 
              on:select={handleSelect} 
              on:timeout={handleTimeout}
            />
          {/if}
        </div>
      </div>
    </div>
    
    <!-- Modal Layer -->
    {#if selectedOption}
      <FeedbackScreen 
        {selectedOption} 
        on:next={handleNext} 
      />
    {/if}
    
  {:else}
    <div class="result-layer">
      <ResultScreen 
        {score} 
        isWin={hasWon} 
        on:restart={handleRestart} 
      />
    </div>
  {/if}
</div>
{/if}

<style>
  .preload-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, var(--primary-blue-light) 0%, #d1fae5 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .loader-container {
    background: var(--glass-bg);
    padding: 3rem 2.5rem;
    border-radius: var(--border-radius);
    border: 4px solid white;
    box-shadow: var(--shadow-bubbly);
    text-align: center;
    max-width: 420px;
    width: 90%;
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: float 4s ease-in-out infinite;
  }

  .heartbeat-icon {
    width: 70px;
    height: 70px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px solid var(--danger-color);
    box-shadow: 0 8px 0 rgba(239, 68, 68, 0.2), 0 15px 20px rgba(0,0,0,0.1);
    color: var(--danger-color);
    margin-bottom: 1.5rem;
    animation: heartbeat 1.2s ease-in-out infinite;
  }

  .heartbeat-icon svg {
    width: 35px;
    height: 35px;
    fill: var(--danger-color);
  }

  .loader-container h2 {
    color: var(--primary-blue-dark);
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
    font-weight: 800;
  }

  .loading-subtitle {
    color: var(--text-secondary);
    margin-bottom: 2rem;
    font-weight: 600;
    font-size: 1.1rem;
  }

  .progress-wrapper {
    width: 100%;
    padding: 4px;
    background: white;
    border-radius: 20px;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
    border: 2px solid var(--primary-blue-light);
  }

  .progress-bar-bg {
    width: 100%;
    height: 16px;
    background: transparent;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
  }

  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-blue), #60a5fa);
    border-radius: 12px;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: inset 0 -4px 0 rgba(0,0,0,0.15);
  }

  @keyframes heartbeat {
    0% { transform: scale(1); }
    15% { transform: scale(1.15); }
    30% { transform: scale(1); }
    45% { transform: scale(1.15); }
    60% { transform: scale(1); }
    100% { transform: scale(1); }
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  .game-wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .ui-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    pointer-events: none; /* Let clicks pass through empty space */
  }
  
  .ui-layer > * {
    pointer-events: auto; /* Re-enable clicks for UI elements */
  }

  .main-content {
    flex: 1;
    display: flex;
    align-items: stretch;
    padding-bottom: 1rem;
    overflow-y: auto; /* Allow scrolling on small devices if needed */
  }

  .game-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .result-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  @media (max-width: 768px) {
    .main-content {
      flex-direction: column;
    }
    
    .game-area {
      padding-top: 1rem;
    }

    .ui-layer, .result-layer {
      padding-bottom: 2.5rem;
      box-sizing: border-box;
    }
  }
</style>
