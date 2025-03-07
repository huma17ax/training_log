import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TrainingForm from '../TrainingForm.vue'

describe('TrainingForm', () => {
  it('renders responsive layout correctly on mobile', () => {
    const wrapper = mount(TrainingForm, {
      props: {
        type: 'running',
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
    })

    const toggleButton = wrapper.find('.toggle-button')
    expect(wrapper.find('.training-form').exists()).toBe(false)

    await toggleButton.trigger('click')
    expect(wrapper.find('.training-form').exists()).toBe(true)

    await toggleButton.trigger('click')
    expect(wrapper.find('.training-form').exists()).toBe(false)
  })

  it('emits submit event with correct data for running type', async () => {
    const wrapper = mount(TrainingForm, {
      props: {
        type: 'running',
      },
    })

    // フォームを表示
    await wrapper.find('.toggle-button').trigger('click')

    // フォームに値を入力
    await wrapper.find('#date').setValue('2024-03-20')
    await wrapper.find('#level').setValue(5)
    await wrapper.find('#time').setValue(30)
    await wrapper.find('#speed').setValue(8.0)

    // フォームを送信
    await wrapper.find('form').trigger('submit.prevent')

    // emitされたイベントをチェック
    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')![0][0]).toEqual({
      date: '2024-03-20',
      level: 5,
      time: 30,
      speed: 8.0,
    })
  })
})
