import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from '@/firebase/auth'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true },
    },
  ],
})

// 認証状態のチェックを行う関数
const checkAuth = async () => {
  try {
    return await getCurrentUser()
  } catch {
    return null
  }
}

router.beforeEach(async (to) => {
  // 認証状態を取得
  const currentUser = await checkAuth()

  // 認証が必要なルートへのアクセス
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!currentUser) {
      return { name: 'login' }
    }
  }

  // ゲスト専用ルートへのアクセス
  if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (currentUser) {
      return { name: 'home' }
    }
  }

  return true
})

export default router
