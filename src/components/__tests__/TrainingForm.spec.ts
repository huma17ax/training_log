import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import type { Pinia } from 'pinia'
import TrainingForm from '../common/TrainingForm.vue'

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

  it('デフォルトでフォームが非表示であること', () => {
    const wrapper = mount(TrainingForm, {
      props: {
        type: 'running',
      },
      global: {
        plugins: [pinia],
      },
    })

    expect(wrapper.find('.training-form').exists()).toBe(false)
    expect(wrapper.find('.toggle-button').text()).toBe('記録を追加')
  })

  it('トグルボタンをクリックするとフォームの表示/非表示が切り替わること', async () => {
    const wrapper = mount(TrainingForm, {
      props: {
        type: 'running',
      },
      global: {
        plugins: [pinia],
      },
    })

    // 初期状態は非表示
    expect(wrapper.find('.training-form').exists()).toBe(false)

    // ボタンをクリックして表示
    await wrapper.find('.toggle-button').trigger('click')
    expect(wrapper.find('.training-form').exists()).toBe(true)
    expect(wrapper.find('.toggle-button').text()).toBe('記録を閉じる')

    // もう一度クリックして非表示
    await wrapper.find('.toggle-button').trigger('click')
    expect(wrapper.find('.training-form').exists()).toBe(false)
    expect(wrapper.find('.toggle-button').text()).toBe('記録を追加')
  })

  it('フォーム送信後にフォームが非表示になること', async () => {
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
    expect(wrapper.find('.training-form').exists()).toBe(true)

    // フォームを送信
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.find('.training-form').exists()).toBe(false)
    expect(wrapper.find('.toggle-button').text()).toBe('記録を追加')
  })
})
