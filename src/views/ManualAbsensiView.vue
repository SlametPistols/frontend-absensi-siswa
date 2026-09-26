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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5a3 3 0 016 0v1H9V5z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 13h6M9 17h4"
            />
          </svg>
        </div>

        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900">
            Absensi Manual
          </h1>

          <p class="mt-1 text-sm text-slate-500">
            Catat izin atau sakit siswa secara manual.
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Form -->
      <section
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2"
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
                  d="M9 12h6M9 16h6M9 8h6M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
                />
              </svg>
            </div>

            <div>
              <h2 class="text-base font-semibold text-slate-900">
                Form Absensi
              </h2>

              <p class="mt-0.5 text-xs text-slate-500 sm:text-sm">
                Lengkapi informasi absensi siswa.
              </p>
            </div>
          </div>
        </div>

        <form
          @submit.prevent="handleSubmit"
          class="space-y-5 p-5 sm:p-6"
        >
          <!-- Siswa -->
          <div>
            <label
              class="mb-2 block text-sm font-semibold text-slate-700"
            >
              Siswa
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
                    d="M15 19a6 6 0 00-12 0M9 13a4 4 0 100-8 4 4 0 000 8zM17 11a3 3 0 10-2.83-4M21 19a5 5 0 00-4-4.9"
                  />
                </svg>
              </div>

              <select
                v-model="form.peserta_didik_id"
                :disabled="studentsLoading"
                class="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
              >
                <option value="">
                  {{
                    studentsLoading
                      ? 'Memuat siswa...'
                      : 'Pilih siswa'
                  }}
                </option>

                <option
                  v-for="student in students"
                  :key="student.peserta_didik_id"
                  :value="student.peserta_didik_id"
                >
                  {{ student.nama }}{{
                    student.nama_rombel
                      ? ` - ${student.nama_rombel}`
                      : ''
                  }}
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

            <p
              v-if="studentsLoading"
              class="mt-2 text-xs text-slate-400"
            >
              Sedang mengambil daftar siswa...
            </p>
          </div>

          <!-- Status -->
          <div>
            <label
              class="mb-2 block text-sm font-semibold text-slate-700"
            >
              Status
            </label>

            <div class="grid grid-cols-2 gap-3">
              <!-- Izin -->
              <label
                class="relative flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition"
                :class="
                  form.status === 'Izin'
                    ? 'border-indigo-200 bg-indigo-50'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                "
              >
                <input
                  v-model="form.status"
                  type="radio"
                  value="Izin"
                  class="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />

                <div>
                  <p class="text-sm font-semibold text-slate-800">
                    Izin
                  </p>

                  <p class="mt-0.5 text-xs text-slate-500">
                    Siswa tidak hadir karena izin.
                  </p>
                </div>
              </label>

              <!-- Sakit -->
              <label
                class="relative flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition"
                :class="
                  form.status === 'Sakit'
                    ? 'border-indigo-200 bg-indigo-50'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                "
              >
                <input
                  v-model="form.status"
                  type="radio"
                  value="Sakit"
                  class="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />

                <div>
                  <p class="text-sm font-semibold text-slate-800">
                    Sakit
                  </p>

                  <p class="mt-0.5 text-xs text-slate-500">
                    Siswa tidak hadir karena sakit.
                  </p>
                </div>
              </label>
            </div>
          </div>

          <!-- Keterangan -->
          <div>
            <label
              class="mb-2 block text-sm font-semibold text-slate-700"
            >
              Keterangan
              <span class="font-normal text-slate-400">
                (opsional)
              </span>
            </label>

            <textarea
              v-model="form.keterangan"
              rows="4"
              placeholder="Masukkan keterangan jika diperlukan..."
              class="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            ></textarea>
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
                Absensi gagal
              </p>

              <p class="mt-1 text-sm leading-5 text-red-700">
                {{ errorMessage }}
              </p>
            </div>
          </div>

          <!-- Success -->
          <div
            v-if="successMessage"
            class="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4"
          >
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600"
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
                Berhasil
              </p>

              <p class="mt-1 text-sm leading-5 text-emerald-700">
                {{ successMessage }}
              </p>
            </div>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading || studentsLoading"
            class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg
              v-if="loading"
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
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>

            {{ loading ? 'Menyimpan...' : 'Simpan Absensi' }}
          </button>
        </form>
      </section>

      <!-- Information Card -->
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
                Informasi
              </h2>

              <p class="mt-0.5 text-xs text-slate-500">
                Panduan absensi manual.
              </p>
            </div>
          </div>
        </div>

        <div class="space-y-4 p-5">
          <!-- Info item -->
          <div class="flex items-start gap-3">
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600"
            >
              1
            </div>

            <div>
              <p class="text-sm font-semibold text-slate-800">
                Pilih siswa
              </p>

              <p class="mt-1 text-xs leading-5 text-slate-500">
                Pilih siswa yang ingin dicatat absensinya dari daftar.
              </p>
            </div>
          </div>

          <div class="h-px bg-slate-100"></div>

          <div class="flex items-start gap-3">
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600"
            >
              2
            </div>

            <div>
              <p class="text-sm font-semibold text-slate-800">
                Tentukan status
              </p>

              <p class="mt-1 text-xs leading-5 text-slate-500">
                Pilih <span class="font-medium text-slate-700">Izin</span>
                atau <span class="font-medium text-slate-700">Sakit</span>.
              </p>
            </div>
          </div>

          <div class="h-px bg-slate-100"></div>

          <div class="flex items-start gap-3">
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600"
            >
              3
            </div>

            <div>
              <p class="text-sm font-semibold text-slate-800">
                Tambahkan keterangan
              </p>

              <p class="mt-1 text-xs leading-5 text-slate-500">
                Keterangan bersifat opsional dan dapat digunakan untuk
                informasi tambahan.
              </p>
            </div>
          </div>

          <!-- Notice -->
          <div
            class="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3.5"
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
                Pastikan data siswa dan status absensi sudah benar sebelum
                menyimpan.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const loading = ref(false)
const studentsLoading = ref(false)

const errorMessage = ref('')
const successMessage = ref('')

const students = ref([])

const form = ref({
  peserta_didik_id: '',
  status: '',
  keterangan: '',
})

const fetchStudents = async () => {
  studentsLoading.value = true
  errorMessage.value = ''

  try {
    const allStudents = []
    let page = 1
    const limit = 100

    while (true) {
      const response = await api.get('/api/siswa', {
        params: {
          page,
          limit,
        },
      })

      const rows = response.data.rows || []

      allStudents.push(...rows)

      const totalPages =
        response.data.pagination?.total_pages || 1

      if (page >= totalPages || rows.length === 0) {
        break
      }

      page++
    }

    students.value = allStudents
  } catch (error) {
    console.error('Gagal mengambil data siswa:', error)

    errorMessage.value = 'Gagal mengambil data siswa.'
  } finally {
    studentsLoading.value = false
  }
}

const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.value.peserta_didik_id) {
    errorMessage.value = 'Siswa wajib dipilih.'
    return
  }

  if (!form.value.status) {
    errorMessage.value = 'Status wajib dipilih.'
    return
  }

  loading.value = true

  try {
    const response = await api.post('/api/absensi/manual', {
      peserta_didik_id: form.value.peserta_didik_id,
      status: form.value.status,
      keterangan: form.value.keterangan,
    })

    console.log('Absensi manual berhasil:', response.data)

    successMessage.value = 'Absensi berhasil disimpan.'

    form.value = {
      peserta_didik_id: '',
      status: '',
      keterangan: '',
    }
  } catch (error) {
    console.error('STATUS:', error.response?.status)
    console.error('RESPONSE:', error.response?.data)
    console.error('FULL ERROR:', error)

    const errorCode = error.response?.data?.error_code

    if (errorCode === 'ALREADY_ABSENT') {
      errorMessage.value = 'Siswa sudah memiliki absensi hari ini.'
    } else {
      errorMessage.value =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Gagal menyimpan absensi.'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStudents()
})
</script>