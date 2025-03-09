<script setup lang="ts">
import { computed } from 'vue'
import { useTrainingStore } from '@/stores/trainingStore'
import TrainingList from '../common/TrainingList.vue'
import TrainingForm from '../common/TrainingForm.vue'
import TrainingStats from '../common/TrainingStats.vue'
import TrainingChart from '../common/TrainingChart.vue'
import NextGoalSelector from '../common/NextGoalSelector.vue'
import type { WeightTrainingRecord } from '@/stores/trainingStore'

const store = useTrainingStore()

// ラットプルダウン記録を日付順にソート
const sortedRecords = computed(() => {
  return [...store.latPulldownRecords].sort((a, b) => {
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
        label: '重量 (kg)',
        data: sortedRecords.value.map((record) => record.weight),
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
      },
    ],
  }
})

// 新しい記録を追加
const addRecord = (data: Record<string, number | string>) => {
  store.addWeightTrainingRecord('latPulldown', data as Omit<WeightTrainingRecord, 'id'>)
}
</script>

<template>
  <div class="lat-pulldown-tab">
    <h2>ラットプルダウン</h2>

    <TrainingStats :records="store.latPulldownRecords" type="latPulldown" />

    <NextGoalSelector type="latPulldown" />

    <TrainingChart :chart-data="chartData" />

    <TrainingForm type="latPulldown" @submit="addRecord" />

    <TrainingList :records="store.latPulldownRecords" type="latPulldown" />
  </div>
</template>

<style scoped>
.lat-pulldown-tab {
  padding: 0.75rem 0;
}

h2 {
  margin-bottom: 1.25rem;
  color: var(--text-color);
  text-align: center;
  font-size: 1.25rem;
}

@media (max-width: 375px) {
  .lat-pulldown-tab {
    padding: 0.5rem 0;
  }

  h2 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
}
</style>
