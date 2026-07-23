<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
</script>

<div class="welcome-layout fade-in">
  <div class="title-container pop-in">
    <h1 class="game-title">
      <span class="title-line1">Pahlawan</span>
      <span class="title-line2">Bystander</span>
    </h1>
    <p class="subtitle">Simulasi Penyelamatan Darurat</p>
  </div>
  
  <div class="button-container pop-in" style="animation-delay: 0.3s;">
    <button class="btn-play" on:click={() => dispatch('start')}>
      <span class="play-text">MULAI</span>
    </button>
  </div>
</div>

<style>
  .welcome-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 2rem;
    gap: 4rem;
  }

  .title-container {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .game-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.1;
  }

  .title-line1 {
    font-size: 3.5rem;
    color: white;
    text-shadow: 0 4px 0 #1e3a8a, 0 8px 15px rgba(0,0,0,0.3);
    -webkit-text-stroke: 2px #1e3a8a;
  }

  .title-line2 {
    font-size: 5rem;
    color: #fde047;
    text-shadow: 0 5px 0 #ca8a04, 0 10px 20px rgba(0,0,0,0.3);
    -webkit-text-stroke: 3px #854d0e;
    transform: rotate(-2deg);
    margin-top: -10px;
    font-weight: 900;
  }

  .subtitle {
    font-size: 1.25rem;
    color: white;
    font-weight: 700;
    text-shadow: 1px 2px 0 rgba(0,0,0,0.5);
    background: rgba(0,0,0,0.4);
    padding: 0.5rem 1.5rem;
    border-radius: 99px;
  }

  /* BUTTON PLAY */
  .btn-play {
    background: linear-gradient(180deg, #b4ec51 0%, #65a30d 100%);
    border: 5px solid white; 
    border-radius: 99px;
    position: relative;
    padding: 1rem 4rem; 
    box-shadow: 
      inset 0 8px 0 rgba(255, 255, 255, 0.4),
      inset 0 -8px 0 rgba(0, 0, 0, 0.1),
      0 8px 0 #3f6212,
      0 15px 20px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: transform 0.1s;
  }

  .btn-play:active {
    transform: translateY(8px);
    box-shadow: 
      inset 0 8px 0 rgba(255, 255, 255, 0.4),
      inset 0 -8px 0 rgba(0, 0, 0, 0.1),
      0 0 0 #3f6212,
      0 5px 10px rgba(0, 0, 0, 0.3);
  }

  .play-text {
    color: white;
    font-size: 2.5rem;
    font-weight: 900;
    letter-spacing: 2px;
    text-shadow: 0 4px 0 #3f6212;
  }

  /* ANIMATIONS */
  .fade-in { animation: fadeIn 0.5s ease-out forwards; }
  .pop-in { 
    animation: popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; 
    opacity: 0;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes popIn {
    0% { transform: scale(0.5) translateY(20px); opacity: 0; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
  }

  @media (max-width: 768px) {
    .title-line1 { font-size: 2.5rem; -webkit-text-stroke: 1px #1e3a8a; }
    .title-line2 { font-size: 3.8rem; -webkit-text-stroke: 2px #854d0e; }
    .subtitle { font-size: 1rem; }
    .btn-play {
      padding: 0.8rem 3rem;
      border-width: 4px;
      box-shadow: 
        inset 0 6px 0 rgba(255, 255, 255, 0.4),
        inset 0 -6px 0 rgba(0, 0, 0, 0.1),
        0 6px 0 #3f6212,
        0 10px 15px rgba(0, 0, 0, 0.3);
    }
    .btn-play:active {
      transform: translateY(6px);
      box-shadow: 
        inset 0 6px 0 rgba(255, 255, 255, 0.4),
        inset 0 -6px 0 rgba(0, 0, 0, 0.1),
        0 0 0 #3f6212,
        0 5px 10px rgba(0, 0, 0, 0.3);
    }
    .play-text { font-size: 2rem; }
  }
</style>
