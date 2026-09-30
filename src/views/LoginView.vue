<template>
  <div
    class="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4"
    style="font-family: Helvetica, Arial, sans-serif;"
  >
    <div class="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">

      <!-- Left: Brand -->
      <div class="flex-1 max-w-md text-center md:text-left">
        <h1 class="text-[#1877f2] text-5xl md:text-6xl font-bold tracking-tight leading-none">
          SiAbsen
        </h1>

        <p class="mt-4 text-xl md:text-2xl text-[#1c1e21] leading-snug max-w-sm mx-auto md:mx-0">
          Sistem informasi absensi siswa untuk sekolah, praktis dan mudah digunakan setiap hari.
        </p>
      </div>

      <!-- Right: Login card -->
      <div class="w-full max-w-[396px] shrink-0">
        <div class="bg-white rounded-lg border border-[#dddfe2] shadow-[0_2px_4px_rgba(0,0,0,0.08),0_8px_16px_rgba(0,0,0,0.08)] p-4">

          <form @submit.prevent="handleLogin" class="space-y-3">
            <input
              id="username"
              v-model="username"
              type="text"
              autocomplete="username"
              placeholder="Username"
              class="w-full h-[52px] px-4 border border-[#dddfe2] rounded-md text-[17px] text-[#1c1e21] placeholder:text-[#90949c] outline-none focus:border-[#1877f2] focus:ring-2 focus:ring-[#1877f2]/20 transition-colors"
            />

            <input
              id="password"
              v-model="password"
              type="password"
              autocomplete="current-password"
              placeholder="Password"
              class="w-full h-[52px] px-4 border border-[#dddfe2] rounded-md text-[17px] text-[#1c1e21] placeholder:text-[#90949c] outline-none focus:border-[#1877f2] focus:ring-2 focus:ring-[#1877f2]/20 transition-colors"
            />

            <!-- Error -->
            <div
              v-if="errorMessage"
              class="flex items-start gap-2.5 px-3.5 py-3 rounded-md bg-[#fce6e8] border border-[#f5c2c7]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0 text-[#e41e3f] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 10-2 0v4a1 1 0 102 0V6zm-1 8a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" clip-rule="evenodd" />
              </svg>
              <p class="text-sm text-[#601b21] leading-relaxed">{{ errorMessage }}</p>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full h-[48px] flex items-center justify-center gap-2 bg-[#1877f2] hover:bg-[#166fe5] text-white text-[20px] font-bold rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span>{{ loading ? 'Memproses...' : 'Masuk' }}</span>
            </button>
          </form>

          <div class="text-center mt-4">
            <span class="text-[#1877f2] text-sm hover:underline cursor-default">
              Lupa password?
            </span>
          </div>

          <hr class="my-5 border-t border-[#dadde1]" />

          <p class="text-center text-xs text-[#606770] leading-relaxed">
            Hubungi admin sekolah jika lupa kata sandi atau belum memiliki akun.
          </p>
        </div>

        <p class="text-center text-xs text-[#606770] mt-6">
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