<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <div class="flex items-center gap-3">
        <div
          class="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"
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
              d="M4 12a8 8 0 0114.9-4M20 12a8 8 0 01-14.9 4"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 4v4h-4M5 20v-4h4"
            />
          </svg>
        </div>

        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900">
            Sinkronisasi Dapodik
          </h1>

          <p class="mt-1 text-sm text-slate-500">
            Sinkronkan data sekolah dari Dapodik ke sistem absensi.
          </p>
        </div>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Form -->
      <section
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2"
      >
        <!-- Header -->
        <div
          class="border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600"
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
                  d="M12 3v18M3 12h18"
                />
              </svg>
            </div>

            <div>
              <h2 class="text-base font-semibold text-slate-900">
                Konfigurasi Sinkronisasi
              </h2>

              <p class="mt-0.5 text-xs text-slate-500 sm:text-sm">
                Masukkan informasi koneksi Dapodik sebelum memulai.
              </p>
            </div>
          </div>
        </div>

        <form
          @submit.prevent="startSync"
          class="space-y-5 p-5 sm:p-6"
        >
          <!-- NPSN -->
          <div>
            <label
              class="mb-2 block text-sm font-semibold text-slate-700"
            >
              NPSN
            </label>

            <div class="relative">
              <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400"
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
                    d="M4 21V5a2 2 0 012-2h12a2 2 0 012 2v16M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-4h4v4"
                  />
                </svg>
              </div>

              <input
                v-model="form.npsn"
                type="text"
                placeholder="Contoh: 20208854"
                :disabled="syncing"
                class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
              />
            </div>
          </div>

          <!-- Tipe -->
          <div>
            <label
              class="mb-2 block text-sm font-semibold text-slate-700"
            >
              Tipe Sinkronisasi
            </label>

            <div class="relative">
              <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400"
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
                    d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
                  />
                </svg>
              </div>

              <select
                v-model="form.tipe"
                :disabled="syncing"
                class="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
              >
                <option value="all">
                  Semua Data
                </option>

                <option value="peserta_didik">
                  Peserta Didik
                </option>

                <option value="pengguna">
                  Pengguna
                </option>

                <option value="rombongan_belajar">
                  Rombongan Belajar
                </option>
              </select>

              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Ngrok URL -->
          <div>
            <label
              class="mb-2 block text-sm font-semibold text-slate-700"
            >
              Ngrok URL
            </label>

            <div class="relative">
              <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400"
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
                    d="M13.5 6.5l-3 3M10.5 17.5l3-3M7.5 14.5l-3 3a3 3 0 104.24 4.24l3-3M16.5 9.5l3-3a3 3 0 10-4.24-4.24l-3 3"
                  />
                </svg>
              </div>

              <input
                v-model="form.ngrok_url"
                type="text"
                placeholder="https://xxxx.ngrok-free.dev"
                :disabled="syncing"
                class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
              />
            </div>

            <p class="mt-2 text-xs text-slate-400">
              URL yang mengarah ke Web Service lokal Dapodik.
            </p>
          </div>

          <!-- Token -->
          <div>
            <label
              class="mb-2 block text-sm font-semibold text-slate-700"
            >
              Token Dapodik
            </label>

            <div class="relative">
              <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <circle
                    cx="8"
                    cy="15"
                    r="3"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 12.5L19 4m0 0v4m0-4h-4"
                  />
                </svg>
              </div>

              <input
                v-model="form.token"
                type="password"
                placeholder="Masukkan token Dapodik"
                :disabled="syncing"
                class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
              />
            </div>
          </div>

          <!-- Error -->
          <div
            v-if="errorMessage"
            class="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
          >
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600"
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
                  d="M12 9v3m0 4h.01M10.29 3.86l-7.5 13A2 2 0 004.53 20h14.94a2 2 0 001.74-3.14l-7.5-13a2 2 0 00-3.42 0z"
                />
              </svg>
            </div>

            <div>
              <p class="text-sm font-semibold text-red-800">
                Sinkronisasi gagal dimulai
              </p>

              <p class="mt-1 text-sm leading-5 text-red-700">
                {{ errorMessage }}
              </p>
            </div>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="syncing"
            class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg
              v-if="syncing"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 animate-spin"
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

            <svg
              v-else
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
                d="M4 12a8 8 0 0114.9-4M20 12a8 8 0 01-14.9 4"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 4v4h-4M5 20v-4h4"
              />
            </svg>

            {{ syncing ? 'Sinkronisasi Berjalan...' : 'Mulai Sinkronisasi' }}
          </button>
        </form>
      </section>

      <!-- Information -->
      <aside
        class="h-fit overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div
          class="border-b border-slate-100 bg-slate-50/70 px-5 py-4"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600"
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <div>
              <h2 class="text-base font-semibold text-slate-900">
                Tentang Sinkronisasi
              </h2>

              <p class="mt-0.5 text-xs text-slate-500">
                Informasi proses sinkronisasi.
              </p>
            </div>
          </div>
        </div>

        <div class="space-y-5 p-5">
          <!-- Step 1 -->
          <div class="flex items-start gap-3">
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600"
            >
              1
            </div>

            <div>
              <p class="text-sm font-semibold text-slate-800">
                Masukkan konfigurasi
              </p>

              <p class="mt-1 text-xs leading-5 text-slate-500">
                Isi NPSN, tipe data, URL Ngrok, dan token Dapodik.
              </p>
            </div>
          </div>

          <div class="h-px bg-slate-100"></div>

          <!-- Step 2 -->
          <div class="flex items-start gap-3">
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600"
            >
              2
            </div>

            <div>
              <p class="text-sm font-semibold text-slate-800">
                Mulai sinkronisasi
              </p>

              <p class="mt-1 text-xs leading-5 text-slate-500">
                Sistem akan menjalankan proses sinkronisasi di backend.
              </p>
            </div>
          </div>

          <div class="h-px bg-slate-100"></div>

          <!-- Step 3 -->
          <div class="flex items-start gap-3">
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600"
            >
              3
            </div>

            <div>
              <p class="text-sm font-semibold text-slate-800">
                Pantau status
              </p>

              <p class="mt-1 text-xs leading-5 text-slate-500">
                Status akan diperbarui otomatis selama proses berlangsung.
              </p>
            </div>
          </div>

          <!-- Warning -->
          <div
            class="rounded-xl border border-amber-200 bg-amber-50 p-3.5"
          >
            <div class="flex items-start gap-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3m0 4h.01M10.29 3.86l-7.5 13A2 2 0 004.53 20h14.94a2 2 0 001.74-3.14l-7.5-13a2 2 0 00-3.42 0z"
                />
              </svg>

              <p class="text-xs leading-5 text-amber-800">
                Pastikan Web Service lokal Dapodik dan URL Ngrok sedang aktif
                sebelum memulai sinkronisasi.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <!-- Progress / Result -->
    <section
      v-if="syncData"
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <!-- Result Header -->
      <div
        class="border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6"
      >
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-3">
            <div
              class="flex h-9 w-9 items-center justify-center rounded-lg"
              :class="
                syncData.status === 'berhasil'
                  ? 'bg-emerald-100 text-emerald-600'
                  : syncData.status === 'gagal'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-indigo-100 text-indigo-600'
              "
            >
              <svg
                v-if="syncData.status === 'berhasil'"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>

              <svg
                v-else-if="syncData.status === 'gagal'"
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
                  d="M12 9v3m0 4h.01M10.29 3.86l-7.5 13A2 2 0 004.53 20h14.94a2 2 0 001.74-3.14l-7.5-13a2 2 0 00-3.42 0z"
                />
              </svg>

              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            </div>

            <div>
              <h2 class="text-base font-semibold text-slate-900">
                Status Sinkronisasi
              </h2>

              <p class="mt-0.5 text-xs text-slate-500">
                Hasil dan progres proses sinkronisasi.
              </p>
            </div>
          </div>

          <!-- Status Badge -->
          <span
            class="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
            :class="
              syncData.status === 'berhasil'
                ? 'bg-emerald-50 text-emerald-700'
                : syncData.status === 'gagal'
                  ? 'bg-red-50 text-red-700'
                  : 'bg-indigo-50 text-indigo-700'
            "
          >
            <span
              class="h-1.5 w-1.5 rounded-full"
              :class="
                syncData.status === 'berhasil'
                  ? 'bg-emerald-500'
                  : syncData.status === 'gagal'
                    ? 'bg-red-500'
                    : 'animate-pulse bg-indigo-500'
              "
            ></span>

            {{ syncData.status }}
          </span>
        </div>
      </div>

      <div class="p-5 sm:p-6">
        <!-- Progress -->
        <div v-if="syncing">
          <div class="flex items-center justify-between text-sm">
            <span class="font-medium text-slate-700">
              Sinkronisasi sedang berjalan
            </span>

            <span class="text-xs text-slate-400">
              Memproses...
            </span>
          </div>

          <div
            class="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-100"
          >
            <div
              class="h-full w-1/2 animate-pulse rounded-full bg-indigo-600"
            ></div>
          </div>

          <p class="mt-3 text-xs leading-5 text-slate-400">
            Jangan menutup halaman sampai proses sinkronisasi selesai.
          </p>
        </div>

        <!-- Success -->
        <div v-if="syncData.status === 'berhasil'">
          <div
            class="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <div>
                <p class="text-sm font-semibold text-emerald-800">
                  Sinkronisasi berhasil
                </p>

                <p class="mt-0.5 text-xs text-emerald-700">
                  Data Dapodik berhasil diproses.
                </p>
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <!-- Total -->
            <div
              class="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <p class="text-xs font-medium text-slate-500">
                Total Data
              </p>

              <p class="mt-1 text-2xl font-bold text-slate-900">
                {{ syncData.total_data }}
              </p>
            </div>

            <!-- New -->
            <div
              class="rounded-xl border border-emerald-100 bg-emerald-50 p-4"
            >
              <p class="text-xs font-medium text-emerald-700">
                Data Baru
              </p>

              <p class="mt-1 text-2xl font-bold text-emerald-600">
                {{ syncData.data_baru }}
              </p>
            </div>

            <!-- Updated -->
            <div
              class="rounded-xl border border-indigo-100 bg-indigo-50 p-4"
            >
              <p class="text-xs font-medium text-indigo-700">
                Diperbarui
              </p>

              <p class="mt-1 text-2xl font-bold text-indigo-600">
                {{ syncData.data_diperbarui }}
              </p>
            </div>

            <!-- Failed -->
            <div
              class="rounded-xl border border-red-100 bg-red-50 p-4"
            >
              <p class="text-xs font-medium text-red-700">
                Gagal
              </p>

              <p class="mt-1 text-2xl font-bold text-red-600">
                {{ syncData.data_gagal }}
              </p>
            </div>
          </div>
        </div>

        <!-- Error -->
        <div
          v-if="syncData.status === 'gagal'"
          class="rounded-xl border border-red-200 bg-red-50 p-4"
        >
          <div class="flex items-start gap-3">
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600"
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
                  d="M12 9v3m0 4h.01M10.29 3.86l-7.5 13A2 2 0 004.53 20h14.94a2 2 0 001.74-3.14l-7.5-13a2 2 0 00-3.42 0z"
                />
              </svg>
            </div>

            <div>
              <p class="text-sm font-semibold text-red-800">
                Sinkronisasi gagal
              </p>

              <p
                v-if="syncData.log_error"
                class="mt-1 text-sm leading-6 text-red-700"
              >
                {{ syncData.log_error }}
              </p>

              <p
                v-else
                class="mt-1 text-sm text-red-700"
              >
                Terjadi kesalahan saat proses sinkronisasi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import api from '../services/api'

const form = ref({
  npsn: '',
  tipe: 'all',
  ngrok_url: '',
  token: '',
})

const syncing = ref(false)
const errorMessage = ref('')
const syncData = ref(null)

let pollingTimer = null

const startSync = async () => {
  errorMessage.value = ''

  if (!form.value.npsn) {
    errorMessage.value = 'NPSN wajib diisi.'
    return
  }

  if (!form.value.ngrok_url) {
    errorMessage.value = 'Ngrok URL wajib diisi.'
    return
  }

  if (!form.value.token) {
    errorMessage.value = 'Token Dapodik wajib diisi.'
    return
  }

  syncing.value = true
  syncData.value = null

  try {
    const response = await api.post('/api/sync/dapodik', {
      npsn: form.value.npsn,
      ngrok_url: form.value.ngrok_url,
      token: form.value.token,
      tipe: form.value.tipe,
    })

    syncData.value = response.data.rows

    startPolling(syncData.value.sync_id)
  } catch (error) {
    console.error('Gagal memulai sync:', error)

    errorMessage.value =
      error.response?.data?.message ||
      error.response?.data?.error ||
      'Gagal memulai sinkronisasi Dapodik.'

    syncing.value = false
  }
}

const startPolling = (syncId) => {
  stopPolling()

  pollingTimer = setInterval(() => {
    checkStatus(syncId)
  }, 3000)
}

const checkStatus = async (syncId) => {
  try {
    const response = await api.get(
      `/api/sync/dapodik/status/${syncId}`
    )

    syncData.value = response.data.rows

    if (
      syncData.value.status === 'berhasil' ||
      syncData.value.status === 'gagal'
    ) {
      syncing.value = false
      stopPolling()
    }
  } catch (error) {
    console.error('Gagal mengambil status sync:', error)
  }
}

const stopPolling = () => {
  if (pollingTimer) {
    clearInterval(pollingTimer)
    pollingTimer = null
  }
}

onBeforeUnmount(() => {
  stopPolling()
})
</script>