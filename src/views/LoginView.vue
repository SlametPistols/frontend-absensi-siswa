<template>
  <div
    class="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-10"
  >
    <div class="w-full max-w-sm">

      <!-- Logo -->
      <div class="mb-8 text-center">
        <div
          class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 8.5 12 4l9 4.5-9 4.5-9-4.5Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7 11v5c3.3 2.7 6.7 2.7 10 0v-5M21 9v6"
            />
          </svg>
        </div>

        <h1 class="text-3xl font-bold tracking-tight text-slate-900">
          SiAbsen
        </h1>
      </div>

      <!-- Login Card -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8"
      >
        <form @submit.prevent="handleLogin" class="space-y-5">

          <!-- Username -->
          <div>
            <label
              for="username"
              class="mb-2 block text-sm font-medium text-slate-700"
            >
              Username
            </label>

            <input
              id="username"
              v-model="username"
              type="text"
              autocomplete="username"
              placeholder="Masukkan username"
              class="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <!-- Password -->
          <div>
            <label
              for="password"
              class="mb-2 block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <input
              id="password"
              v-model="password"
              type="password"
              autocomplete="current-password"
              placeholder="Masukkan password"
              class="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <!-- Error Message -->
          <div
            v-if="errorMessage"
            class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {{ errorMessage }}
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="loading"
            class="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg
              v-if="loading"
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="3"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>

            {{ loading ? 'Memproses...' : 'Masuk' }}
          </button>
        </form>
      </div>

      <!-- Footer -->
      <p class="mt-6 text-center text-xs text-slate-400">
        Sistem Informasi Absensi Siswa
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/auth'
import { setCurrentUser } from '../services/authState'

const router = useRouter()

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''

  if (!username.value.trim() || !password.value) {
    errorMessage.value = 'Username dan password wajib diisi.'
    return
  }

  loading.value = true

  try {
    const user = await login(username.value, password.value)

    localStorage.setItem('token', user.token)

    if (user.peran_id_str || user.peran || user.role) {
      setCurrentUser(user, user.token)
    }

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