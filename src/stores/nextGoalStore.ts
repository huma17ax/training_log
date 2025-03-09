import { defineStore } from 'pinia'
import { ref } from 'vue'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export type NextGoal = 'increase' | 'maintain' | 'decrease' | null
export type TrainingType = 'running' | 'legPress' | 'chestPress' | 'latPulldown' | 'abdominal'

export const useNextGoalStore = defineStore('nextGoal', () => {
  const nextGoals = ref<Record<TrainingType, NextGoal>>({
    running: null,
    legPress: null,
    chestPress: null,
    latPulldown: null,
    abdominal: null,
  })
  const isLoading = ref(false)

  const fetchNextGoal = async (userId: string, type: TrainingType) => {
    try {
      isLoading.value = true
      const docRef = doc(db, 'users', userId, 'nextGoals', type)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        nextGoals.value[type] = docSnap.data().value as NextGoal
      } else {
        nextGoals.value[type] = null
      }
    } catch (error) {
      console.error('Error fetching next goal:', error)
    } finally {
      isLoading.value = false
    }
  }

  const updateNextGoal = async (userId: string, type: TrainingType, goal: NextGoal) => {
    try {
      isLoading.value = true
      const docRef = doc(db, 'users', userId, 'nextGoals', type)
      await setDoc(docRef, {
        value: goal,
        updatedAt: new Date(),
      })
      nextGoals.value[type] = goal
    } catch (error) {
      console.error('Error updating next goal:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    nextGoals,
    isLoading,
    fetchNextGoal,
    updateNextGoal,
  }
})
