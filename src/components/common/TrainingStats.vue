<script setup lang="ts">
import { computed } from 'vue'
import type { RunningRecord, WeightTrainingRecord } from '@/stores/trainingStore'

const props = defineProps<{
  records: RunningRecord[] | WeightTrainingRecord[]
  type: 'running' | 'weight'
}>()

// 記録の数
const recordCount = computed(() => props.records.length)

// 最新の記録
const latestRecord = computed(() => {
  if (props.records.length === 0) return null

  return [...props.records].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })[0]
})

// 最高記録
const bestRecord = computed(() => {
  if (props.records.length === 0) return null

  if (props.type === 'running') {
    // ランニングの場合は速度が最も速いもの
    return [...props.records].sort(
      (a, b) => (b as RunningRecord).speed - (a as RunningRecord).speed,
    )[0]
  } else {
    // ウェイトトレーニングの場合は重量が最も重いもの
    return [...props.records].sort(
      (a, b) => (b as WeightTrainingRecord).weight - (a as WeightTrainingRecord).weight,
    )[0]
  }
})

// 平均値
const averageValue = computed(() => {
  if (props.records.length === 0) return 0

  if (props.type === 'running') {
    // ランニングの場合は平均速度
    const sum = props.records.reduce((acc, record) => acc + (record as RunningRecord).speed, 0)
    return (sum / props.records.length).toFixed(1)
  } else {
    // ウェイトトレーニングの場合は平均重量
    const sum = props.records.reduce(
      (acc, record) => acc + (record as WeightTrainingRecord).weight,
      0,
    )
    return (sum / props.records.length).toFixed(1)
  }
})

// 継続日数（最初の記録から最後の記録までの日数）
const durationDays = computed(() => {
  if (props.records.length <= 1) return 0

  const dates = props.records.map((record) => new Date(record.date).getTime())
  const minDate = Math.min(...dates)
  const maxDate = Math.max(...dates)

  return Math.floor((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1
})
</script>

<template>
  <div class="training-stats">
    <h3>統計情報</h3>
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-value">{{ recordCount }}</div>
        <div class="stat-label">記録数</div>
      </div>

      <div class="stat-item">
        <div class="stat-value">{{ durationDays }}</div>
        <div class="stat-label">継続日数</div>
      </div>

      <div class="stat-item">
        <div class="stat-value">
          {{ type === 'running' ? averageValue + ' km/h' : averageValue + ' kg' }}
        </div>
        <div class="stat-label">
          {{ type === 'running' ? '平均速度' : '平均重量' }}
        </div>
      </div>

      <div class="stat-item">
        <div class="stat-value" v-if="bestRecord">
          {{
            type === 'running'
              ? (bestRecord as RunningRecord).speed + ' km/h'
              : (bestRecord as WeightTrainingRecord).weight + ' kg'
          }}
        </div>
        <div class="stat-value" v-else>-</div>
        <div class="stat-label">最高記録</div>
      </div>
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
.training-stats {
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-item {
  background-color: #f8f8f8;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
}

.latest-record {
  background-color: #f8f8f8;
  padding: 1rem;
  border-radius: 4px;
}

h4 {
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-size: 1rem;
}

p {
  margin: 0.25rem 0;
  color: #555;
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
