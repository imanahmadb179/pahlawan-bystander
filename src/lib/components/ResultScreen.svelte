<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { playWinSound, playLoseSound } from "../soundEffects.js";
  import winBg from "../../assets/mission-complete.webp";
  import loseBg from "../../assets/mission-failed.webp";
  import kompresiDadaImg from "../../assets/kompresi-dada.webp";
  import aedImg from "../../assets/aed.webp";

  export let score;
  export let isWin;

  let currentStep = 0;

  function nextStep() {
    if (currentStep < 5) {
      currentStep++;
    } else {
      handleRestart();
    }
  }

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
  style="background-image: url('{isWin || currentStep === 5 ? winBg : loseBg}');"
  on:click={nextStep}
  on:keydown={(e) => e.key === "Enter" && nextStep()}
>
  <div class="top-wrapper">
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

    <div class="click-prompt fade-in">
      <span class="pulse-text"
        >{currentStep < 5
          ? "Klik layar untuk melanjutkan"
          : "Klik layar untuk main lagi"}</span
      >
    </div>
  </div>

  <div class="bottom-modal-box">
    <div class="modal-body" style="max-height: 65vh; overflow-y: auto;">
      {#if currentStep === 0}
        <h1 class="result-title {isWin ? 'title-win' : 'title-lose'}">
          {isWin ? "Penyelamatan Berhasil!" : "Game Over!"}
        </h1>

        <div class="message-section fade-in">
          {#if isWin}
            <p>
              Luar biasa! Bantuan medis tiba dan korban berhasil bertahan hidup
              berkat tindakan cepat dan tepat yang Anda lakukan.
            </p>
          {:else}
            <p>
              Sayang sekali, korban tidak dapat diselamatkan. Setiap detik
              sangat berharga. Mari pelajari prosedurnya dan coba lagi!
            </p>
          {/if}
        </div>
      {:else if currentStep === 1}
        <div
          class="conclusion-section fade-in"
          style="margin-top: 0; padding-top: 0; border-top: none;"
        >
          <h3 class="conclusion-title">
            Act Now, Safe a Life <br /><span class="conclusion-subtitle"
              >(AHA, 2025)</span
            >
          </h3>
          <p class="conclusion-heading">
            Alur bantuan hidup dasar untuk penolong awam
          </p>

          <div class="page-content">
            <ol class="conclusion-list">
              <li>
                <strong>D (Danger/Bahaya)</strong> &rarr; prinsip 3A: Aman Diri,
                Aman Korban, Aman Lingkungan
              </li>
              <li>
                <strong>R (Response/Respon)</strong>
                <ul>
                  <li>
                    Menilai kesadaran &rarr; menepuk kedua bahu korban dan
                    memanggil dengan suara lantang
                  </li>
                  <li>
                    Menilai napas &rarr; bernafas normal, tidak bernapas, atau
                    hanya megap-megap (gasping).
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      {:else if currentStep === 2}
        <div
          class="conclusion-section fade-in"
          style="margin-top: 0; padding-top: 0; border-top: none;"
        >
          <h3 class="conclusion-title">
            Act Now, Safe a Life <br /><span class="conclusion-subtitle"
              >(AHA, 2025)</span
            >
          </h3>
          <p class="conclusion-heading">
            Alur bantuan hidup dasar untuk penolong awam
          </p>

          <div class="page-content">
            <ol class="conclusion-list" start="3">
              <li>
                <strong>S (Shout for Help/Panggil Bantuan)</strong> &rarr;
                menunjuk orang secara spesifik untuk menghuungi ambulans dan
                mengambil alat kejut jantung (AED).
                <p class="conclusion-note">
                  *Tindakan menunjuk secara spesifik juga merupakan implementasi
                  psikologi sosial untuk memecahkan <span
                    class="bystander-highlight">Bystander Effect</span
                  >, karena dapat menjadikan tanggung jawab lebih jelas dan
                  personal, sehingga kemungkinan orang tersebut bertindak lebih
                  besar.
                </p>
              </li>
            </ol>
          </div>
        </div>
      {:else if currentStep === 3}
        <div
          class="conclusion-section fade-in"
          style="margin-top: 0; padding-top: 0; border-top: none;"
        >
          <h3 class="conclusion-title">
            Act Now, Safe a Life <br /><span class="conclusion-subtitle"
              >(AHA, 2025)</span
            >
          </h3>
          <p class="conclusion-heading">
            Alur bantuan hidup dasar untuk penolong awam
          </p>

          <div class="page-content">
            <ol class="conclusion-list" start="4">
              <li>
                <strong>C (Circulation/Compression/Kompresi dada)</strong>
                <p class="conclusion-step">
                  &rarr; Cara kompresi dada yang tepat : Letakkan tumit salah
                  satu tangan di tengah dada korban (setengah bawah tulang
                  dada), tangan lainnya di atas tangan pertama, dengan jari-jari
                  saling mengunci. Lengan harus lurus saat menekan dada.
                  Kecepatan 100-120 kai/menit, kedalaman 5-6 cm. Setelah setiap
                  tekanan, biarkan dada kembali mengembang sepenuhnya.
                </p>
                <img src={kompresiDadaImg} alt="Gambar Kompresi Dada" class="content-image fade-in" />
              </li>
            </ol>
          </div>
        </div>
      {:else if currentStep === 4}
        <div
          class="conclusion-section fade-in"
          style="margin-top: 0; padding-top: 0; border-top: none;"
        >
          <h3 class="conclusion-title">
            Act Now, Safe a Life <br /><span class="conclusion-subtitle"
              >(AHA, 2025)</span
            >
          </h3>
          <p class="conclusion-heading">
            Alur bantuan hidup dasar untuk penolong awam (Lanjutan Poin 4)
          </p>

          <div class="page-content">
            <div class="conclusion-list">
              <p class="conclusion-step">
                &rarr; AED dinyalakan dengan meminta bantuan orang lain,
                supaya kompresi dada tidak terhenti dan mengatasi <span
                  class="bystander-highlight">Bystander Effect</span
                >. Setelah AED menyala, ikuti instruksi dari AED. Jangan ada
                yang menyentuh korban saat AED mengeluarkan instruksi
                &ldquo;Analyzing rhythm&rdquo; dan &ldquo;Shock advised. Stand
                clear.&ldquo; Kompresi dada tetap dilanjutkan sesuai instruksi
                AED, dan sampai bantuan medis datang.
              </p>
              <img src={aedImg} alt="Gambar Alat Kejut Jantung (AED)" class="content-image fade-in" />
            </div>
          </div>
        </div>
      {:else if currentStep === 5}
        <div
          class="conclusion-section fade-in"
          style="margin-top: 0; padding-top: 0; border-top: none; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;"
        >
          <h3 class="conclusion-title" style="margin-bottom: 1rem; font-size: 1.2rem;">
            Pelajari Lebih Lanjut
          </h3>
          <p class="conclusion-heading" style="margin-bottom: 1.5rem; font-size: 0.95rem; color: #334155; font-weight: 500; line-height: 1.5;">
            Ingin melihat simulasi nyata tentang bagaimana memberikan Bantuan Hidup Dasar (BHD)? Tonton video pembelajaran dari AHA berikut ini!
          </p>

          <a href="https://www.youtube.com/watch?v=M4ACYp75mjU" target="_blank" class="btn-youtube pop-in" on:click|stopPropagation>
            <span style="font-size: 1.2rem; margin-right: 0.5rem;">🎬</span> TONTON VIDEO DI YOUTUBE
          </a>
        </div>
      {/if}

    </div>
  </div>
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
    justify-content: space-between;
    z-index: 1000;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.15); /* Very slight dimming */
    background-blend-mode: overlay;
    padding: 3rem 1rem 2rem 1rem; /* 3rem top, 2rem bottom (~1cm) */
  }

  .top-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
  }

  .top-floating-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    animation: slideDown 0.5s ease-out;
    width: 100%;
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
    font-size: 3rem;
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
    font-size: 0.9rem;
    font-weight: 800;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 1);
    margin-bottom: -0.2rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .score-value {
    font-size: 3.5rem;
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

  .bottom-modal-box {
    width: 100%;
    max-width: 500px;
    background: #ffffff;
    border: 2px solid #38bdf8;
    box-shadow:
      0 0 20px rgba(56, 189, 248, 0.4),
      0 10px 40px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    cursor: default;
    animation: slideUp 0.5s ease-out;
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
    padding: 0.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
  }

  .result-title {
    font-size: clamp(1.1rem, 4vw, 1.4rem);
    margin: 0 0 0.2rem 0;
    text-transform: uppercase;
    text-align: center;
    color: #0284c7; /* A slightly darker light-blue to ensure it's readable on white, matching the vibe */
    white-space: nowrap;
  }
  .title-lose {
    color: #dc2626;
  }

  .message-section {
    font-size: 0.9rem;
    font-weight: 500;
    line-height: 1.4;
    color: #334155;
    text-align: center;
    margin-bottom: 0;
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
      font-size: 2.5rem;
    }
    .score-value {
      font-size: 3rem;
    }
    .top-floating-section {
      gap: 0.8rem;
    }
    .score-label {
      font-size: 0.8rem;
    }
    .bottom-modal-box {
      width: 95%;
    }
    .modal-body {
      padding: 0.6rem;
    }
  }

  /* Conclusion Styles */
  .conclusion-section {
    text-align: left;
  }
  .conclusion-title {
    color: #0f172a;
    font-size: 1rem;
    font-weight: 800;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 0.2rem;
    line-height: 1.2;
  }
  .conclusion-subtitle {
    font-size: 0.75rem;
    color: #64748b;
    font-weight: 600;
  }
  .conclusion-heading {
    font-weight: 700;
    color: #0284c7;
    margin-bottom: 0.1rem;
    font-size: 0.9rem;
  }
  .conclusion-list {
    margin: 0;
    padding-left: 1rem;
    font-size: 0.8rem;
    line-height: 1.25;
    color: #334155;
  }
  .conclusion-list li {
    margin-bottom: 0.4rem;
  }
  .conclusion-list ul {
    margin-top: 0.1rem;
    padding-left: 0.8rem;
  }
  .conclusion-list ul li {
    margin-bottom: 0.1rem;
  }
  .conclusion-note {
    font-style: italic;
    color: #64748b;
    font-size: 0.75rem;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
  }
  .conclusion-step {
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
  }
  .bystander-highlight {
    font-weight: 700;
    color: #2563eb;
  }

  .click-prompt {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  
  .pulse-text {
    font-size: 0.95rem;
    font-weight: 800;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    animation: pulse 1.5s infinite;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5);
    background: rgba(0, 0, 0, 0.35);
    padding: 0.6rem 1.2rem;
    border-radius: 99px;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }

  .content-image {
    width: 100%;
    max-height: 110px;
    object-fit: contain;
    border-radius: 8px;
    margin: 0.3rem 0;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
  }
  .slide-in-right {
    animation: slideInRight 0.3s ease-out forwards;
  }
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .btn-youtube {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: #ef4444;
    border: 3px solid #991b1b;
    border-radius: 100px;
    padding: 0.6rem 1.2rem;
    color: white;
    font-weight: 800;
    font-size: 0.95rem;
    text-transform: uppercase;
    text-decoration: none;
    box-shadow: 0 4px 0 #991b1b, 0 8px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.1s;
    width: 90%;
    max-width: 300px;
  }
  .btn-youtube:hover {
    transform: translateY(2px);
    box-shadow: 0 2px 0 #991b1b, 0 4px 10px rgba(0, 0, 0, 0.2);
    background: #f87171;
  }
  .btn-youtube:active {
    transform: translateY(4px);
    box-shadow: 0 0 0 #991b1b, 0 0 0 rgba(0, 0, 0, 0.2);
  }
</style>
