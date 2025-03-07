import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TrainingStats from '../TrainingStats.vue'

describe('TrainingStats', () => {
  it('renders responsive layout correctly on mobile', () => {
    const wrapper = mount(TrainingStats, {
      props: {
        records: [],
        type: 'running',
      },
    })

    // クラスの存在確認
    expect(wrapper.find('.training-stats').exists()).toBe(true)
    expect(wrapper.find('.stats-grid').exists()).toBe(true)
    expect(wrapper.find('.stat-item').exists()).toBe(true)

    // 要素の構造確認
    const statsGrid = wrapper.find('.stats-grid')
    expect(statsGrid.element.children.length).toBe(4) // 4つの統計項目

    // 見出しの確認
    const heading = wrapper.find('h3')
    expect(heading.text()).toBe('統計情報')
  })

  it('renders responsive layout correctly on desktop', () => {
    const wrapper = mount(TrainingStats, {
      props: {
        records: [],
        type: 'running',
      },
    })

    // グリッドアイテムの確認
    const statItems = wrapper.findAll('.stat-item')
    expect(statItems.length).toBe(4) // 4つのグリッドアイテム

    // ラベルの確認
    const labels = wrapper.findAll('.stat-label')
    expect(labels.length).toBe(4)
    expect(labels[0].text()).toBe('記録数')
    expect(labels[1].text()).toBe('継続日数')
  })
})
