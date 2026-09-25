<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">
        Riwayat Absensi
      </h1>

      <p class="text-sm text-gray-500 mt-1">
        Lihat dan filter riwayat kehadiran siswa.
      </p>
    </div>

    <!-- Filter -->
    <div class="bg-white rounded-xl shadow-sm p-5 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Dari tanggal
          </label>

          <input
            v-model="filters.tanggal_mulai"
            type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Sampai tanggal
          </label>

          <input
            v-model="filters.tanggal_selesai"
            type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Kelas
          </label>

          <input
            v-model="filters.kelas"
            type="text"
            placeholder="Contoh: KELAS 5A"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>

          <select
            v-model="filters.status"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="">Semua</option>
            <option value="Hadir">Hadir</option>
            <option value="Terlambat">Terlambat</option>
            <option value="Izin">Izin</option>
            <option value="Sakit">Sakit</option>
            <option value="Tidak Hadir">Tidak Hadir</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Cari siswa
          </label>

          <input
            v-model="filters.search"
            @keyup.enter="applyFilters"
            type="text"
            placeholder="Nama / NISN"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

      </div>

      <div class="mt-4 flex gap-2">
        <button
          @click="applyFilters"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          Terapkan
        </button>

        <button
          @click="resetFilters"
          class="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </div>

    <!-- Summary -->
    <div
      v-if="summary"
      class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6"
    >
      <div class="bg-white rounded-xl shadow-sm p-4">
        <p class="text-sm text-gray-500">Total</p>
        <p class="text-2xl font-bold mt-1">{{ summary.total_siswa }}</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-4">
        <p class="text-sm text-gray-500">Hadir</p>
        <p class="text-2xl font-bold mt-1">{{ summary.hadir }}</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-4">
        <p class="text-sm text-gray-500">Terlambat</p>
        <p class="text-2xl font-bold mt-1">{{ summary.terlambat }}</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-4">
        <p class="text-sm text-gray-500">Izin / Sakit</p>
        <p class="text-2xl font-bold mt-1">
          {{ summary.izin + summary.sakit }}
        </p>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-4">
        <p class="text-sm text-gray-500">Tidak Hadir</p>
        <p class="text-2xl font-bold mt-1">
          {{ summary.tidak_hadir }}
        </p>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">

      <div
        v-if="loading"
        class="p-10 text-center text-sm text-gray-500"
      >
        Memuat riwayat absensi...
      </div>

      <div
        v-else-if="errorMessage"
        class="p-10 text-center text-sm text-red-600"
      >
        {{ errorMessage }}
      </div>

      <div
        v-else-if="rows.length === 0"
        class="p-10 text-center text-sm text-gray-500"
      >
        Tidak ada data absensi.
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm">

          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="text-left px-5 py-3 font-medium text-gray-600">
                Nama
              </th>

              <th class="text-left px-5 py-3 font-medium text-gray-600">
                NISN
              </th>

              <th class="text-left px-5 py-3 font-medium text-gray-600">
                Kelas
              </th>

              <th class="text-left px-5 py-3 font-medium text-gray-600">
                Tanggal
              </th>

              <th class="text-left px-5 py-3 font-medium text-gray-600">
                Waktu
              </th>

              <th class="text-left px-5 py-3 font-medium text-gray-600">
                Status
              </th>

              <th class="text-left px-5 py-3 font-medium text-gray-600">
                Metode
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="row in rows"
              :key="row.absensi_id"
              class="border-b last:border-b-0 hover:bg-gray-50"
            >
              <td class="px-5 py-3">
                {{ row.nama }}
              </td>

              <td class="px-5 py-3">
                {{ row.nisn }}
              </td>

              <td class="px-5 py-3">
                {{ row.nama_rombel }}
              </td>

              <td class="px-5 py-3">
                {{ row.tanggal }}
              </td>

              <td class="px-5 py-3">
                {{ row.waktu_absen }}
              </td>

              <td class="px-5 py-3">
                <span
                  class="px-2 py-1 rounded-md text-xs font-medium"
                  :class="statusClass(row.status)"
                >
                  {{ row.status }}
                </span>
              </td>

              <td class="px-5 py-3">
                {{ row.metode }}
              </td>
            </tr>
          </tbody>

        </table>
      </div>

      <!-- Pagination -->
      <div
        v-if="!loading && !errorMessage && rows.length > 0"
        class="flex items-center justify-between px-5 py-4 border-t"
      >
        <p class="text-sm text-gray-500">
          Halaman {{ currentPage }} dari {{ totalPages }}
        </p>

        <div class="flex gap-2">
          <button
            @click="previousPage"
            :disabled="currentPage === 1"
            class="px-3 py-2 border rounded-lg text-sm disabled:opacity-40"
          >
            Sebelumnya
          </button>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 border rounded-lg text-sm disabled:opacity-40"
          >
            Berikutnya
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const rows = ref([])
const summary = ref(null)

const loading = ref(false)
const errorMessage = ref('')

const currentPage = ref(1)
const totalPages = ref(1)

const filters = ref({
  tanggal_mulai: '',
  tanggal_selesai: '',
  kelas: '',
  status: '',
  search: '',
})

const fetchAttendance = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const params = {
      page: currentPage.value,
      limit: 50,
    }

    if (filters.value.tanggal_mulai) {
      params.tanggal_mulai = filters.value.tanggal_mulai
    }

    if (filters.value.tanggal_selesai) {
      params.tanggal_selesai = filters.value.tanggal_selesai
    }

    if (filters.value.kelas) {
      params.kelas = filters.value.kelas
    }

    if (filters.value.status) {
      params.status = filters.value.status
    }

    if (filters.value.search.trim().length >= 3) {
      params.search = filters.value.search.trim()
    }

    const response = await api.get('/api/absensi', {
      params,
    })

    rows.value = response.data.rows
    summary.value = response.data.ringkasan

    totalPages.value =
      Math.ceil(response.data.results / response.data.pagination?.limit || 50)
  } catch (error) {
    console.error('Gagal mengambil riwayat absensi:', error)

    errorMessage.value = 'Gagal mengambil riwayat absensi.'
  } finally {
    loading.value = false
  }
}

const applyFilters = async () => {
  currentPage.value = 1
  await fetchAttendance()
}

const resetFilters = async () => {
  filters.value = {
    tanggal_mulai: '',
    tanggal_selesai: '',
    kelas: '',
    status: '',
    search: '',
  }

  currentPage.value = 1

  await fetchAttendance()
}

const previousPage = async () => {
  if (currentPage.value <= 1) {
    return
  }

  currentPage.value--

  await fetchAttendance()
}

const nextPage = async () => {
  if (currentPage.value >= totalPages.value) {
    return
  }

  currentPage.value++

  await fetchAttendance()
}

const statusClass = (status) => {
  if (status === 'Hadir') {
    return 'bg-green-100 text-green-700'
  }

  if (status === 'Terlambat') {
    return 'bg-yellow-100 text-yellow-700'
  }

  if (status === 'Izin') {
    return 'bg-blue-100 text-blue-700'
  }

  if (status === 'Sakit') {
    return 'bg-purple-100 text-purple-700'
  }

  return 'bg-red-100 text-red-700'
}

onMounted(() => {
  fetchAttendance()
})
</script>