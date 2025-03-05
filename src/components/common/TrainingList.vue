<script setup lang="ts">
import type { RunningRecord, WeightTrainingRecord } from '@/stores/trainingStore'

defineProps<{
  records: RunningRecord[] | WeightTrainingRecord[]
  type: 'running' | 'weight'
}>()
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
            <tr v-for="record in records" :key="record.id">
              <td>{{ record.date }}</td>
              <td>{{ (record as RunningRecord).level }}</td>
              <td>{{ (record as RunningRecord).time }}</td>
              <td>{{ (record as RunningRecord).speed }}</td>
            </tr>
          </template>
          <template v-else>
            <tr v-for="record in records" :key="record.id">
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
  margin-bottom: 2rem;
}

h3 {
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.list-container {
  overflow-x: auto;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

th {
  background-color: #f8f8f8;
  font-weight: 600;
  color: #555;
}

tr:last-child td {
  border-bottom: none;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>
