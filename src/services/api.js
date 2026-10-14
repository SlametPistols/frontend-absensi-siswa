import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://backend-absensi-siswa-mu.vercel.app',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const requestUrl = error.config?.url || ''
      const isLoginRequest = requestUrl.includes('/api/auth/login')

      if (!isLoginRequest) {
        localStorage.removeItem('token')
        window.dispatchEvent(new Event('auth:unauthorized'))
        if (window.location.pathname !== '/') window.location.assign('/')
      }
    }

    return Promise.reject(error)
  }
)
