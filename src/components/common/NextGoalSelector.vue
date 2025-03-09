<script setup lang="ts">
import { ref, onMounted } from 'vue'

const selectedGoal = ref<'increase' | 'maintain' | 'decrease' | null>(null)

const selectGoal = async (goal: 'increase' | 'maintain' | 'decrease') => {
  selectedGoal.value = goal
}

onMounted(async () => {})
</script>

<template>
  <div class="next-goal-selector">
    <h3>次回の目標</h3>
    <div class="goal-buttons">
      <button
        type="button"
        class="goal-button"
        :class="{ active: selectedGoal === 'increase' }"
        @click="selectGoal('increase')"
      >
        <span class="material-icons">trending_up</span>
        <span class="button-text">Increase</span>
      </button>
      <button
        type="button"
        class="goal-button"
        :class="{ active: selectedGoal === 'maintain' }"
        @click="selectGoal('maintain')"
      >
        <span class="material-icons">trending_flat</span>
        <span class="button-text">Maintain</span>
      </button>
      <button
        type="button"
        class="goal-button"
        :class="{ active: selectedGoal === 'decrease' }"
        @click="selectGoal('decrease')"
      >
        <span class="material-icons">trending_down</span>
        <span class="button-text">Decrease</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.next-goal-selector {
  background-color: white;
  padding: 1.25rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

h3 {
  margin-bottom: 1rem;
  color: var(--text-color);
  font-size: 1.1rem;
}

.goal-buttons {
  display: flex;
  gap: 0.5rem;
}

.goal-button {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: white;
  color: var(--text-color);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  min-height: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

.goal-button .material-icons {
  font-size: 1.5rem;
}

.goal-button .button-text {
  font-size: 0.8rem;
}

.goal-button:hover {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.goal-button.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

@media (max-width: 375px) {
  .next-goal-selector {
    padding: 0.75rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 0.95rem;
    margin-bottom: 0.75rem;
  }

  .goal-buttons {
    gap: 0.25rem;
  }

  .goal-button {
    padding: 0.5rem;
  }

  .goal-button .material-icons {
    font-size: 1.25rem;
  }

  .goal-button .button-text {
    font-size: 0.75rem;
  }
}
</style>
