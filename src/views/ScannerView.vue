<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">
        Scanner QR
      </h1>

      <p class="text-sm text-gray-500 mt-1">
        Scan QR Code kartu siswa untuk mencatat kehadiran.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- Scanner -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">
          Scan QR Siswa
        </h2>

        <div
          id="qr-reader"
          class="w-full"
        ></div>

        <p
          v-if="scannerError"
          class="mt-4 text-sm text-red-600"
        >
          {{ scannerError }}
        </p>

        <button
          v-if="!scannerRunning"
          @click="startScanner"
          class="mt-4 w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
        >
          Mulai Scanner
        </button>

        <button
          v-else
          @click="stopScanner"
          class="mt-4 w-full px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
        >
          Stop Scanner
        </button>
      </div>

      <!-- Result -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">
          Hasil Absensi
        </h2>

        <div
          v-if="attendanceLoading"
          class="py-10 text-center text-sm text-gray-500"
        >
          Mencatat absensi...
        </div>

        <div
          v-else-if="attendanceError"
          class="p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <p class="font-medium text-red-700">
            Absensi gagal
          </p>

          <p class="text-sm text-red-600 mt-1">
            {{ attendanceError }}
          </p>
        </div>

        <div
          v-else-if="attendanceResult"
          class="p-5 bg-green-50 border border-green-200 rounded-lg"
        >
          <p class="text-lg font-semibold text-green-700">
            Absensi berhasil
          </p>

          <div class="mt-4 space-y-2 text-sm">
            <p>
              <span class="text-gray-500">Nama:</span>
              <span class="font-medium ml-2">
                {{ attendanceResult.nama }}
              </span>
            </p>

            <p>
              <span class="text-gray-500">Kelas:</span>
              <span class="font-medium ml-2">
                {{ attendanceResult.nama_rombel }}
              </span>
            </p>

            <p>
              <span class="text-gray-500">Waktu:</span>
              <span class="font-medium ml-2">
                {{ attendanceResult.waktu_absen }}
              </span>
            </p>

            <p>
              <span class="text-gray-500">Status:</span>
              <span class="font-medium ml-2">
                {{ attendanceResult.status }}
              </span>
            </p>
          </div>
        </div>

        <div
          v-else
          class="py-10 text-center text-sm text-gray-500"
        >
          Belum ada QR yang discan.
        </div>
      </div>

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