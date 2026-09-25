<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">
          Data Siswa
        </h1>

        <p class="text-sm text-gray-500 mt-1">
          Kelola data siswa sekolah
        </p>
      </div>

      <button
        v-if="currentUser?.peran_id_str === 'Admin'"
        @click="openAddModal"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
      >
        + Tambah Siswa
      </button>
    </div>

    <!-- Filter -->
    <div class="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Cari Siswa
          </label>

          <input
            v-model="search"
            type="text"
            placeholder="Cari nama atau NISN..."
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Kelas
          </label>

          <select
            v-model="selectedClass"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Kelas</option>
            <option value="1">Kelas 1</option>
            <option value="2">Kelas 2</option>
            <option value="3">Kelas 3</option>
            <option value="4">Kelas 4</option>
            <option value="5">Kelas 5</option>
            <option value="6">Kelas 6</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div
      v-if="loading"
      class="bg-white rounded-xl shadow-sm p-8 text-center"
    >
      <p class="text-sm text-gray-500">
        Memuat data siswa...
      </p>
    </div>

    <!-- Error -->
    <div
      v-else-if="errorMessage"
      class="bg-white rounded-xl shadow-sm p-8 text-center"
    >
      <p class="text-sm text-red-600">
        {{ errorMessage }}
      </p>
    </div>

    <!-- Table -->
    <div
      v-else
      class="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left font-semibold text-gray-600">
                No
              </th>

              <th class="px-6 py-3 text-left font-semibold text-gray-600">
                Nama Siswa
              </th>

              <th class="px-6 py-3 text-left font-semibold text-gray-600">
                NISN
              </th>

              <th class="px-6 py-3 text-left font-semibold text-gray-600">
                Kelas
              </th>

              <th class="px-6 py-3 text-left font-semibold text-gray-600">
                Jenis Kelamin
              </th>

              <th class="px-6 py-3 text-right font-semibold text-gray-600">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="(siswa, index) in filteredStudents"
              :key="siswa.peserta_didik_id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 text-gray-600">
                {{ (currentPage - 1) * limit + index + 1 }}
              </td>

              <td class="px-6 py-4 font-medium text-gray-900">
                {{ siswa.nama }}
              </td>

              <td class="px-6 py-4 text-gray-600">
                {{ siswa.nisn }}
              </td>

              <td class="px-6 py-4 text-gray-600">
                {{ siswa.nama_rombel }}
              </td>

              <td class="px-6 py-4 text-gray-600">
                {{ siswa.jenis_kelamin }}
              </td>

              <td class="px-6 py-4 text-right">
                <button
                  @click="openDetail(siswa.peserta_didik_id)"
                  class="text-blue-600 hover:text-blue-800 mr-3"
                >
                  Detail
                </button>

                <button
                  v-if="currentUser?.peran_id_str === 'Admin'"
                  class="text-gray-600 hover:text-gray-800"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        class="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <p class="text-sm text-gray-500">
          Menampilkan {{ filteredStudents.length }} dari {{ totalStudents }} siswa
        </p>

        <div class="flex items-center gap-2">
          <button
            @click="goToPreviousPage"
            :disabled="currentPage === 1 || loading"
            class="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sebelumnya
          </button>

          <span class="px-3 py-1.5 text-sm text-gray-600">
            Halaman {{ currentPage }} dari {{ totalPages }}
          </span>

          <button
            @click="goToNextPage"
            :disabled="currentPage === totalPages || loading"
            class="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Berikutnya
          </button>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <div
      v-if="showDetailModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      @click.self="closeDetail"
    >
      <div class="w-full max-w-lg bg-white rounded-xl shadow-lg">
        <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">
            Detail Siswa
          </h2>

          <button
            @click="closeDetail"
            class="text-gray-400 hover:text-gray-600 text-xl"
          >
            &times;
          </button>
        </div>

        <div class="p-6">
          <div
            v-if="detailLoading"
            class="py-8 text-center"
          >
            <p class="text-sm text-gray-500">
              Memuat detail siswa...
            </p>
          </div>

          <div
            v-else-if="detailError"
            class="py-8 text-center"
          >
            <p class="text-sm text-red-600">
              {{ detailError }}
            </p>
          </div>

          <div
            v-else-if="selectedStudent"
            class="space-y-4"
          >
            <div>
              <p class="text-xs text-gray-500">
                Nama
              </p>
              <p class="text-sm font-medium text-gray-900 mt-1">
                {{ selectedStudent.nama }}
              </p>
            </div>

            <div>
              <p class="text-xs text-gray-500">
                NISN
              </p>
              <p class="text-sm text-gray-900 mt-1">
                {{ selectedStudent.nisn || '-' }}
              </p>
            </div>

            <div>
              <p class="text-xs text-gray-500">
                NIPD
              </p>
              <p class="text-sm text-gray-900 mt-1">
                {{ selectedStudent.nipd || '-' }}
              </p>
            </div>

            <div>
              <p class="text-xs text-gray-500">
                Kelas
              </p>
              <p class="text-sm text-gray-900 mt-1">
                {{ selectedStudent.nama_rombel || '-' }}
              </p>
            </div>

            <div>
              <p class="text-xs text-gray-500">
                Jenis Kelamin
              </p>
              <p class="text-sm text-gray-900 mt-1">
                {{ selectedStudent.jenis_kelamin || '-' }}
              </p>
            </div>

            <div>
              <p class="text-xs text-gray-500">
                Nomor Telepon
              </p>
              <p class="text-sm text-gray-900 mt-1">
                {{ selectedStudent.nomor_telepon_seluler || '-' }}
              </p>
            </div>
          </div>
        </div>

        <div class="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            @click="closeDetail"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>

    <!-- Tambah Siswa Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      @click.self="closeAddModal"
    >
      <div class="w-full max-w-lg bg-white rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">
            Tambah Siswa
          </h2>

          <button
            @click="closeAddModal"
            class="text-gray-400 hover:text-gray-600 text-xl"
          >
            &times;
          </button>
        </div>

        <form
          @submit.prevent="handleAddStudent"
          class="p-6 space-y-4"
        >
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nama Siswa
            </label>

            <input
              v-model="newStudent.nama"
              type="text"
              placeholder="Masukkan nama siswa"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              NISN
            </label>

            <input
              v-model="newStudent.nisn"
              type="text"
              placeholder="Masukkan NISN"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              NIPD
            </label>

            <input
              v-model="newStudent.nipd"
              type="text"
              placeholder="Masukkan NIPD"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Jenis Kelamin
            </label>

            <select
              v-model="newStudent.jenis_kelamin"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih jenis kelamin</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Kelas
            </label>

            <input
              v-model="newStudent.nama_rombel"
              type="text"
              placeholder="Contoh: KELAS 5A"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nomor Telepon
            </label>

            <input
              v-model="newStudent.nomor_telepon_seluler"
              type="text"
              placeholder="Masukkan nomor telepon"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p class="text-xs text-yellow-700">
              Form ini baru tahap UI. Request POST ke backend belum dihubungkan
              karena format request body endpoint belum tersedia di dokumentasi.
            </p>
          </div>

          <div class="pt-4 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              @click="closeAddModal"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
            >
              Batal
            </button>

            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import api from '../services/api'
import { currentUser } from '../services/authState'

const search = ref('')
const selectedClass = ref('')

const loading = ref(false)
const errorMessage = ref('')

const students = ref([])

const currentPage = ref(1)
const totalPages = ref(1)
const totalStudents = ref(0)
const limit = ref(20)

const showDetailModal = ref(false)
const selectedStudent = ref(null)
const detailLoading = ref(false)
const detailError = ref('')

const showAddModal = ref(false)

const newStudent = ref({
  nama: '',
  nisn: '',
  nipd: '',
  jenis_kelamin: '',
  nama_rombel: '',
  nomor_telepon_seluler: '',
})

const filteredStudents = computed(() => {
  return students.value.filter((siswa) => {
    const nama = siswa.nama?.toLowerCase() || ''
    const nisn = siswa.nisn || ''

    const matchesSearch =
      nama.includes(search.value.toLowerCase()) ||
      nisn.includes(search.value)

    const matchesClass =
      !selectedClass.value ||
      siswa.nama_rombel?.startsWith(`KELAS ${selectedClass.value}`)

    return matchesSearch && matchesClass
  })
})

const fetchStudents = async (page = 1) => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await api.get('/api/siswa', {
      params: {
        page,
        limit: limit.value,
      },
    })

    console.log('Response siswa:', response.data)

    students.value = response.data.rows

    currentPage.value = response.data.pagination.page
    totalPages.value = response.data.pagination.total_pages
    totalStudents.value = response.data.pagination.total
  } catch (error) {
    console.error('Gagal mengambil data siswa:', error)

    errorMessage.value = 'Gagal mengambil data siswa.'
  } finally {
    loading.value = false
  }
}

const fetchStudentDetail = async (id) => {
  detailLoading.value = true
  detailError.value = ''
  selectedStudent.value = null

  try {
    const response = await api.get(`/api/siswa/${id}`)

    console.log('Response detail siswa:', response.data)

    selectedStudent.value = response.data.rows
  } catch (error) {
    console.error('Gagal mengambil detail siswa:', error)

    detailError.value = 'Gagal mengambil detail siswa.'
  } finally {
    detailLoading.value = false
  }
}

const openDetail = async (id) => {
  showDetailModal.value = true

  await fetchStudentDetail(id)
}

const closeDetail = () => {
  showDetailModal.value = false
  selectedStudent.value = null
  detailError.value = ''
}

const openAddModal = () => {
  showAddModal.value = true
}

const closeAddModal = () => {
  showAddModal.value = false
}

const handleAddStudent = () => {
  console.log('Data form tambah siswa:', newStudent.value)

  alert('Form UI sudah dibuat. POST API belum dihubungkan.')
}

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    fetchStudents(currentPage.value - 1)
  }
}

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    fetchStudents(currentPage.value + 1)
  }
}

onMounted(() => {
  fetchStudents()
})
</script>