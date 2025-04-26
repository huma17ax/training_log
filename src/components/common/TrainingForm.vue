<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTrainingStore } from '@/stores/trainingStore'
import type { TrainingType, RunningRecord, WeightTrainingRecord } from '@/stores/trainingStore'

const props = defineProps<{
  type: TrainingType
}>()

const emit = defineEmits<{
  (e: 'submit', data: Record<string, number | string>): void
}>()

const store = useTrainingStore()

// 最新の記録を取得
const latestRecord = computed(() => {
  const records =
    props.type === 'running'
      ? store.runningRecords
      : props.type === 'legPress'
        ? store.legPressRecords
        : props.type === 'chestPress'
          ? store.chestPressRecords
          : props.type === 'latPulldown'
            ? store.latPulldownRecords
            : store.abdominalRecords

  if (records.length === 0) return null

  return [...records].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })[0]
})

const isFormVisible = ref(false)
const today = new Date().toISOString().split('T')[0]
const formData = ref({
  date: today,
  level:
    latestRecord.value && latestRecord.value?.type === 'running'
      ? (latestRecord.value as RunningRecord).level
      : 5,
  time:
    latestRecord.value && latestRecord.value?.type === 'running'
      ? (latestRecord.value as RunningRecord).time
      : 30,
  speed:
    latestRecord.value && latestRecord.value?.type === 'running'
      ? (latestRecord.value as RunningRecord).speed
      : 8.0,
  weight:
    latestRecord.value && latestRecord.value?.type !== 'running'
      ? (latestRecord.value as WeightTrainingRecord).weight
      : 50,
  reps:
    latestRecord.value && latestRecord.value?.type !== 'running'
      ? (latestRecord.value as WeightTrainingRecord).reps
      : 10,
  sets:
    latestRecord.value && latestRecord.value?.type !== 'running'
      ? (latestRecord.value as WeightTrainingRecord).sets
      : 3,
})

const submitForm = () => {
  if (props.type === 'running') {
    emit('submit', {
      date: formData.value.date,
      level: formData.value.level,
      time: formData.value.time,
      speed: formData.value.speed,
    })
  } else {
    emit('submit', {
      date: formData.value.date,
      weight: formData.value.weight,
      reps: formData.value.reps,
      sets: formData.value.sets,
    })
  }

  // フォームをリセット
  formData.value = {
    ...formData.value,
    level:
      latestRecord.value && latestRecord.value?.type === 'running'
        ? (latestRecord.value as RunningRecord).level
        : 5,
    time:
      latestRecord.value && latestRecord.value?.type === 'running'
        ? (latestRecord.value as RunningRecord).time
        : 30,
    speed:
      latestRecord.value && latestRecord.value?.type === 'running'
        ? (latestRecord.value as RunningRecord).speed
        : 8.0,
    weight:
      latestRecord.value && latestRecord.value?.type !== 'running'
        ? (latestRecord.value as WeightTrainingRecord).weight
        : 50,
    reps:
      latestRecord.value && latestRecord.value?.type !== 'running'
        ? (latestRecord.value as WeightTrainingRecord).reps
        : 10,
    sets:
      latestRecord.value && latestRecord.value?.type !== 'running'
        ? (latestRecord.value as WeightTrainingRecord).sets
        : 3,
  }

  // フォームを非表示にする
  isFormVisible.value = false
}

const toggleForm = () => {
  isFormVisible.value = !isFormVisible.value
}
</script>

<template>
  <div class="training-form-container">
    <button class="toggle-button" @click="toggleForm">
      {{ isFormVisible ? '記録を閉じる' : '記録を追加' }}
    </button>

    <div v-if="isFormVisible" class="training-form">
      <h3>新しい記録を追加</h3>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="date">日付</label>
          <input id="date" v-model="formData.date" type="date" required />
        </div>

        <template v-if="type === 'running'">
          <div class="form-group">
            <label for="level">レベル</label>
            <input
              id="level"
              v-model.number="formData.level"
              type="number"
              min="1"
              max="20"
              required
            />
          </div>

          <div class="form-group">
            <label for="time">時間 (分)</label>
            <input id="time" v-model.number="formData.time" type="number" min="1" required />
          </div>

          <div class="form-group">
            <label for="speed">速度 (km/h)</label>
            <input
              id="speed"
              v-model.number="formData.speed"
              type="number"
              step="0.1"
              min="0.1"
              required
            />
          </div>
        </template>

        <template v-else>
          <div class="form-group">
            <label for="weight">重量 (kg)</label>
            <input
              id="weight"
              v-model.number="formData.weight"
              type="number"
              min="0"
              step="0.5"
              required
            />
          </div>

          <div class="form-group">
            <label for="reps">回数</label>
            <input id="reps" v-model.number="formData.reps" type="number" min="1" required />
          </div>

          <div class="form-group">
            <label for="sets">セット数</label>
            <input id="sets" v-model.number="formData.sets" type="number" min="1" required />
          </div>
        </template>

        <button type="submit" class="submit-button">記録を追加</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.training-form-container {
  margin-bottom: 1.5rem;
}

.toggle-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  margin-bottom: 1rem;
  min-height: 44px; /* タップターゲットサイズの確保 */
}

.toggle-button:hover {
  background-color: #43a047;
}

.training-form {
  background-color: white;
  padding: 1.25rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-bottom: 1rem;
  color: var(--text-color);
  font-size: 1.1rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
  font-size: 0.9rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
  min-height: 44px; /* タップターゲットサイズの確保 */
  -webkit-appearance: none; /* iOSのデフォルトスタイルを削除 */
}

input[type='number'] {
  -moz-appearance: textfield; /* Firefoxのスピンボタンを非表示 */
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.submit-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  margin-top: 1rem;
  min-height: 44px; /* タップターゲットサイズの確保 */
}

.submit-button:hover {
  background-color: #43a047;
}

@media (max-width: 375px) {
  .training-form-container {
    margin-bottom: 0.75rem;
  }

  .training-form {
    padding: 0.75rem;
  }

  h3 {
    font-size: 0.95rem;
    margin-bottom: 0.75rem;
  }

  .form-group {
    margin-bottom: 0.75rem;
  }

  label {
    font-size: 0.8rem;
    margin-bottom: 0.3rem;
  }

  input {
    font-size: 0.9rem;
    padding: 0.5rem;
    min-height: 44px;
  }

  .toggle-button,
  .submit-button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    min-height: 44px;
  }

  .toggle-button {
    margin-bottom: 0.75rem;
  }

  .submit-button {
    margin-top: 0.75rem;
  }
}
</style>
