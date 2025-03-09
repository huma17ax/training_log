import {
  getAuth,
  signOut,
  onAuthStateChanged,
  type User,
  GoogleAuthProvider,
  signInWithPopup,
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
  const { user } = await signInWithPopup(auth, provider)
  return user
}

export const logout = async (): Promise<void> => {
  await signOut(auth)
}

export const initializeAuth = (callback: (user: User | null) => void): (() => void) => {
  return onAuthStateChanged(auth, callback)
}
