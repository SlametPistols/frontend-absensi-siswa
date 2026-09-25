<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">
        Absensi Manual
      </h1>

      <p class="text-sm text-gray-500 mt-1">
        Catat izin atau sakit siswa.
      </p>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
      <form @submit.prevent="handleSubmit" class="space-y-5">

        <!-- ID Siswa -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            ID Siswa
          </label>

          <input
            v-model="form.peserta_didik_id"
            type="text"
            placeholder="Masukkan peserta_didik_id"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Status -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>

          <select
            v-model="form.status"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih status</option>
            <option value="Izin">Izin</option>
            <option value="Sakit">Sakit</option>
          </select>
        </div>

        <!-- Keterangan -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Keterangan
          </label>

          <textarea
            v-model="form.keterangan"
            rows="4"
            placeholder="Masukkan keterangan..."
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <p
          v-if="errorMessage"
          class="text-sm text-red-600 bg-red-50 p-3 rounded-lg"
        >
          {{ errorMessage }}
        </p>

        <p
          v-if="successMessage"
          class="text-sm text-green-600 bg-green-50 p-3 rounded-lg"
        >
          {{ successMessage }}
        </p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {{ loading ? 'Menyimpan...' : 'Simpan Absensi' }}
        </button>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const form = ref({
  peserta_didik_id: '',
  status: '',
  keterangan: '',
})

const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.value.peserta_didik_id) {
    errorMessage.value = 'ID siswa wajib diisi.'
    return
  }

  if (!form.value.status) {
    errorMessage.value = 'Status wajib dipilih.'
    return
  }

  loading.value = true

  try {
    // POST API akan disambungkan setelah kontrak request body
    // dari backend dikonfirmasi.

    console.log('Data absensi manual:', form.value)

    successMessage.value =
      'Form absensi manual siap. API belum disambungkan karena format request body belum dikonfirmasi.'
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Gagal menyimpan absensi.'
  } finally {
    loading.value = false
  }
}
</script>