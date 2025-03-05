import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import App from '../App.vue'

describe('App', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('アプリケーションが正常にマウントされる', () => {
    const wrapper = mount(App)
    expect(wrapper.exists()).toBe(true)
  })

  it('トレーニングタブが表示される', () => {
    const wrapper = mount(App)
    expect(wrapper.find('.training-tabs').exists()).toBe(true)
  })

  it('ヘッダーとフッターが表示される', () => {
    const wrapper = mount(App)
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  it('アプリケーションのタイトルが表示される', () => {
    const wrapper = mount(App)
    expect(wrapper.find('h1').text()).toContain('トレーニング記録')
  })
})
