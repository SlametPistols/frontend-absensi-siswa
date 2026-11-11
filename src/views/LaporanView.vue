<template>
  <div class="max-w-4xl mx-auto pb-10">

    <!-- Header -->
    <div class="mb-8">
      <p class="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 mb-1">
        <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
        Laporan
      </p>

      <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
        Laporan Semester
      </h1>

      <p class="text-sm text-slate-500 mt-2">
        Unduh rekap ketidakhadiran siswa (Sakit / Izin / Alpha) per kelas dalam satu semester.
      </p>
    </div>

    <!-- Access denied (403) -->
    <section
      v-if="accessDenied"
      class="bg-white border border-amber-200 rounded-2xl shadow-sm p-6 relative overflow-hidden animate-content-in"
    >
      <div class="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-amber-50/70 blur-2xl"></div>

      <div class="flex items-start gap-4 relative">
        <div class="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600 flex items-center justify-center ring-1 ring-amber-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 4h.01M10.29 3.86l-7.4 13a2 2 0 001.74 3h14.74a2 2 0 001.74-3l-7.4-13a2 2 0 00-3.48 0z" />
          </svg>
        </div>

        <div class="flex-1">
          <h2 class="text-sm font-semibold text-slate-900">Belum bisa mengunduh laporan</h2>
          <p class="text-sm text-slate-600 mt-1 leading-relaxed">{{ accessDenied }}</p>

          <button
            @click="resetAccessDenied"
            class="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-100 text-amber-800 text-xs font-semibold hover:bg-amber-200 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a8 8 0 0114.9-4M20 15a8 8 0 01-14.9 4" />
            </svg>
            Coba lagi
          </button>
        </div>
      </div>
    </section>

    <!-- Form -->
    <section v-else class="relative bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 overflow-hidden animate-content-in">
      <div class="absolute -right-10 -top-16 w-48 h-48 rounded-full bg-indigo-50/70 blur-3xl pointer-events-none"></div>

      <div class="flex items-center gap-3 mb-5 relative">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6M9 8h6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
          </svg>
        </div>

        <div>
          <h2 class="text-sm font-semibold text-slate-900">Pengaturan Laporan</h2>
          <p class="text-xs text-slate-500 mt-0.5">Pilih semester, tahun ajaran, dan format berkas.</p>
        </div>
      </div>

      <form @submit.prevent="handleDownload" class="space-y-5 relative">

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Semester -->
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-2">Semester</label>
            <div class="relative">
              <select
                v-model="semester"
                :disabled="downloading"
                class="appearance-none w-full px-4 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 outline-none transition-all focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option value="ganjil">Ganjil</option>
                <option value="genap">Genap</option>
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>

          <!-- Tahun ajaran -->
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-2">Tahun Ajaran</label>
            <div class="relative">
              <select
                v-model.number="tahun"
                :disabled="downloading"
                class="appearance-none w-full px-4 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 outline-none transition-all focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option v-for="y in tahunOptions" :key="y" :value="y">
                  {{ y }}/{{ y + 1 }}
                </option>
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>

          <!-- Format -->
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-2">Format</label>
            <div class="relative">
              <select
                v-model="format"
                :disabled="downloading"
                class="appearance-none w-full px-4 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 outline-none transition-all focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel (XLSX)</option>
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Ringkasan -->
        <div class="rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/60 to-violet-50/60 p-4">
          <p class="text-xs font-semibold text-indigo-700 uppercase tracking-wide">Ringkasan Unduhan</p>
          <p class="text-sm font-semibold text-slate-800 mt-1">
            Semester {{ semester === 'ganjil' ? 'Ganjil' : 'Genap' }} — TA {{ tahun }}/{{ tahun + 1 }}
          </p>
          <p class="text-xs text-slate-500 mt-1">Rentang: {{ rentangSemester }}</p>
          <p class="text-xs text-slate-500 mt-0.5">
            Format: {{ format === 'pdf' ? 'PDF' : 'Excel (XLSX)' }}
          </p>
        </div>

        <!-- Error -->
        <div
          v-if="errorMessage"
          class="flex items-start gap-3 p-3.5 rounded-xl bg-red-50 border border-red-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 4h.01M10.29 3.86l-7.4 13a2 2 0 001.74 3h14.74a2 2 0 001.74-3l-7.4-13a2 2 0 00-3.48 0z" />
          </svg>
          <p class="text-xs text-red-700 leading-relaxed">{{ errorMessage }}</p>
        </div>

        <!-- Info scope -->
        <p class="text-xs text-slate-500 leading-relaxed">
          <template v-if="user?.peran_id_str === 'Guru'">
            Laporan akan dibatasi ke kelas yang Anda ampu. Jika kelas belum ditetapkan, hubungi Admin.
          </template>
          <template v-else>
            Laporan akan mencakup seluruh kelas di sekolah.
          </template>
        </p>

        <!-- Tombol -->
        <div class="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            :disabled="downloading"
            class="inline-flex items-center justify-center gap-2 min-w-[180px] px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-indigo-600/25 hover:shadow-lg hover:from-indigo-700 hover:to-violet-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            <span
              v-if="downloading"
              class="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin"
            ></span>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v11" />
            </svg>
            {{ downloading ? 'Menyiapkan laporan...' : 'Unduh Laporan' }}
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import api from '../services/api'
import { currentUser } from '../services/authState'

const user = currentUser

// Tahun ajaran Indonesia:
// Ganjil: Jul–Des tahun Y (tahun ajaran Y/Y+1)
// Genap:  Jan–Jun tahun Y+1 (tahun ajaran Y/Y+1)
const getCurrentSchoolYear = () => {
  const now = new Date()
  const month = now.getMonth() + 1
  return month >= 7 ? now.getFullYear() : now.getFullYear() - 1
}

const semester = ref('ganjil')
const tahun = ref(getCurrentSchoolYear())
const format = ref('pdf')

const downloading = ref(false)
const errorMessage = ref('')
const accessDenied = ref('')

const tahunOptions = computed(() => {
  const base = getCurrentSchoolYear()
  return [base - 2, base - 1, base, base + 1].filter((y) => y > 2000)
})

const formatDate = (d) =>
  d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })

const rentangSemester = computed(() => {
  const y = Number(tahun.value)
  if (semester.value === 'ganjil') {
    return `${formatDate(new Date(y, 6, 1))} – ${formatDate(new Date(y, 11, 31))}`
  }
  return `${formatDate(new Date(y, 0, 1))} – ${formatDate(new Date(y + 1, 5, 30))}`
})

const resetAccessDenied = () => {
  accessDenied.value = ''
  errorMessage.value = ''
}

watch([semester, tahun, format], () => {
  errorMessage.value = ''
})

const extractFilename = (response, fallbackExt) => {
  const disposition = response.headers?.['content-disposition'] || ''
  const match = /filename\*?=(?:UTF-8'')?["']?([^;"'\r\n]+)/i.exec(disposition)
  if (match && match[1]) {
    return decodeURIComponent(match[1].replace(/["']/g, '').trim())
  }
  return `laporan-semester-${semester.value}-${tahun.value}-${tahun.value + 1}.${fallbackExt}`
}

const parseBlobError = async (error) => {
  const data = error.response?.data
  if (data instanceof Blob) {
    try {
      const text = await data.text()
      return JSON.parse(text)
    } catch {
      return {}
    }
  }
  if (typeof data === 'object' && data !== null) return data
  return {}
}

const handleDownload = async () => {
  errorMessage.value = ''
  accessDenied.value = ''
  downloading.value = true

  try {
    const response = await api.get('/api/absensi/laporan/semester', {
      params: {
        format: format.value,
        semester: semester.value,
        tahun: tahun.value,
      },
      responseType: 'blob',
    })

    const ext = format.value === 'excel' ? 'xlsx' : 'pdf'
    const mime =
      format.value === 'excel'
        ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        : 'application/pdf'

    const filename = extractFilename(response, ext)
    const blob = new Blob([response.data], { type: mime })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  } catch (error) {
    const status = error.response?.status
    const body = await parseBlobError(error)
    const msg = body?.message || body?.error || ''

    if (status === 403) {
      accessDenied.value =
        msg ||
        'Akun Anda belum ditetapkan kelas yang diampu. Hubungi Admin untuk melengkapi data wali kelas.'
      return
    }

    if (status === 401) {
      errorMessage.value = 'Sesi Anda telah berakhir. Silakan login kembali.'
      return
    }

    if (status === 400) {
      errorMessage.value =
        msg ||
        'Semester/tahun tidak valid. Pakai semester=ganjil|genap & tahun=YYYY.'
      return
    }

    errorMessage.value = msg || 'Gagal mengunduh laporan. Coba lagi beberapa saat lagi.'
  } finally {
    downloading.value = false
  }
}
</script>

<style scoped>
@keyframes content-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-content-in {
  animation: content-in 0.25s ease-out;
}
</style>
