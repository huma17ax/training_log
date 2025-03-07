<script setup lang="ts">
import TrainingTabs from '@/components/TrainingTabs.vue'
</script>

<template>
  <div class="app-container">
    <main>
      <TrainingTabs />
    </main>
  </div>
</template>

<style>
/* グローバルスタイル */
:root {
  --primary-color: #4caf50;
  --secondary-color: #2196f3;
  --background-color: #f5f5f5;
  --text-color: #333;
  --border-color: #ddd;
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

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100%;
  margin: 0 auto;
}

main {
  flex: 1;
  padding: 0;
}

@media (min-width: 768px) {
  .app-container {
    max-width: 768px;
    margin: 0 auto;
  }
}
</style>
