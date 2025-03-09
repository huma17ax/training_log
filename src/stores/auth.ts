import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from 'firebase/auth'
import {
  loginWithGoogle as firebaseLoginWithGoogle,
  logout as firebaseLogout,
  initializeAuth,
  getCurrentUser,
} from '@/firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const initialize = async () => {
    loading.value = true
    try {
      user.value = await getCurrentUser()
      initializeAuth((newUser) => {
        user.value = newUser
      })
    } finally {
      loading.value = false
    }
  }

  const loginWithGoogle = async () => {
    loading.value = true
    error.value = null
    try {
      user.value = await firebaseLoginWithGoogle()
    } catch (e) {
      error.value = e instanceof Error ? e.message : '認証エラーが発生しました'
      throw e
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    error.value = null
    try {
      await firebaseLogout()
      user.value = null
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'ログアウトエラーが発生しました'
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    error,
    initialize,
    loginWithGoogle,
    logout,
  }
})
