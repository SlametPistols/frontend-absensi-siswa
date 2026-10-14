import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import SiswaView from '../views/SiswaView.vue'
import KartuSiswaView from '../views/KartuSiswaView.vue'
import ScannerView from '../views/ScannerView.vue'
import RiwayatView from '../views/RiwayatView.vue'
import ManualAbsensiView from '../views/ManualAbsensiView.vue'
import SyncDapodikView from '../views/SyncDapodikView.vue'
import PengaturanWhatsAppView from '../views/PengaturanWhatsAppView.vue'
import { loadCurrentUser, currentUser } from '../services/authState'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: {
        layout: 'blank',
      },
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        layout: 'app',
        requiresAuth: true,
        roles: ['Admin', 'Guru', 'Kepala Sekolah'],
      },
    },

    {
      path: '/siswa',
      name: 'siswa',
      component: SiswaView,
      meta: {
        layout: 'app',
        requiresAuth: true,
        roles: ['Admin', 'Guru'],
      },
    },

    {
      path: '/kartu-siswa',
      name: 'kartu-siswa',
      component: KartuSiswaView,
      meta: {
        layout: 'app',
        requiresAuth: true,
        roles: ['Admin'],
      },
    },

    {
      path: '/scanner',
      name: 'scanner',
      component: ScannerView,
      meta: {
        layout: 'app',
        requiresAuth: true,
        roles: ['Admin', 'Guru'],
      },
    },

    {
      path: '/absensi-manual',
      name: 'absensi-manual',
      component: ManualAbsensiView,
      meta: {
        layout: 'app',
        requiresAuth: true,
        roles: ['Admin', 'Guru'],
      },
    },

    {
      path: '/sync-dapodik',
      name: 'sync-dapodik',
      component: SyncDapodikView,
      meta: {
        layout: 'app',
        requiresAuth: true,
        roles: ['Admin'],
      },
    },

    {
      path: '/pengaturan-whatsapp',
      name: 'pengaturan-whatsapp',
      component: PengaturanWhatsAppView,
      meta: {
        layout: 'app',
        requiresAuth: true,
        roles: ['Admin'],
      },
    },

    {
      path: '/riwayat',
      name: 'riwayat',
      component: RiwayatView,
      meta: {
        layout: 'app',
        requiresAuth: true,
        roles: ['Admin', 'Guru'],
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: { layout: 'blank' },
    },
  ],
})

router.beforeEach(async (to) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth) {
    if (!token) {
      return '/'
    }

    const user = await loadCurrentUser()

    if (!user) {
      return '/'
    }
  }

  if (to.meta.roles) {
    const role = currentUser.value?.peran_id_str

    if (!to.meta.roles.includes(role)) {
      return '/dashboard'
    }
  }

  if (to.path === '/' && token) {
    const user = await loadCurrentUser()

    if (user) {
      return '/dashboard'
    }
  }
})

export default router