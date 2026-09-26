```vue
<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">

    <!-- Background decoration -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-200/30 blur-3xl"
      ></div>

      <div
        class="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl"
      ></div>
    </div>

    <!-- Login Card -->
    <div class="relative w-full max-w-md">

      <!-- Brand -->
      <div class="text-center mb-8">
        <div
          class="w-14 h-14 mx-auto rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-7 h-7 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5a3 3 0 006 0"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 13l2 2 4-4"
            />
          </svg>
        </div>

        <h1 class="text-2xl font-bold tracking-tight text-slate-900 mt-5">
          SiAbsen
        </h1>

        <p class="text-sm text-slate-500 mt-2">
          Sistem Informasi Absensi Siswa
        </p>
      </div>

      <!-- Card -->
      <div
        class="bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-6 sm:p-8"
      >

        <div class="mb-7">
          <h2 class="text-lg font-semibold text-slate-900">
            Selamat datang kembali
          </h2>

          <p class="text-sm text-slate-500 mt-1">
            Masuk untuk melanjutkan ke dashboard.
          </p>
        </div>

        <form
          class="space-y-5"
          @submit.prevent="handleLogin"
        >

          <!-- Username -->
          <div>
            <label
              for="username"
              class="block text-sm font-medium text-slate-700 mb-2"
            >
              Username
            </label>

            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
                  />
                  <circle cx="9" cy="7" r="4" />
                </svg>
              </div>

              <input
                id="username"
                v-model="username"
                type="text"
                autocomplete="username"
                placeholder="Masukkan username"
                class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-slate-700 mb-2"
            >
              Password
            </label>

            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <rect
                    x="4"
                    y="10"
                    width="16"
                    height="11"
                    rx="2"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8 10V7a4 4 0 018 0v3"
                  />
                </svg>
              </div>

              <input
                id="password"
                v-model="password"
                type="password"
                autocomplete="current-password"
                placeholder="Masukkan password"
                class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>

          <!-- Error -->
          <div
            v-if="errorMessage"
            class="flex items-start gap-3 p-3.5 rounded-xl bg-red-50 border border-red-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 shrink-0 text-red-500 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3m0 4h.01M10.29 3.86l-7.4 13a2 2 0 001.74 3h14.74a2 2 0 001.74-3l-7.4-13a2 2 0 00-3.48 0z"
              />
            </svg>

            <p class="text-sm text-red-600 leading-relaxed">
              {{ errorMessage }}
            </p>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold shadow-sm shadow-indigo-600/20 hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-600/20 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-sm"
          >
            <!-- Loading spinner -->
            <svg
              v-if="loading"
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>

              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>

            <span>
              {{ loading ? 'Memproses...' : 'Masuk ke Dashboard' }}
            </span>

            <svg
              v-if="!loading"
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 12h14m-6-6l6 6-6 6"
              />
            </svg>
          </button>

        </form>
      </div>

      <!-- Footer -->
      <p class="text-center text-xs text-slate-400 mt-6">
        Sistem Informasi Absensi Siswa
      </p>

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
```
