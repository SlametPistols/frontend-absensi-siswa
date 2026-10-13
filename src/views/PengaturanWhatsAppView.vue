<template>
  <div class="mx-auto max-w-4xl space-y-6">
    <div>
      <p class="text-sm font-medium text-indigo-600">Pengaturan sistem</p>
      <h1 class="mt-1 text-2xl font-bold tracking-tight text-slate-900">Pengaturan WhatsApp</h1>
      <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
        Tentukan apakah notifikasi WhatsApp ke wali siswa dikirim otomatis setelah absensi atau dikirim manual dari halaman Riwayat.
      </p>
    </div>

    <div v-if="loading" class="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
      Memuat pengaturan WhatsApp...
    </div>

    <div v-else class="space-y-5">
      <div v-if="loadError" class="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {{ loadError }}
        <button type="button" @click="loadSetting" class="ml-2 font-semibold underline">Coba lagi</button>
      </div>

      <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div class="flex items-start gap-3">
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8A8.5 8.5 0 018.7 3.9a8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
            </svg>
          </div>
          <div class="min-w-0 flex-1">
            <h2 class="font-semibold text-slate-900">Mode pengiriman notifikasi</h2>
            <p class="mt-1 text-sm leading-6 text-slate-500">Pengaturan ini berlaku untuk sekolah dan disimpan di backend. Hanya Admin yang dapat mengubahnya.</p>
          </div>
        </div>

        <div class="mt-6 grid gap-3 sm:grid-cols-2">
          <button type="button" @click="selectedMode = 'otomatis'" :disabled="saving || !loaded" :aria-pressed="selectedMode === 'otomatis'"
            :class="selectedMode === 'otomatis' ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100' : 'border-slate-200 bg-white hover:border-slate-300'"
            class="rounded-xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-60">
            <div class="flex items-center justify-between gap-3">
              <span class="font-semibold text-slate-900">Otomatis</span>
              <span :class="selectedMode === 'otomatis' ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'" class="flex h-5 w-5 items-center justify-center rounded-full border-2">
                <span v-if="selectedMode === 'otomatis'" class="h-2 w-2 rounded-full bg-white"></span>
              </span>
            </div>
            <p class="mt-2 text-sm leading-5 text-slate-600">WhatsApp dikirim otomatis kepada wali saat siswa berstatus Hadir atau Terlambat.</p>
          </button>

          <button type="button" @click="selectedMode = 'manual'" :disabled="saving || !loaded" :aria-pressed="selectedMode === 'manual'"
            :class="selectedMode === 'manual' ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100' : 'border-slate-200 bg-white hover:border-slate-300'"
            class="rounded-xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-60">
            <div class="flex items-center justify-between gap-3">
              <span class="font-semibold text-slate-900">Manual</span>
              <span :class="selectedMode === 'manual' ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'" class="flex h-5 w-5 items-center justify-center rounded-full border-2">
                <span v-if="selectedMode === 'manual'" class="h-2 w-2 rounded-full bg-white"></span>
              </span>
            </div>
            <p class="mt-2 text-sm leading-5 text-slate-600">WhatsApp tidak dikirim otomatis. Admin atau Guru mengirimnya melalui tombol di Riwayat sesuai hak akses.</p>
          </button>
        </div>

        <div v-if="loaded && fromEnv" class="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-5 text-amber-800">
          Pengaturan ini masih mengikuti nilai awal dari konfigurasi server. Setelah disimpan dari halaman ini, pilihan akan tersimpan sebagai pengaturan sekolah.
        </div>
        <div v-else-if="loaded" class="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600">
          Mode tersimpan saat ini: <strong>{{ savedModeLabel }}</strong>.
        </div>

        <div v-if="saveError" class="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{{ saveError }}</div>
        <div v-if="saveSuccess" class="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{{ saveSuccess }}</div>

        <div class="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-xs leading-5 text-slate-500">Notifikasi untuk status Tidak Hadir (Izin/Sakit/Alpha) tetap dikirim manual.</p>
          <button type="button" @click="saveSetting" :disabled="!loaded || saving || selectedMode === savedMode"
            class="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300">
            {{ saving ? 'Menyimpan...' : 'Simpan pengaturan' }}
          </button>
        </div>
      </section>

      <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 class="font-semibold text-slate-900">Ringkasan perilaku</h2>
        <div class="mt-4 overflow-x-auto">
          <table class="w-full min-w-[420px] text-left text-sm">
            <thead><tr class="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500"><th class="pb-3 pr-4 font-semibold">Status absensi</th><th class="pb-3 pr-4 font-semibold">Mode otomatis</th><th class="pb-3 font-semibold">Mode manual</th></tr></thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              <tr><td class="py-3 pr-4">Hadir</td><td class="py-3 pr-4">WhatsApp otomatis</td><td class="py-3">Kirim dari Riwayat</td></tr>
              <tr><td class="py-3 pr-4">Terlambat</td><td class="py-3 pr-4">WhatsApp otomatis</td><td class="py-3">Kirim dari Riwayat</td></tr>
              <tr><td class="py-3 pr-4">Tidak Hadir</td><td class="py-3 pr-4">Tidak otomatis</td><td class="py-3">Kirim dari Riwayat</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import api from '../services/api'

const loading = ref(true)
const saving = ref(false)
const loaded = ref(false)
const selectedMode = ref('otomatis')
const savedMode = ref('otomatis')
const fromEnv = ref(false)
const loadError = ref('')
const saveError = ref('')
const saveSuccess = ref('')

const savedModeLabel = computed(() => savedMode.value === 'otomatis' ? 'Otomatis' : 'Manual')

const getRows = (response) => response?.data?.rows ?? response?.data?.data?.rows ?? null

const loadSetting = async () => {
  loading.value = true
  loaded.value = false
  loadError.value = ''
  saveError.value = ''
  saveSuccess.value = ''

  try {
    const response = await api.get('/api/notifikasi/setting')
    const rows = getRows(response)

    if (!rows || typeof rows.wa_otomatis !== 'boolean') {
      throw new Error('Format respons pengaturan tidak sesuai dokumentasi API.')
    }

    savedMode.value = rows.wa_otomatis ? 'otomatis' : 'manual'
    selectedMode.value = savedMode.value
    fromEnv.value = Boolean(rows.dari_env)
    loaded.value = true
  } catch (error) {
    loadError.value = error.response?.data?.message || error.message || 'Gagal memuat pengaturan WhatsApp.'
  } finally {
    loading.value = false
  }
}

const saveSetting = async () => {
  if (!loaded.value || saving.value || selectedMode.value === savedMode.value) return

  saving.value = true
  saveError.value = ''
  saveSuccess.value = ''

  try {
    const response = await api.put('/api/notifikasi/setting', {
      wa_otomatis: selectedMode.value === 'otomatis',
    })
    const rows = getRows(response)

    if (!rows || typeof rows.wa_otomatis !== 'boolean') {
      throw new Error('Pengaturan mungkin tersimpan, tetapi format respons server tidak sesuai dokumentasi.')
    }

    savedMode.value = rows.wa_otomatis ? 'otomatis' : 'manual'
    selectedMode.value = savedMode.value
    fromEnv.value = Boolean(rows.dari_env)
    saveSuccess.value = `Pengaturan berhasil disimpan ke mode ${savedModeLabel.value.toLowerCase()}.`
  } catch (error) {
    saveError.value = error.response?.data?.message || error.message || 'Gagal menyimpan pengaturan WhatsApp.'
  } finally {
    saving.value = false
  }
}

onMounted(loadSetting)
</script>
