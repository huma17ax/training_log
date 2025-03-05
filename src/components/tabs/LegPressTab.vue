<script setup lang="ts">
import { computed } from 'vue'
import { useTrainingStore } from '@/stores/trainingStore'
import TrainingList from '../common/TrainingList.vue'
import TrainingForm from '../common/TrainingForm.vue'
import TrainingStats from '../common/TrainingStats.vue'
import TrainingChart from '../common/TrainingChart.vue'
import type { WeightTrainingRecord } from '@/stores/trainingStore'

const store = useTrainingStore()

// レッグプレス記録を日付順にソート
const sortedRecords = computed(() => {
  return [...store.legPressRecords].sort((a, b) => {
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
  store.addWeightTrainingRecord('legPress', data as Omit<WeightTrainingRecord, 'id'>)
}
</script>

<template>
  <div class="leg-press-tab">
    <h2>レッグプレス</h2>

    <TrainingStats :records="store.legPressRecords" type="weight" />

    <TrainingChart :chart-data="chartData" />

    <TrainingForm type="legPress" @submit="addRecord" />

    <TrainingList :records="store.legPressRecords" type="weight" />
  </div>
</template>

<style scoped>
.leg-press-tab {
  padding: 1rem 0;
}

h2 {
  margin-bottom: 1.5rem;
  color: var(--text-color);
  text-align: center;
}
</style>
