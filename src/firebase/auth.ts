import {
  getAuth,
  signOut,
  onAuthStateChanged,
  type User,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth'
import { app } from './index'

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe()
        resolve(user)
      },
      reject,
    )
  })
}

export const loginWithGoogle = async (): Promise<User> => {
  await signInWithRedirect(auth, provider)
  const result = await getRedirectResult(auth)
  if (!result) {
    throw new Error('認証に失敗しました')
  }
  return result.user
}

export const logout = async (): Promise<void> => {
  await signOut(auth)
}

export const initializeAuth = (callback: (user: User | null) => void): (() => void) => {
  return onAuthStateChanged(auth, callback)
}
