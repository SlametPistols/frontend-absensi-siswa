import { ref } from 'vue'
import { getCurrentUser } from './auth'

export const currentUser = ref(null)

export const loadCurrentUser = async () => {
  const token = localStorage.getItem('token')

  if (!token) {
    currentUser.value = null
    return null
  }

  try {
    const user = await getCurrentUser()
    currentUser.value = user

    return user
  } catch (error) {
    currentUser.value = null
    localStorage.removeItem('token')

    return null
  }
}

export const clearCurrentUser = () => {
  currentUser.value = null
}