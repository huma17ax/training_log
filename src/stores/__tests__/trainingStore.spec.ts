import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTrainingStore } from '../trainingStore'

describe('Training Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('初期状態で各トレーニング記録が存在する', () => {
    const store = useTrainingStore()
    expect(store.runningRecords).toHaveLength(3)
    expect(store.legPressRecords).toHaveLength(3)
    expect(store.chestPressRecords).toHaveLength(3)
    expect(store.latPulldownRecords).toHaveLength(3)
    expect(store.abdominalRecords).toHaveLength(3)
  })

  it('新しいランニング記録を追加できる', () => {
    const store = useTrainingStore()
    const newRecord = {
      date: '2024-03-06',
      level: 7,
      time: 45,
      speed: 9.5,
    }

    store.addRunningRecord(newRecord)

    expect(store.runningRecords).toHaveLength(4)
    const addedRecord = store.runningRecords[3]
    expect(addedRecord.date).toBe(newRecord.date)
    expect(addedRecord.level).toBe(newRecord.level)
    expect(addedRecord.time).toBe(newRecord.time)
    expect(addedRecord.speed).toBe(newRecord.speed)
    expect(addedRecord.id).toBeDefined()
  })

  it('新しいウェイトトレーニング記録を追加できる', () => {
    const store = useTrainingStore()
    const newRecord = {
      date: '2024-03-06',
      weight: 95,
      reps: 8,
      sets: 4,
    }

    store.addWeightTrainingRecord('legPress', newRecord)

    expect(store.legPressRecords).toHaveLength(4)
    const addedRecord = store.legPressRecords[3]
    expect(addedRecord.date).toBe(newRecord.date)
    expect(addedRecord.weight).toBe(newRecord.weight)
    expect(addedRecord.reps).toBe(newRecord.reps)
    expect(addedRecord.sets).toBe(newRecord.sets)
    expect(addedRecord.id).toBeDefined()
  })

  it('各種ウェイトトレーニングに記録を追加できる', () => {
    const store = useTrainingStore()
    const newRecord = {
      date: '2024-03-06',
      weight: 75,
      reps: 10,
      sets: 3,
    }

    store.addWeightTrainingRecord('chestPress', newRecord)
    expect(store.chestPressRecords).toHaveLength(4)

    store.addWeightTrainingRecord('latPulldown', newRecord)
    expect(store.latPulldownRecords).toHaveLength(4)

    store.addWeightTrainingRecord('abdominal', newRecord)
    expect(store.abdominalRecords).toHaveLength(4)
  })
})
