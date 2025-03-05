<script setup lang="ts">
import { ref } from 'vue'
import type { TrainingType } from '@/stores/trainingStore'

const props = defineProps<{
  type: TrainingType
}>()

const emit = defineEmits<{
  (e: 'submit', data: Record<string, number | string>): void
}>()

const today = new Date().toISOString().split('T')[0]
const formData = ref({
  date: today,
  level: 5,
  time: 30,
  speed: 8.0,
  weight: 50,
  reps: 10,
  sets: 3,
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
    level: 5,
    time: 30,
    speed: 8.0,
    weight: 50,
    reps: 10,
    sets: 3,
  }
}
</script>

<template>
  <div class="training-form">
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
</template>

<style scoped>
.training-form {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

h3 {
  margin-bottom: 1rem;
  color: var(--text-color);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
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
}

.submit-button:hover {
  background-color: #43a047;
}
</style>
