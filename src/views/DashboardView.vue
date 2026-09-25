<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">
        Dashboard
      </h1>

      <p class="text-sm text-gray-500 mt-1">
        Ringkasan kehadiran siswa.
      </p>
    </div>

    <!-- Loading -->
    <div
      v-if="loading"
      class="bg-white rounded-xl shadow-sm p-8 text-center text-sm text-gray-500"
    >
      Memuat dashboard...
    </div>

    <!-- Error -->
    <div
      v-else-if="errorMessage"
      class="bg-red-50 border border-red-200 rounded-xl p-6 text-sm text-red-600"
    >
      {{ errorMessage }}

      <button
        @click="fetchDashboard"
        class="block mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
      >
        Coba Lagi
      </button>
    </div>

    <!-- Dashboard -->
    <div v-else>

      <!-- Statistics -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div class="bg-white rounded-xl shadow-sm p-5">
          <p class="text-sm text-gray-500">
            Total Siswa
          </p>

          <p class="text-3xl font-bold text-gray-900 mt-2">
            {{ dashboard.total_siswa }}
          </p>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-5">
          <p class="text-sm text-gray-500">
            Hadir
          </p>

          <p class="text-3xl font-bold text-green-600 mt-2">
            {{ dashboard.hadir }}
          </p>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-5">
          <p class="text-sm text-gray-500">
            Terlambat
          </p>

          <p class="text-3xl font-bold text-yellow-600 mt-2">
            {{ dashboard.terlambat }}
          </p>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-5">
          <p class="text-sm text-gray-500">
            Tidak Hadir
          </p>

          <p class="text-3xl font-bold text-red-600 mt-2">
            {{ dashboard.tidak_hadir }}
          </p>
        </div>

      </div>

      <!-- Secondary Statistics -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">

        <div class="bg-white rounded-xl shadow-sm p-5">
          <p class="text-sm text-gray-500">
            Izin
          </p>

          <p class="text-2xl font-bold text-blue-600 mt-2">
            {{ dashboard.izin }}
          </p>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-5">
          <p class="text-sm text-gray-500">
            Sakit
          </p>

          <p class="text-2xl font-bold text-purple-600 mt-2">
            {{ dashboard.sakit }}
          </p>
        </div>

        <!-- Persentase Kehadiran -->
        <div class="bg-white rounded-xl shadow-sm p-5">
          <p class="text-sm text-gray-500">
            Persentase Kehadiran
          </p>

          <div class="flex items-end gap-2 mt-2">
            <p class="text-2xl font-bold text-blue-600">
              {{ dashboard.persentase_hadir }}%
            </p>

            <p class="text-sm text-gray-500 mb-1">
              hari ini
            </p>
          </div>
        </div>

      </div>

      <!-- Tren 7 Hari -->
      <div class="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h2 class="text-lg font-semibold text-gray-900">
          Tren Absensi 7 Hari
        </h2>

        <p class="text-sm text-gray-500 mt-1 mb-5">
          Data kehadiran 7 hari terakhir.
        </p>

        <div
          v-if="trendLoading"
          class="py-8 text-center text-sm text-gray-500"
        >
          Memuat tren absensi...
        </div>

        <div
          v-else-if="trendError"
          class="py-8 text-center text-sm text-red-600"
        >
          {{ trendError }}
        </div>

        <div
          v-else-if="trend.length === 0"
          class="py-8 text-center text-sm text-gray-500"
        >
          Belum ada data tren.
        </div>

        <div
          v-else
          class="overflow-x-auto"
        >
          <table class="w-full text-sm">
            <thead class="bg-gray-50 border-b">
              <tr>
                <th class="text-left px-4 py-3">
                  Data
                </th>

                <th class="text-left px-4 py-3">
                  Nilai
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(item, index) in trend"
                :key="index"
                class="border-b last:border-b-0"
              >
                <td class="px-4 py-3">
                  {{ JSON.stringify(item) }}
                </td>

                <td class="px-4 py-3">
                  -
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const loading = ref(true)
const errorMessage = ref('')

const dashboard = ref({
  total_siswa: 0,
  hadir: 0,
  terlambat: 0,
  izin: 0,
  sakit: 0,
  tidak_hadir: 0,
  persentase_hadir: 0,
})

const trend = ref([])
const trendLoading = ref(false)
const trendError = ref('')

const fetchDashboard = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await api.get('/api/dashboard/ringkasan')

    dashboard.value = response.data.rows
  } catch (error) {
    console.error('Gagal mengambil dashboard:', error)

    errorMessage.value = 'Gagal mengambil data dashboard.'
  } finally {
    loading.value = false
  }
}

const fetchTrend = async () => {
  trendLoading.value = true
  trendError.value = ''

  try {
    const response = await api.get('/api/dashboard/tren')

    trend.value = Array.isArray(response.data.rows)
      ? response.data.rows
      : []
  } catch (error) {
    console.error('Gagal mengambil tren absensi:', error)

    trendError.value = 'Gagal mengambil data tren absensi.'
  } finally {
    trendLoading.value = false
  }
}

onMounted(() => {
  fetchDashboard()
  fetchTrend()
})
</script>