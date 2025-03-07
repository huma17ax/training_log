import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TrainingForm from '../common/TrainingForm.vue'

describe('TrainingForm', () => {
  it('デフォルトでフォームが非表示であること', () => {
    const wrapper = mount(TrainingForm, {
      props: {
        type: 'running',
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
