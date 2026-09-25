<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">
        Sinkronisasi Dapodik
      </h1>

      <p class="text-sm text-gray-500 mt-1">
        Sinkronkan data siswa dari Dapodik.
      </p>
    </div>

    <!-- Form -->
    <div class="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
      <form @submit.prevent="startSync" class="space-y-5">

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            NPSN
          </label>

          <input
            v-model="form.npsn"
            type="text"
            placeholder="Contoh: 20208854"
            :disabled="syncing"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Tipe Sinkronisasi
          </label>

          <select
            v-model="form.tipe"
            :disabled="syncing"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="peserta_didik">
              Peserta Didik
            </option>

            <option value="all">
              Semua Data
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Ngrok URL
          </label>

          <input
            v-model="form.ngrok_url"
            type="text"
            placeholder="https://xxxx.ngrok.io"
            :disabled="syncing"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <p
          v-if="errorMessage"
          class="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm"
        >
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          :disabled="syncing"
          class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ syncing ? 'Sinkronisasi Berjalan...' : 'Mulai Sinkronisasi' }}
        </button>
      </form>
    </div>

    <!-- Progress -->
    <div
      v-if="syncData"
      class="bg-white rounded-xl shadow-sm p-6 max-w-2xl mt-6"
    >
      <h2 class="text-lg font-semibold text-gray-900">
        Status Sinkronisasi
      </h2>

      <div class="mt-4">
        <div class="flex justify-between text-sm mb-2">
          <span>Status</span>

          <span class="font-medium">
            {{ syncData.status }}
          </span>
        </div>

        <div
          v-if="syncing"
          class="w-full bg-gray-200 rounded-full h-3 overflow-hidden"
        >
          <div
            class="bg-blue-600 h-3 rounded-full animate-pulse w-full"
          ></div>
        </div>
      </div>

      <!-- Hasil -->
      <div
        v-if="syncData.status === 'berhasil'"
        class="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-xs text-gray-500">
            Total
          </p>

          <p class="text-xl font-bold mt-1">
            {{ syncData.total_data }}
          </p>
        </div>

        <div class="bg-green-50 rounded-lg p-4">
          <p class="text-xs text-gray-500">
            Data Baru
          </p>

          <p class="text-xl font-bold text-green-600 mt-1">
            {{ syncData.data_baru }}
          </p>
        </div>

        <div class="bg-blue-50 rounded-lg p-4">
          <p class="text-xs text-gray-500">
            Diperbarui
          </p>

          <p class="text-xl font-bold text-blue-600 mt-1">
            {{ syncData.data_diperbarui }}
          </p>
        </div>

        <div class="bg-red-50 rounded-lg p-4">
          <p class="text-xs text-gray-500">
            Gagal
          </p>

          <p class="text-xl font-bold text-red-600 mt-1">
            {{ syncData.data_gagal }}
          </p>
        </div>
      </div>

      <!-- Error sync -->
      <div
        v-if="syncData.status === 'gagal'"
        class="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-600"
      >
        Sinkronisasi gagal.

        <div
          v-if="syncData.log_error"
          class="mt-2"
        >
          {{ syncData.log_error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import api from '../services/api'

const form = ref({
  npsn: '',
  tipe: 'peserta_didik',
  ngrok_url: '',
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

  syncing.value = true
  syncData.value = null

  try {
    const response = await api.post('/api/sync/dapodik', {
      npsn: form.value.npsn,
      tipe: form.value.tipe,
      ngrok_url: form.value.ngrok_url,
    })

    syncData.value = response.data.rows

    startPolling(syncData.value.sync_id)
  } catch (error) {
    console.error('Gagal memulai sync:', error)

    errorMessage.value =
      error.response?.data?.message ||
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