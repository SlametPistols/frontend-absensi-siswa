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
              d="M3.5 8V6A2.5 2.5 0 016 3.5h2M16 3.5h2A2.5 2.5 0 0120.5 6v2M20.5 16v2a2.5 2.5 0 01-2.5 2.5h-2M8 20.5H6A2.5 2.5 0 013.5 18v-2"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 8h8v8H8z"
            />
          </svg>
        </div>

        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900">
            Scanner QR
          </h1>

          <p class="mt-1 text-sm text-slate-500">
            Scan QR Code kartu siswa untuk mencatat kehadiran.
          </p>
        </div>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Scanner Card -->
      <section
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <!-- Card Header -->
        <div
          class="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6"
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
                  d="M3.5 8V6A2.5 2.5 0 016 3.5h2M16 3.5h2A2.5 2.5 0 0120.5 6v2M20.5 16v2a2.5 2.5 0 01-2.5 2.5h-2M8 20.5H6A2.5 2.5 0 013.5 18v-2"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8 8h8v8H8z"
                />
              </svg>
            </div>

            <div>
              <h2 class="text-base font-semibold text-slate-900">
                Scan QR Siswa
              </h2>

              <p class="mt-0.5 text-xs text-slate-500">
                Gunakan kamera perangkat untuk scan.
              </p>
            </div>
          </div>

          <!-- Status -->
          <span
            v-if="scannerRunning"
            class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"
          >
            <span
              class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"
            ></span>
            Aktif
          </span>

          <span
            v-else
            class="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
            Tidak aktif
          </span>
        </div>

        <!-- Scanner -->
        <div class="p-5 sm:p-6">
          <div
            class="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950"
          >
            <div
              id="qr-reader"
              class="min-h-[320px] w-full"
            ></div>
          </div>

          <!-- Helper -->
          <div
            v-if="!scannerRunning && !scannerError"
            class="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4"
          >
            <div class="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mt-0.5 h-5 w-5 shrink-0 text-indigo-600"
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

              <div>
                <p class="text-sm font-medium text-indigo-800">
                  Siap untuk scan
                </p>

                <p class="mt-1 text-xs leading-5 text-indigo-700/80">
                  Pastikan QR Code berada di dalam area kamera dan terlihat
                  dengan jelas.
                </p>
              </div>
            </div>
          </div>

          <!-- Error -->
          <div
            v-if="scannerError"
            class="mt-4 rounded-xl border border-red-200 bg-red-50 p-4"
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
                  Scanner tidak dapat digunakan
                </p>

                <p class="mt-1 text-sm leading-5 text-red-700">
                  {{ scannerError }}
                </p>
              </div>
            </div>
          </div>

          <!-- Action -->
          <button
            v-if="!scannerRunning"
            @click="startScanner"
            class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.99]"
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
                d="M3.5 8V6A2.5 2.5 0 016 3.5h2M16 3.5h2A2.5 2.5 0 0120.5 6v2M20.5 16v2a2.5 2.5 0 01-2.5 2.5h-2M8 20.5H6A2.5 2.5 0 013.5 18v-2"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 8h8v8H8z"
              />
            </svg>

            Mulai Scanner
          </button>

          <button
            v-else
            @click="stopScanner"
            class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 active:scale-[0.99]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <rect
                x="6"
                y="6"
                width="12"
                height="12"
                rx="2"
              />
            </svg>

            Stop Scanner
          </button>
        </div>
      </section>

      <!-- Result Card -->
      <section
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <!-- Card Header -->
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
                  d="M9 12l2 2 4-4"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <div>
              <h2 class="text-base font-semibold text-slate-900">
                Hasil Absensi
              </h2>

              <p class="mt-0.5 text-xs text-slate-500">
                Informasi absensi siswa terakhir.
              </p>
            </div>
          </div>
        </div>

        <div class="p-5 sm:p-6">
          <!-- Loading -->
          <div
            v-if="attendanceLoading"
            class="flex min-h-[320px] flex-col items-center justify-center text-center"
          >
            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 animate-spin text-indigo-600"
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
            </div>

            <p class="mt-4 text-sm font-semibold text-slate-700">
              Mencatat absensi...
            </p>

            <p class="mt-1 text-xs text-slate-400">
              Sedang memproses hasil scan.
            </p>
          </div>

          <!-- Error -->
          <div
            v-else-if="attendanceError"
            class="flex min-h-[320px] flex-col items-center justify-center text-center"
          >
            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7"
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

            <p class="mt-4 text-base font-semibold text-red-700">
              Absensi gagal
            </p>

            <p class="mt-1 max-w-sm text-sm leading-6 text-red-600">
              {{ attendanceError }}
            </p>
          </div>

          <!-- Success -->
          <div
            v-else-if="attendanceResult"
            class="min-h-[320px]"
          >
            <div
              class="rounded-2xl border border-emerald-200 bg-emerald-50 p-5"
            >
              <div class="flex items-start gap-4">
                <div
                  class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
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
                  <p class="text-base font-semibold text-emerald-800">
                    Absensi berhasil
                  </p>

                  <p class="mt-1 text-sm text-emerald-700">
                    Kehadiran siswa berhasil dicatat.
                  </p>
                </div>
              </div>
            </div>

            <!-- Student Info -->
            <div
              class="mt-5 divide-y divide-slate-100 rounded-2xl border border-slate-200"
            >
              <div
                class="flex items-center justify-between gap-4 px-4 py-4"
              >
                <span class="text-sm text-slate-500">
                  Nama
                </span>

                <span
                  class="text-right text-sm font-semibold text-slate-800"
                >
                  {{ attendanceResult.nama || '-' }}
                </span>
              </div>

              <div
                class="flex items-center justify-between gap-4 px-4 py-4"
              >
                <span class="text-sm text-slate-500">
                  Kelas
                </span>

                <span
                  class="text-right text-sm font-semibold text-slate-800"
                >
                  {{ attendanceResult.nama_rombel || '-' }}
                </span>
              </div>

              <div
                class="flex items-center justify-between gap-4 px-4 py-4"
              >
                <span class="text-sm text-slate-500">
                  Waktu
                </span>

                <span
                  class="text-right text-sm font-semibold text-slate-800"
                >
                  {{ formatTime(attendanceResult.waktu_absen) }}
                </span>
              </div>

              <div
                class="flex items-center justify-between gap-4 px-4 py-4"
              >
                <span class="text-sm text-slate-500">
                  Status
                </span>

                <span
                  class="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
                >
                  {{ attendanceResult.status || '-' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Empty -->
          <div
            v-else
            class="flex min-h-[320px] flex-col items-center justify-center text-center"
          >
            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <p class="mt-4 text-sm font-semibold text-slate-700">
              Belum ada hasil absensi
            </p>

            <p class="mt-1 max-w-xs text-xs leading-5 text-slate-400">
              Mulai scanner kemudian arahkan kamera ke QR Code kartu siswa.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { Html5Qrcode } from 'html5-qrcode'
import api from '../services/api'

const scanner = ref(null)
const scannerRunning = ref(false)

const scannerError = ref('')

const attendanceLoading = ref(false)
const attendanceError = ref('')
const attendanceResult = ref(null)

let processingScan = false

const formatTime = (value) => {
  if (!value) return '-'

  return new Date(value).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

const startScanner = async () => {
  scannerError.value = ''

  try {
    if (!scanner.value) {
      scanner.value = new Html5Qrcode('qr-reader')
    }

    await scanner.value.start(
      { facingMode: 'environment' },
      {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
      },
      handleScan,
      () => {}
    )

    scannerRunning.value = true
  } catch (error) {
    console.error('Gagal menjalankan scanner:', error)

    scannerError.value =
      'Kamera tidak dapat digunakan. Pastikan browser memiliki izin kamera.'
  }
}

const stopScanner = async () => {
  if (!scanner.value || !scannerRunning.value) {
    return
  }

  try {
    await scanner.value.stop()
  } catch (error) {
    console.error('Gagal menghentikan scanner:', error)
  }

  scannerRunning.value = false
}

const handleScan = async (decodedText) => {
  if (processingScan) {
    return
  }

  processingScan = true

  await stopScanner()

  await submitAttendance(decodedText)

  processingScan = false
}

const submitAttendance = async (kode) => {
  attendanceLoading.value = true
  attendanceError.value = ''
  attendanceResult.value = null

  try {
    const response = await api.post('/api/absensi/scan', {
      kode,
    })

    attendanceResult.value = response.data.rows
  } catch (error) {
    console.error('Gagal mencatat absensi:', error)

    const errorCode = error.response?.data?.error_code

    if (errorCode === 'ALREADY_ABSENT') {
      attendanceError.value =
        error.response?.data?.message || 'Siswa sudah absen hari ini.'
    } else if (errorCode === 'STUDENT_NOT_FOUND') {
      attendanceError.value = 'Siswa tidak ditemukan.'
    } else if (errorCode === 'INVALID_QR_CODE') {
      attendanceError.value = 'QR Code tidak valid.'
    } else if (errorCode === 'SESSION_CLOSED') {
      attendanceError.value = 'Sesi absensi sudah ditutup.'
    } else if (errorCode === 'OUTSIDE_SCHEDULE') {
      attendanceError.value = 'Saat ini di luar jadwal absensi.'
    } else {
      attendanceError.value = 'Gagal mencatat absensi.'
    }
  } finally {
    attendanceLoading.value = false
  }
}

onBeforeUnmount(async () => {
  await stopScanner()
})
</script>