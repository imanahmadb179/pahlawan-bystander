<script>
  export let score = 100;
  
  // Calculate width percentage and dynamic color based on score
  $: width = Math.max(0, score) + '%';
  $: colorClass = score > 60 ? 'score-high' : score > 30 ? 'score-medium' : 'score-low';
</script>

<div class="score-container glass-panel slide-up">
  <div class="score-header">
    <span class="label">Angka Keselamatan</span>
    <span class="value {colorClass}">{score} / 100</span>
  </div>
  
  <div class="progress-bg">
    <div 
      class="progress-fill {colorClass}" 
      style="width: {width};"
    ></div>
  </div>
</div>

<style>
  .score-container {
    padding: 1.25rem 1.5rem;
    margin-bottom: 2rem;
  }

  .score-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .label {
    font-weight: 600;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-secondary);
  }

  .value {
    font-weight: 700;
    font-size: 1.5rem;
    transition: color 0.3s ease;
  }

  .progress-bg {
    width: 100%;
    height: 12px;
    background: var(--surface-color);
    border-radius: 999px;
    overflow: hidden;
    position: relative;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
  }

  .progress-fill {
    height: 100%;
    border-radius: 999px;
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
  }

  .score-high {
    color: var(--success-color);
  }
  .progress-fill.score-high {
    background-color: var(--success-color);
    box-shadow: 0 0 12px var(--success-color);
  }

  .score-medium {
    color: var(--warning-color);
  }
  .progress-fill.score-medium {
    background-color: var(--warning-color);
    box-shadow: 0 0 12px var(--warning-color);
  }

  .score-low {
    color: var(--danger-color);
  }
  .progress-fill.score-low {
    background-color: var(--danger-color);
    box-shadow: 0 0 12px var(--danger-color);
  }
</style>
