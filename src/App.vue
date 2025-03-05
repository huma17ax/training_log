<script setup lang="ts">
import TrainingTabs from '@/components/TrainingTabs.vue'
</script>

<template>
  <div class="app-container">
    <header>
      <h1>トレーニング記録</h1>
    </header>
    <main>
      <TrainingTabs />
    </main>
    <footer>
      <p>© 2023 トレーニング記録アプリ</p>
    </footer>
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

header {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

main {
  flex: 1;
  padding: 1rem;
}

footer {
  background-color: #f1f1f1;
  padding: 1rem;
  text-align: center;
  font-size: 0.8rem;
  color: #666;
}

@media (min-width: 768px) {
  .app-container {
    max-width: 768px;
    margin: 0 auto;
  }
}
</style>
