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

              d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"

            />

            <path

              stroke-linecap="round"

              stroke-linejoin="round"

              d="M8 15h2m4 0h2M8 18h2"

            />

          </svg>

        </div>

        <div>

          <h1 class="text-2xl font-bold tracking-tight text-slate-900">

            Riwayat Absensi

          </h1>

          <p class="mt-1 text-sm text-slate-500">

            Lihat dan filter riwayat kehadiran siswa.

          </p>

        </div>

      </div>

    </div>

    <!-- Filter -->

    <section

      class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"

    >

      <div

        class="border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6"

      >

        <div

          class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"

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

                  d="M3 5h18M6 12h12M10 19h4"

                />

              </svg>

            </div>

            <div>

              <h2 class="text-base font-semibold text-slate-900">

                Filter Riwayat

              </h2>

              <p class="mt-0.5 text-xs text-slate-500 sm:text-sm">

                Gunakan filter untuk menemukan data absensi tertentu.

              </p>

            </div>

          </div>

          <span

            v-if="hasActiveFilters"

            class="inline-flex w-fit items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"

          >

            <span class="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>

            Filter aktif

          </span>

        </div>

      </div>

      <div class="p-5 sm:p-6">

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">

          <!-- Tanggal mulai -->

          <div>

            <label

              class="mb-2 block text-sm font-semibold text-slate-700"

            >

              Dari tanggal

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

                    d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"

                  />

                </svg>

              </div>

              <input

                v-model="filters.tanggal_mulai"

                type="date"

                class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"

              />

            </div>

          </div>

          <!-- Tanggal selesai -->

          <div>

            <label

              class="mb-2 block text-sm font-semibold text-slate-700"

            >

              Sampai tanggal

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

                    d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"

                  />

                </svg>

              </div>

              <input

                v-model="filters.tanggal_selesai"

                type="date"

                class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"

              />

            </div>

          </div>

          <!-- Kelas -->

          <div>

            <label

              class="mb-2 block text-sm font-semibold text-slate-700"

            >

              Kelas

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

                    d="M4 19V5a2 2 0 012-2h12a2 2 0 012 2v14M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M9 21h6"

                  />

                </svg>

              </div>

              <input

                v-model="filters.kelas"

                type="text"

                placeholder="Contoh: KELAS 5A"

                class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"

              />

            </div>

          </div>

          <!-- Status -->

          <div>

            <label

              class="mb-2 block text-sm font-semibold text-slate-700"

            >

              Status

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

                    d="M9 11l3 3L22 4"

                  />

                  <path

                    stroke-linecap="round"

                    stroke-linejoin="round"

                    d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"

                  />

                </svg>

              </div>

              <select

                v-model="filters.status"

                class="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"

              >

                <option value="">Semua</option>

                <option value="Hadir">Hadir</option>

                <option value="Terlambat">Terlambat</option>

                <option value="Izin">Izin</option>

                <option value="Sakit">Sakit</option>

                <option value="Tidak Hadir">Tidak Hadir</option>

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

          </div>

          <!-- Keterangan -->

          <div>

            <label class="mb-2 block text-sm font-semibold text-slate-700">Keterangan</label>

            <select v-model="filters.keterangan" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10">

              <option value="">Semua keterangan</option>

              <option value="Izin">Izin</option>

              <option value="Sakit">Sakit</option>

              <option value="Alpha">Alpha</option>

            </select>

          </div>

          <!-- Search -->

          <div>

            <label

              class="mb-2 block text-sm font-semibold text-slate-700"

            >

              Cari siswa

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

                  <circle

                    cx="11"

                    cy="11"

                    r="7"

                  />

                  <path

                    stroke-linecap="round"

                    stroke-linejoin="round"

                    d="M20 20l-4-4"

                  />

                </svg>

              </div>

              <input

                v-model="filters.search"

                @keyup.enter="applyFilters"

                type="text"

                placeholder="Nama / NISN"

                class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"

              />

            </div>

          </div>

        </div>

        <!-- Actions -->

        <div

          class="mt-5 flex flex-col gap-2 border-t border-slate-100 pt-5 sm:flex-row"

        >

          <button

            @click="applyFilters"

            :disabled="loading"

            class="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"

          >

            <svg

              xmlns="http://www.w3.org/2000/svg"

              class="h-4.5 w-4.5"

              fill="none"

              viewBox="0 0 24 24"

              stroke="currentColor"

              stroke-width="1.8"

            >

              <circle

                cx="11"

                cy="11"

                r="7"

              />

              <path

                stroke-linecap="round"

                stroke-linejoin="round"

                d="M20 20l-4-4"

              />

            </svg>

            Terapkan Filter

          </button>

          <button

            @click="resetFilters"

            :disabled="loading"

            class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"

          >

            <svg

              xmlns="http://www.w3.org/2000/svg"

              class="h-4.5 w-4.5"

              fill="none"

              viewBox="0 0 24 24"

              stroke="currentColor"

              stroke-width="1.8"

            >

              <path

                stroke-linecap="round"

                stroke-linejoin="round"

                d="M4 4v5h5M20 20v-5h-5"

              />

              <path

                stroke-linecap="round"

                stroke-linejoin="round"

                d="M6.5 15A7 7 0 0018 8.5M17.5 9A7 7 0 006 15.5"

              />

            </svg>

            Reset

          </button>

        </div>

      </div>

    </section>

    <!-- Summary -->
    <section
      v-if="summary"
      class="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6"
    >
      <!-- Total: klik untuk menghapus filter status/keterangan -->
      <button
        type="button"
        @click="filterByStatus('', '')"
        :disabled="loading"
        class="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:p-5"
        aria-label="Tampilkan semua status absensi"
      >
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Total</p>
        <p class="mt-2 text-2xl font-bold tracking-tight text-slate-900">{{ summary.total_siswa }}</p>
        <p class="mt-1 text-xs text-slate-400">Semua status</p>
      </button>

      <!-- Hadir -->
      <button type="button" @click="filterByStatus('Hadir')" :disabled="loading"
        class="rounded-2xl border border-emerald-100 bg-white p-4 text-left shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:p-5">
        <p class="text-xs font-semibold uppercase tracking-wide text-emerald-600">Hadir</p>
        <p class="mt-2 text-2xl font-bold tracking-tight text-slate-900">{{ summary.hadir }}</p>
        <p class="mt-1 text-xs text-slate-400">Kehadiran normal</p>
      </button>

      <!-- Terlambat -->
      <button type="button" @click="filterByStatus('Terlambat')" :disabled="loading"
        class="rounded-2xl border border-amber-100 bg-white p-4 text-left shadow-sm transition hover:border-amber-300 hover:bg-amber-50/50 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:p-5">
        <p class="text-xs font-semibold uppercase tracking-wide text-amber-600">Terlambat</p>
        <p class="mt-2 text-2xl font-bold tracking-tight text-slate-900">{{ summary.terlambat }}</p>
        <p class="mt-1 text-xs text-slate-400">Hadir terlambat</p>
      </button>

      <!-- Izin -->
      <button type="button" @click="filterByStatus('Tidak Hadir', 'Izin')" :disabled="loading"
        class="rounded-2xl border border-blue-100 bg-white p-4 text-left shadow-sm transition hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:p-5">
        <p class="text-xs font-semibold uppercase tracking-wide text-blue-600">Izin</p>
        <p class="mt-2 text-2xl font-bold tracking-tight text-slate-900">{{ summary.izin }}</p>
        <p class="mt-1 text-xs text-slate-400">Tidak hadir dengan izin</p>
      </button>

      <!-- Sakit -->
      <button type="button" @click="filterByStatus('Tidak Hadir', 'Sakit')" :disabled="loading"
        class="rounded-2xl border border-purple-100 bg-white p-4 text-left shadow-sm transition hover:border-purple-300 hover:bg-purple-50/50 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:p-5">
        <p class="text-xs font-semibold uppercase tracking-wide text-purple-600">Sakit</p>
        <p class="mt-2 text-2xl font-bold tracking-tight text-slate-900">{{ summary.sakit }}</p>
        <p class="mt-1 text-xs text-slate-400">Tidak hadir karena sakit</p>
      </button>

      <!-- Alpha -->
      <button type="button" @click="filterByStatus('Tidak Hadir', 'Alpha')" :disabled="loading"
        class="rounded-2xl border border-red-100 bg-white p-4 text-left shadow-sm transition hover:border-red-300 hover:bg-red-50/50 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:p-5">
        <p class="text-xs font-semibold uppercase tracking-wide text-red-600">Alpha</p>
        <p class="mt-2 text-2xl font-bold tracking-tight text-slate-900">{{ summary.tidak_hadir }}</p>
        <p class="mt-1 text-xs text-slate-400">Tanpa keterangan</p>
      </button>
    </section>

    <!-- Table -->

    <section

      class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"

    >

      <!-- Table Header -->

      <div

        class="flex flex-col gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"

      >

        <div>

          <h2 class="text-base font-semibold text-slate-900">

            Data Riwayat

          </h2>

          <p class="mt-0.5 text-xs text-slate-500 sm:text-sm">

            Daftar kehadiran berdasarkan filter yang dipilih.

          </p>

        </div>

        <div

          v-if="!loading && !errorMessage"

          class="text-xs font-medium text-slate-400"

        >

          {{ rows.length }} data ditampilkan

        </div>

      </div>

      <div

        v-if="deleteError"

        class="border-b border-red-100 bg-red-50 px-5 py-3 text-sm text-red-700 sm:px-6"

      >

        {{ deleteError }}

      </div>

      <!-- Loading -->

      <div

        v-if="loading"

        class="flex flex-col items-center justify-center px-6 py-16 text-center"

      >

        <div

          class="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"

        >

          <svg

            xmlns="http://www.w3.org/2000/svg"

            class="h-6 w-6 animate-spin"

            fill="none"

            viewBox="0 0 24 24"

          >

            <circle

              class="opacity-25"

              cx="12"

              cy="12"

              r="10"

              stroke="currentColor"

              stroke-width="2"

            />

            <path

              class="opacity-75"

              fill="currentColor"

              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"

            />

          </svg>

        </div>

        <p class="mt-4 text-sm font-semibold text-slate-700">

          Memuat riwayat absensi

        </p>

        <p class="mt-1 text-xs text-slate-400">

          Mohon tunggu sebentar...

        </p>

      </div>

      <!-- Error -->

      <div

        v-else-if="errorMessage"

        class="flex flex-col items-center justify-center px-6 py-16 text-center"

      >

        <div

          class="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600"

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

              d="M12 9v3m0 4h.01M10.29 3.86l-7.5 13A2 2 0 004.53 20h14.94a2 2 0 001.74-3.14l-7.5-13a2 2 0 00-3.42 0z"

            />

          </svg>

        </div>

        <p class="mt-4 text-sm font-semibold text-slate-800">

          Gagal memuat data

        </p>

        <p class="mt-1 max-w-md text-sm text-red-600">

          {{ errorMessage }}

        </p>

        <button

          @click="fetchAttendance"

          class="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"

        >

          Coba Lagi

        </button>

      </div>

      <!-- Empty -->

      <div

        v-else-if="rows.length === 0"

        class="flex flex-col items-center justify-center px-6 py-16 text-center"

      >

        <div

          class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400"

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

              d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"

            />

          </svg>

        </div>

        <p class="mt-4 text-sm font-semibold text-slate-700">

          Tidak ada data absensi

        </p>

        <p class="mt-1 max-w-sm text-xs leading-5 text-slate-400">

          Tidak ditemukan riwayat yang sesuai dengan filter saat ini.

        </p>

      </div>

      <!-- Data -->

      <div v-else class="overflow-x-auto">

        <table class="min-w-[900px] w-full text-sm">

          <thead>

            <tr class="border-b border-slate-100 bg-white">

              <th

                class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-400"

              >

                Nama

              </th>

              <th

                class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-400"

              >

                NISN

              </th>

              <th

                class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-400"

              >

                Kelas

              </th>

              <th

                class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-400"

              >

                Tanggal

              </th>

              <th

                class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-400"

              >

                Waktu

              </th>

              <th

                class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-400"

              >

                Status

              </th>

              <th

                class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-400"

              >

                Metode

              </th>

              <th

                v-if="currentUser?.peran_id_str === 'Admin'"

                class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-400"

              >

                Aksi

              </th>

            </tr>

          </thead>

          <tbody class="divide-y divide-slate-100">

            <tr

              v-for="row in rows"

              :key="row.absensi_id"

              class="group transition hover:bg-slate-50/80"

            >

              <!-- Nama -->

              <td class="px-5 py-4">

                <div class="flex items-center gap-3">

                  <div

                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600"

                  >

                    {{ getInitials(row.nama) }}

                  </div>

                  <div class="min-w-0">

                    <p class="truncate font-semibold text-slate-800">

                      {{ row.nama }}

                    </p>

                  </div>

                </div>

              </td>

              <!-- NISN -->

              <td class="px-5 py-4 text-slate-600">

                {{ row.nisn || '-' }}

              </td>

              <!-- Kelas -->

              <td class="px-5 py-4">

                <span

                  class="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"

                >

                  {{ row.nama_rombel || '-' }}

                </span>

              </td>

              <!-- Tanggal -->

              <td class="px-5 py-4 whitespace-nowrap text-slate-600">

                {{ row.tanggal || '-' }}

              </td>

              <!-- Waktu -->

              <td class="px-5 py-4 whitespace-nowrap">

                <span class="font-medium text-slate-700">

                  {{ row.jam_absen || formatTime(row.waktu_absen) }}

                </span>

              </td>

              <!-- Status -->

              <td class="px-5 py-4">

                <span

                  class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"

                  :class="statusClass(row)"

                >

                  <span

                    class="h-1.5 w-1.5 rounded-full"

                    :class="statusDotClass(row)"

                  ></span>

                  {{ attendanceBadgeLabel(row) }}

                </span>

              </td>

              <!-- Metode -->

              <td class="px-5 py-4">

                <span

                  class="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500"

                >

                  <svg

                    v-if="row.metode === 'scan'"

                    xmlns="http://www.w3.org/2000/svg"

                    class="h-4 w-4 text-indigo-500"

                    fill="none"

                    viewBox="0 0 24 24"

                    stroke="currentColor"

                    stroke-width="1.8"

                  >

                    <rect

                      x="4"

                      y="4"

                      width="6"

                      height="6"

                      rx="1"

                    />

                    <rect

                      x="14"

                      y="4"

                      width="6"

                      height="6"

                      rx="1"

                    />

                    <rect

                      x="4"

                      y="14"

                      width="6"

                      height="6"

                      rx="1"

                    />

                    <path

                      stroke-linecap="round"

                      stroke-linejoin="round"

                      d="M14 14h2v2h-2m4 0h2v4h-4v-2m0-4h2"

                    />

                  </svg>

                  <svg

                    v-else

                    xmlns="http://www.w3.org/2000/svg"

                    class="h-4 w-4 text-slate-400"

                    fill="none"

                    viewBox="0 0 24 24"

                    stroke="currentColor"

                    stroke-width="1.8"

                  >

                    <path

                      stroke-linecap="round"

                      stroke-linejoin="round"

                      d="M12 11a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0"

                    />

                  </svg>

                  {{ row.metode === 'scan' ? 'Scan QR' : row.metode === 'sistem' ? 'Sistem' : row.metode === 'manual' ? 'Manual' : (row.metode || '-') }}

                </span>

              </td>

              <!-- Aksi -->

              <td

                v-if="currentUser?.peran_id_str === 'Admin'"

                class="px-5 py-4"

              >

                <button

                  type="button"

                  @click="handleEditAttendance(row)"

                  class="mr-2 inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-50"

                >

                  Edit

                </button>

                <button

                  type="button"

                  @click="handleSendWhatsApp(row)"

                  :disabled="sendingWhatsAppId === row.absensi_id"

                  class="mr-2 inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50 disabled:opacity-50"

                >

                  {{ sendingWhatsAppId === row.absensi_id ? 'Mengirim...' : 'Kirim WA' }}

                </button>

                <button

                  type="button"

                  @click="handleDeleteAttendance(row)"

                  :disabled="deletingId === row.absensi_id"

                  class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"

                >

                  <svg

                    v-if="deletingId !== row.absensi_id"

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

                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m-4 0h14"

                    />

                  </svg>

                  <svg

                    v-else

                    class="h-4 w-4 animate-spin"

                    xmlns="http://www.w3.org/2000/svg"

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

                  {{ deletingId === row.absensi_id ? 'Menghapus...' : 'Hapus' }}

                </button>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

      <!-- Pagination -->

      <div

        v-if="!loading && !errorMessage && rows.length > 0"

        class="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"

      >

        <div>

          <p class="text-xs text-slate-400 sm:text-sm">

            Halaman

            <span class="font-semibold text-slate-700">

              {{ currentPage }}

            </span>

            dari

            <span class="font-semibold text-slate-700">

              {{ totalPages }}

            </span>

          </p>

        </div>

        <div class="flex items-center gap-2">

          <button

            @click="previousPage"

            :disabled="currentPage === 1 || loading"

            class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"

          >

            <svg

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

                d="M15 19l-7-7 7-7"

              />

            </svg>

            Sebelumnya

          </button>

          <button

            @click="nextPage"

            :disabled="currentPage === totalPages || loading"

            class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"

          >

            Berikutnya

            <svg

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

                d="M9 5l7 7-7 7"

              />

            </svg>

          </button>

        </div>

      </div>

    </section>

    <!-- Modal Edit Absensi -->

    <div v-if="editingAttendance" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" @click.self="closeEditModal">

      <section class="w-full max-w-lg rounded-2xl bg-white shadow-xl">

        <div class="flex items-start justify-between border-b border-slate-100 px-5 py-4 sm:px-6">

          <div>

            <h2 class="text-lg font-bold text-slate-900">Edit Absensi</h2>

            <p class="mt-1 text-sm text-slate-500">{{ editingAttendance.nama }}</p>

          </div>

          <button type="button" @click="closeEditModal" :disabled="savingEdit" class="rounded-lg px-3 py-1 text-xl text-slate-400 hover:bg-slate-100 disabled:opacity-50" aria-label="Tutup">×</button>

        </div>

        <form class="space-y-5 p-5 sm:p-6" @submit.prevent="saveEditAttendance">

          <div>

            <label class="mb-2 block text-sm font-semibold text-slate-700">Status kehadiran</label>

            <select v-model="editForm.status" @change="handleEditStatusChange" required class="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10">

              <option value="Hadir">Hadir</option>

              <option value="Terlambat">Terlambat</option>

              <option value="Tidak Hadir">Tidak Hadir</option>

            </select>

          </div>

          <div v-if="editForm.status === 'Tidak Hadir'">

            <label class="mb-2 block text-sm font-semibold text-slate-700">Keterangan</label>

            <select v-model="editForm.keterangan" required class="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10">

              <option value="">Pilih keterangan</option>

              <option value="Izin">Izin</option>

              <option value="Sakit">Sakit</option>

              <option value="Alpha">Alpha</option>

            </select>

          </div>

          <div v-if="editError" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{{ editError }}</div>

          <div class="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">

            <button type="button" @click="closeEditModal" :disabled="savingEdit" class="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50">Batal</button>

            <button type="submit" :disabled="savingEdit || (editForm.status === 'Tidak Hadir' && !editForm.keterangan)" class="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">{{ savingEdit ? 'Menyimpan...' : 'Simpan Perubahan' }}</button>

          </div>

        </form>

      </section>

    </div>

  </div>

</template>

<script setup>

import { ref, computed, onMounted } from 'vue'

import api from '../services/api'

import { currentUser } from '../services/authState'

const rows = ref([])

const summary = ref(null)

const loading = ref(false)

const errorMessage = ref('')

const deletingId = ref('')

const deleteError = ref('')

const sendingWhatsAppId = ref('')

const editingAttendance = ref(null)

const savingEdit = ref(false)

const editError = ref('')

const editForm = ref({ status: 'Hadir', keterangan: '' })

const currentPage = ref(1)

const totalPages = ref(1)

const filters = ref({

  tanggal_mulai: '',

  tanggal_selesai: '',

  kelas: '',

  status: '',

  keterangan: '',

  search: '',

})

const hasActiveFilters = computed(() => {

  return (

    filters.value.tanggal_mulai ||

    filters.value.tanggal_selesai ||

    filters.value.kelas ||

    filters.value.status ||

    filters.value.keterangan ||

    filters.value.search.trim()

  )

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

    if (filters.value.search.trim()) {

      params.search = filters.value.search.trim()

    }

    if (filters.value.keterangan) {

      params.keterangan = filters.value.keterangan

    }

    const response = await api.get('/api/absensi', {

      params,

    })

    rows.value = response.data.rows

    summary.value = response.data.ringkasan

    const limit = response.data.pagination?.limit || 50

    const results = response.data.results || 0

    totalPages.value = Math.max(

      1,

      Math.ceil(results / limit)

    )

  } catch (error) {

    console.error('Gagal mengambil riwayat absensi:', error)

    errorMessage.value =

      error.response?.data?.message ||

      error.response?.data?.error ||

      'Gagal mengambil riwayat absensi.'

  } finally {

    loading.value = false

  }

}

const handleEditAttendance = (row) => {

  if (!row?.absensi_id) {

    window.alert('ID absensi tidak ditemukan. Data ini tidak bisa diedit.')

    return

  }

  editingAttendance.value = row

  editError.value = ''

  const status = row.status || ''

  const isAbsent = ['Tidak Hadir', 'Izin', 'Sakit', 'Alpha', 'Alfa'].includes(status)

  editForm.value = {

    status: isAbsent ? 'Tidak Hadir' : (['Hadir', 'Terlambat'].includes(status) ? status : 'Hadir'),

    keterangan: ['Izin', 'Sakit', 'Alpha', 'Alfa'].includes(status)

      ? (status === 'Alfa' ? 'Alpha' : status)

      : (row.keterangan === 'Alfa' ? 'Alpha' : (row.keterangan || '')),

  }

}

const handleEditStatusChange = () => {

  if (editForm.value.status !== 'Tidak Hadir') {

    editForm.value.keterangan = ''

  } else if (!editForm.value.keterangan) {

    editForm.value.keterangan = 'Alpha'

  }

}

const closeEditModal = () => {

  if (savingEdit.value) return

  editingAttendance.value = null

  editError.value = ''

}

const saveEditAttendance = async () => {

  const row = editingAttendance.value

  if (!row?.absensi_id || savingEdit.value) return

  if (editForm.value.status === 'Tidak Hadir' && !editForm.value.keterangan) {

    editError.value = 'Pilih keterangan Izin, Sakit, atau Alpha.'

    return

  }

  const payload = { status: editForm.value.status }

  if (editForm.value.status === 'Tidak Hadir') {

    payload.keterangan = editForm.value.keterangan

  }

  savingEdit.value = true

  editError.value = ''

  try {

    await api.put(`/api/absensi/${row.absensi_id}`, payload)

    editingAttendance.value = null

    await fetchAttendance()

    window.alert('Perubahan absensi berhasil disimpan.')

  } catch (error) {

    console.error('Gagal mengedit absensi:', error)

    editError.value =

      error.response?.data?.message ||

      error.response?.data?.error ||

      'Gagal menyimpan perubahan absensi. Periksa koneksi atau hak akses akun.'

  } finally {

    savingEdit.value = false

  }

}

const handleSendWhatsApp = async (row) => {

  if (!window.confirm(`Kirim notifikasi WhatsApp untuk ${row.nama || 'siswa ini'}?`)) return

  sendingWhatsAppId.value = row.absensi_id

  try {

    await api.post(`/api/notifikasi/kirim/${row.absensi_id}`)

    window.alert('Permintaan pengiriman WhatsApp berhasil dikirim ke backend.')

  } catch (error) {

    window.alert(error.response?.data?.message || error.response?.data?.error || 'Gagal mengirim WhatsApp. Periksa konfigurasi backend.')

  } finally { sendingWhatsAppId.value = '' }

}

const handleDeleteAttendance = async (row) => {

  if (!row?.absensi_id) return

  const confirmed = window.confirm(

    `Hapus riwayat absensi ${row.nama || 'siswa ini'}?`

  )

  if (!confirmed) return

  deleteError.value = ''

  deletingId.value = row.absensi_id

  try {

    await api.delete(`/api/absensi/${row.absensi_id}`)

    rows.value = rows.value.filter(

      (item) => item.absensi_id !== row.absensi_id

    )

    if (rows.value.length === 0 && currentPage.value > 1) {

      currentPage.value--

    }

    await fetchAttendance()

  } catch (error) {

    console.error('Gagal menghapus riwayat absensi:', error)

    deleteError.value =

      error.response?.data?.message ||

      error.response?.data?.error ||

      'Gagal menghapus riwayat absensi.'

  } finally {

    deletingId.value = ''

  }

}

const formatTime = (value) => {

  if (!value) return '-'

  return new Date(value).toLocaleTimeString('id-ID', {

    hour: '2-digit',

    minute: '2-digit',

  })

}

const getInitials = (name) => {

  if (!name) return '?'

  return name

    .trim()

    .split(/\s+/)

    .slice(0, 2)

    .map((word) => word.charAt(0))

    .join('')

    .toUpperCase()

}

const applyFilters = async () => {

  currentPage.value = 1

  await fetchAttendance()

}

const filterByStatus = async (status, keterangan = '') => {
  filters.value.status = status
  filters.value.keterangan = keterangan
  currentPage.value = 1
  await fetchAttendance()
}

const resetFilters = async () => {

  filters.value = {

    tanggal_mulai: '',

    tanggal_selesai: '',

    kelas: '',

    status: '',

    keterangan: '',

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

const getAttendanceBadgeType = (row) => {
  const status = String(row?.status || row?.label_status || '').trim().toLowerCase()
  const keterangan = String(row?.keterangan || '').trim().toLowerCase()

  if (keterangan === 'izin') return 'izin'
  if (keterangan === 'sakit') return 'sakit'
  if (keterangan === 'alpha') return 'alpha'
  if (status === 'hadir') return 'hadir'
  if (status === 'terlambat') return 'terlambat'
  return 'tidak-hadir'
}

const attendanceBadgeLabel = (row) => {
  const keterangan = String(row?.keterangan || '').trim()
  if (['Izin', 'Sakit', 'Alpha'].includes(keterangan.toLowerCase().replace(/^./, (c) => c.toUpperCase()))) {
    return keterangan.charAt(0).toUpperCase() + keterangan.slice(1).toLowerCase()
  }
  return row?.label_status || row?.status || '-'
}

const statusClass = (row) => {
  const type = getAttendanceBadgeType(row)
  if (type === 'hadir') return 'bg-emerald-50 text-emerald-700'
  if (type === 'terlambat') return 'bg-amber-50 text-amber-700'
  if (type === 'izin') return 'bg-blue-50 text-blue-700'
  if (type === 'sakit') return 'bg-purple-50 text-purple-700'
  return 'bg-red-50 text-red-700'
}

const statusDotClass = (row) => {
  const type = getAttendanceBadgeType(row)
  if (type === 'hadir') return 'bg-emerald-500'
  if (type === 'terlambat') return 'bg-amber-500'
  if (type === 'izin') return 'bg-blue-500'
  if (type === 'sakit') return 'bg-purple-500'
  return 'bg-red-500'
}

onMounted(() => {

  fetchAttendance()

})

</script>