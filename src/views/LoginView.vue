<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
    <div class="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

      <!-- Left: Brand -->
      <div class="hidden md:block">
        <div class="max-w-md">
          <div class="flex items-center gap-3 mb-6">
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v11a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 17.5v-11z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8 9h8M8 12h5M8 15h3"
                />
              </svg>
            </div>

            <span class="text-xl font-semibold tracking-tight text-slate-900">
              SiAbsen
            </span>
          </div>

          <h1 class="text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 leading-tight">
            Sistem informasi absensi siswa yang sederhana dan terintegrasi.
          </h1>

          <p class="mt-4 max-w-md text-base leading-7 text-slate-500">
            Kelola data siswa, pencatatan absensi, kartu siswa, dan kebutuhan
            administrasi sekolah dalam satu sistem.
          </p>
        </div>
      </div>

      <!-- Right: Login -->
      <div class="w-full max-w-md mx-auto md:mx-0 md:ml-auto">
        <!-- Mobile Brand -->
        <div class="flex items-center justify-center gap-2.5 mb-8 md:hidden">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v11a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 17.5v-11z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 9h8M8 12h5M8 15h3"
              />
            </svg>
          </div>

          <span class="text-xl font-semibold text-slate-900">
            SiAbsen
          </span>
        </div>

        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <div class="mb-6">
            <h2 class="text-xl font-semibold tracking-tight text-slate-900">
              Masuk ke akun
            </h2>

            <p class="mt-1.5 text-sm text-slate-500">
              Masukkan username dan password untuk melanjutkan.
            </p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-4">

            <!-- Username -->
            <div>
              <label
                for="username"
                class="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Username
              </label>

              <input
                id="username"
                v-model="username"
                type="text"
                autocomplete="username"
                placeholder="Masukkan username"
                class="h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <!-- Password -->
            <div>
              <label
                for="password"
                class="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <input
                id="password"
                v-model="password"
                type="password"
                autocomplete="current-password"
                placeholder="Masukkan password"
                class="h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <!-- Error -->
            <div
              v-if="errorMessage"
              class="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mt-0.5 h-4 w-4 shrink-0 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3m0 4h.01M10.29 3.86l-7.5 13A2 2 0 004.53 20h14.94a2 2 0 001.74-3.14l-7.5-13a2 2 0 00-3.42 0z"
                />
              </svg>

              <p class="text-sm leading-5 text-red-700">
                {{ errorMessage }}
              </p>
            </div>

            <!-- Login Button -->
            <button
              type="submit"
              :disabled="loading"
              class="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700 active:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60"
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

              <span>
                {{ loading ? 'Memproses...' : 'Masuk' }}
              </span>
            </button>
          </form>

          <div class="mt-5 text-center">
            <span class="text-sm text-indigo-600">
              Lupa password?
            </span>
          </div>

          <div class="my-5 border-t border-slate-100"></div>

          <p class="text-center text-xs leading-5 text-slate-400">
            Hubungi admin sekolah jika lupa kata sandi atau belum memiliki akun.
          </p>
        </div>

        <p class="mt-5 text-center text-xs text-slate-400">
          Sistem Informasi Absensi Siswa
        </p>
      </div>

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