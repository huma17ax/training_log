import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import TrainingTabs from '../TrainingTabs.vue'
import RunningTab from '../tabs/RunningTab.vue'
import LegPressTab from '../tabs/LegPressTab.vue'
import ChestPressTab from '../tabs/ChestPressTab.vue'

describe('TrainingTabs', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('デフォルトでランニングタブが表示される', () => {
    const wrapper = mount(TrainingTabs)
    expect(wrapper.findComponent(RunningTab).exists()).toBe(true)
    expect(wrapper.findComponent(LegPressTab).exists()).toBe(false)
  })

  it('すべてのタブボタンが表示される', () => {
    const wrapper = mount(TrainingTabs)
    const buttons = wrapper.findAll('.tab-button')
    expect(buttons).toHaveLength(5)
    expect(buttons[0].text()).toBe('ランニング')
    expect(buttons[1].text()).toBe('レッグプレス')
    expect(buttons[2].text()).toBe('チェストプレス')
    expect(buttons[3].text()).toBe('ラットプルダウン')
    expect(buttons[4].text()).toBe('アブドミナル')
  })

  it('タブをクリックすると対応するコンポーネントが表示される', async () => {
    const wrapper = mount(TrainingTabs)

    // レッグプレスタブをクリック
    await wrapper.findAll('.tab-button')[1].trigger('click')
    expect(wrapper.findComponent(RunningTab).exists()).toBe(false)
    expect(wrapper.findComponent(LegPressTab).exists()).toBe(true)

    // チェストプレスタブをクリック
    await wrapper.findAll('.tab-button')[2].trigger('click')
    expect(wrapper.findComponent(LegPressTab).exists()).toBe(false)
    expect(wrapper.findComponent(ChestPressTab).exists()).toBe(true)
  })

  it('アクティブなタブのボタンにactiveクラスが付与される', async () => {
    const wrapper = mount(TrainingTabs)

    // デフォルトでランニングタブがアクティブ
    expect(wrapper.findAll('.tab-button')[0].classes()).toContain('active')

    // レッグプレスタブをクリック
    await wrapper.findAll('.tab-button')[1].trigger('click')
    expect(wrapper.findAll('.tab-button')[0].classes()).not.toContain('active')
    expect(wrapper.findAll('.tab-button')[1].classes()).toContain('active')
  })
})
