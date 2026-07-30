<script>
  export let currentStage = 1;
  export let isNarrative = false;

  const steps = [
    { num: 1, title: "Langkah 1", icon: "🛡️" },
    { num: 2, title: "Langkah 2", icon: "👤" },
    { num: 3, title: "Langkah 3", icon: "🫁" },
    { num: 4, title: "Langkah 4", icon: "📞" },
    { num: 5, title: "Langkah 5", icon: "🫀" },
    { num: 6, title: "Langkah 6", icon: "⚡" },
  ];
</script>

<div class="sidebar">
  <div class="sidebar-header">
    <div class="header-badge">BLS</div>
  </div>

  <div class="sidebar-content">
    {#each steps as step}
      <div
        class="step-item {currentStage === step.num && !isNarrative
          ? 'active'
          : ''} {currentStage > step.num ? 'completed' : ''}"
      >
        <div class="step-icon">
          {step.icon}
        </div>
        <div class="step-text">
          <span class="step-num">{step.num}.</span>
          {step.title}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .sidebar {
    background: white;
    border: 4px solid var(--primary-blue);
    border-radius: 24px;
    width: 250px;
    box-shadow:
      0 8px 0 var(--primary-blue),
      0 15px 20px rgba(0, 0, 0, 0.15);
    position: relative;
    margin-left: 1.5rem;
    display: flex;
    flex-direction: column;
    z-index: 10;
  }

  .sidebar-header {
    display: flex;
    justify-content: center;
    margin-top: -16px;
  }

  .header-badge {
    background: var(--primary-blue);
    color: white;
    font-weight: 700;
    font-size: 1.25rem;
    padding: 0.25rem 1.5rem;
    border-radius: 12px;
    border: 3px solid #1e3a8a;
    box-shadow: 0 4px 0 #1e3a8a;
    text-shadow: 1px 1px 0 #1e3a8a;
  }

  .sidebar-content {
    padding: 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .step-item {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    border-radius: 16px;
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }

  .step-icon {
    width: 40px;
    height: 40px;
    background: #f1f5f9;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    margin-right: 1rem;
    border: 2px solid #cbd5e1;
  }

  .step-text {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .step-num {
    font-weight: 700;
  }

  .step-item.active {
    background: #dcfce7;
    border-color: var(--success-color);
    box-shadow: 0 0 15px rgba(34, 197, 94, 0.4);
  }

  .step-item.active .step-icon {
    background: var(--success-color);
    border-color: #166534;
    color: white;
  }

  .step-item.completed {
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    .sidebar {
      display: none; /* Hide sidebar completely on mobile as requested */
    }
  }
</style>
