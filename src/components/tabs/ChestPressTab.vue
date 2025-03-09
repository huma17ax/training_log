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

// チェストプレス記録を日付順にソート
const sortedRecords = computed(() => {
  return [...store.chestPressRecords].sort((a, b) => {
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
  store.addWeightTrainingRecord('chestPress', data as Omit<WeightTrainingRecord, 'id'>)
}
</script>

<template>
  <div class="chest-press-tab">
    <h2>チェストプレス</h2>

    <TrainingStats :records="store.chestPressRecords" type="chestPress" />

    <TrainingChart :chart-data="chartData" />

    <NextGoalSelector type="chestPress" />

    <TrainingForm type="chestPress" @submit="addRecord" />

    <TrainingList :records="store.chestPressRecords" type="chestPress" />
  </div>
</template>

<style scoped>
.chest-press-tab {
  padding: 0.75rem 0;
}

h2 {
  margin-bottom: 1.25rem;
  color: var(--text-color);
  text-align: center;
  font-size: 1.25rem;
}

@media (max-width: 375px) {
  .chest-press-tab {
    padding: 0.5rem 0;
  }

  h2 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
}
</style>
