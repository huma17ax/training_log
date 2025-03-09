<template>
  <div class="login-container">
    <div class="login-box">
      <h1>トレーニング記録</h1>
      <div class="login-content">
        <button
          class="google-login-button"
          @click="handleGoogleLogin"
          :disabled="authStore.loading"
        >
          <img src="@/assets/google-logo.svg" alt="Google" class="google-logo" />
          <span>{{ authStore.loading ? 'ログイン中...' : 'Googleでログイン' }}</span>
        </button>
        <div v-if="authStore.error" class="error-message">
          {{ authStore.error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleGoogleLogin = async () => {
  try {
    await authStore.loginWithGoogle()
    router.push('/')
  } catch {
    // エラーはストアで処理されているため、ここでは何もしない
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--background-color);
}

.login-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 1rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-color);
}

.login-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.google-login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: white;
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.google-login-button:hover:not(:disabled) {
  background-color: #f8f8f8;
  border-color: #ccc;
}

.google-login-button:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.7;
}

.google-logo {
  width: 24px;
  height: 24px;
}

.error-message {
  color: #dc3545;
  text-align: center;
  font-size: 0.875rem;
}
</style>
