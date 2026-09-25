<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">
        Kartu Siswa
      </h1>

      <p class="text-sm text-gray-500 mt-1">
        Generate kartu siswa dengan QR Code
      </p>
    </div>

    <!-- Generate Card -->
    <div class="bg-white rounded-xl shadow-sm p-6">
      <h2 class="text-lg font-semibold text-gray-900">
        Generate Kartu
      </h2>

      <p class="text-sm text-gray-500 mt-1">
        Pilih siswa atau generate kartu secara massal.
      </p>

      <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">

        <!-- Single -->
        <div class="border border-gray-200 rounded-lg p-5">
          <h3 class="font-semibold text-gray-900">
            Kartu Satu Siswa
          </h3>

          <p class="text-sm text-gray-500 mt-1">
            Generate kartu untuk satu siswa.
          </p>

          <button
            @click="openStudentModal"
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Pilih Siswa
          </button>
        </div>

        <!-- Bulk -->
        <div class="border border-gray-200 rounded-lg p-5">
          <h3 class="font-semibold text-gray-900">
            Kartu Massal
          </h3>

          <p class="text-sm text-gray-500 mt-1">
            Generate kartu untuk banyak siswa sekaligus.
          </p>

          <button
            @click="openBulkModal"
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Generate Massal
          </button>
        </div>

      </div>
    </div>

    <!-- Student Modal -->
    <div
      v-if="showStudentModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      @click.self="closeStudentModal"
    >
      <div
        class="bg-white w-full max-w-4xl max-h-[90vh] rounded-xl shadow-xl flex flex-col"
      >

        <!-- Modal Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">
              Pilih Siswa
            </h2>

            <p class="text-sm text-gray-500 mt-1">
              Cari siswa berdasarkan nama atau NISN.
            </p>
          </div>

          <button
            @click="closeStudentModal"
            class="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>

        <!-- Search -->
        <div class="px-6 py-4 border-b shrink-0">
          <input
            v-model="search"
            @input="handleSearch"
            type="text"
            placeholder="Cari nama atau NISN..."
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p class="text-xs text-gray-400 mt-2">
            Minimal 3 karakter untuk pencarian.
          </p>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto">

          <div
            v-if="studentLoading"
            class="p-6 text-center text-sm text-gray-500"
          >
            Memuat data siswa...
          </div>

          <div
            v-else-if="studentError"
            class="p-6 text-center text-sm text-red-600"
          >
            {{ studentError }}
          </div>

          <div v-else class="p-6">

            <div
              v-if="students.length === 0"
              class="text-center text-sm text-gray-500 py-8"
            >
              Tidak ada data siswa.
            </div>

            <div
              v-else
              class="border border-gray-200 rounded-lg overflow-hidden"
            >
              <table class="w-full text-sm">
                <thead class="bg-gray-50 border-b">
                  <tr>
                    <th class="text-left px-4 py-3 font-medium text-gray-600">
                      Nama
                    </th>

                    <th class="text-left px-4 py-3 font-medium text-gray-600">
                      NISN
                    </th>

                    <th class="text-left px-4 py-3 font-medium text-gray-600">
                      Kelas
                    </th>

                    <th class="text-right px-4 py-3 font-medium text-gray-600">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="siswa in students"
                    :key="siswa.peserta_didik_id"
                    class="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <td class="px-4 py-3">
                      {{ siswa.nama }}
                    </td>

                    <td class="px-4 py-3">
                      {{ siswa.nisn }}
                    </td>

                    <td class="px-4 py-3">
                      {{ siswa.nama_rombel }}
                    </td>

                    <td class="px-4 py-3 text-right">
                      <button
                        @click="selectStudent(siswa)"
                        class="px-3 py-1.5 bg-blue-600 text-white rounded-md text-xs font-medium hover:bg-blue-700"
                      >
                        Pilih
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>

        <!-- Pagination -->
        <div
          v-if="!studentLoading && !studentError && students.length > 0"
          class="flex items-center justify-between px-6 py-4 border-t shrink-0"
        >
          <p class="text-sm text-gray-500">
            Halaman {{ currentPage }} dari {{ totalPages }}
          </p>

          <div class="flex gap-2">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Sebelumnya
            </button>

            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Berikutnya
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- Bulk Modal -->
    <div
      v-if="showBulkModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      @click.self="closeBulkModal"
    >
      <div class="bg-white w-full max-w-lg rounded-xl shadow-xl">

        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">
              Generate Kartu Massal
            </h2>

            <p class="text-sm text-gray-500 mt-1">
              Pilih siswa yang ingin dibuatkan kartu.
            </p>
          </div>

          <button
            @click="closeBulkModal"
            class="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>

        <!-- Form -->
        <div class="p-6 space-y-5">

          <!-- Semua siswa -->
          <label class="flex items-start gap-3 cursor-pointer">
            <input
              v-model="bulkMode"
              type="radio"
              value="all"
              class="mt-1"
            />

            <div>
              <p class="text-sm font-medium text-gray-900">
                Semua siswa
              </p>

              <p class="text-xs text-gray-500 mt-1">
                Generate kartu untuk seluruh siswa.
              </p>
            </div>
          </label>

          <!-- Kelas -->
          <label class="flex items-start gap-3 cursor-pointer">
            <input
              v-model="bulkMode"
              type="radio"
              value="class"
              class="mt-1"
            />

            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">
                Berdasarkan kelas
              </p>

              <input
                v-model="bulkKelas"
                :disabled="bulkMode !== 'class'"
                type="text"
                placeholder="Contoh: KELAS 5A"
                class="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </label>

          <!-- Tingkat -->
          <label class="flex items-start gap-3 cursor-pointer">
            <input
              v-model="bulkMode"
              type="radio"
              value="level"
              class="mt-1"
            />

            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">
                Berdasarkan tingkat
              </p>

              <select
                v-model="bulkTingkat"
                :disabled="bulkMode !== 'level'"
                class="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pilih tingkat</option>
                <option value="1">Tingkat 1</option>
                <option value="2">Tingkat 2</option>
                <option value="3">Tingkat 3</option>
                <option value="4">Tingkat 4</option>
                <option value="5">Tingkat 5</option>
                <option value="6">Tingkat 6</option>
              </select>
            </div>
          </label>

          <p
            v-if="bulkError"
            class="text-sm text-red-600"
          >
            {{ bulkError }}
          </p>

        </div>

        <!-- Footer -->
        <div class="flex justify-end gap-3 px-6 py-4 border-t">
          <button
            @click="closeBulkModal"
            :disabled="bulkLoading"
            class="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            Batal
          </button>

          <button
            @click="generateBulk"
            :disabled="bulkLoading"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ bulkLoading ? 'Generating...' : 'Generate PDF' }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../services/api'

const showStudentModal = ref(false)
const showBulkModal = ref(false)

const students = ref([])

const studentLoading = ref(false)
const studentError = ref('')

const search = ref('')

const currentPage = ref(1)
const totalPages = ref(1)

let searchTimeout = null

const bulkMode = ref('all')
const bulkKelas = ref('')
const bulkTingkat = ref('')
const bulkLoading = ref(false)
const bulkError = ref('')

const openStudentModal = async () => {
  showStudentModal.value = true
  search.value = ''
  currentPage.value = 1
  studentError.value = ''

  await fetchStudents()
}

const closeStudentModal = () => {
  showStudentModal.value = false
}

const fetchStudents = async () => {
  studentLoading.value = true
  studentError.value = ''

  try {
    const params = {
      page: currentPage.value,
      limit: 20,
    }

    if (search.value.trim().length >= 3) {
      params.search = search.value.trim()
    }

    const response = await api.get('/api/siswa', {
      params,
    })

    students.value = response.data.rows
    totalPages.value = response.data.pagination.total_pages
  } catch (error) {
    console.error('Gagal mengambil data siswa:', error)

    studentError.value = 'Gagal mengambil data siswa.'
  } finally {
    studentLoading.value = false
  }
}

const handleSearch = () => {
  clearTimeout(searchTimeout)

  if (search.value.trim().length > 0 && search.value.trim().length < 3) {
    return
  }

  searchTimeout = setTimeout(async () => {
    currentPage.value = 1

    await fetchStudents()
  }, 400)
}

const previousPage = async () => {
  if (currentPage.value <= 1) {
    return
  }

  currentPage.value--

  await fetchStudents()
}

const nextPage = async () => {
  if (currentPage.value >= totalPages.value) {
    return
  }

  currentPage.value++

  await fetchStudents()
}

const selectStudent = async (student) => {
  try {
    const response = await api.get(
      `/api/siswa/${student.peserta_didik_id}/kartu-qr`,
      {
        responseType: 'blob',
      }
    )

    const pdfBlob = new Blob([response.data], {
      type: 'application/pdf',
    })

    const pdfUrl = URL.createObjectURL(pdfBlob)

    window.open(pdfUrl, '_blank')

    closeStudentModal()
  } catch (error) {
    console.error('Gagal generate kartu siswa:', error)

    alert('Gagal membuat kartu siswa.')
  }
}

const openBulkModal = () => {
  bulkMode.value = 'all'
  bulkKelas.value = ''
  bulkTingkat.value = ''
  bulkError.value = ''
  showBulkModal.value = true
}

const closeBulkModal = () => {
  if (bulkLoading.value) {
    return
  }

  showBulkModal.value = false
}

const generateBulk = async () => {
  bulkError.value = ''

  if (bulkMode.value === 'class' && !bulkKelas.value.trim()) {
    bulkError.value = 'Masukkan nama kelas terlebih dahulu.'
    return
  }

  if (bulkMode.value === 'level' && !bulkTingkat.value) {
    bulkError.value = 'Pilih tingkat terlebih dahulu.'
    return
  }

  bulkLoading.value = true

  try {
    const payload = {
      siswa_ids: [],
      kelas: bulkMode.value === 'class'
        ? bulkKelas.value.trim()
        : null,
      tingkat: bulkMode.value === 'level'
        ? bulkTingkat.value
        : null,
      semua_siswa: bulkMode.value === 'all',
    }

    const response = await api.post(
      '/api/siswa/kartu-qr/bulk',
      payload,
      {
        responseType: 'blob',
      }
    )

    const pdfBlob = new Blob([response.data], {
      type: 'application/pdf',
    })

    const pdfUrl = URL.createObjectURL(pdfBlob)

    window.open(pdfUrl, '_blank')

    closeBulkModal()
  } catch (error) {
    console.error('Gagal generate kartu massal:', error)

    bulkError.value = 'Gagal membuat kartu massal.'
  } finally {
    bulkLoading.value = false
  }
}
</script>