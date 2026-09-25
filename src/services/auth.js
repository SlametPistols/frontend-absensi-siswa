import api from './api'

export const login = async (username, password) => {
  const response = await api.post('/api/auth/login', {
    username,
    password,
  })

  return response.data.rows
}

export const getCurrentUser = async () => {
  const response = await api.get('/api/auth/me')

  return response.data.rows
}

export const logout = async () => {
  await api.post('/api/auth/logout')
}