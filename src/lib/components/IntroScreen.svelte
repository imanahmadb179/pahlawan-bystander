<script>
  import { onMount, createEventDispatcher } from "svelte";
  import {
    playIntroSound,
    playTypingSound,
    playPopSound,
  } from "../soundEffects.js";
  import { GAME_CONFIG } from "../config.js";

  const dispatch = createEventDispatcher();

  let p1Text =
    "Tujuan Anda adalah menyelamatkan nyawa korban dengan menerapkan panduan Basic Life Support (BLS) dari American Heart Association (AHA) sekaligus memecahkan fenomena psikologis Bystander Effect.\n*Bystander Effect adalah fenomena psikologis dimana seseorang cenderung diam atau tidak menolong orang yang sedang dalam kesulitan karena ada banyak orang lain di sekitar tempat kejadian.";
  let p2Text =
    "Jika Angka Keselamatan mencapai 0, simulasi dihentikan (GAME OVER). Jika Anda berhasil melakukan semua tindakan hingga bantuan medis datang, Anda MENANG.";

  let displayMode = 1;
  let p1Display = "";
  let p2Display = "";

  let scoreSteps = 0;
  let showNextButton = false;
  let showStartButton = false;
  let typeInterval;

  onMount(() => {
    playIntroSound();
    startScene1();
  });

  function formatP1(text) {
    if (!text) return "";
    return text.replaceAll("Bystander Effect", '<span class="bystander-highlight">Bystander Effect</span>');
  }

  function startScene1() {
    displayMode = 1;
    p1Display = "";
    showNextButton = false;
    let i = 0;
    typeInterval = setInterval(() => {
      let char = p1Text.charAt(i);
      p1Display += char;

      if (char !== " " && char !== "\n") {
        playTypingSound();
      }

      i++;
      if (i >= p1Text.length) {
        clearInterval(typeInterval);
        typeInterval = null;
        showNextButton = true;
      }
    }, GAME_CONFIG.TYPING_SPEED_MS);
  }

  function startScene2() {
    displayMode = 2;
    showNextButton = false;
    scoreSteps = 0;
    showNextScore();
  }

  function showNextScore() {
    scoreSteps++;
    playPopSound();
    if (scoreSteps < 4) {
      setTimeout(showNextScore, 400);
    } else {
      setTimeout(() => {
        showNextButton = true;
      }, 400);
    }
  }

  function startScene3() {
    displayMode = 3;
    showNextButton = false;
    p2Display = "";
    let i = 0;
    typeInterval = setInterval(() => {
      let char = p2Text.charAt(i);
      p2Display += char;

      if (char !== " " && char !== "\n") {
        playTypingSound();
      }

      i++;
      if (i >= p2Text.length) {
        clearInterval(typeInterval);
        typeInterval = null;
        showStartButton = true;
      }
    }, GAME_CONFIG.TYPING_SPEED_MS);
  }

  function handleNext() {
    if (displayMode === 1) {
      startScene2();
    } else if (displayMode === 2) {
      startScene3();
    }
  }

  function completeTyping() {
    if (typeInterval) {
      clearInterval(typeInterval);
      typeInterval = null;
      if (displayMode === 1) {
        p1Display = p1Text;
        showNextButton = true;
      } else if (displayMode === 3) {
        p2Display = p2Text;
        showStartButton = true;
      }
    }
  }
</script>

<div
  class="game-layout"
  on:click={completeTyping}
  on:keydown={(e) => {
    if (e.key === "Enter" || e.key === " ") completeTyping();
  }}
  role="button"
  tabindex="0"
>
  <div class="options-container">
    {#if showNextButton}
      <button
        class="option-btn btn-lanjut pop-in"
        on:click|stopPropagation={handleNext}
      >
        <svg
          width="55"
          height="36"
          viewBox="0 0 60 40"
          xmlns="http://www.w3.org/2000/svg"
          class="btn-icon"
        >
          <rect
            x="2"
            y="4"
            width="36"
            height="30"
            rx="4"
            fill="#334155"
            stroke="#94a3b8"
            stroke-width="3"
          />
          <line
            x1="2"
            y1="12"
            x2="38"
            y2="12"
            stroke="#475569"
            stroke-width="1"
          />
          <line
            x1="2"
            y1="22"
            x2="38"
            y2="22"
            stroke="#475569"
            stroke-width="1"
          />
          <path
            d="M 4 18 L 12 18 L 16 8 L 22 28 L 26 18 L 36 18"
            stroke="#38bdf8"
            stroke-width="2"
            fill="none"
          />
          <path
            d="M 39 12 L 53 19 L 39 26 Z"
            fill="#bae6fd"
            stroke="#0284c7"
            stroke-width="2"
          />
        </svg>
        <span class="option-text">MENGERTI</span>
      </button>
    {/if}
    {#if showStartButton}
      <button
        class="btn-play pop-in"
        on:click|stopPropagation={() => dispatch("start")}
      >
        <span class="play-text">PLAY</span>
      </button>
    {/if}
  </div>

  <div class="dialogue-container slide-up">
    <div class="dialogue-box">
      <h3 class="dialogue-title">Aturan Permainan</h3>
      <div class="dialogue-text">
        {#if displayMode === 1}
          <p class="type-text fade-in">{@html formatP1(p1Display)}</p>
        {:else if displayMode === 2}
          <div class="rules-grid fade-in">
            {#if scoreSteps >= 1}
              <div class="rule-item pop-in">
                <span class="rule-badge badge-neutral">100</span>
                <span class="rule-desc">Angka Keselamatan Awal</span>
              </div>
            {/if}
            {#if scoreSteps >= 2}
              <div class="rule-item pop-in">
                <span class="rule-badge badge-success">-0 poin</span>
                <span class="rule-desc">Tindakan Tepat</span>
              </div>
            {/if}
            {#if scoreSteps >= 3}
              <div class="rule-item pop-in">
                <span class="rule-badge badge-warning">-25 poin</span>
                <span class="rule-desc">Tindakan Kurang Tepat</span>
              </div>
            {/if}
            {#if scoreSteps >= 4}
              <div class="rule-item pop-in">
                <span class="rule-badge badge-danger">-40 poin</span>
                <span class="rule-desc">Tindakan Salah/Awam (Mitos)</span>
              </div>
            {/if}
          </div>
        {:else if displayMode === 3}
          <p class="type-text fade-in">{p2Display}</p>
        {/if}
      </div>
      <div class="dialogue-tail"></div>
    </div>
  </div>
</div>

<style>
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
    border: 3px solid #1e3a5f;
    border-radius: 12px;
    padding: 0.8rem 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: "Fredoka", sans-serif;
    font-weight: 800;
    font-size: 1.5rem;
    color: white;
    text-shadow: 1px 2px 0 rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition:
      transform 0.1s,
      box-shadow 0.1s;
    background: linear-gradient(to bottom, #93c5fd, #3b82f6);
  }

  .btn-lanjut {
    background: linear-gradient(to bottom, #a5f3fc, #06b6d4);
    border-color: #164e63;
    box-shadow:
      inset 0 3px 0 rgba(255, 255, 255, 0.6),
      0 5px 0 #164e63,
      0 8px 15px rgba(0, 0, 0, 0.2);
  }

  .btn-lanjut:hover {
    transform: translateY(2px);
    box-shadow:
      inset 0 3px 0 rgba(255, 255, 255, 0.6),
      0 3px 0 #164e63,
      0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .btn-play {
    position: relative;
    background: #8cd640;
    border: 4px solid #1a716c;
    border-radius: 100px;
    padding: 1rem 4rem;
    display: inline-block;
    cursor: pointer;
    box-shadow:
      inset 0 10px 0 0 #c2ec5e,
      inset 0 -12px 0 0 #3a9c4b,
      0 8px 15px rgba(0, 0, 0, 0.2);
    transition: transform 0.1s;
    margin-top: 1rem;
    align-self: center;
  }

  .btn-play::after {
    content: "";
    position: absolute;
    top: 10px;
    left: 20px;
    width: 20px;
    height: 12px;
    background: #d9f379;
    border-radius: 50%;
    transform: rotate(-25deg);
  }

  .btn-play:hover {
    transform: translateY(2px);
  }

  .play-text {
    position: relative;
    z-index: 2;
    font-family: "Fredoka", sans-serif;
    font-weight: 800;
    font-size: 2.5rem;
    color: #fef08a;
    text-shadow: 0 3px 0 #65a30d;
    letter-spacing: 2px;
  }

  .btn-icon {
    filter: drop-shadow(1px 2px 0 rgba(0, 0, 0, 0.2));
  }

  .option-text {
    font-size: 1.5rem;
    letter-spacing: 0.5px;
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
    min-height: 180px;
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
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--text-primary);
  }

  .type-text {
    line-height: 1.4;
    white-space: pre-wrap;
  }

  .type-text :global(.bystander-highlight) {
    font-weight: 700;
    color: #2563eb;
  }

  .rules-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin: 0.5rem 0;
  }

  .rule-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .rule-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 8px;
    font-weight: 800;
    color: white;
    min-width: 50px;
    text-align: center;
    font-size: 0.95rem;
  }

  .badge-neutral {
    background: var(--primary-blue);
  }
  .badge-success {
    background: var(--success-color);
  }
  .badge-warning {
    background: var(--warning-color);
  }
  .badge-danger {
    background: var(--danger-color);
  }

  .rule-desc {
    font-size: 0.95rem;
    font-weight: 700;
  }

  .fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    .game-layout {
      flex-direction: column-reverse;
      align-items: center;
      justify-content: space-between;
      padding: 2rem 1rem 1rem 1rem; /* Reduce bottom padding to move button down */
      height: 100%;
    }

    .dialogue-container {
      flex: none;
      width: 100%;
    }

    .options-container {
      width: 100%;
      gap: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: stretch; /* Stretch children to full width */
      justify-content: center;
    }

    .option-btn {
      padding: 0.6rem 1.5rem;
      border-radius: 99px;
      border-width: 3px;
      gap: 0.5rem;
    }

    .btn-icon {
      width: 35px;
      height: 23px;
    }

    .option-text {
      font-size: 1rem !important;
    }

    .btn-play {
      background: linear-gradient(180deg, #b4ec51 0%, #65a30d 100%);
      border: 4px solid white !important;
      border-radius: 99px;
      position: relative;
      margin-top: 15px;
      width: 100%; /* Full width */
      padding: 0.8rem 1rem;
      box-shadow:
        inset 0 6px 0 rgba(255, 255, 255, 0.4),
        inset 0 -6px 0 rgba(0, 0, 0, 0.1),
        0 6px 0 #3f6212,
        0 10px 15px rgba(0, 0, 0, 0.2);
    }

    .btn-play::after {
      display: none; /* Hide old specular highlight because we use inner shadow now */
    }

    .play-text {
      color: white;
      font-size: 1.4rem;
      font-weight: 900;
      letter-spacing: 2px;
      text-shadow: 0 3px 0 #3f6212;
    }

    .dialogue-box {
      padding: 0.75rem 1rem;
      border-width: 3px;
      border-radius: 20px;
      box-shadow:
        0 6px 0 var(--primary-blue),
        0 8px 10px rgba(0, 0, 0, 0.15);
      min-height: 150px;
      width: 100%;
    }

    .dialogue-title {
      font-size: 0.95rem;
      margin-bottom: 0.5rem;
    }

    .dialogue-text {
      font-size: 0.8rem;
    }

    .rules-grid {
      grid-template-columns: 1fr;
      gap: 0.5rem;
      margin: 0.25rem 0;
    }

    .rule-badge {
      font-size: 0.85rem;
      min-width: 60px;
      padding: 0.25rem 0.5rem;
    }

    .rule-desc {
      font-size: 0.9rem;
      line-height: 1.2;
    }

    .btn-lanjut {
      background: linear-gradient(180deg, #b4ec51 0%, #65a30d 100%);
      color: white;
      border: 4px solid white !important;
      border-radius: 99px;
      position: relative;
      margin-top: 15px;
      width: 100%; /* Full width */
      padding: 0.8rem 1rem;
      box-shadow:
        inset 0 6px 0 rgba(255, 255, 255, 0.4),
        inset 0 -6px 0 rgba(0, 0, 0, 0.1),
        0 6px 0 #3f6212,
        0 10px 15px rgba(0, 0, 0, 0.2);
      filter: none;
      text-shadow: 0 3px 0 #3f6212;
    }

    .btn-lanjut .option-text {
      color: white;
      font-size: 1.1rem !important;
      font-weight: 900;
      letter-spacing: 1px;
    }

    .btn-lanjut .btn-icon {
      filter: drop-shadow(0 2px 0 #3f6212);
    }

    .dialogue-tail {
      display: none;
    }
  }
</style>
