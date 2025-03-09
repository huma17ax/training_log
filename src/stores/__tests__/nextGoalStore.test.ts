import { setActivePinia, createPinia } from 'pinia'
import { useNextGoalStore } from '../nextGoalStore'
import { doc, getDoc, setDoc, DocumentReference, DocumentSnapshot } from 'firebase/firestore'
import type { DocumentData, SnapshotMetadata } from 'firebase/firestore'
import { db } from '../../firebase'
import { describe, it, expect, beforeEach, vi } from 'vitest'

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  getFirestore: vi.fn().mockReturnValue({}),
}))

describe('NextGoalStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('fetchNextGoal', () => {
    it('should fetch next goal from Firestore', async () => {
      const mockUserId = 'test-user-id'
      const mockType = 'running'
      const mockGoal = 'increase'
      const mockDocRef = { id: mockType } as DocumentReference
      const mockMetadata = {
        hasPendingWrites: false,
        fromCache: false,
        isEqual: () => true,
      } as SnapshotMetadata
      const mockDocSnap = {
        exists: () => true,
        data: () => ({ value: mockGoal }),
        metadata: mockMetadata,
        get: () => ({ value: mockGoal }),
        id: mockType,
        ref: mockDocRef,
      } as unknown as DocumentSnapshot<DocumentData>

      vi.mocked(doc).mockReturnValue(mockDocRef)
      vi.mocked(getDoc).mockResolvedValue(mockDocSnap)

      const store = useNextGoalStore()
      await store.fetchNextGoal(mockUserId, mockType)

      expect(doc).toHaveBeenCalledWith(db, 'users', mockUserId, 'nextGoals', mockType)
      expect(getDoc).toHaveBeenCalledWith(mockDocRef)
      expect(store.nextGoals[mockType]).toBe(mockGoal)
    })

    it('should handle non-existent document', async () => {
      const mockUserId = 'test-user-id'
      const mockType = 'running'
      const mockDocRef = { id: mockType } as DocumentReference
      const mockMetadata = {
        hasPendingWrites: false,
        fromCache: false,
        isEqual: () => true,
      } as SnapshotMetadata
      const mockDocSnap = {
        exists: () => false,
        data: () => null,
        metadata: mockMetadata,
        get: () => null,
        id: mockType,
        ref: mockDocRef,
      } as unknown as DocumentSnapshot<DocumentData>

      vi.mocked(doc).mockReturnValue(mockDocRef)
      vi.mocked(getDoc).mockResolvedValue(mockDocSnap)

      const store = useNextGoalStore()
      await store.fetchNextGoal(mockUserId, mockType)

      expect(store.nextGoals[mockType]).toBeNull()
    })
  })

  describe('updateNextGoal', () => {
    it('should update next goal in Firestore', async () => {
      const mockUserId = 'test-user-id'
      const mockType = 'running'
      const mockGoal = 'increase'
      const mockDocRef = { id: mockType } as DocumentReference

      vi.mocked(doc).mockReturnValue(mockDocRef)
      vi.mocked(setDoc).mockResolvedValue(undefined)

      const store = useNextGoalStore()
      await store.updateNextGoal(mockUserId, mockType, mockGoal)

      expect(doc).toHaveBeenCalledWith(db, 'users', mockUserId, 'nextGoals', mockType)
      expect(setDoc).toHaveBeenCalledWith(mockDocRef, {
        value: mockGoal,
        updatedAt: expect.any(Date),
      })
      expect(store.nextGoals[mockType]).toBe(mockGoal)
    })
  })
})
