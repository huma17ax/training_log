<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(async () => {
  // 認証状態の監視を開始
  await authStore.initialize()
})
</script>

<template>
  <RouterView />
</template>

<style>
/* グローバルスタイル */
:root {
  --primary-color: #4caf50;
  --secondary-color: #2196f3;
  --background-color: #f5f5f5;
  --text-color: #333;
  --border-color: #ddd;
  --danger-color: #dc3545;
  --danger-hover-color: #c82333;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}
</style>
