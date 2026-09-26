<template>
  <div class="space-y-6">
    <!-- Header -->
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
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
                d="M15 9h.01M9 9h.01M7 16h10M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          <div>
            <h1 class="text-2xl font-bold tracking-tight text-slate-900">
              Kartu Siswa
            </h1>
            <p class="mt-1 text-sm text-slate-500">
              Generate kartu siswa dengan QR Code.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Card -->
    <section
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <!-- Section Header -->
      <div
        class="border-b border-slate-100 bg-slate-50/70 px-5 py-5 sm:px-6"
      >
        <div class="flex items-start gap-3">
          <div
            class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600"
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
                d="M3 7.5A2.5 2.5 0 015.5 5h13A2.5 2.5 0 0121 7.5v9a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 16.5v-9z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 9h3M7 12h3M7 15h6"
              />
            </svg>
          </div>

          <div>
            <h2 class="text-base font-semibold text-slate-900">
              Generate Kartu
            </h2>
            <p class="mt-1 text-sm text-slate-500">
              Pilih generate untuk satu siswa atau beberapa siswa sekaligus.
            </p>
          </div>
        </div>
      </div>

      <!-- Generate Options -->
      <div class="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-2">
        <!-- Single -->
        <div
          class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md sm:p-6"
        >
          <div
            class="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-indigo-50 transition group-hover:scale-110"
          ></div>

          <div class="relative">
            <div
              class="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"
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
                  d="M15 19a6 6 0 00-12 0M9 13a4 4 0 100-8 4 4 0 000 8zM17 11a3 3 0 10-2.83-4M21 19a5 5 0 00-4-4.9"
                />
              </svg>
            </div>

            <h3 class="text-base font-semibold text-slate-900">
              Kartu Satu Siswa
            </h3>

            <p class="mt-1.5 max-w-md text-sm leading-6 text-slate-500">
              Pilih satu siswa untuk membuat dan membuka kartu siswa dalam
              format PDF.
            </p>

            <button
              @click="openStudentModal"
              class="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98]"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Pilih Siswa
            </button>
          </div>
        </div>

        <!-- Bulk -->
        <div
          class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md sm:p-6"
        >
          <div
            class="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-indigo-50 transition group-hover:scale-110"
          ></div>

          <div class="relative">
            <div
              class="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"
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
                  d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                />
              </svg>
            </div>

            <h3 class="text-base font-semibold text-slate-900">
              Kartu Massal
            </h3>

            <p class="mt-1.5 max-w-md text-sm leading-6 text-slate-500">
              Generate kartu untuk seluruh siswa, berdasarkan kelas, atau
              berdasarkan tingkat.
            </p>

            <button
              @click="openBulkModal"
              class="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98]"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Generate Massal
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Student Modal -->
    <div
      v-if="showStudentModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      @click.self="closeStudentModal"
    >
      <div
        class="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <!-- Header -->
        <div
          class="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6"
        >
          <div class="flex min-w-0 items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"
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
                  d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div class="min-w-0">
              <h2 class="truncate text-base font-semibold text-slate-900">
                Pilih Siswa
              </h2>
              <p class="mt-0.5 text-xs text-slate-500 sm:text-sm">
                Cari berdasarkan nama atau NISN.
              </p>
            </div>
          </div>

          <button
            @click="closeStudentModal"
            class="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Tutup"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Search -->
        <div
          class="shrink-0 border-b border-slate-100 bg-slate-50/60 px-5 py-4 sm:px-6"
        >
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
                  d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              v-model="search"
              @input="handleSearch"
              type="text"
              placeholder="Cari nama atau NISN..."
              class="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          <p class="mt-2 text-xs text-slate-400">
            Pencarian akan dijalankan setelah minimal 3 karakter.
          </p>
        </div>

        <!-- Content -->
        <div class="min-h-0 flex-1 overflow-y-auto">
          <!-- Loading -->
          <div
            v-if="studentLoading"
            class="flex flex-col items-center justify-center px-6 py-16"
          >
            <div
              class="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600"
            ></div>

            <p class="mt-4 text-sm font-medium text-slate-600">
              Memuat data siswa...
            </p>
            <p class="mt-1 text-xs text-slate-400">
              Mohon tunggu sebentar.
            </p>
          </div>

          <!-- Error -->
          <div
            v-else-if="studentError"
            class="mx-5 my-5 rounded-xl border border-red-200 bg-red-50 p-4 sm:mx-6"
          >
            <div class="flex items-start gap-3">
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
                  Gagal memuat data
                </p>
                <p class="mt-1 text-sm text-red-700">
                  {{ studentError }}
                </p>
              </div>
            </div>
          </div>

          <!-- Empty -->
          <div
            v-else-if="students.length === 0"
            class="flex flex-col items-center justify-center px-6 py-16 text-center"
          >
            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 19a6 6 0 00-12 0M9 13a4 4 0 100-8 4 4 0 000 8zM17 11a3 3 0 10-2.83-4M21 19a5 5 0 00-4-4.9"
                />
              </svg>
            </div>

            <p class="mt-4 text-sm font-semibold text-slate-700">
              Tidak ada data siswa
            </p>
            <p class="mt-1 max-w-xs text-xs leading-5 text-slate-400">
              Coba gunakan nama atau NISN yang berbeda.
            </p>
          </div>

          <!-- Table -->
          <div v-else class="p-4 sm:p-6">
            <div
              class="overflow-hidden rounded-xl border border-slate-200"
            >
              <div class="overflow-x-auto">
                <table class="w-full min-w-[650px] text-sm">
                  <thead class="border-b border-slate-200 bg-slate-50">
                    <tr>
                      <th
                        class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                      >
                        Nama
                      </th>

                      <th
                        class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                      >
                        NISN
                      </th>

                      <th
                        class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                      >
                        Kelas
                      </th>

                      <th
                        class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500"
                      >
                        Aksi
                      </th>
                    </tr>
                  </thead>

                  <tbody class="divide-y divide-slate-100">
                    <tr
                      v-for="siswa in students"
                      :key="siswa.peserta_didik_id"
                      class="transition hover:bg-slate-50/80"
                    >
                      <td class="px-4 py-3.5">
                        <div class="flex items-center gap-3">
                          <div
                            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600"
                          >
                            {{ siswa.nama?.charAt(0)?.toUpperCase() || '?' }}
                          </div>

                          <div class="min-w-0">
                            <p
                              class="truncate font-medium text-slate-800"
                            >
                              {{ siswa.nama }}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td class="whitespace-nowrap px-4 py-3.5 text-slate-600">
                        {{ siswa.nisn || '-' }}
                      </td>

                      <td class="whitespace-nowrap px-4 py-3.5">
                        <span
                          class="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                        >
                          {{ siswa.nama_rombel || '-' }}
                        </span>
                      </td>

                      <td class="px-4 py-3.5 text-right">
                        <button
                          @click="selectStudent(siswa)"
                          class="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-3.5 w-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 12H9m6 0l-3-3m3 3l-3 3"
                            />
                          </svg>
                          Pilih
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div
          v-if="
            !studentLoading &&
            !studentError &&
            students.length > 0
          "
          class="flex shrink-0 flex-col gap-3 border-t border-slate-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <p class="text-xs text-slate-500 sm:text-sm">
            Halaman
            <span class="font-semibold text-slate-700">
              {{ currentPage }}
            </span>
            dari
            <span class="font-semibold text-slate-700">
              {{ totalPages }}
            </span>
          </p>

          <div class="flex gap-2">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Sebelumnya
            </button>

            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
            >
              Berikutnya
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bulk Modal -->
    <div
      v-if="showBulkModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      @click.self="closeBulkModal"
    >
      <div
        class="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"
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
                  d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                />
              </svg>
            </div>

            <div>
              <h2 class="text-base font-semibold text-slate-900">
                Generate Kartu Massal
              </h2>
              <p class="mt-0.5 text-xs text-slate-500 sm:text-sm">
                Tentukan siswa yang ingin dibuatkan kartu.
              </p>
            </div>
          </div>

          <button
            @click="closeBulkModal"
            :disabled="bulkLoading"
            class="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Tutup"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <div class="space-y-3 p-5 sm:p-6">
          <p class="mb-4 text-sm text-slate-500">
            Pilih salah satu metode generate berikut.
          </p>

          <!-- All -->
          <label
            class="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition"
            :class="
              bulkMode === 'all'
                ? 'border-indigo-200 bg-indigo-50/60'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            "
          >
            <input
              v-model="bulkMode"
              type="radio"
              value="all"
              class="mt-1 h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />

            <div>
              <p class="text-sm font-semibold text-slate-800">
                Semua siswa
              </p>
              <p class="mt-1 text-xs leading-5 text-slate-500">
                Generate kartu untuk seluruh siswa yang tersedia.
              </p>
            </div>
          </label>

          <!-- Class -->
          <label
            class="block cursor-pointer rounded-xl border p-4 transition"
            :class="
              bulkMode === 'class'
                ? 'border-indigo-200 bg-indigo-50/60'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            "
          >
            <div class="flex items-start gap-3">
              <input
                v-model="bulkMode"
                type="radio"
                value="class"
                class="mt-1 h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />

              <div class="flex-1">
                <p class="text-sm font-semibold text-slate-800">
                  Berdasarkan kelas
                </p>
                <p class="mt-1 text-xs leading-5 text-slate-500">
                  Generate kartu untuk siswa pada kelas tertentu.
                </p>

                <input
                  v-model="bulkKelas"
                  :disabled="bulkMode !== 'class'"
                  type="text"
                  placeholder="Contoh: KELAS 5A"
                  class="mt-3 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                />
              </div>
            </div>
          </label>

          <!-- Level -->
          <label
            class="block cursor-pointer rounded-xl border p-4 transition"
            :class="
              bulkMode === 'level'
                ? 'border-indigo-200 bg-indigo-50/60'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            "
          >
            <div class="flex items-start gap-3">
              <input
                v-model="bulkMode"
                type="radio"
                value="level"
                class="mt-1 h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />

              <div class="flex-1">
                <p class="text-sm font-semibold text-slate-800">
                  Berdasarkan tingkat
                </p>
                <p class="mt-1 text-xs leading-5 text-slate-500">
                  Generate kartu berdasarkan tingkat kelas.
                </p>

                <select
                  v-model="bulkTingkat"
                  :disabled="bulkMode !== 'level'"
                  class="mt-3 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
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
            </div>
          </label>

          <!-- Error -->
          <div
            v-if="bulkError"
            class="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mt-0.5 h-5 w-5 shrink-0 text-red-500"
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

            <p class="text-sm text-red-700">
              {{ bulkError }}
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:flex-row sm:justify-end sm:px-6"
        >
          <button
            @click="closeBulkModal"
            :disabled="bulkLoading"
            class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Batal
          </button>

          <button
            @click="generateBulk"
            :disabled="bulkLoading"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg
              v-if="bulkLoading"
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
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
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3v12m0 0l4-4m-4 4l-4-4M5 21h14"
              />
            </svg>

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

    students.value = response.data.rows || []
    totalPages.value =
      response.data.pagination?.total_pages || 1
  } catch (error) {
    console.error('Gagal mengambil data siswa:', error)

    studentError.value =
      error.response?.data?.message ||
      'Gagal mengambil data siswa.'
  } finally {
    studentLoading.value = false
  }
}

const handleSearch = () => {
  clearTimeout(searchTimeout)

  if (
    search.value.trim().length > 0 &&
    search.value.trim().length < 3
  ) {
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

const fetchAllStudentIds = async (params = {}) => {
  const allIds = []
  let page = 1
  const limit = 100

  while (true) {
    const response = await api.get('/api/siswa', {
      params: {
        ...params,
        page,
        limit,
      },
    })

    const rows = response.data.rows || []

    allIds.push(
      ...rows
        .map((siswa) => siswa.peserta_didik_id)
        .filter(Boolean)
    )

    const totalPages =
      response.data.pagination?.total_pages || 1

    if (page >= totalPages || rows.length === 0) {
      break
    }

    page++
  }

  return allIds
}

const generateBulk = async () => {
  bulkError.value = ''

  if (
    bulkMode.value === 'class' &&
    !bulkKelas.value.trim()
  ) {
    bulkError.value = 'Masukkan nama kelas terlebih dahulu.'
    return
  }

  if (
    bulkMode.value === 'level' &&
    !bulkTingkat.value
  ) {
    bulkError.value = 'Pilih tingkat terlebih dahulu.'
    return
  }

  bulkLoading.value = true

  try {
    let payload

    if (bulkMode.value === 'class') {
      payload = {
        kelas: bulkKelas.value.trim(),
      }
    } else {
      const params = {}

      if (bulkMode.value === 'level') {
        params.tingkat = bulkTingkat.value
      }

      const siswaIds = await fetchAllStudentIds(params)

      if (siswaIds.length === 0) {
        bulkError.value = 'Tidak ada siswa yang ditemukan.'
        return
      }

      payload = {
        siswa_ids: siswaIds,
      }
    }

    console.log('Payload kartu bulk:', payload)

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

    bulkError.value =
      error.response?.data?.message ||
      'Gagal membuat kartu massal.'
  } finally {
    bulkLoading.value = false
  }
}
</script>