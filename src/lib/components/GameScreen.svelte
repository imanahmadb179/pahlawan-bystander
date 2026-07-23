<script>
  import { createEventDispatcher, onMount, onDestroy } from "svelte";

  export let stageData;

  const dispatch = createEventDispatcher();

  let timeLeft = 15;
  let timerInterval;

  let animateKey = stageData.stage;
  $: {
    if (animateKey !== stageData.stage) {
      animateKey = stageData.stage;
      resetTimer();
    }
  }

  function resetTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timeLeft = 15;
    timerInterval = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        dispatch("timeout", stageData.stage);
      }
    }, 1000);
  }

  onMount(() => {
    resetTimer();
  });

  onDestroy(() => {
    if (timerInterval) clearInterval(timerInterval);
  });

  function handleSelect(option) {
    if (timerInterval) clearInterval(timerInterval);
    dispatch("select", option);
  }
</script>

<div class="game-layout fade-in" key={animateKey}>
  <div class="timer-badge {timeLeft <= 5 ? 'timer-danger' : ''}">
    <span class="timer-icon">⏳</span>
    <span class="timer-text">{timeLeft}s</span>
  </div>
  <div class="options-container">
    {#each stageData.options as option, i (i)}
      <button
        class="option-btn pop-in"
        style="animation-delay: {i * 0.1}s;"
        on:click={() => handleSelect(option)}
      >
        <span class="option-letter">{String.fromCharCode(65 + i)}</span>
        <span class="option-text">{option.text}</span>
      </button>
    {/each}
  </div>

  <div class="dialogue-container slide-up">
    <div class="dialogue-box">
      <h3 class="dialogue-title">{stageData.title}</h3>
      <div class="dialogue-text">
        {#if stageData.narrative}
          {#each stageData.narrative.split("\n\n") as paragraph}
            <p>{paragraph}</p>
          {/each}
        {/if}
      </div>
      <div class="dialogue-tail"></div>
    </div>
  </div>
</div>

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
    opacity: 0;
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
    font-size: 1.25rem;
    color: var(--primary-blue-dark);
    margin-bottom: 0.5rem;
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
      top: 0.75rem;
      padding: 0.2rem 0.6rem;
      font-size: 1rem;
      border-width: 2px;
      box-shadow:
        0 3px 0 var(--primary-blue),
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
      padding: 0.5rem 0.75rem;
      border-width: 2px;
      border-radius: 12px;
      box-shadow:
        0 4px 0 var(--primary-blue),
        0 6px 8px rgba(0, 0, 0, 0.15);
    }

    .dialogue-title {
      font-size: 0.85rem;
      margin-bottom: 0.2rem;
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
</style>
