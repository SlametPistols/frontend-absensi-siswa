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

      <!-- Informasi user -->
      <div class="px-5 py-4 border-b border-slate-700">
        <p class="text-sm font-medium text-white">
          {{ currentUser?.nama }}
        </p>

        <p class="text-xs text-slate-400 mt-1">
          {{ currentUser?.peran_id_str }}
        </p>
      </div>

      <nav class="flex-1 px-3 py-4 space-y-1">
        <RouterLink
          v-for="item in visibleMenuItems"
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
        <button
          @click="handleLogout"
          class="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-slate-700"
        >
          Logout
        </button>
      </div>
    </aside>

    <!-- Content area -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Topbar mobile -->
      <header
        class="md:hidden flex items-center justify-between bg-white border-b px-4 py-3"
      >
        <button
          @click="sidebarOpen = true"
          class="text-slate-700 text-xl leading-none"
        >
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { currentUser, clearCurrentUser } from '../services/authState'
import { logout } from '../services/auth'

const router = useRouter()

const sidebarOpen = ref(false)

const menuItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    roles: ['Admin', 'Guru', 'Kepala Sekolah'],
  },
  {
    label: 'Data Siswa',
    path: '/siswa',
    roles: ['Admin', 'Guru'],
  },
  {
    label: 'Kartu Siswa',
    path: '/kartu-siswa',
    roles: ['Admin'],
  },
  {
    label: 'Scanner',
    path: '/scanner',
    roles: ['Admin', 'Guru'],
  },
  {
    label: 'Absensi Manual',
    path: '/absensi-manual',
    roles: ['Admin', 'Guru'],
  },
  {
    label: 'Sync Dapodik',
    path: '/sync-dapodik',
    roles: ['Admin'],
  },
  {
    label: 'Riwayat Absensi',
    path: '/riwayat',
    roles: ['Admin', 'Guru'],
  },
]

const visibleMenuItems = computed(() => {
  const role = currentUser.value?.peran_id_str

  return menuItems.filter((item) => item.roles.includes(role))
})

const handleLogout = async () => {
  try {
    await logout()
  } catch (error) {
    console.error('Logout API gagal:', error)
  } finally {
    localStorage.removeItem('token')
    clearCurrentUser()
    router.push('/')
  }
}
</script>