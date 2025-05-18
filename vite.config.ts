import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Training Log',
        short_name: 'Training Log',
        description: 'トレーニングログ管理アプリケーション',
        theme_color: '#ffffff',
        display: 'standalone',
      },
      workbox: {
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/__\/auth\/.*/],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
