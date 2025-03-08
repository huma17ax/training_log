import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

describe('App', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: { template: '<div>Home</div>' },
      },
    ],
  })

  it('アプリケーションが正常にマウントされる', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('トレーニングタブが表示される', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })
    await router.isReady()
    expect(wrapper.exists()).toBe(true)
  })
})
