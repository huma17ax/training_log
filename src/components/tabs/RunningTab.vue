<script setup lang="ts">
import { computed } from 'vue'
import { useTrainingStore } from '@/stores/trainingStore'
import TrainingList from '../common/TrainingList.vue'
import TrainingForm from '../common/TrainingForm.vue'
import TrainingStats from '../common/TrainingStats.vue'
import TrainingChart from '../common/TrainingChart.vue'
import type { RunningRecord } from '@/stores/trainingStore'

const store = useTrainingStore()

// ランニング記録を日付順にソート
const sortedRecords = computed(() => {
  return [...store.runningRecords].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })
})

// チャートデータの作成
const chartData = computed(() => {
  const labels = sortedRecords.value.map((record) => record.date)

  return {
    labels,
    datasets: [
      {
        label: '速度 (km/h)',
        data: sortedRecords.value.map((record) => record.speed),
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
      },
      {
        label: '時間 (分)',
        data: sortedRecords.value.map((record) => record.time),
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
      },
    ],
  }
})

// 新しい記録を追加
const addRecord = (data: Record<string, number | string>) => {
  store.addRunningRecord(data as Omit<RunningRecord, 'id'>)
}
</script>

<template>
  <div class="running-tab">
    <h2>ランニング</h2>

    <TrainingStats :records="store.runningRecords" type="running" />

    <TrainingChart :chart-data="chartData" />

    <TrainingForm type="running" @submit="addRecord" />

    <TrainingList :records="store.runningRecords" type="running" />
  </div>
</template>

<style scoped>
.running-tab {
  padding: 0.75rem 0;
}

h2 {
  margin-bottom: 1.25rem;
  color: var(--text-color);
  text-align: center;
  font-size: 1.25rem;
}

@media (max-width: 375px) {
  .running-tab {
    padding: 0.5rem 0;
  }

  h2 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
}
</style>
