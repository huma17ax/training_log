import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import type { Pinia } from 'pinia'
import { nextTick } from 'vue'
import TrainingForm from '../TrainingForm.vue'
import { useTrainingStore } from '@/stores/trainingStore'

// Firebaseのモック
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
  doc: vi.fn(),
  deleteDoc: vi.fn(),
  onSnapshot: vi.fn(),
  Timestamp: {
    fromDate: vi.fn((date) => ({ toDate: () => new Date(date) })),
  },
  getFirestore: vi.fn(() => 'firestore-instance'),
}))

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: { uid: 'test-user-id' },
    onAuthStateChanged: vi.fn(),
  })),
}))

describe('TrainingForm', () => {
  let pinia: Pinia

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })

  it('renders responsive layout correctly on mobile', () => {
    const wrapper = mount(TrainingForm, {
      props: {
        type: 'running',
      },
      global: {
        plugins: [pinia],
      },
    })

    // 基本構造の確認
    expect(wrapper.find('.training-form-container').exists()).toBe(true)
    expect(wrapper.find('.toggle-button').exists()).toBe(true)

    // トグルボタンのテキスト確認
    const toggleButton = wrapper.find('.toggle-button')
    expect(toggleButton.text()).toBe('記録を追加')

    // フォームが初期状態で非表示であることを確認
    expect(wrapper.find('.training-form').exists()).toBe(false)
  })

  it('toggles form visibility', async () => {
    const wrapper = mount(TrainingForm, {
      props: {
        type: 'running',
      },
      global: {
        plugins: [pinia],
      },
    })

    const toggleButton = wrapper.find('.toggle-button')
    expect(wrapper.find('.training-form').exists()).toBe(false)

    await toggleButton.trigger('click')
    await nextTick()
    expect(wrapper.find('.training-form').exists()).toBe(true)

    await toggleButton.trigger('click')
    await nextTick()
    expect(wrapper.find('.training-form').exists()).toBe(false)
  })

  it('emits submit event with correct data for running type', async () => {
    const wrapper = mount(TrainingForm, {
      props: {
        type: 'running',
      },
      global: {
        plugins: [pinia],
      },
    })

    // フォームを表示
    await wrapper.find('.toggle-button').trigger('click')
    await nextTick()

    // フォームに値を入力
    await wrapper.find('#date').setValue('2024-03-20')
    await wrapper.find('#level').setValue(5)
    await wrapper.find('#time').setValue(30)
    await wrapper.find('#speed').setValue(8.0)

    // フォームを送信
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    // emitされたイベントをチェック
    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')![0][0]).toEqual({
      date: '2024-03-20',
      level: 5,
      time: 30,
      speed: 8.0,
    })
  })

  it('sets default values from latest record', async () => {
    const store = useTrainingStore()
    store.runningRecords = [
      {
        id: '1',
        type: 'running',
        date: '2024-03-19',
        level: 5,
        time: 35,
        speed: 8.5,
        userId: 'test-user',
      },
    ]

    const wrapper = mount(TrainingForm, {
      props: {
        type: 'running',
      },
      global: {
        plugins: [pinia],
      },
    })

    // フォームを表示
    await wrapper.find('.toggle-button').trigger('click')
    await nextTick()

    // デフォルト値が最新の記録の値に設定されていることを確認
    const levelInput = wrapper.find('#level').element as HTMLInputElement
    const timeInput = wrapper.find('#time').element as HTMLInputElement
    const speedInput = wrapper.find('#speed').element as HTMLInputElement

    expect(levelInput.value).toBe('5')
    expect(timeInput.value).toBe('35')
    expect(speedInput.value).toBe('8.5')
  })
})
