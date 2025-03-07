import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TrainingList from '../TrainingList.vue'

describe('TrainingList', () => {
  it('renders responsive layout correctly on mobile', () => {
    const wrapper = mount(TrainingList, {
      props: {
        records: [],
        type: 'running',
      },
    })

    // 基本構造の確認
    expect(wrapper.find('.training-list').exists()).toBe(true)
    expect(wrapper.find('.list-container').exists()).toBe(true)
    expect(wrapper.find('table').exists()).toBe(true)

    // テーブルヘッダーの確認
    const headers = wrapper.findAll('th')
    expect(headers.length).toBe(4)

    // スクロール可能なコンテナの確認
    const listContainer = wrapper.find('.list-container')
    expect(listContainer.attributes('class')).toContain('list-container')
  })

  it('renders table headers correctly for running type', () => {
    const wrapper = mount(TrainingList, {
      props: {
        records: [],
        type: 'running',
      },
    })

    const headers = wrapper.findAll('th')
    expect(headers.length).toBe(4)
    expect(headers[0].text()).toBe('日付')
    expect(headers[1].text()).toBe('レベル')
    expect(headers[2].text()).toBe('時間 (分)')
    expect(headers[3].text()).toBe('速度 (km/h)')
  })

  it('renders table headers correctly for weight type', () => {
    const wrapper = mount(TrainingList, {
      props: {
        records: [],
        type: 'weight',
      },
    })

    const headers = wrapper.findAll('th')
    expect(headers.length).toBe(4)
    expect(headers[0].text()).toBe('日付')
    expect(headers[1].text()).toBe('重量 (kg)')
    expect(headers[2].text()).toBe('回数')
    expect(headers[3].text()).toBe('セット数')
  })
})
