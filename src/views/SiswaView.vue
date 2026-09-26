<template>
  <div class="max-w-7xl mx-auto pb-10">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
      <div>
        <p class="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 mb-1">
          <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          Manajemen
        </p>

        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Data Siswa
        </h1>

        <p class="text-sm text-slate-500 mt-2">
          Kelola dan lihat informasi siswa sekolah.
        </p>
      </div>

      <button
        v-if="currentUser?.peran_id_str === 'Admin'"
        @click="openAddModal"
        class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-indigo-600/25 hover:shadow-lg hover:from-indigo-700 hover:to-violet-700 active:scale-[0.98] transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Tambah Siswa
      </button>
    </div>

    <!-- Filter Card -->
    <section class="relative bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 mb-6 overflow-hidden">
      <div class="absolute -right-10 -top-16 w-48 h-48 rounded-full bg-indigo-50/70 blur-3xl pointer-events-none"></div>

      <div class="flex items-center gap-3 mb-5 relative">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h18M6 8h12M9 12h6M10 16h4M11 20h2" />
          </svg>
        </div>

        <div>
          <h2 class="text-sm font-semibold text-slate-900">Filter Data</h2>
          <p class="text-xs text-slate-500 mt-0.5">Cari siswa berdasarkan informasi tertentu.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 relative">

        <!-- Search -->
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-2">Cari Siswa</label>

          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <circle cx="11" cy="11" r="7" />
              <path stroke-linecap="round" d="M20 20l-4-4" />
            </svg>

            <input
              v-model="search"
              @input="handleSearchInput"
              type="text"
              placeholder="Nama atau NISN..."
              class="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          <p v-if="search.length > 0 && search.length < 3" class="text-xs text-amber-600 mt-2 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 4h.01M10.29 3.86l-7.4 13a2 2 0 001.74 3h14.74a2 2 0 001.74-3l-7.4-13a2 2 0 00-3.48 0z" />
            </svg>
            Minimal 3 karakter untuk pencarian.
          </p>
        </div>

        <!-- Kelas -->
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-2">Kelas</label>

          <div class="relative">
            <select
              v-model="selectedClass"
              @change="handleFilterChange"
              :disabled="classesLoading"
              class="appearance-none w-full px-4 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 outline-none transition-all focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <option value="">Semua Kelas</option>
              <option v-for="kelas in classes" :key="getClassValue(kelas)" :value="getClassValue(kelas)">
                {{ getClassName(kelas) }}
                <span v-if="kelas.jumlah_siswa != null">({{ kelas.jumlah_siswa }})</span>
              </option>
            </select>

            <svg
              v-if="!classesLoading"
              xmlns="http://www.w3.org/2000/svg" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
            </svg>
            <div v-else class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-slate-300 border-t-indigo-500 animate-spin"></div>
          </div>
        </div>

        <!-- Tingkat -->
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-2">Tingkat</label>

          <div class="relative">
            <select
              v-model="selectedLevel"
              @change="handleFilterChange"
              class="appearance-none w-full px-4 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 outline-none transition-all focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            >
              <option value="">Semua Tingkat</option>
              <option value="1">Tingkat 1</option>
              <option value="2">Tingkat 2</option>
              <option value="3">Tingkat 3</option>
              <option value="4">Tingkat 4</option>
              <option value="5">Tingkat 5</option>
              <option value="6">Tingkat 6</option>
            </select>

            <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Loading (skeleton table) -->
    <div v-if="loading" class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div class="px-5 sm:px-6 py-5 border-b border-slate-100">
        <div class="skeleton-shimmer h-4 w-32 rounded mb-2"></div>
        <div class="skeleton-shimmer h-3 w-20 rounded"></div>
      </div>
      <div class="divide-y divide-slate-100">
        <div v-for="i in 6" :key="i" class="px-5 sm:px-6 py-4 flex items-center gap-3">
          <div class="skeleton-shimmer w-9 h-9 rounded-full shrink-0"></div>
          <div class="flex-1 space-y-2">
            <div class="skeleton-shimmer h-3 w-40 rounded"></div>
            <div class="skeleton-shimmer h-2.5 w-24 rounded"></div>
          </div>
          <div class="skeleton-shimmer h-6 w-16 rounded-full"></div>
        </div>
      </div>
      <div class="px-5 sm:px-6 py-5 flex items-center justify-center gap-2 text-xs text-slate-400">
        <div class="w-4 h-4 rounded-full border-2 border-slate-200 border-t-indigo-500 animate-spin"></div>
        Memuat data siswa...
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="errorMessage" class="bg-white border border-red-200 rounded-2xl shadow-sm p-6 relative overflow-hidden">
      <div class="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-red-50/70 blur-2xl"></div>

      <div class="flex items-start gap-4 relative">
        <div class="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-red-50 to-red-100 text-red-600 flex items-center justify-center ring-1 ring-red-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 4h.01M10.29 3.86l-7.4 13a2 2 0 001.74 3h14.74a2 2 0 001.74 3l-7.4-13a2 2 0 00-3.48 0z" />
          </svg>
        </div>

        <div>
          <h2 class="text-sm font-semibold text-slate-900">Gagal memuat data</h2>
          <p class="text-sm text-slate-500 mt-1">{{ errorMessage }}</p>
        </div>
      </div>
    </div>

    <!-- Table -->
    <section v-else class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-content-in">

      <!-- Table header -->
      <div class="px-5 sm:px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 class="text-base font-semibold text-slate-900">Daftar Siswa</h2>
          <p class="text-xs text-slate-500 mt-1">{{ totalStudents }} siswa terdaftar</p>
        </div>

        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-500 self-start sm:self-auto">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          Data siswa
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="students.length === 0" class="py-16 px-6 text-center">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 text-slate-400 flex items-center justify-center ring-1 ring-slate-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
          </svg>
        </div>

        <p class="text-sm font-semibold text-slate-700 mt-4">Tidak ada data siswa</p>
        <p class="text-xs text-slate-400 mt-1">Coba ubah kata pencarian atau filter yang digunakan.</p>
      </div>

      <!-- Desktop table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50/80 border-b border-slate-100">
              <th class="px-5 sm:px-6 py-3.5 text-left text-[11px] uppercase tracking-wide font-semibold text-slate-500">No</th>
              <th class="px-5 sm:px-6 py-3.5 text-left text-[11px] uppercase tracking-wide font-semibold text-slate-500">Nama Siswa</th>
              <th class="px-5 sm:px-6 py-3.5 text-left text-[11px] uppercase tracking-wide font-semibold text-slate-500">NISN</th>
              <th class="px-5 sm:px-6 py-3.5 text-left text-[11px] uppercase tracking-wide font-semibold text-slate-500">Kelas</th>
              <th class="px-5 sm:px-6 py-3.5 text-left text-[11px] uppercase tracking-wide font-semibold text-slate-500">Jenis Kelamin</th>
              <th class="px-5 sm:px-6 py-3.5 text-right text-[11px] uppercase tracking-wide font-semibold text-slate-500">Aksi</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100">
            <tr v-for="(siswa, index) in students" :key="siswa.peserta_didik_id" class="group hover:bg-indigo-50/30 transition-colors">
              <td class="px-5 sm:px-6 py-4 text-slate-400 text-xs">
                {{ (currentPage - 1) * limit + index + 1 }}
              </td>

              <td class="px-5 sm:px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white flex items-center justify-center text-xs font-bold shadow-sm shadow-indigo-500/30">
                    {{ siswa.nama?.charAt(0)?.toUpperCase() }}
                  </div>

                  <div class="min-w-0">
                    <p class="font-semibold text-slate-800 truncate max-w-[220px]">{{ siswa.nama }}</p>
                    <p class="text-xs text-slate-400 mt-0.5">Peserta didik</p>
                  </div>
                </div>
              </td>

              <td class="px-5 sm:px-6 py-4 text-slate-600">{{ siswa.nisn || '-' }}</td>

              <td class="px-5 sm:px-6 py-4">
                <span class="inline-flex px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold ring-1 ring-indigo-100">
                  {{ siswa.nama_rombel || '-' }}
                </span>
              </td>

              <td class="px-5 sm:px-6 py-4 text-slate-600">{{ siswa.jenis_kelamin || '-' }}</td>

              <td class="px-5 sm:px-6 py-4">
                <div class="flex items-center justify-end gap-1 opacity-90 group-hover:opacity-100">
                  <button
                    @click="openDetail(siswa.peserta_didik_id)"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 hover:bg-indigo-100 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
                      <circle cx="12" cy="12" r="2.5" />
                    </svg>
                    Detail
                  </button>

                  <button
                    v-if="currentUser?.peran_id_str === 'Admin'"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 20h9" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.5a2.12 2.12 0 013 3L8 18l-4 1 1-4L16.5 3.5z" />
                    </svg>
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-5 sm:px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p class="text-xs sm:text-sm text-slate-500">
          Menampilkan
          <span class="font-semibold text-slate-700">{{ students.length }}</span>
          dari
          <span class="font-semibold text-slate-700">{{ totalStudents }}</span>
          siswa
        </p>

        <div class="flex items-center gap-2">
          <button
            @click="goToPreviousPage"
            :disabled="currentPage === 1 || loading"
            class="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Sebelumnya
          </button>

          <span class="px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-50 to-violet-50 text-xs sm:text-sm font-semibold text-indigo-700 ring-1 ring-indigo-100">
            {{ currentPage }} / {{ totalPages }}
          </span>

          <button
            @click="goToNextPage"
            :disabled="currentPage === totalPages || loading"
            class="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Berikutnya
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Detail Modal -->
    <Transition name="modal">
      <div
        v-if="showDetailModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm px-4 py-6"
        @click.self="closeDetail"
      >
        <div class="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
          <!-- Header -->
          <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/60 to-violet-50/60">
            <div>
              <p class="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Informasi</p>
              <h2 class="text-lg font-bold text-slate-900 mt-1">Detail Siswa</h2>
            </div>

            <button
              @click="closeDetail"
              class="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-white hover:text-slate-600 transition"
              aria-label="Tutup"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-6">
            <div v-if="detailLoading" class="py-10 text-center">
              <div class="w-8 h-8 mx-auto mb-3 rounded-full border-4 border-slate-200 border-t-indigo-500 animate-spin"></div>
              <p class="text-sm text-slate-500">Memuat detail siswa...</p>
            </div>

            <div v-else-if="detailError" class="py-10 text-center">
              <p class="text-sm text-red-600">{{ detailError }}</p>
            </div>

            <div v-else-if="selectedStudent" class="space-y-5">
              <!-- Student identity -->
              <div class="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/30">
                  {{ selectedStudent.nama?.charAt(0)?.toUpperCase() }}
                </div>

                <div>
                  <p class="font-semibold text-slate-900">{{ selectedStudent.nama }}</p>
                  <p class="text-xs text-slate-500 mt-1">Peserta didik</p>
                </div>
              </div>

              <!-- Details -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p class="text-xs font-medium text-slate-400">NISN</p>
                  <p class="text-sm font-medium text-slate-800 mt-1">{{ selectedStudent.nisn || '-' }}</p>
                </div>

                <div>
                  <p class="text-xs font-medium text-slate-400">NIPD</p>
                  <p class="text-sm font-medium text-slate-800 mt-1">{{ selectedStudent.nipd || '-' }}</p>
                </div>

                <div>
                  <p class="text-xs font-medium text-slate-400">Kelas</p>
                  <p class="text-sm font-medium text-slate-800 mt-1">{{ selectedStudent.nama_rombel || '-' }}</p>
                </div>

                <div>
                  <p class="text-xs font-medium text-slate-400">Jenis Kelamin</p>
                  <p class="text-sm font-medium text-slate-800 mt-1">{{ selectedStudent.jenis_kelamin || '-' }}</p>
                </div>

                <div class="sm:col-span-2">
                  <p class="text-xs font-medium text-slate-400">Nomor Telepon</p>
                  <p class="text-sm font-medium text-slate-800 mt-1">{{ selectedStudent.nomor_telepon_seluler || '-' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-6 py-4 border-t border-slate-100 flex justify-end">
            <button
              @click="closeDetail"
              class="px-4 py-2.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Tambah Siswa Modal -->
    <Transition name="modal">
      <div
        v-if="showAddModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm px-4 py-6"
        @click.self="closeAddModal"
      >
        <div class="w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/60 to-violet-50/60">
            <div>
              <p class="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Data Siswa</p>
              <h2 class="text-lg font-bold text-slate-900 mt-1">Tambah Siswa</h2>
            </div>

            <button
              @click="closeAddModal"
              class="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-white hover:text-slate-600 transition"
              aria-label="Tutup"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="handleAddStudent" class="p-6 space-y-5">
            <!-- Nama -->
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-2">Nama Siswa</label>
              <input
                v-model="newStudent.nama"
                type="text"
                placeholder="Masukkan nama siswa"
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <!-- NISN + NIPD -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-2">NISN</label>
                <input
                  v-model="newStudent.nisn"
                  type="text"
                  placeholder="Masukkan NISN"
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-2">NIPD</label>
                <input
                  v-model="newStudent.nipd"
                  type="text"
                  placeholder="Masukkan NIPD"
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            <!-- Jenis Kelamin -->
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-2">Jenis Kelamin</label>
              <div class="relative">
                <select
                  v-model="newStudent.jenis_kelamin"
                  class="appearance-none w-full px-4 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>

                <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>

            <!-- Kelas -->
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-2">Kelas</label>
              <input
                v-model="newStudent.nama_rombel"
                type="text"
                placeholder="Contoh: KELAS 5A"
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <!-- Telepon -->
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-2">Nomor Telepon</label>
              <input
                v-model="newStudent.nomor_telepon_seluler"
                type="text"
                placeholder="Masukkan nomor telepon"
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <!-- API Notice -->
            <div class="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 4h.01M10.29 3.86l-7.4 13a2 2 0 001.74 3h14.74a2 2 0 001.74-3l-7.4-13a2 2 0 00-3.48 0z" />
              </svg>
              <p class="text-xs text-amber-700 leading-relaxed">
                Form ini masih tahap UI. Request POST ke backend belum dihubungkan karena format request body endpoint belum tersedia di dokumentasi.
              </p>
            </div>

            <!-- Footer -->
            <div class="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                @click="closeAddModal"
                class="px-4 py-2.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition"
              >
                Batal
              </button>

              <button
                type="submit"
                class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold hover:shadow-md shadow-indigo-500/20 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import api from '../services/api'
import { currentUser } from '../services/authState'

const search = ref('')
const selectedClass = ref('')
const selectedLevel = ref('')

const loading = ref(false)
const errorMessage = ref('')

const students = ref([])

const currentPage = ref(1)
const totalPages = ref(1)
const totalStudents = ref(0)
const limit = ref(20)

const classes = ref([])
const classesLoading = ref(false)

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

let searchTimer = null

const getClassName = (kelas) => {
  return (
    kelas.nama_rombel ||
    kelas.nama_kelas ||
    kelas.kelas ||
    kelas.nama ||
    ''
  )
}

const getClassValue = (kelas) => {
  return getClassName(kelas)
}

const fetchClasses = async () => {
  classesLoading.value = true

  try {
    const response = await api.get('/api/kelas')

    console.log('Response kelas:', response.data)

    const rows =
      response.data.rows ||
      response.data.data ||
      response.data.results ||
      []

    classes.value = Array.isArray(rows) ? rows : []
  } catch (error) {
    console.error('Gagal mengambil data kelas:', error)
  } finally {
    classesLoading.value = false
  }
}

const fetchStudents = async (page = 1) => {
  loading.value = true
  errorMessage.value = ''

  try {
    const params = {
      page,
      limit: limit.value,
    }

    const trimmedSearch = search.value.trim()

    if (trimmedSearch.length >= 3) {
      params.search = trimmedSearch
    }

    if (selectedClass.value) {
      params.kelas = selectedClass.value
    }

    if (selectedLevel.value) {
      params.tingkat = selectedLevel.value
    }

    console.log('Request siswa:', params)

    const response = await api.get('/api/siswa', {
      params,
    })

    console.log('Response siswa:', response.data)

    students.value = response.data.rows || []

    currentPage.value =
      response.data.pagination?.page ||
      page

    totalPages.value =
      response.data.pagination?.total_pages ||
      1

    totalStudents.value =
      response.data.pagination?.total ||
      response.data.results ||
      0
  } catch (error) {
    console.error('Gagal mengambil data siswa:', error)

    errorMessage.value =
      error.response?.data?.message ||
      'Gagal mengambil data siswa.'
  } finally {
    loading.value = false
  }
}

const handleSearchInput = () => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }

  searchTimer = setTimeout(() => {
    const value = search.value.trim()

    if (value.length === 0 || value.length >= 3) {
      currentPage.value = 1
      fetchStudents(1)
    }
  }, 500)
}

const handleFilterChange = () => {
  currentPage.value = 1
  fetchStudents(1)
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
  fetchClasses()
  fetchStudents()
})

onBeforeUnmount(() => {
  if (searchTimer) {
    clearTimeout(searchTimer)
    searchTimer = null
  }
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

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.96) translateY(6px);
  opacity: 0;
}
</style>