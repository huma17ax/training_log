<script setup lang="ts">
import type { RunningRecord, WeightTrainingRecord, TrainingType } from '@/stores/trainingStore'
import { computed } from 'vue'

const props = defineProps<{
  records: RunningRecord[] | WeightTrainingRecord[]
  type: TrainingType
}>()

// 日付でソートされたレコードを取得
const sortedRecords = computed(() => {
  return [...props.records].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
})
</script>

<template>
  <div class="training-list">
    <h3>記録一覧</h3>
    <div class="list-container">
      <table>
        <thead>
          <tr>
            <th>日付</th>
            <template v-if="type === 'running'">
              <th>レベル</th>
              <th>時間 (分)</th>
              <th>速度 (km/h)</th>
            </template>
            <template v-else>
              <th>重量 (kg)</th>
              <th>回数</th>
              <th>セット数</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <template v-if="type === 'running'">
            <tr v-for="record in sortedRecords" :key="record.id">
              <td>{{ record.date }}</td>
              <td>{{ (record as RunningRecord).level }}</td>
              <td>{{ (record as RunningRecord).time }}</td>
              <td>{{ (record as RunningRecord).speed }}</td>
            </tr>
          </template>
          <template v-else>
            <tr v-for="record in sortedRecords" :key="record.id">
              <td>{{ record.date }}</td>
              <td>{{ (record as WeightTrainingRecord).weight }}</td>
              <td>{{ (record as WeightTrainingRecord).reps }}</td>
              <td>{{ (record as WeightTrainingRecord).sets }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.training-list {
  margin-bottom: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

h3 {
  margin: 0;
  padding: 0.75rem;
  color: var(--text-color);
  font-size: 1.1rem;
  border-bottom: 1px solid var(--border-color);
}

.list-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  padding: 0.25rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 300px;
}

th,
td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
  white-space: nowrap;
  min-height: 44px;
}

th {
  background-color: #f8f8f8;
  font-weight: 600;
  color: #555;
  font-size: 0.9rem;
  position: sticky;
  top: 0;
  z-index: 1;
}

td {
  font-size: 0.9rem;
  scroll-snap-align: start;
}

tr:last-child td {
  border-bottom: none;
}

tr:hover {
  background-color: #f5f5f5;
}

@media (max-width: 375px) {
  .training-list {
    margin-bottom: 0.75rem;
  }

  h3 {
    font-size: 0.95rem;
    padding: 0.6rem;
  }

  .list-container {
    padding: 0.2rem;
  }

  th,
  td {
    padding: 0.5rem;
    font-size: 0.8rem;
    min-height: 44px;
  }

  th {
    font-size: 0.8rem;
  }

  /* スクロールヒントを表示 */
  .list-container::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 24px;
    background: linear-gradient(to left, white 0%, transparent 100%);
    pointer-events: none;
    opacity: 0.8;
  }
}
</style>
