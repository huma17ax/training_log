import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTrainingStore } from '../trainingStore'
import type { DocumentSnapshot, QuerySnapshot, Unsubscribe } from 'firebase/firestore'
import { addDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore'

// Firestoreのモック
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(() => 'collection-ref'),
  addDoc: vi.fn(),
  doc: vi.fn(() => 'doc-ref'),
  deleteDoc: vi.fn(),
  onSnapshot: vi.fn().mockImplementation((_, callback) => {
    callback({
      docs: [
        {
          id: '1',
          data: () => ({
            type: 'running',
            date: { toDate: () => new Date('2024-03-15') },
            level: 5,
            time: 30,
            speed: 8.5,
            userId: 'test-user-id',
          }),
        },
        {
          id: '2',
          data: () => ({
            type: 'legPress',
            date: { toDate: () => new Date('2024-03-15') },
            weight: 80,
            reps: 12,
            sets: 3,
            userId: 'test-user-id',
          }),
        },
      ],
    })
    return (() => {}) as Unsubscribe
  }),
  Timestamp: {
    fromDate: vi.fn((date) => ({ toDate: () => new Date(date) })),
  },
  getFirestore: vi.fn(() => 'firestore-instance'),
}))

// Firebase Authのモック
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: { uid: 'test-user-id' },
    onAuthStateChanged: vi.fn((callback) => {
      callback({ uid: 'test-user-id' })
      return () => {}
    }),
  })),
}))

describe('Training Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('初期状態でFirestoreからデータを読み込む', () => {
    const store = useTrainingStore()
    expect(store.runningRecords).toHaveLength(1)
    expect(store.legPressRecords).toHaveLength(1)
    expect(store.chestPressRecords).toHaveLength(0)
    expect(store.latPulldownRecords).toHaveLength(0)
    expect(store.abdominalRecords).toHaveLength(0)
  })

  it('should add running record to Firestore', async () => {
    const store = useTrainingStore()
    const record = {
      date: '2024-03-15',
      level: 5,
      time: 30,
      speed: 8.5,
    }

    await store.addRunningRecord(record)

    expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
      'collection-ref',
      expect.objectContaining({
        ...record,
        type: 'running',
        userId: 'test-user-id',
        date: expect.any(Object),
      }),
    )
  })

  it('should add weight training record to Firestore', async () => {
    const store = useTrainingStore()
    const record = {
      date: '2024-03-15',
      weight: 80,
      reps: 12,
      sets: 3,
    }

    await store.addWeightTrainingRecord('legPress', record)

    expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
      'collection-ref',
      expect.objectContaining({
        ...record,
        type: 'legPress',
        userId: 'test-user-id',
        date: expect.any(Object),
      }),
    )
  })

  it('should delete record from Firestore', async () => {
    const store = useTrainingStore()
    const recordId = 'test-record-id'

    await store.deleteRecord(recordId)

    expect(vi.mocked(doc)).toHaveBeenCalledWith(
      'firestore-instance',
      `users/test-user-id/trainingRecords/${recordId}`,
    )
    expect(vi.mocked(deleteDoc)).toHaveBeenCalledWith('doc-ref')
  })

  it('should update records when snapshot changes', () => {
    const store = useTrainingStore()
    const mockSnapshot = {
      docs: [
        {
          id: '1',
          data: () => ({
            type: 'running',
            date: { toDate: () => new Date('2024-03-15') },
            level: 5,
            time: 30,
            speed: 8.5,
            userId: 'test-user-id',
          }),
        },
        {
          id: '2',
          data: () => ({
            type: 'legPress',
            date: { toDate: () => new Date('2024-03-15') },
            weight: 80,
            reps: 12,
            sets: 3,
            userId: 'test-user-id',
          }),
        },
      ],
    } as unknown as QuerySnapshot<DocumentSnapshot>

    // onSnapshotのコールバックを実行
    const [, callback] = vi.mocked(onSnapshot).mock.calls[0]
    ;(callback as (snapshot: QuerySnapshot<DocumentSnapshot>) => void)(mockSnapshot)

    expect(store.runningRecords).toHaveLength(1)
    expect(store.legPressRecords).toHaveLength(1)
    expect(store.runningRecords[0]).toMatchObject({
      id: '1',
      type: 'running',
      level: 5,
      time: 30,
      speed: 8.5,
    })
    expect(store.legPressRecords[0]).toMatchObject({
      id: '2',
      type: 'legPress',
      weight: 80,
      reps: 12,
      sets: 3,
    })
  })
})
