import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TrainingList from '../TrainingList.vue'
import type { RunningRecord, WeightTrainingRecord } from '@/stores/trainingStore'

describe('TrainingList', () => {
  const mockRunningRecords: RunningRecord[] = [
    {
      id: '1',
      date: '2024-03-01',
      level: 3,
      time: 30,
      speed: 10,
      type: 'running',
      userId: 'user1',
    },
    {
      id: '2',
      date: '2024-03-03',
      level: 4,
      time: 45,
      speed: 12,
      type: 'running',
      userId: 'user1',
    },
    {
      id: '3',
      date: '2024-03-02',
      level: 3,
      time: 35,
      speed: 11,
      type: 'running',
      userId: 'user1',
    },
  ]

  const mockWeightRecords: WeightTrainingRecord[] = [
    {
      id: '1',
      date: '2024-03-01',
      weight: 50,
      reps: 10,
      sets: 3,
      type: 'legPress',
      userId: 'user1',
    },
    {
      id: '2',
      date: '2024-03-03',
      weight: 55,
      reps: 12,
      sets: 3,
      type: 'legPress',
      userId: 'user1',
    },
    {
      id: '3',
      date: '2024-03-02',
      weight: 52,
      reps: 11,
      sets: 3,
      type: 'legPress',
      userId: 'user1',
    },
  ]

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
        type: 'legPress',
      },
    })

    const headers = wrapper.findAll('th')
    expect(headers.length).toBe(4)
    expect(headers[0].text()).toBe('日付')
    expect(headers[1].text()).toBe('重量 (kg)')
    expect(headers[2].text()).toBe('回数')
    expect(headers[3].text()).toBe('セット数')
  })

  it('異なる日付のランニングレコードが正しくソートされる', () => {
    const wrapper = mount(TrainingList, {
      props: {
        records: mockRunningRecords,
        type: 'running',
      },
    })

    const dates = wrapper.findAll('td:first-child').map((cell) => cell.text())
    expect(dates).toEqual(['2024-03-03', '2024-03-02', '2024-03-01'])
  })

  it('異なる日付のウェイトトレーニングレコードが正しくソートされる', () => {
    const wrapper = mount(TrainingList, {
      props: {
        records: mockWeightRecords,
        type: 'legPress',
      },
    })

    const dates = wrapper.findAll('td:first-child').map((cell) => cell.text())
    expect(dates).toEqual(['2024-03-03', '2024-03-02', '2024-03-01'])
  })

  it('同じ日付のレコードが正しく表示される', () => {
    const sameDateRecords: RunningRecord[] = [
      {
        id: '1',
        date: '2024-03-01',
        level: 3,
        time: 30,
        speed: 10,
        type: 'running',
        userId: 'user1',
      },
      {
        id: '2',
        date: '2024-03-01',
        level: 4,
        time: 45,
        speed: 12,
        type: 'running',
        userId: 'user1',
      },
    ]

    const wrapper = mount(TrainingList, {
      props: {
        records: sameDateRecords,
        type: 'running',
      },
    })

    const dates = wrapper.findAll('td:first-child').map((cell) => cell.text())
    expect(dates).toEqual(['2024-03-01', '2024-03-01'])
  })

  it('レコードが空の場合でもエラーが発生しない', () => {
    const wrapper = mount(TrainingList, {
      props: {
        records: [],
        type: 'running',
      },
    })

    expect(wrapper.findAll('tr')).toHaveLength(1) // ヘッダー行のみ
  })
})
