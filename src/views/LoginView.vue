<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-xl shadow-md p-8">
      
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-900">
          Sistem Absensi Siswa
        </h1>
        <p class="text-gray-500 mt-2">
          Silakan masuk ke akun Anda
        </p>
      </div>

      <form class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>

          <input
            type="text"
            placeholder="Masukkan username"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Masukkan password"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Masuk
        </button>
      </form>

    </div>
  </div>
</template>