<script>
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
  let selectedOption = null;
  let narrativeRead = false;
  
  $: isGameOver = score <= 0;
  $: hasWon = !isGameOver && currentStageIndex >= gameData.length;
  $: showResult = isGameOver || hasWon;
  $: currentStageNum = currentStageIndex + 1;
  $: isNarrativeActive = !!(gameData[currentStageIndex]?.narrative && !narrativeRead);
  
  function handleWelcomeStart() {
    showWelcome = false;
  }

  function startGame() {
    gameStarted = true;
  }

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

<div class="game-wrapper">
  
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

<style>
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
  }
</style>
