<script>
  export let score = 100;
  export let step = 1;
  export let totalSteps = 5;
  
  $: width = Math.max(0, score) + '%';
</script>

<div class="top-bar">
  <!-- Poin Pahlawan -->
  <div class="score-widget">
    <div class="score-icon">
      <svg viewBox="0 0 24 24" fill="#ef4444" stroke="#b91c1c" stroke-width="2" class="heart-icon">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </div>
    <div class="score-content">
      <div class="score-title">Poin Pahlawan</div>
      <div class="progress-bg">
        <div class="progress-fill" style="width: {width};">
          <span class="progress-text">{score}%</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Langkah -->
  <div class="step-widget">
    <div class="step-title">Langkah: {step} dari {totalSteps}</div>
  </div>
</div>

<style>
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1.5rem;
    position: relative;
    z-index: 10;
  }

  .score-widget {
    display: flex;
    align-items: center;
    background: #3b82f6;
    border: 4px solid #1e3a8a;
    border-radius: 99px;
    padding: 0.5rem 1rem 0.5rem 0.5rem;
    box-shadow: 0 4px 0 #1e3a8a, 0 8px 15px rgba(0,0,0,0.2);
    position: relative;
  }

  .score-icon {
    width: 60px;
    height: 60px;
    background: white;
    border: 4px solid #1e3a8a;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.75rem;
    position: absolute;
    left: -10px;
    box-shadow: inset 0 -4px 0 rgba(0,0,0,0.1);
  }
  
  .heart-icon {
    width: 36px;
    height: 36px;
  }

  .score-content {
    margin-left: 60px; /* Space for the absolute icon */
    display: flex;
    flex-direction: column;
    min-width: 150px;
  }

  .score-title {
    color: white;
    font-weight: 700;
    font-size: 1.1rem;
    text-shadow: 1px 1px 0 #1e3a8a;
    margin-bottom: 4px;
  }

  .progress-bg {
    background: #1e3a8a;
    height: 24px;
    border-radius: 12px;
    border: 2px solid #1e3a8a;
    overflow: hidden;
    position: relative;
  }

  .progress-fill {
    background: #fde047;
    height: 100%;
    border-radius: 10px;
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 -4px 0 rgba(202, 138, 4, 0.5);
  }

  .progress-text {
    font-size: 0.85rem;
    font-weight: 700;
    color: #854d0e;
    text-shadow: none;
  }

  .step-widget {
    background: #3b82f6;
    border: 4px solid #1e3a8a;
    border-radius: 20px;
    padding: 0.75rem 1.5rem;
    box-shadow: 0 4px 0 #1e3a8a, 0 8px 15px rgba(0,0,0,0.2);
  }

  .step-title {
    color: white;
    font-weight: 700;
    font-size: 1.25rem;
    text-shadow: 1px 1px 0 #1e3a8a;
  }

  @media (max-width: 768px) {
    .top-bar {
      padding: 0.5rem;
      align-items: center;
      gap: 0.25rem;
    }
    
    .score-widget {
      padding: 0.25rem 0.5rem 0.25rem 0.25rem;
      border-width: 2px;
      box-shadow: 0 2px 0 #1e3a8a, 0 4px 8px rgba(0,0,0,0.2);
    }

    .score-icon {
      width: 32px;
      height: 32px;
      left: -2px;
      border-width: 2px;
    }

    .heart-icon {
      width: 18px;
      height: 18px;
    }

    .score-content {
      margin-left: 32px;
      min-width: 70px;
    }

    .score-title {
      font-size: 0.65rem;
      margin-bottom: 2px;
    }

    .progress-bg {
      height: 14px;
      border-width: 1px;
    }

    .progress-text {
      font-size: 0.65rem;
    }

    .step-widget {
      padding: 0.35rem 0.6rem;
      border-width: 2px;
      box-shadow: 0 2px 0 #1e3a8a, 0 4px 8px rgba(0,0,0,0.2);
    }

    .step-title {
      font-size: 0.75rem;
    }
  }
</style>
