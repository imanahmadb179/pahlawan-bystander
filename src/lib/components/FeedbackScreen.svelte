<script>
  import { createEventDispatcher } from 'svelte';
  
  export let selectedOption;
  
  const dispatch = createEventDispatcher();
  
  $: isTimeout = selectedOption.isTimeout;
  $: isCorrect = selectedOption.points === 0;
  $: isLessCorrect = selectedOption.points === -25 && !isTimeout;
  
  $: statusClass = isTimeout ? 'status-timeout' : isCorrect ? 'status-correct' : isLessCorrect ? 'status-warning' : 'status-danger';
  $: iconClass = isTimeout ? '⌛' : isCorrect ? '🌟' : isLessCorrect ? '⚠️' : '❌';
  $: title = isTimeout ? 'WAKTU HABIS!' : isCorrect ? 'BAGUS SEKALI!' : isLessCorrect ? 'HAMPIR TEPAT!' : 'AWAS KELIRU!';
  
  function handleNext() {
    dispatch('next');
  }
</script>

<div class="modal-overlay fade-in">
  <div class="feedback-modal pop-in {statusClass}">
    
    <div class="modal-header">
      <div class="icon-badge">{iconClass}</div>
      <h2 class="modal-title">{title}</h2>
      <div class="points-badge">
        {#if isCorrect}
          +0 Poin (Aman)
        {:else}
          {selectedOption.points} Poin
        {/if}
      </div>
    </div>
    
    <div class="modal-body">
      <div class="explanation-box">
        {#each selectedOption.explanation.split('\n') as p}
          <p>{p}</p>
        {/each}
      </div>
    </div>
    
    <div class="modal-footer">
      <button class="option-btn btn-lanjut pop-in" on:click={handleNext}>
        <svg width="45" height="30" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" class="btn-icon">
          <rect x="2" y="4" width="36" height="30" rx="4" fill="#334155" stroke="#94a3b8" stroke-width="3"/>
          <line x1="2" y1="12" x2="38" y2="12" stroke="#475569" stroke-width="1"/>
          <line x1="2" y1="22" x2="38" y2="22" stroke="#475569" stroke-width="1"/>
          <path d="M 4 18 L 12 18 L 16 8 L 22 28 L 26 18 L 36 18" stroke="#38bdf8" stroke-width="2" fill="none"/>
          <path d="M 39 12 L 53 19 L 39 26 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
        </svg>
        <span class="option-text">LANJUTKAN</span>
      </button>
    </div>
    
  </div>
</div>

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 50;
  }

  .feedback-modal {
    background: white;
    width: 90%;
    max-width: 600px;
    border-radius: 32px;
    border: 6px solid #1e3a5f;
    box-shadow: 0 15px 35px rgba(0,0,0,0.5);
    overflow: hidden;
  }

  .modal-header {
    padding: 3rem 1.5rem 1.5rem;
    text-align: center;
    position: relative;
    border-bottom: 6px solid #1e3a5f;
  }

  .status-correct .modal-header { 
    background: linear-gradient(to bottom, #86efac, #22c55e); 
  }
  .status-warning .modal-header { 
    background: linear-gradient(to bottom, #fde047, #eab308); 
  }
  .status-danger .modal-header { 
    background: linear-gradient(to bottom, #fca5a5, #ef4444); 
  }
  .status-timeout .modal-header { 
    background: linear-gradient(to bottom, #fca5a5, #ef4444); 
  }

  .icon-badge {
    font-size: 4rem;
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 6px solid #1e3a5f;
    box-shadow: 0 8px 15px rgba(0,0,0,0.3);
  }

  .modal-title {
    font-size: 2.2rem;
    font-weight: 800;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: white;
    text-shadow: 2px 3px 0 #1e3a5f, -1px -1px 0 #1e3a5f, 1px -1px 0 #1e3a5f, -1px 1px 0 #1e3a5f, 1px 1px 0 #1e3a5f;
    letter-spacing: 1px;
  }

  .points-badge {
    display: inline-block;
    padding: 0.5rem 1.5rem;
    border-radius: 99px;
    font-weight: 800;
    font-size: 1.2rem;
    color: white;
    box-shadow: inset 0 3px 0 rgba(255,255,255,0.4), 0 4px 0 rgba(0,0,0,0.2);
    border: 3px solid #1e3a5f;
  }

  .status-correct .points-badge { background: #16a34a; }
  .status-warning .points-badge { background: #ca8a04; }
  .status-danger .points-badge { background: #dc2626; }
  .status-timeout .points-badge { background: #dc2626; }

  .modal-body {
    padding: 2rem 2rem;
    background: white;
    max-height: 40vh;
    overflow-y: auto;
  }

  .explanation-box {
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--text-primary);
    line-height: 1.6;
    text-align: center;
  }
  
  .explanation-box p {
    margin-bottom: 0.75rem;
  }
  .explanation-box p:last-child {
    margin-bottom: 0;
  }

  .modal-footer {
    padding: 1.5rem 2rem 2rem;
    background: white;
    display: flex;
    justify-content: center;
  }

  /* BUTTON STYLES COPIED FROM INTROSCREEN FOR CONSISTENCY */
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
    background: linear-gradient(to bottom, #93c5fd, #3b82f6);
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

  /* ANIMATIONS */
  .fade-in { animation: fadeIn 0.3s ease-out forwards; }
  .pop-in { 
    animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; 
    opacity: 0;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes popIn {
    0% { transform: scale(0.8); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }

  @media (max-width: 768px) {
    .feedback-modal {
      border-radius: 20px;
      border-width: 4px;
    }

    .modal-header {
      padding: 1.5rem 1rem 0.75rem;
      border-bottom-width: 4px;
    }
    
    .icon-badge {
      width: 60px;
      height: 60px;
      font-size: 2.2rem;
      top: -30px;
      border-width: 4px;
    }

    .modal-title {
      font-size: 1.3rem;
      margin-top: 0.25rem;
      margin-bottom: 0.25rem;
    }

    .points-badge {
      padding: 0.25rem 1rem;
      font-size: 0.95rem;
      border-width: 2px;
    }

    .modal-body {
      padding: 1rem;
      max-height: 60vh;
    }

    .explanation-box {
      font-size: 0.85rem;
      line-height: 1.4;
    }
    
    .explanation-box p {
      margin-bottom: 0.5rem;
    }

    .modal-footer {
      padding: 0.75rem 1rem 1.25rem;
    }
    
    .option-btn {
      padding: 0.5rem 1rem;
      border-width: 2px;
    }
    
    .option-text {
      font-size: 1.1rem;
    }
    
    .btn-icon {
      width: 28px;
      height: 18px;
    }
  }
</style>
