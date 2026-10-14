import { ref } from 'vue'
import { getCurrentUser } from './auth'

export const currentUser = ref(null)
let loadedToken = null
let pendingRequest = null

export const setCurrentUser = (user, token = localStorage.getItem('token')) => {
  currentUser.value = user || null
  loadedToken = user && token ? token : null
}

export const loadCurrentUser = async () => {
  const token = localStorage.getItem('token')

  if (!token) {
    clearCurrentUser()
    return null
  }

  if (currentUser.value && loadedToken === token) return currentUser.value
  if (pendingRequest?.token === token) return pendingRequest.promise

  const promise = (async () => {
    try {
      const user = await getCurrentUser()
      // Do not cache a response if the token changed while the request was in flight.
      if (localStorage.getItem('token') !== token) return null
      setCurrentUser(user, token)
      return user
    } catch (error) {
      if (localStorage.getItem('token') === token) {
        clearCurrentUser()
        localStorage.removeItem('token')
      }
      return null
    } finally {
      if (pendingRequest?.token === token) pendingRequest = null
    }
  })()

  pendingRequest = { token, promise }
  return promise
}

export const clearCurrentUser = () => {
  currentUser.value = null
  loadedToken = null
}

if (typeof window !== 'undefined') {
  window.addEventListener('auth:unauthorized', clearCurrentUser)
}
