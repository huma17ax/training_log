import { defineStore } from 'pinia'
import { ref } from 'vue'

export type TrainingType = 'running' | 'legPress' | 'chestPress' | 'latPulldown' | 'abdominal'

export interface RunningRecord {
  id: string
  date: string
  level: number
  time: number // 分単位
  speed: number // km/h
}

export interface WeightTrainingRecord {
  id: string
  date: string
  weight: number // kg
  reps: number
  sets: number
}

export type TrainingRecord = RunningRecord | WeightTrainingRecord

export const useTrainingStore = defineStore('training', () => {
  const runningRecords = ref<RunningRecord[]>([
    { id: '1', date: '2023-03-01', level: 5, time: 30, speed: 8.5 },
    { id: '2', date: '2023-03-03', level: 6, time: 35, speed: 9.0 },
    { id: '3', date: '2023-03-05', level: 5, time: 40, speed: 8.0 },
  ])

  const legPressRecords = ref<WeightTrainingRecord[]>([
    { id: '1', date: '2023-03-01', weight: 80, reps: 12, sets: 3 },
    { id: '2', date: '2023-03-04', weight: 85, reps: 10, sets: 3 },
    { id: '3', date: '2023-03-07', weight: 90, reps: 8, sets: 4 },
  ])

  const chestPressRecords = ref<WeightTrainingRecord[]>([
    { id: '1', date: '2023-03-02', weight: 60, reps: 10, sets: 3 },
    { id: '2', date: '2023-03-05', weight: 65, reps: 8, sets: 3 },
    { id: '3', date: '2023-03-08', weight: 70, reps: 6, sets: 4 },
  ])

  const latPulldownRecords = ref<WeightTrainingRecord[]>([
    { id: '1', date: '2023-03-02', weight: 50, reps: 12, sets: 3 },
    { id: '2', date: '2023-03-05', weight: 55, reps: 10, sets: 3 },
    { id: '3', date: '2023-03-08', weight: 60, reps: 8, sets: 4 },
  ])

  const abdominalRecords = ref<WeightTrainingRecord[]>([
    { id: '1', date: '2023-03-03', weight: 40, reps: 15, sets: 3 },
    { id: '2', date: '2023-03-06', weight: 45, reps: 12, sets: 3 },
    { id: '3', date: '2023-03-09', weight: 50, reps: 10, sets: 4 },
  ])

  // 新しいランニング記録を追加
  function addRunningRecord(record: Omit<RunningRecord, 'id'>) {
    const id = Date.now().toString()
    runningRecords.value.push({ ...record, id })
  }

  // 新しいウェイトトレーニング記録を追加
  function addWeightTrainingRecord(
    type: Exclude<TrainingType, 'running'>,
    record: Omit<WeightTrainingRecord, 'id'>,
  ) {
    const id = Date.now().toString()
    const newRecord = { ...record, id }

    switch (type) {
      case 'legPress':
        legPressRecords.value.push(newRecord)
        break
      case 'chestPress':
        chestPressRecords.value.push(newRecord)
        break
      case 'latPulldown':
        latPulldownRecords.value.push(newRecord)
        break
      case 'abdominal':
        abdominalRecords.value.push(newRecord)
        break
    }
  }

  return {
    runningRecords,
    legPressRecords,
    chestPressRecords,
    latPulldownRecords,
    abdominalRecords,
    addRunningRecord,
    addWeightTrainingRecord,
  }
})
