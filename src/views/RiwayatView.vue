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
      class="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5"
    >
      <!-- Total -->
      <div
        class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Total
            </p>

            <p class="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              {{ summary.total_siswa }}
            </p>

            <p class="mt-1 text-xs text-slate-400">
              Data siswa
            </p>
          </div>

          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600"
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
        </div>
      </div>

      <!-- Hadir -->
      <div
        class="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-5"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-emerald-600">
              Hadir
            </p>

            <p class="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              {{ summary.hadir }}
            </p>

            <p class="mt-1 text-xs text-slate-400">
              Kehadiran normal
            </p>
          </div>

          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"
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
        </div>
      </div>

      <!-- Terlambat -->
      <div
        class="rounded-2xl border border-amber-100 bg-white p-4 shadow-sm sm:p-5"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-amber-600">
              Terlambat
            </p>

            <p class="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              {{ summary.terlambat }}
            </p>

            <p class="mt-1 text-xs text-slate-400">
              Hadir terlambat
            </p>
          </div>

          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600"
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
                cx="12"
                cy="12"
                r="9"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 7v5l3 2"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Izin / Sakit -->
      <div
        class="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm sm:p-5"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Izin / Sakit
            </p>

            <p class="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              {{ summary.izin + summary.sakit }}
            </p>

            <p class="mt-1 text-xs text-slate-400">
              Ketidakhadiran resmi
            </p>
          </div>

          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600"
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
                d="M9 12h6M9 16h6M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Tidak Hadir -->
      <div
        class="rounded-2xl border border-red-100 bg-white p-4 shadow-sm sm:p-5"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-red-600">
              Tidak Hadir
            </p>

            <p class="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              {{ summary.tidak_hadir }}
            </p>

            <p class="mt-1 text-xs text-slate-400">
              Tanpa keterangan
            </p>
          </div>

          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600"
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
                d="M6 6l12 12M18 6L6 18"
              />
            </svg>
          </div>
        </div>
      </div>
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
                  {{ formatTime(row.waktu_absen) }}
                </span>
              </td>

              <!-- Status -->
              <td class="px-5 py-4">
                <span
                  class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                  :class="statusClass(row.status)"
                >
                  <span
                    class="h-1.5 w-1.5 rounded-full"
                    :class="statusDotClass(row.status)"
                  ></span>

                  {{ row.status }}
                </span>
              </td>

              <!-- Metode -->
              <td class="px-5 py-4">
                <span
                  class="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500"
                >
                  <svg
                    v-if="row.metode === 'QR'"
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

                  {{ row.metode || '-' }}
                </span>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'

const rows = ref([])
const summary = ref(null)

const loading = ref(false)
const errorMessage = ref('')

const currentPage = ref(1)
const totalPages = ref(1)

const filters = ref({
  tanggal_mulai: '',
  tanggal_selesai: '',
  kelas: '',
  status: '',
  search: '',
})

const hasActiveFilters = computed(() => {
  return (
    filters.value.tanggal_mulai ||
    filters.value.tanggal_selesai ||
    filters.value.kelas ||
    filters.value.status ||
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

    if (filters.value.search.trim().length >= 3) {
      params.search = filters.value.search.trim()
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

const resetFilters = async () => {
  filters.value = {
    tanggal_mulai: '',
    tanggal_selesai: '',
    kelas: '',
    status: '',
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

const statusClass = (status) => {
  if (status === 'Hadir') {
    return 'bg-emerald-50 text-emerald-700'
  }

  if (status === 'Terlambat') {
    return 'bg-amber-50 text-amber-700'
  }

  if (status === 'Izin') {
    return 'bg-blue-50 text-blue-700'
  }

  if (status === 'Sakit') {
    return 'bg-purple-50 text-purple-700'
  }

  return 'bg-red-50 text-red-700'
}

const statusDotClass = (status) => {
  if (status === 'Hadir') {
    return 'bg-emerald-500'
  }

  if (status === 'Terlambat') {
    return 'bg-amber-500'
  }

  if (status === 'Izin') {
    return 'bg-blue-500'
  }

  if (status === 'Sakit') {
    return 'bg-purple-500'
  }

  return 'bg-red-500'
}

onMounted(() => {
  fetchAttendance()
})
</script>