<template>
  <div class="flex h-screen overflow-hidden bg-slate-50">
    <!-- Mobile overlay -->
    <Transition name="fade">
      <div
        v-if="sidebarOpen"
        @click="sidebarOpen = false"
        class="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden"
      ></div>
    </Transition>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed md:static z-50 top-0 left-0 h-full bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100 flex flex-col border-r border-slate-800/80 shadow-2xl md:shadow-none transition-all duration-300 ease-in-out',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        sidebarCollapsed ? 'md:w-20' : 'w-72'
      ]"
    >
      <!-- Collapse toggle (desktop only) -->
      <button
        @click="sidebarCollapsed = !sidebarCollapsed"
        class="hidden md:flex absolute -right-3 top-8 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 items-center justify-center text-slate-300 hover:bg-indigo-500 hover:text-white hover:border-indigo-400 shadow-md transition-all duration-200 z-10"
        :aria-label="sidebarCollapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-3.5 h-3.5 transition-transform duration-300"
          :class="sidebarCollapsed ? 'rotate-180' : ''"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Brand -->
      <div class="h-20 px-6 flex items-center border-b border-slate-800/80 overflow-hidden">
        <div
          class="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-indigo-400 via-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 ring-1 ring-white/10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>

        <div class="ml-3 min-w-0 transition-opacity duration-200" :class="sidebarCollapsed ? 'md:opacity-0 md:w-0 md:ml-0' : 'opacity-100'">
          <h1 class="text-base font-bold tracking-tight text-white whitespace-nowrap">SiAbsen</h1>
          <p class="text-[11px] text-slate-400 mt-0.5 whitespace-nowrap">Sistem Absensi Siswa</p>
        </div>
      </div>

      <!-- User profile -->
      <div class="px-4 pt-5 pb-4">
        <div
          class="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-3 py-3 backdrop-blur-sm transition-all"
          :class="sidebarCollapsed ? 'md:justify-center md:px-0 md:bg-transparent md:border-transparent' : ''"
        >
          <!-- Avatar -->
          <div class="relative shrink-0">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/30 to-violet-500/20 border border-indigo-400/30 flex items-center justify-center">
              <span class="text-sm font-semibold text-indigo-200">
                {{ currentUser?.nama?.charAt(0)?.toUpperCase() }}
              </span>
            </div>
            <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse"></span>
          </div>

          <div class="min-w-0 transition-all duration-200" :class="sidebarCollapsed ? 'md:hidden' : ''">
            <p class="text-sm font-semibold text-white truncate">{{ currentUser?.nama }}</p>
            <span
              class="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full truncate"
              :class="roleBadgeClass"
            >
              {{ currentUser?.peran_id_str }}
            </span>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-3 py-2 overflow-y-auto overflow-x-hidden sidebar-scroll">
        <p
          class="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500 transition-opacity"
          :class="sidebarCollapsed ? 'md:hidden' : ''"
        >
          Menu Utama
        </p>

        <div class="space-y-1">
          <div v-for="item in visibleMenuItems" :key="item.path" class="group/item relative">
            <RouterLink
              :to="item.path"
              @click="sidebarOpen = false"
              class="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 transition-all duration-200 hover:bg-white/5 hover:text-white"
              :class="sidebarCollapsed ? 'md:justify-center' : ''"
              active-class="!bg-gradient-to-r !from-indigo-500/15 !to-violet-500/10 !text-indigo-300"
            >
              <!-- Active indicator -->
              <span
                class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-gradient-to-b from-indigo-400 to-violet-400 opacity-0 transition-opacity duration-200 router-link-active:opacity-100"
              ></span>

              <!-- Icons -->
              <svg v-if="item.path === '/dashboard'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13h8V3H3v10zm10 8h8V11h-8v10zM3 21h8v-6H3v6zm10-10h8V3h-8v8z" />
              </svg>
              <svg v-else-if="item.path === '/siswa'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
              <svg v-else-if="item.path === '/kartu-siswa'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path stroke-linecap="round" d="M7 9h4M7 13h2M15 10h2M15 14h2" />
              </svg>
              <svg v-else-if="item.path === '/scanner'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 7V5a1 1 0 011-1h2M17 4h2a1 1 0 011 1v2M20 17v2a1 1 0 01-1 1h-2M7 20H5a1 1 0 01-1-1v-2" />
                <path stroke-linecap="round" d="M8 8h2v2H8V8zm6 0h2v2h-2V8zm-6 6h2v2H8v-2zm6 0h2v2h-2v-2z" />
              </svg>
              <svg v-else-if="item.path === '/absensi-manual'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" />
                <path stroke-linecap="round" d="M8 15h3m-3 3h5" />
              </svg>
              <svg v-else-if="item.path === '/sync-dapodik'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h5M20 20v-5h-5" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M20 9a8 8 0 00-14.9-4M4 15a8 8 0 0014.9 4" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" />
                <path stroke-linecap="round" d="M8 15h2m4 0h2m-8 3h2m4 0h2" />
              </svg>

              <span class="truncate" :class="sidebarCollapsed ? 'md:hidden' : ''">{{ item.label }}</span>
            </RouterLink>

            <!-- Tooltip saat sidebar diciutkan (desktop) -->
            <span
              v-if="sidebarCollapsed"
              class="hidden md:group-hover/item:block absolute left-full top-1/2 -translate-y-1/2 ml-3 whitespace-nowrap rounded-lg bg-slate-800 text-white text-xs px-2.5 py-1.5 shadow-lg border border-slate-700 z-20"
            >
              {{ item.label }}
            </span>
          </div>
        </div>
      </nav>

      <!-- Logout -->
      <div class="px-3 py-4 border-t border-slate-800/80">
        <div class="group/item relative">
          <button
            @click="handleLogout"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
            :class="sidebarCollapsed ? 'md:justify-center' : ''"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 17l5-5-5-5M15 12H3" />
            </svg>
            <span :class="sidebarCollapsed ? 'md:hidden' : ''">Logout</span>
          </button>

          <span
            v-if="sidebarCollapsed"
            class="hidden md:group-hover/item:block absolute left-full top-1/2 -translate-y-1/2 ml-3 whitespace-nowrap rounded-lg bg-slate-800 text-white text-xs px-2.5 py-1.5 shadow-lg border border-slate-700 z-20"
          >
            Logout
          </span>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 min-w-0 flex flex-col overflow-hidden">
      <!-- Mobile topbar -->
      <header class="md:hidden h-16 shrink-0 flex items-center justify-between px-4 bg-white/90 backdrop-blur-md border-b border-slate-200 relative">
        <span class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400"></span>

        <button
          @click="sidebarOpen = true"
          class="w-10 h-10 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 active:scale-95 transition"
          aria-label="Open menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-violet-600 flex items-center justify-center shadow-sm shadow-indigo-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5a3 3 0 006 0" />
            </svg>
          </div>
          <span class="font-semibold text-slate-800">Absen kan?</span>
        </div>

        <div class="w-10"></div>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto bg-slate-50 relative">
        <!-- Dekorasi latar halus, tidak mengganggu konten -->
        <div class="pointer-events-none fixed inset-0 -z-10 opacity-[0.4]" aria-hidden="true">
          <div class="absolute top-0 right-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 left-64 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl"></div>
        </div>

        <div class="min-h-full p-4 sm:p-6 lg:p-8 animate-content-in">
          <slot />
        </div>
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

// state UI murni untuk mode ciutkan sidebar di layar desktop, tidak memengaruhi logic auth/role
const sidebarCollapsed = ref(false)

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

// pemetaan warna badge peran — murni presentasi, tidak memengaruhi hak akses
const roleBadgeClass = computed(() => {
  const map = {
    Admin: 'bg-indigo-500/15 text-indigo-300',
    Guru: 'bg-emerald-500/15 text-emerald-300',
    'Kepala Sekolah': 'bg-amber-500/15 text-amber-300',
  }
  return map[currentUser.value?.peran_id_str] || 'bg-slate-500/15 text-slate-300'
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes content-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-content-in {
  animation: content-in 0.25s ease-out;
}

.sidebar-scroll::-webkit-scrollbar {
  width: 5px;
}
.sidebar-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(148, 163, 184, 0.3);
  border-radius: 9999px;
}
</style>