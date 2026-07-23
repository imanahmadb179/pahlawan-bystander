<script>
  import { createEventDispatcher } from 'svelte';
  
  export let score;
  export let isWin;
  
  const dispatch = createEventDispatcher();
  
  function handleRestart() {
    dispatch('restart');
  }
</script>

<div class="result-screen pop-in">
  <div class="result-panel {isWin ? 'win-panel' : 'lose-panel'}">
    
    <div class="result-icon">
      {#if isWin}
        <div class="icon-circle win-icon">🏆</div>
      {:else}
        <div class="icon-circle lose-icon">🚑</div>
      {/if}
    </div>

    <h1 class="result-title">
      {isWin ? 'Penyelamatan Berhasil!' : 'Game Over!'}
    </h1>
    
    <div class="score-display">
      <span class="score-label">Skor Akhir Pahlawan</span>
      <span class="score-value {isWin ? 'score-win' : 'score-lose'}">{score}</span>
    </div>
    
    <div class="result-message">
      {#if isWin}
        <p>Luar biasa! Bantuan medis tiba dan korban berhasil bertahan hidup berkat tindakan cepat dan tepat yang Anda lakukan.</p>
      {:else}
        <p>Sayang sekali, korban tidak dapat diselamatkan. Setiap detik sangat berharga. Mari pelajari prosedurnya dan coba lagi!</p>
      {/if}
    </div>
    
    <button class="btn-bubbly btn-restart" on:click={handleRestart}>
      MAIN LAGI
    </button>
  </div>
</div>

<style>
  .result-screen {
    width: 100%;
    max-width: 600px;
    padding: 2rem;
  }

  .result-panel {
    background: white;
    border-radius: 40px;
    padding: 3rem 2rem;
    text-align: center;
    border: 8px solid var(--primary-blue);
    box-shadow: 0 15px 0 var(--primary-blue-dark), 0 25px 30px rgba(0,0,0,0.3);
    position: relative;
  }
  
  .win-panel { border-color: var(--success-color); box-shadow: 0 15px 0 #166534, 0 25px 30px rgba(0,0,0,0.3); }
  .lose-panel { border-color: var(--danger-color); box-shadow: 0 15px 0 #991b1b, 0 25px 30px rgba(0,0,0,0.3); }

  .result-icon {
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .icon-circle {
    width: 120px;
    height: 120px;
    background: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 5rem;
    border: 8px solid inherit;
    box-shadow: inset 0 -6px 0 rgba(0,0,0,0.1), 0 8px 15px rgba(0,0,0,0.2);
  }
  
  .win-icon { border-color: var(--success-color); animation: bounce 2s infinite; }
  .lose-icon { border-color: var(--danger-color); }

  .result-title {
    font-size: 2.8rem;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    color: var(--primary-blue-dark);
    text-transform: uppercase;
    text-shadow: 2px 2px 0 rgba(0,0,0,0.1);
  }

  .score-display {
    background: #f1f5f9;
    border-radius: 24px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    border: 4px solid #cbd5e1;
  }

  .score-label {
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-secondary);
    font-size: 1.1rem;
    font-weight: 700;
  }

  .score-value {
    font-size: 4.5rem;
    font-weight: 800;
    line-height: 1;
  }
  
  .score-win { color: var(--success-color); }
  .score-lose { color: var(--danger-color); }

  .result-message {
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.6;
    color: var(--text-primary);
    margin-bottom: 2.5rem;
  }

  .btn-restart {
    font-size: 1.4rem;
    padding: 1.5rem 3rem;
    width: 100%;
    border-radius: 30px;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-20px); }
    60% { transform: translateY(-10px); }
  }

  @media (max-width: 768px) {
    .result-screen {
      padding: 1rem;
    }
    .result-panel {
      padding: 2.5rem 1.5rem 1.5rem;
      border-width: 4px;
      border-radius: 24px;
    }
    .result-icon {
      top: -45px;
    }
    .icon-circle {
      width: 90px;
      height: 90px;
      font-size: 3.5rem;
      border-width: 6px;
    }
    .result-title {
      font-size: 2rem;
      margin-top: 1.5rem;
    }
    .score-display {
      padding: 1rem;
    }
    .score-value {
      font-size: 3.5rem;
    }
    .result-message {
      font-size: 1.05rem;
      margin-bottom: 2rem;
    }
    .btn-restart {
      font-size: 1.2rem;
      padding: 1.25rem 2rem;
    }
  }
</style>
