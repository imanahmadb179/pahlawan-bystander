<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { playWinSound, playLoseSound } from "../soundEffects.js";
  import winBg from "../../assets/mission-complete.webp";
  import loseBg from "../../assets/mission-failed.webp";

  export let score;
  export let isWin;

  const dispatch = createEventDispatcher();

  onMount(() => {
    if (isWin) {
      playWinSound();
    } else {
      playLoseSound();
    }
  });

  function handleRestart() {
    dispatch("restart");
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="result-screen pop-in"
  style="background-image: url('{isWin ? winBg : loseBg}');"
  on:click={handleRestart}
  on:keydown={(e) => e.key === "Enter" && handleRestart()}
>
  <div class="top-floating-section">
    <div class="result-icon">
      {#if isWin}
        <div class="icon-circle win-icon">🏆</div>
      {:else}
        <div class="icon-circle lose-icon">🚑</div>
      {/if}
    </div>

    <div class="score-floating {isWin ? 'score-win' : 'score-lose'}">
      <span class="score-label">SKOR ANDA</span>
      <span class="score-value">{score}</span>
    </div>
  </div>

  <div class="spacer"></div>

  <div class="bottom-modal-box" on:click|stopPropagation>
    <div class="modal-body">
      <h1 class="result-title {isWin ? 'title-win' : 'title-lose'}">
        {isWin ? "Penyelamatan Berhasil!" : "Game Over!"}
      </h1>

      <div class="message-section">
        {#if isWin}
          <p>
            Luar biasa! Bantuan medis tiba dan korban berhasil bertahan hidup
            berkat tindakan cepat dan tepat yang Anda lakukan.
          </p>
        {:else}
          <p>
            Sayang sekali, korban tidak dapat diselamatkan. Setiap detik sangat
            berharga. Mari pelajari prosedurnya dan coba lagi!
          </p>
        {/if}
      </div>
    </div>
  </div>

  <div class="bottom-prompt">Klik untuk main lagi</div>
</div>

<style>
  .result-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1000;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.15); /* Very slight dimming */
    background-blend-mode: overlay;
    padding: 1.5rem 1rem 0;
  }

  .top-floating-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    animation: slideDown 0.5s ease-out;
    width: 100%;
    margin-top: 1rem;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .result-icon {
    z-index: 2;
  }

  .icon-circle {
    font-size: 5rem;
    filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.8));
  }

  .win-icon {
    animation: bounce 2s infinite;
  }

  .score-floating {
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .score-label {
    font-size: 1.2rem;
    font-weight: 800;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 1);
    margin-bottom: -0.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .score-value {
    font-size: 6.5rem;
    font-weight: 900;
    line-height: 1;
    text-shadow:
      0 4px 15px rgba(0, 0, 0, 1),
      0 0 25px rgba(0, 0, 0, 0.6);
  }

  .score-win .score-value {
    color: #4ade80;
    -webkit-text-stroke: 2px #000;
  }
  .score-lose .score-value {
    color: #f87171;
    -webkit-text-stroke: 2px #000;
  }

  .spacer {
    flex-grow: 1;
    min-height: 2rem;
  }

  .bottom-modal-box {
    width: 100%;
    max-width: 650px;
    background: #ffffff;
    border: 3px solid #38bdf8;
    box-shadow:
      0 0 20px rgba(56, 189, 248, 0.4),
      0 10px 40px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    cursor: default;
    animation: slideUp 0.5s ease-out;
    margin-bottom: 3.5rem;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .modal-header {
    background: #f8fafc;
    padding: 1rem;
    text-align: center;
    position: relative;
    border-bottom: 1px solid #e2e8f0;
    border-radius: 8px 8px 0 0;
  }

  .modal-title-text {
    color: #0f172a;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 2px;
  }

  .close-icon {
    position: absolute;
    right: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.2s;
  }
  .close-icon:hover {
    color: #0f172a;
  }

  .modal-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .result-title {
    font-size: clamp(1.2rem, 5vw, 1.8rem);
    margin: 0;
    text-transform: uppercase;
    text-align: center;
    color: #0284c7; /* A slightly darker light-blue to ensure it's readable on white, matching the vibe */
    white-space: nowrap;
  }
  .title-lose {
    color: #dc2626;
  }

  .message-section {
    font-size: 1.1rem;
    font-weight: 500;
    line-height: 1.6;
    color: #334155;
    text-align: center;
  }

  .bottom-prompt {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    animation: pulse 1.5s infinite;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(0.98);
    }
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-15px);
    }
    60% {
      transform: translateY(-7px);
    }
  }

  @media (max-width: 768px) {
    .icon-circle {
      font-size: 4rem;
    }
    .score-value {
      font-size: 5rem;
    }
    .top-floating-section {
      gap: 1rem;
    }
    .score-label {
      font-size: 1rem;
    }
    .bottom-modal-box {
      width: 95%;
      margin-bottom: 3rem;
    }
    .modal-body {
      padding: 1.2rem;
    }
    .message-section {
      font-size: 1rem;
    }
    .bottom-prompt {
      bottom: 15px;
      font-size: 0.9rem;
    }
  }
</style>
