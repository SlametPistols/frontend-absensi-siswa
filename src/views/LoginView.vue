<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-xl shadow-md p-8">

      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-900">
          Sistem Absensi Siswa
        </h1>

        <p class="text-gray-500 mt-2">
          Silakan masuk ke akun Anda
        </p>
      </div>

      <form class="space-y-5" @submit.prevent="handleLogin">

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>

          <input
            v-model="username"
            type="text"
            placeholder="Masukkan username"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>

          <input
            v-model="password"
            type="password"
            placeholder="Masukkan password"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <p v-if="errorMessage" class="text-sm text-red-600">
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Memproses...' : 'Masuk' }}
        </button>

      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/auth'

const router = useRouter()

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''

  if (!username.value || !password.value) {
    errorMessage.value = 'Username dan password wajib diisi.'
    return
  }

  loading.value = true

  try {
    const user = await login(username.value, password.value)

    localStorage.setItem('token', user.token)

    router.push('/dashboard')
  } catch (error) {
    if (error.response?.data?.error_code === 'INVALID_CREDENTIALS') {
      errorMessage.value = 'Username atau password salah.'
    } else {
      errorMessage.value = 'Terjadi kesalahan saat login.'
    }
  } finally {
    loading.value = false
  }
}
</script>