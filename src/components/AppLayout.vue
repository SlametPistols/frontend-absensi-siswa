<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Overlay untuk mobile saat sidebar terbuka -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 bg-black/40 z-20 md:hidden"
    ></div>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed md:static z-30 top-0 left-0 h-full w-64 bg-slate-800 text-slate-100 flex flex-col transition-transform duration-200',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      ]"
    >
      <div class="px-5 py-4 text-lg font-semibold border-b border-slate-700">
        Absen
      </div>

      <nav class="flex-1 px-3 py-4 space-y-1">
        <RouterLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          @click="sidebarOpen = false"
          class="block px-3 py-2 rounded-md text-sm hover:bg-slate-700"
          active-class="bg-slate-700 font-medium"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="px-3 py-4 border-t border-slate-700">
        <RouterLink
          to="/login"
          @click="sidebarOpen = false"
          class="block px-3 py-2 rounded-md text-sm hover:bg-slate-700"
        >
          Logout
        </RouterLink>
      </div>
    </aside>

    <!-- Content area -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Topbar (hanya tampil di mobile, untuk tombol buka sidebar) -->
      <header class="md:hidden flex items-center justify-between bg-white border-b px-4 py-3">
        <button @click="sidebarOpen = true" class="text-slate-700 text-xl leading-none">
          &#9776;
        </button>
        <span class="font-medium">Absen</span>
        <span class="w-6"></span>
      </header>

      <main class="flex-1 overflow-y-auto p-6">
  <slot />
</main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// state untuk buka/tutup sidebar di layar kecil
const sidebarOpen = ref(false)

// daftar menu sidebar
const menuItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Data Siswa', path: '/siswa' },
  { label: 'Kartu Siswa', path: '/kartu-siswa' },
  { label: 'Scanner', path: '/scanner' },
  { label: 'Riwayat Absensi', path: '/riwayat' },
]
</script>
