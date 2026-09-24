<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">
        Dashboard
      </h1>

      <p class="text-sm text-gray-500 mt-1">
        Ringkasan absensi siswa hari ini
      </p>
    </div>

    <!-- Statistik Absensi -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

      <!-- Total Siswa -->
      <div class="bg-white rounded-xl shadow-sm p-5">
        <p class="text-sm text-gray-500">
          Total Siswa
        </p>

        <p class="text-3xl font-bold text-gray-900 mt-2">
          350
        </p>
      </div>

      <!-- Hadir -->
      <div class="bg-white rounded-xl shadow-sm p-5">
        <p class="text-sm text-gray-500">
          Hadir
        </p>

        <p class="text-3xl font-bold text-green-600 mt-2">
          320
        </p>
      </div>

      <!-- Terlambat -->
      <div class="bg-white rounded-xl shadow-sm p-5">
        <p class="text-sm text-gray-500">
          Terlambat
        </p>

        <p class="text-3xl font-bold text-yellow-600 mt-2">
          15
        </p>
      </div>

      <!-- Izin -->
      <div class="bg-white rounded-xl shadow-sm p-5">
        <p class="text-sm text-gray-500">
          Izin
        </p>

        <p class="text-3xl font-bold text-blue-600 mt-2">
          5
        </p>
      </div>

      <!-- Sakit -->
      <div class="bg-white rounded-xl shadow-sm p-5">
        <p class="text-sm text-gray-500">
          Sakit
        </p>

        <p class="text-3xl font-bold text-orange-600 mt-2">
          3
        </p>
      </div>

      <!-- Tidak Hadir -->
      <div class="bg-white rounded-xl shadow-sm p-5">
        <p class="text-sm text-gray-500">
          Tidak Hadir
        </p>

        <p class="text-3xl font-bold text-red-600 mt-2">
          7
        </p>
      </div>

    </div>

    <!-- Tren Absensi -->
    <div class="mt-6 bg-white rounded-xl shadow-sm p-6">
      <div class="mb-4">
        <h2 class="text-lg font-semibold text-gray-900">
          Tren Absensi
        </h2>

        <p class="text-sm text-gray-500">
          Ringkasan kehadiran siswa dalam 7 hari terakhir
        </p>
      </div>

      <div class="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
        <p class="text-sm text-gray-400">
          Grafik tren absensi akan ditampilkan di sini
        </p>
      </div>
    </div>
  </div>
</template>