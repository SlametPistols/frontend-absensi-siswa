<template>
  <div class="flex h-screen overflow-hidden bg-slate-50">
    <!-- Mobile Sidebar Control -->
    <button
      type="button"
      @click="sidebarOpen = !sidebarOpen"
      class="fixed top-1/2 z-[70] flex h-14 w-7 -translate-y-1/2 items-center justify-center rounded-r-xl border border-l-0 border-slate-200 bg-white text-slate-500 shadow-md transition-all duration-300 hover:text-indigo-600 md:hidden"
      :class="sidebarOpen ? 'left-72' : 'left-0'"
      :aria-label="sidebarOpen ? 'Tutup menu' : 'Buka menu'"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 transition-transform duration-300"
        :class="sidebarOpen ? 'rotate-180' : ''"
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

    <!-- Mobile Overlay -->
    <Transition name="fade">
      <div
        v-if="sidebarOpen"
        @click="sidebarOpen = false"
        class="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-[1px] md:hidden"
      ></div>
    </Transition>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed md:static z-50 top-0 left-0 h-full bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        sidebarCollapsed ? 'md:w-20' : 'w-72 md:w-64',
      ]"
    >
      <!-- Toggle Collapse -->
      <button
        @click="sidebarCollapsed = !sidebarCollapsed"
        class="hidden md:flex absolute -right-3 top-7 h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition-colors duration-150 hover:border-indigo-300 hover:text-indigo-600 z-10"
        :title="sidebarCollapsed ? 'Perluas menu' : 'Ciutkan menu'"
        :aria-label="sidebarCollapsed ? 'Perluas menu' : 'Ciutkan menu'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3.5 w-3.5 transition-transform duration-300"
          :class="sidebarCollapsed ? 'rotate-180' : ''"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <!-- Logo -->
      <div
        class="flex h-16 shrink-0 items-center overflow-hidden border-b border-slate-100 px-6"
        :class="sidebarCollapsed ? 'md:justify-center md:px-0' : ''"
      >
        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>

        <div
          class="ml-3 min-w-0 whitespace-nowrap"
          :class="sidebarCollapsed ? 'md:hidden' : ''"
        >
          <p class="text-[15px] font-semibold tracking-tight text-slate-900">
            SiAbsen
          </p>

          <p
            class="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-400"
          >
            Sistem Absensi
          </p>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
        <p
          class="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400"
          :class="sidebarCollapsed ? 'md:hidden' : ''"
        >
          Menu
        </p>

        <RouterLink
          v-for="item in visibleMenuItems"
          :key="item.path"
          :to="item.path"
          @click="sidebarOpen = false"
          :class="[
            'group mb-0.5 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150',
            sidebarCollapsed ? 'md:justify-center' : '',
            isActive(item.path)
              ? 'bg-indigo-50 text-indigo-700'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
          ]"
        >
          <!-- Dashboard -->
          <svg
            v-if="item.path === '/dashboard'"
            xmlns="http://www.w3.org/2000/svg"
            :class="iconClass(item.path)"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 13h8V3H3v10zm10 8h8V11h-8v10zM3 21h8v-6H3v6zm10-10h8V3h-8v8z"
            />
          </svg>

          <!-- Siswa -->
          <svg
            v-else-if="item.path === '/siswa'"
            xmlns="http://www.w3.org/2000/svg"
            :class="iconClass(item.path)"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
            />
            <circle
              cx="9"
              cy="7"
              r="4"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
            />
          </svg>

          <!-- Kartu Siswa -->
          <svg
            v-else-if="item.path === '/kartu-siswa'"
            xmlns="http://www.w3.org/2000/svg"
            :class="iconClass(item.path)"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
            />
            <path
              stroke-linecap="round"
              d="M7 9h4M7 13h2M15 10h2M15 14h2"
            />
          </svg>

          <!-- Scanner -->
          <svg
            v-else-if="item.path === '/scanner'"
            xmlns="http://www.w3.org/2000/svg"
            :class="iconClass(item.path)"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 7V5a1 1 0 011-1h2M17 4h2a1 1 0 011 1v2M20 17v2a1 1 0 01-1 1h-2M7 20H5a1 1 0 01-1-1v-2"
            />
            <path
              stroke-linecap="round"
              d="M8 8h2v2H8V8zm6 0h2v2h-2V8zm-6 6h2v2H8v-2zm6 0h2v2h-2v-2z"
            />
          </svg>

          <!-- Absensi Manual -->
          <svg
            v-else-if="item.path === '/absensi-manual'"
            xmlns="http://www.w3.org/2000/svg"
            :class="iconClass(item.path)"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
            />
            <path
              stroke-linecap="round"
              d="M8 15h3m-3 3h5"
            />
          </svg>

          <!-- Sync Dapodik -->
          <svg
            v-else-if="item.path === '/sync-dapodik'"
            xmlns="http://www.w3.org/2000/svg"
            :class="iconClass(item.path)"
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
              d="M20 9a8 8 0 00-14.9-4M4 15a8 8 0 0014.9 4"
            />
          </svg>

          <!-- Riwayat -->
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            :class="iconClass(item.path)"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
            />
            <path
              stroke-linecap="round"
              d="M8 15h2m4 0h2m-8 3h2m4 0h2"
            />
          </svg>

          <span :class="sidebarCollapsed ? 'md:hidden' : ''">
            {{ item.label }}
          </span>
        </RouterLink>
      </nav>

      <!-- User / Logout -->
      <div
        class="border-t border-slate-100 p-3"
        :class="sidebarCollapsed ? 'md:p-2' : ''"
      >
        <div class="relative">
          <button
            @click="userMenuOpen = !userMenuOpen"
            class="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-slate-50"
            :class="sidebarCollapsed ? 'md:justify-center' : ''"
          >
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-xs font-semibold text-white"
            >
              {{ currentUser?.nama?.charAt(0)?.toUpperCase() }}
            </div>

            <div
              class="min-w-0 flex-1"
              :class="sidebarCollapsed ? 'md:hidden' : ''"
            >
              <p
                class="truncate text-xs font-semibold text-slate-800"
              >
                {{ currentUser?.nama || 'Pengguna' }}
              </p>

              <p
                class="mt-0.5 truncate text-[10px] text-slate-400"
              >
                {{ currentUser?.peran_id_str || 'User' }}
              </p>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200"
              :class="[
                userMenuOpen ? 'rotate-180' : '',
                sidebarCollapsed ? 'md:hidden' : '',
              ]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 9l6 6 6-6"
              />
            </svg>
          </button>

          <!-- Outside click -->
          <div
            v-if="userMenuOpen"
            @click="userMenuOpen = false"
            class="fixed inset-0 z-10"
          ></div>

          <!-- User Dropdown -->
          <Transition name="dropdown">
            <div
              v-if="userMenuOpen"
              class="absolute bottom-full left-0 z-20 mb-2 w-full min-w-60 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5"
              :class="sidebarCollapsed ? 'md:left-14 md:bottom-0 md:mb-0' : ''"
            >
              <div class="border-b border-slate-100 p-4">
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-sm font-semibold text-white"
                  >
                    {{ currentUser?.nama?.charAt(0)?.toUpperCase() }}
                  </div>

                  <div class="min-w-0">
                    <p
                      class="truncate text-sm font-semibold text-slate-900"
                    >
                      {{ currentUser?.nama || 'Pengguna' }}
                    </p>

                    <span
                      class="mt-1 inline-flex rounded-md px-2 py-0.5 text-[10px] font-medium"
                      :class="roleBadgeClass"
                    >
                      {{ currentUser?.peran_id_str || 'User' }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="p-2">
                <button
                  @click="handleLogout"
                  class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-md bg-red-50 text-red-600"
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
                        d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10 17l5-5-5-5M15 12H3"
                      />
                    </svg>
                  </div>

                  <span>Logout</span>
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </aside>

    <!-- Main Column -->
    <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
      <!-- Content -->
      <main class="flex-1 overflow-y-auto bg-slate-50">
        <div class="p-5 sm:p-6 lg:p-8">
          <!-- Breadcrumb -->
          <nav
            class="mb-5 flex items-center gap-1.5 text-xs text-slate-400"
            aria-label="Breadcrumb"
          >
            <span>SiAbsen</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3"
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

            <span class="font-medium text-slate-600">
              {{ currentPageLabel }}
            </span>
          </nav>

          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { currentUser, clearCurrentUser } from '../services/authState'
import { logout } from '../services/auth'

const router = useRouter()
const route = useRoute()

const sidebarOpen = ref(false)
const sidebarCollapsed = ref(false)
const userMenuOpen = ref(false)

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

const roleBadgeClass = computed(() => {
  const map = {
    Admin: 'bg-indigo-50 text-indigo-700',
    Guru: 'bg-sky-50 text-sky-700',
    'Kepala Sekolah': 'bg-amber-50 text-amber-700',
  }

  return (
    map[currentUser.value?.peran_id_str] ||
    'bg-slate-100 text-slate-600'
  )
})

const isActive = (path) => route.path === path

const iconClass = (path) => [
  'h-5 w-5 shrink-0 transition-transform duration-200',
  isActive(path) ? 'text-indigo-700' : '',
]

const currentPageLabel = computed(() => {
  const match = menuItems.find((item) => item.path === route.path)

  return match ? match.label : 'Halaman'
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

.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(6px) scale(0.97);
}
</style>