import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  Timestamp,
  getFirestore,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export type TrainingType = 'running' | 'legPress' | 'chestPress' | 'latPulldown' | 'abdominal'

export interface RunningRecord {
  id: string
  date: string
  level: number
  time: number // 分単位
  speed: number // km/h
  type: 'running'
  userId: string
}

export interface WeightTrainingRecord {
  id: string
  date: string
  weight: number // kg
  reps: number
  sets: number
  type: Exclude<TrainingType, 'running'>
  userId: string
}

export type TrainingRecord = RunningRecord | WeightTrainingRecord

export const useTrainingStore = defineStore('training', () => {
  const db = getFirestore()
  const auth = getAuth()

  const runningRecords = ref<RunningRecord[]>([])
  const legPressRecords = ref<WeightTrainingRecord[]>([])
  const chestPressRecords = ref<WeightTrainingRecord[]>([])
  const latPulldownRecords = ref<WeightTrainingRecord[]>([])
  const abdominalRecords = ref<WeightTrainingRecord[]>([])

  // Firestoreからデータを取得
  function fetchTrainingRecords() {
    if (!auth.currentUser) return

    const trainingRef = collection(db, `users/${auth.currentUser.uid}/trainingRecords`)

    // リアルタイムリスナーを設定
    return onSnapshot(trainingRef, (snapshot) => {
      const records = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate().toISOString().split('T')[0],
      })) as TrainingRecord[]

      // 種類ごとにレコードを振り分け
      runningRecords.value = records.filter((r) => r.type === 'running') as RunningRecord[]
      legPressRecords.value = records.filter((r) => r.type === 'legPress') as WeightTrainingRecord[]
      chestPressRecords.value = records.filter(
        (r) => r.type === 'chestPress',
      ) as WeightTrainingRecord[]
      latPulldownRecords.value = records.filter(
        (r) => r.type === 'latPulldown',
      ) as WeightTrainingRecord[]
      abdominalRecords.value = records.filter(
        (r) => r.type === 'abdominal',
      ) as WeightTrainingRecord[]
    })
  }

  // 新しいランニング記録を追加
  async function addRunningRecord(record: Omit<RunningRecord, 'id' | 'type' | 'userId'>) {
    if (!auth.currentUser) return

    const trainingRef = collection(db, `users/${auth.currentUser.uid}/trainingRecords`)
    await addDoc(trainingRef, {
      ...record,
      type: 'running',
      userId: auth.currentUser.uid,
      date: Timestamp.fromDate(new Date(record.date)),
    })
  }

  // 新しいウェイトトレーニング記録を追加
  async function addWeightTrainingRecord(
    type: Exclude<TrainingType, 'running'>,
    record: Omit<WeightTrainingRecord, 'id' | 'type' | 'userId'>,
  ) {
    if (!auth.currentUser) return

    const trainingRef = collection(db, `users/${auth.currentUser.uid}/trainingRecords`)
    await addDoc(trainingRef, {
      ...record,
      type,
      userId: auth.currentUser.uid,
      date: Timestamp.fromDate(new Date(record.date)),
    })
  }

  // レコードを削除
  async function deleteRecord(recordId: string) {
    if (!auth.currentUser) return

    const recordRef = doc(db, `users/${auth.currentUser.uid}/trainingRecords/${recordId}`)
    await deleteDoc(recordRef)
  }

  // 認証状態の変更を監視
  let unsubscribe: (() => void) | undefined
  auth.onAuthStateChanged((user) => {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = undefined
    }

    if (user) {
      unsubscribe = fetchTrainingRecords()
    } else {
      // ログアウト時にデータをクリア
      runningRecords.value = []
      legPressRecords.value = []
      chestPressRecords.value = []
      latPulldownRecords.value = []
      abdominalRecords.value = []
    }
  })

  return {
    runningRecords,
    legPressRecords,
    chestPressRecords,
    latPulldownRecords,
    abdominalRecords,
    addRunningRecord,
    addWeightTrainingRecord,
    deleteRecord,
  }
})
