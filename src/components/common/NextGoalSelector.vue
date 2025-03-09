<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useNextGoalStore } from '@/stores/nextGoalStore'
import { useAuthStore } from '@/stores/auth'
import { useTrainingStore } from '@/stores/trainingStore'
import type { TrainingType } from '@/stores/nextGoalStore'
import type { RunningRecord, WeightTrainingRecord } from '@/stores/trainingStore'

const props = defineProps<{
  type: TrainingType
}>()

const nextGoalStore = useNextGoalStore()
const authStore = useAuthStore()
const trainingStore = useTrainingStore()

const selectedGoal = ref<'increase' | 'maintain' | 'decrease' | null>(null)

// 最新の記録を取得
const latestRecord = computed(() => {
  const records =
    props.type === 'running'
      ? trainingStore.runningRecords
      : props.type === 'legPress'
        ? trainingStore.legPressRecords
        : props.type === 'chestPress'
          ? trainingStore.chestPressRecords
          : props.type === 'latPulldown'
            ? trainingStore.latPulldownRecords
            : trainingStore.abdominalRecords

  if (records.length === 0) return null

  return [...records].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })[0]
})

const selectGoal = async (goal: 'increase' | 'maintain' | 'decrease') => {
  if (!authStore.user) return
  selectedGoal.value = goal
  await nextGoalStore.updateNextGoal(authStore.user.uid, props.type, goal)
}

onMounted(async () => {
  if (!authStore.user) return
  await nextGoalStore.fetchNextGoal(authStore.user.uid, props.type)
  selectedGoal.value = nextGoalStore.nextGoals[props.type]
})
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

    <div class="latest-record" v-if="latestRecord">
      <h4>最新の記録 ({{ latestRecord.date }})</h4>
      <div v-if="type === 'running'">
        <p>レベル: {{ (latestRecord as RunningRecord).level }}</p>
        <p>時間: {{ (latestRecord as RunningRecord).time }} 分</p>
        <p>速度: {{ (latestRecord as RunningRecord).speed }} km/h</p>
      </div>
      <div v-else>
        <p>重量: {{ (latestRecord as WeightTrainingRecord).weight }} kg</p>
        <p>回数: {{ (latestRecord as WeightTrainingRecord).reps }}</p>
        <p>セット数: {{ (latestRecord as WeightTrainingRecord).sets }}</p>
      </div>
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
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.goal-button {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s;
  min-height: 44px;
}

.goal-button:hover {
  background-color: #f8f8f8;
}

.goal-button.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.material-icons {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.button-text {
  font-size: 0.85rem;
  font-weight: 500;
}

.latest-record {
  background-color: #f8f8f8;
  padding: 1rem;
  border-radius: 4px;
}

h4 {
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-size: 0.95rem;
  font-weight: 600;
}

p {
  margin: 0.25rem 0;
  color: #555;
  font-size: 0.9rem;
  line-height: 1.4;
}

@media (max-width: 375px) {
  .next-goal-selector {
    padding: 0.75rem;
    margin-bottom: 0.75rem;
  }

  h3 {
    font-size: 0.95rem;
    margin-bottom: 0.75rem;
  }

  .goal-buttons {
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .goal-button {
    padding: 0.5rem;
  }

  .material-icons {
    font-size: 1.25rem;
  }

  .button-text {
    font-size: 0.75rem;
  }

  .latest-record {
    padding: 0.75rem;
  }

  h4 {
    font-size: 0.85rem;
    margin-bottom: 0.4rem;
  }

  p {
    font-size: 0.8rem;
    margin: 0.2rem 0;
  }
}
</style>
