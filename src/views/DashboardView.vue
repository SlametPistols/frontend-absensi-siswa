<template>
  <div class="max-w-7xl mx-auto pb-10">

    <!-- Header -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p class="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 mb-1">
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            Overview
          </p>

          <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 bg-clip-text">
            Dashboard
          </h1>

          <p class="text-sm text-slate-500 mt-2">
            Ringkasan kehadiran siswa hari ini · {{ todayLabel }}
          </p>
        </div>

        <div
          class="inline-flex items-center gap-2 self-start sm:self-auto px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-500 shadow-sm"
        >
          <span class="relative flex w-2 h-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full w-2 h-2 bg-emerald-500"></span>
          </span>
          Sistem aktif
        </div>
      </div>
    </div>

    <!-- Loading (skeleton) -->
    <div v-if="loading" class="space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div v-for="i in 4" :key="i" class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm overflow-hidden relative">
          <div class="skeleton-shimmer h-3 w-20 rounded mb-4"></div>
          <div class="skeleton-shimmer h-7 w-14 rounded mb-2"></div>
          <div class="skeleton-shimmer h-2.5 w-24 rounded"></div>
        </div>
      </div>
      <div class="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-9 h-9 rounded-full border-4 border-slate-200 border-t-indigo-500 animate-spin shrink-0"></div>
          <div>
            <p class="text-sm font-medium text-slate-700">Memuat dashboard...</p>
            <p class="text-xs text-slate-400 mt-0.5">Mengambil data terbaru.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Error -->
    <div
      v-else-if="errorMessage"
      class="bg-white border border-red-200 rounded-2xl shadow-sm p-6 relative overflow-hidden"
    >
      <div class="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-red-50/70 blur-2xl"></div>

      <div class="flex items-start gap-4 relative">
        <div
          class="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-red-50 to-red-100 text-red-600 flex items-center justify-center ring-1 ring-red-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.29 3.86l-7.4 13a2 2 0 001.74 3h14.74a2 2 0 001.74-3l-7.4-13a2 2 0 00-3.48 0z" />
          </svg>
        </div>

        <div class="flex-1">
          <h2 class="text-sm font-semibold text-slate-900">Gagal memuat dashboard</h2>
          <p class="text-sm text-slate-500 mt-1">{{ errorMessage }}</p>

          <button
            @click="fetchDashboard"
            class="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-medium shadow-sm shadow-red-500/30 hover:shadow-md hover:from-red-700 hover:to-red-600 active:scale-[0.98] transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a8 8 0 0114.9-4M20 15a8 8 0 01-14.9 4" />
            </svg>
            Coba Lagi
          </button>
        </div>
      </div>
    </div>

    <!-- Dashboard -->
    <div v-else class="animate-content-in">

      <!-- Primary Statistics -->
      <section>
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-sm font-semibold text-slate-900">Kehadiran Hari Ini</h2>
            <p class="text-xs text-slate-500 mt-1">Statistik siswa berdasarkan status absensi.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

          <!-- Total -->
          <div class="group relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:shadow-slate-200/60 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
            <span class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-400 to-indigo-600"></span>
            <div class="absolute -right-6 -bottom-8 w-24 h-24 rounded-full bg-indigo-50 group-hover:scale-110 transition-transform duration-300"></div>

            <div class="flex items-start justify-between relative">
              <div>
                <p class="text-sm font-medium text-slate-500">Total Siswa</p>
                <p class="text-3xl font-bold tracking-tight text-slate-900 mt-3">{{ dashboard.total_siswa }}</p>
                <p class="text-xs text-slate-400 mt-2">Siswa terdaftar</p>
              </div>

              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Hadir -->
          <div class="group relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:shadow-emerald-200/50 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
            <span class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></span>
            <div class="absolute -right-6 -bottom-8 w-24 h-24 rounded-full bg-emerald-50 group-hover:scale-110 transition-transform duration-300"></div>

            <div class="flex items-start justify-between relative">
              <div>
                <p class="text-sm font-medium text-slate-500">Hadir</p>
                <p class="text-3xl font-bold tracking-tight text-emerald-600 mt-3">{{ dashboard.hadir }}</p>
                <p class="text-xs text-slate-400 mt-2">Hadir hari ini</p>
              </div>

              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Terlambat -->
          <div class="group relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:shadow-amber-200/50 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
            <span class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 to-amber-500"></span>
            <div class="absolute -right-6 -bottom-8 w-24 h-24 rounded-full bg-amber-50 group-hover:scale-110 transition-transform duration-300"></div>

            <div class="flex items-start justify-between relative">
              <div>
                <p class="text-sm font-medium text-slate-500">Terlambat</p>
                <p class="text-3xl font-bold tracking-tight text-amber-500 mt-3">{{ dashboard.terlambat }}</p>
                <p class="text-xs text-slate-400 mt-2">Perlu perhatian</p>
              </div>

              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-400/30">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <path stroke-linecap="round" d="M12 7v5l3 2" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Tidak Hadir -->
          <div class="group relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:shadow-red-200/50 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
            <span class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-400 to-red-500"></span>
            <div class="absolute -right-6 -bottom-8 w-24 h-24 rounded-full bg-red-50 group-hover:scale-110 transition-transform duration-300"></div>

            <div class="flex items-start justify-between relative">
              <div>
                <p class="text-sm font-medium text-slate-500">Tidak Hadir</p>
                <p class="text-3xl font-bold tracking-tight text-red-500 mt-3">{{ dashboard.tidak_hadir }}</p>
                <p class="text-xs text-slate-400 mt-2">Belum hadir</p>
              </div>

              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-red-400 to-red-500 text-white flex items-center justify-center shadow-md shadow-red-400/30">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <path stroke-linecap="round" d="M9 9l6 6m0-6l-6 6" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- Secondary Statistics -->
      <section class="mt-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <!-- Izin -->
          <div class="group relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            <div class="absolute -right-6 -bottom-8 w-20 h-20 rounded-full bg-blue-50 group-hover:scale-110 transition-transform duration-300"></div>
            <div class="flex items-center justify-between relative">
              <div>
                <p class="text-sm font-medium text-slate-500">Izin</p>
                <p class="text-2xl font-bold text-blue-600 mt-2">{{ dashboard.izin }}</p>
              </div>
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h6l4 4v12a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Sakit -->
          <div class="group relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            <div class="absolute -right-6 -bottom-8 w-20 h-20 rounded-full bg-purple-50 group-hover:scale-110 transition-transform duration-300"></div>
            <div class="flex items-center justify-between relative">
              <div>
                <p class="text-sm font-medium text-slate-500">Sakit</p>
                <p class="text-2xl font-bold text-purple-600 mt-2">{{ dashboard.sakit }}</p>
              </div>
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12M6 12h12" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Persentase -->
          <div class="relative rounded-2xl p-5 text-white overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 shadow-lg shadow-indigo-500/30">
            <div class="absolute -right-8 -bottom-10 w-32 h-32 rounded-full bg-white/5"></div>
            <div class="absolute -right-4 -top-10 w-24 h-24 rounded-full bg-white/5"></div>
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_60%)]"></div>

            <div class="relative z-10 flex items-center justify-between gap-4">
              <div>
                <p class="text-sm font-medium text-indigo-100">Persentase Kehadiran</p>

                <div class="flex items-end gap-2 mt-2">
                  <p class="text-3xl font-bold tracking-tight">{{ dashboard.persentase_hadir }}%</p>
                  <p class="text-sm text-indigo-200 mb-1">hari ini</p>
                </div>

                <div class="mt-4">
                  <div class="h-1.5 bg-indigo-400/40 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-white rounded-full transition-all duration-700 ease-out"
                      :style="{ width: `${Math.min(dashboard.persentase_hadir, 100)}%` }"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Ring mini -->
              <svg viewBox="0 0 36 36" class="w-14 h-14 shrink-0 -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="3" />
                <circle
                  cx="18" cy="18" r="15.5" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"
                  :stroke-dasharray="`${Math.min(dashboard.persentase_hadir, 100) * 0.974} 200`"
                />
              </svg>
            </div>
          </div>

        </div>
      </section>

      <!-- Trend -->
      <section class="bg-white border border-slate-200 rounded-2xl shadow-sm mt-6 overflow-hidden">
        <div class="px-5 sm:px-6 py-5 border-b border-slate-100">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 class="text-base font-semibold text-slate-900">Tren Absensi 7 Hari</h2>
              <p class="text-sm text-slate-500 mt-1">Perbandingan kehadiran selama 7 hari terakhir.</p>
            </div>

            <div class="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              Kehadiran
            </div>
          </div>
        </div>

        <!-- Trend loading -->
        <div v-if="trendLoading" class="py-12 text-center">
          <div class="w-8 h-8 mx-auto mb-3 rounded-full border-4 border-slate-200 border-t-indigo-500 animate-spin"></div>
          <p class="text-sm text-slate-500">Memuat tren absensi...</p>
        </div>

        <!-- Trend error -->
        <div v-else-if="trendError" class="py-12 text-center px-6">
          <p class="text-sm text-red-600">{{ trendError }}</p>
        </div>

        <!-- Empty -->
        <div v-else-if="trend.length === 0" class="py-12 text-center px-6">
          <div class="w-12 h-12 mx-auto rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 19V5m0 14h16M8 16v-5m4 5V8m4 8V4" />
            </svg>
          </div>
          <p class="text-sm font-medium text-slate-700 mt-3">Belum ada data tren</p>
          <p class="text-xs text-slate-400 mt-1">Data kehadiran akan muncul setelah tersedia.</p>
        </div>

        <!-- Trend content -->
        <div v-else>
          <!-- Mini bar chart (visual tambahan dari data yang sama) -->
          <div class="px-5 sm:px-6 pt-6 pb-2">
            <div class="flex items-end gap-3 h-28">
              <div v-for="(item, index) in trend" :key="'bar-'+index" class="group/bar flex-1 flex flex-col items-center justify-end h-full">
                <div class="relative w-full flex-1 flex items-end">
                  <div
                    class="w-full max-w-[28px] mx-auto rounded-t-md bg-gradient-to-t from-indigo-500 to-violet-400 group-hover/bar:from-indigo-600 group-hover/bar:to-violet-500 transition-all duration-300"
                    :style="{ height: `${(item.hadir / maxHadir) * 100}%` }"
                  ></div>
                  <span class="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-slate-600 opacity-0 group-hover/bar:opacity-100 transition-opacity">
                    {{ item.hadir }}
                  </span>
                </div>
                <span class="text-[10px] text-slate-400 mt-2 whitespace-nowrap">{{ formatDate(item.tanggal) }}</span>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-slate-50/80 border-b border-slate-100">
                  <th class="text-left px-5 sm:px-6 py-3.5 font-semibold text-xs uppercase tracking-wide text-slate-500">Tanggal</th>
                  <th class="text-left px-5 sm:px-6 py-3.5 font-semibold text-xs uppercase tracking-wide text-slate-500">Hadir</th>
                  <th class="text-left px-5 sm:px-6 py-3.5 font-semibold text-xs uppercase tracking-wide text-slate-500">Persentase</th>
                </tr>
              </thead>

              <tbody class="divide-y divide-slate-100">
                <tr v-for="(item, index) in trend" :key="index" class="hover:bg-slate-50/70 transition-colors">
                  <td class="px-5 sm:px-6 py-4">
                    <span class="font-medium text-slate-700">{{ formatDate(item.tanggal) }}</span>
                  </td>

                  <td class="px-5 sm:px-6 py-4">
                    <span class="font-semibold text-slate-900">{{ item.hadir }}</span>
                    <span class="text-xs text-slate-400 ml-1">siswa</span>
                  </td>

                  <td class="px-5 sm:px-6 py-4">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                      {{ item.persentase }}%
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
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

const formatDate = (value) => {
  if (!value) return '-'

  return new Date(`${value}T00:00:00`).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

// --- murni untuk tampilan, tidak memengaruhi fetch/state di atas ---

// label tanggal hari ini di header
const todayLabel = new Date().toLocaleDateString('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

// skala tinggi mini bar chart tren, diturunkan dari data trend yang sudah ada
const maxHadir = computed(() => {
  if (!trend.value.length) return 1
  return Math.max(...trend.value.map((item) => item.hadir || 0), 1)
})

onMounted(() => {
  fetchDashboard()
  fetchTrend()
})
</script>

<style scoped>
@keyframes content-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-content-in {
  animation: content-in 0.25s ease-out;
}

.skeleton-shimmer {
  position: relative;
  overflow: hidden;
  background-color: #eef1f5;
}
.skeleton-shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.7), transparent);
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
</style>