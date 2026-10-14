

<template>

  <div class="max-w-7xl mx-auto pb-10">

    <!-- Header -->

    <div class="mb-8">

      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">

        <div>

          <p class="text-sm font-medium text-slate-500 mt-2">

            {{ todayLabel }}

          </p>

        </div>



        <div class="inline-flex items-center gap-2 self-start sm:self-auto px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-500 shadow-sm">

          <span class="relative flex w-2 h-2">

            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>

            <span class="relative inline-flex rounded-full w-2 h-2 bg-emerald-500"></span>

          </span>

          Sistem aktif

        </div>

      </div>

    </div>



    <!-- Navigasi Pintasan -->

    <section class="mx-auto mb-8 w-full max-w-4xl">

      <nav aria-label="Navigasi fitur" class="grid grid-cols-3 gap-x-3 gap-y-4 sm:grid-cols-7 sm:gap-x-4">

        <RouterLink

          v-for="item in visibleQuickLinks"

          :key="item.label"

          :to="item.to"

          class="group flex min-h-24 flex-col items-center justify-center rounded-xl px-2 py-3 text-center transition duration-200 hover:bg-white hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"

        >

          <span class="mb-2 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-indigo-600 transition group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:-translate-y-0.5">

            <svg v-if="item.icon === 'users'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6">

              <path stroke-linecap="round" stroke-linejoin="round" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>

              <circle cx="9" cy="7" r="4"/>

              <path stroke-linecap="round" stroke-linejoin="round" d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>

            </svg>



            <svg v-else-if="item.icon === 'card'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6">

              <rect x="3" y="5" width="18" height="14" rx="2"/>

              <circle cx="8" cy="10" r="2"/>

              <path stroke-linecap="round" d="M6 15h4m4-5h4m-4 4h4"/>

            </svg>



            <svg v-else-if="item.icon === 'scan'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6">

              <path stroke-linecap="round" stroke-linejoin="round" d="M4 8V5a1 1 0 011-1h3m8 0h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3M7 9h10v6H7z"/>

              <path stroke-linecap="round" d="M9 12h6"/>

            </svg>



            <svg v-else-if="item.icon === 'check'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6">

              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-4M9 5a3 3 0 006 0M9 5a3 3 0 013-3 3 3 0 013 3m-8 9l2 2 4-4"/>

            </svg>



            <svg v-else-if="item.icon === 'history'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6">

              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.36 2.36L3 7m0-4v4h4m5-1v6l4 2"/>

            </svg>



            <svg v-else-if="item.icon === 'whatsapp'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6">

                <path stroke-linecap="round" stroke-linejoin="round" d="M20.5 11.5a8.5 8.5 0 01-12.6 7.4L3 20l1.2-4.6A8.5 8.5 0 1120.5 11.5z" />

                <path stroke-linecap="round" stroke-linejoin="round" d="M8.8 8.2c.2-.4.4-.4.7-.4h.4c.1 0 .3 0 .4.3l.6 1.4c.1.2.1.3 0 .5l-.4.5c-.1.1-.2.2 0 .4.2.4.7 1 1.4 1.4.4.2.7.3.9.1l.6-.7c.1-.2.3-.2.5-.1l1.3.6c.2.1.3.2.3.3 0 .2-.1 1-.7 1.4-.5.4-1.1.5-1.8.3-.7-.2-1.6-.6-2.6-1.5-.8-.7-1.4-1.6-1.6-2.3-.2-.7 0-1.4.3-1.8z" />

              </svg>

              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6">

              <path stroke-linecap="round" stroke-linejoin="round" d="M20 7v5h-5M4 17v-5h5m10-1a7 7 0 00-12-4L4 9m16 6l-3 2a7 7 0 01-12-4"/>

            </svg>

          </span>



          <span class="max-w-28 text-xs font-medium leading-4 text-slate-700 transition-colors group-hover:text-indigo-700">{{ item.label }}</span>

        </RouterLink>

      </nav>

    </section>



    <!-- Loading (skeleton) -->

    <div v-if="loading" class="space-y-6">

      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <div v-for="i in 4" :key="i" class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm overflow-hidden relative">

          <div class="skeleton-shimmer h-3 w-20 rounded mb-4"></div>

          <div class="skeleton-shimmer h-7 w-14 rounded mb-2"></div>

          <div class="skeleton-shimmer h-2.5 w-24 rounded"></div>

        </div>

      </div>



      <div class="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">

        <div class="flex items-center gap-3 mb-2">

          <div class="w-9 h-9 rounded-full border-4 border-slate-200 border-t-indigo-500 animate-spin shrink-0"></div>

          <div>

            <p class="text-sm font-medium text-slate-700">Memuat dashboard...</p>

            <p class="text-xs text-slate-400 mt-0.5">Mengambil data terbaru.</p>

          </div>

        </div>

      </div>

    </div>



    <!-- Error -->

    <div

      v-else-if="errorMessage"

      class="bg-white border border-red-200 rounded-2xl shadow-sm p-6 relative overflow-hidden"

    >

      <div class="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-red-50/70 blur-2xl"></div>



      <div class="flex items-start gap-4 relative">

        <div class="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-red-50 to-red-100 text-red-600 flex items-center justify-center ring-1 ring-red-100">

          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">

            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.29 3.86l-7.4 13a2 2 0 001.74 3h14.74a2 2 0 001.74-3l-7.4-13a2 2 0 00-3.48 0z"/>

          </svg>

        </div>



        <div class="flex-1">

          <h2 class="text-sm font-semibold text-slate-900">Gagal memuat dashboard</h2>

          <p class="text-sm text-slate-500 mt-1">{{ errorMessage }}</p>



          <button

            @click="fetchDashboard"

            class="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-medium shadow-sm shadow-red-500/30 hover:shadow-md hover:from-red-700 hover:to-red-600 active:scale-[0.98] transition-all"

          >

            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">

              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a8 8 0 0114.9-4M20 15a8 8 0 01-14.9 4"/>

            </svg>

            Coba Lagi

          </button>

        </div>

      </div>

    </div>



    <!-- Dashboard -->

    <div v-else class="animate-content-in">

      <!-- Ringkasan absensi, tepat di bawah pintasan -->
      <section class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2" aria-label="Ringkasan absensi">
        <div role="button" tabindex="0" @click="openAttendanceList('Sudah Absen')" @keydown.enter.prevent="openAttendanceList('Sudah Absen')" @keydown.space.prevent="openAttendanceList('Sudah Absen')" class="group relative flex cursor-pointer items-center justify-between overflow-hidden rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
          <div class="absolute -right-5 -top-6 h-24 w-24 rounded-full bg-emerald-100/70 transition-transform duration-300 group-hover:scale-125"></div>
          <div class="relative">
            <p class="text-sm font-semibold text-emerald-800">Sudah Absen</p>
            <p class="mt-2 text-3xl font-bold tracking-tight text-emerald-700">{{ dashboard.sudah_absen ?? ((dashboard.hadir || 0) + (dashboard.terlambat || 0)) }}</p>
            <p class="mt-1 text-xs font-medium text-emerald-700/80">Klik untuk melihat daftar siswa</p>
          </div>
          <div class="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/25 transition-transform group-hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
        </div>

        <div role="button" tabindex="0" @click="openAttendanceList('Belum Absen')" @keydown.enter.prevent="openAttendanceList('Belum Absen')" @keydown.space.prevent="openAttendanceList('Belum Absen')" class="group relative flex cursor-pointer items-center justify-between overflow-hidden rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500">
          <div class="absolute -right-5 -top-6 h-24 w-24 rounded-full bg-amber-100/70 transition-transform duration-300 group-hover:scale-125"></div>
          <div class="relative">
            <p class="text-sm font-semibold text-amber-800">Belum Absen</p>
            <p class="mt-2 text-3xl font-bold tracking-tight text-amber-700">{{ dashboard.belum_absen ?? 0 }}</p>
            <p class="mt-1 text-xs font-medium text-amber-700/80">Klik untuk melihat daftar siswa</p>
          </div>
          <div class="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/25 transition-transform group-hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9" /><path stroke-linecap="round" d="M12 7v5m0 4h.01" /></svg>
          </div>
        </div>
      </section>



      <!-- Primary Statistics -->

      <section>

        <div class="flex items-center justify-between mb-4">

          <div>

            <h2 class="text-sm font-semibold text-slate-900">Kehadiran Hari Ini</h2>

            <p class="text-xs text-slate-500 mt-1"></p>

          </div>

        </div>



        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

          <!-- Total -->

          <div class="group relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:shadow-slate-200/60 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">

            <span class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-400 to-indigo-600"></span>

            <div class="absolute -right-6 -bottom-8 w-24 h-24 rounded-full bg-indigo-50 group-hover:scale-110 transition-transform duration-300"></div>



            <div class="flex items-start justify-between relative">

              <div>

                <p class="text-sm font-medium text-slate-500">Total Siswa</p>

                <p class="text-3xl font-bold tracking-tight text-slate-900 mt-3">{{ dashboard.total_siswa }}</p>

                <p class="text-xs text-slate-400 mt-2">Siswa terdaftar</p>

              </div>



              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/30">

                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">

                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>

                  <circle cx="9" cy="7" r="4"/>

                  <path stroke-linecap="round" stroke-linejoin="round" d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>

                </svg>

              </div>

            </div>

          </div>



          <!-- Hadir -->

          <div role="button" tabindex="0" @click="openAttendanceList('Hadir')" @keydown.enter.prevent="openAttendanceList('Hadir')" @keydown.space.prevent="openAttendanceList('Hadir')" class="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:shadow-emerald-200/50 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">

            <span class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></span>

            <div class="absolute -right-6 -bottom-8 w-24 h-24 rounded-full bg-emerald-50 group-hover:scale-110 transition-transform duration-300"></div>



            <div class="flex items-start justify-between relative">

              <div>

                <p class="text-sm font-medium text-slate-500">Hadir</p>

                <p class="text-3xl font-bold tracking-tight text-emerald-600 mt-3">{{ dashboard.hadir }}</p>

                <p class="text-xs text-slate-400 mt-2">Hadir hari ini</p>

              </div>



              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/30">

                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">

                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>

                </svg>

              </div>

            </div>

          </div>



          <!-- Terlambat -->

          <div role="button" tabindex="0" @click="openAttendanceList('Terlambat')" @keydown.enter.prevent="openAttendanceList('Terlambat')" @keydown.space.prevent="openAttendanceList('Terlambat')" class="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:shadow-amber-200/50 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">

            <span class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 to-amber-500"></span>

            <div class="absolute -right-6 -bottom-8 w-24 h-24 rounded-full bg-amber-50 group-hover:scale-110 transition-transform duration-300"></div>



            <div class="flex items-start justify-between relative">

              <div>

                <p class="text-sm font-medium text-slate-500">Terlambat</p>

                <p class="text-3xl font-bold tracking-tight text-amber-500 mt-3">{{ dashboard.terlambat }}</p>

                <p class="text-xs text-slate-400 mt-2">Perlu perhatian</p>

              </div>



              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-400/30">

                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">

                  <circle cx="12" cy="12" r="9"/>

                  <path stroke-linecap="round" d="M12 7v5l3 2"/>

                </svg>

              </div>

            </div>

          </div>



          <!-- Tidak Hadir -->

          <div role="button" tabindex="0" @click="openAttendanceList('Tidak Hadir')" @keydown.enter.prevent="openAttendanceList('Tidak Hadir')" @keydown.space.prevent="openAttendanceList('Tidak Hadir')" class="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:shadow-red-200/50 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">

            <span class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-400 to-red-500"></span>

            <div class="absolute -right-6 -bottom-8 w-24 h-24 rounded-full bg-red-50 group-hover:scale-110 transition-transform duration-300"></div>



            <div class="flex items-start justify-between relative">

              <div>

                <p class="text-sm font-medium text-slate-500">Tidak Hadir</p>

                <p class="text-3xl font-bold tracking-tight text-red-500 mt-3">{{ dashboard.total_tidak_hadir ?? dashboard.tidak_hadir ?? 0 }}</p>

                <p class="text-xs text-slate-400 mt-2">Belum hadir</p>

              </div>



              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-red-400 to-red-500 text-white flex items-center justify-center shadow-md shadow-red-400/30">

                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">

                  <circle cx="12" cy="12" r="9"/>

                  <path stroke-linecap="round" d="M9 9l6 6m0-6l-6 6"/>

                </svg>

              </div>

            </div>

          </div>

        </div>

      </section>



      <!-- Secondary Statistics -->

      <section class="mt-6">

        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

          <!-- Izin -->

          <div role="button" tabindex="0" @click="openAttendanceList('Izin')" @keydown.enter.prevent="openAttendanceList('Izin')" @keydown.space.prevent="openAttendanceList('Izin')" class="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">

            <div class="absolute -right-6 -bottom-8 w-20 h-20 rounded-full bg-blue-50 group-hover:scale-110 transition-transform duration-300"></div>



            <div class="flex items-center justify-between relative">

              <div>

                <p class="text-sm font-medium text-slate-500">Izin</p>

                <p class="text-2xl font-bold text-blue-600 mt-2">{{ dashboard.izin }}</p>

              </div>



              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30">

                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">

                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h6l4 4v12a2 2 0 01-2 2z"/>

                </svg>

              </div>

            </div>

          </div>



          <!-- Sakit -->

          <div role="button" tabindex="0" @click="openAttendanceList('Sakit')" @keydown.enter.prevent="openAttendanceList('Sakit')" @keydown.space.prevent="openAttendanceList('Sakit')" class="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">

            <div class="absolute -right-6 -bottom-8 w-20 h-20 rounded-full bg-purple-50 group-hover:scale-110 transition-transform duration-300"></div>



            <div class="flex items-center justify-between relative">

              <div>

                <p class="text-sm font-medium text-slate-500">Sakit</p>

                <p class="text-2xl font-bold text-purple-600 mt-2">{{ dashboard.sakit }}</p>

              </div>



              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/30">

                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">

                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12M6 12h12"/>

                </svg>

              </div>

            </div>

          </div>



          <!-- Alpha -->

<div role="button" tabindex="0" @click="openAttendanceList('Alpha')" @keydown.enter.prevent="openAttendanceList('Alpha')" @keydown.space.prevent="openAttendanceList('Alpha')" class="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">

  <div class="absolute -right-6 -bottom-8 w-20 h-20 rounded-full bg-rose-50 group-hover:scale-110 transition-transform duration-300"></div>



  <div class="flex items-center justify-between relative">

    <div>

      <p class="text-sm font-medium text-slate-500">Alpha</p>

      <p class="text-2xl font-bold text-rose-600 mt-2">{{ dashboard.alpha ?? 0 }}</p>

    </div>



    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-500/30">

      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">

        <circle cx="12" cy="12" r="9" />

        <path stroke-linecap="round" d="M12 7v5m0 4h.01" />

      </svg>

    </div>

  </div>

</div>



          <!-- Persentase Kehadiran -->

          <div class="relative rounded-2xl p-5 text-white overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 shadow-lg shadow-indigo-500/30">

            <div class="absolute -right-8 -bottom-10 w-32 h-32 rounded-full bg-white/5"></div>

            <div class="absolute -right-4 -top-10 w-24 h-24 rounded-full bg-white/5"></div>

            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_60%)]"></div>



            <div class="relative z-10 flex items-center justify-between gap-4">

              <div>

                <p class="text-sm font-medium text-indigo-100">Persentase Kehadiran</p>



                <div class="flex items-end gap-2 mt-2">

                  <p class="text-3xl font-bold tracking-tight">{{ dashboard.persentase_hadir }}%</p>

                  <p class="text-sm text-indigo-200 mb-1">hari ini</p>

                </div>



                <div class="mt-4">

                  <div class="h-1.5 bg-indigo-400/40 rounded-full overflow-hidden">

                    <div

                      class="h-full bg-white rounded-full transition-all duration-700 ease-out"

                      :style="{ width: `${Math.min(dashboard.persentase_hadir, 100)}%` }"

                    ></div>

                  </div>

                </div>

              </div>



              <!-- Ring mini -->

              <svg viewBox="0 0 36 36" class="w-14 h-14 shrink-0 -rotate-90">

                <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="3"/>

                <circle

                  cx="18"

                  cy="18"

                  r="15.5"

                  fill="none"

                  stroke="white"

                  stroke-width="3"

                  stroke-linecap="round"

                  :stroke-dasharray="`${Math.min(dashboard.persentase_hadir, 100) * 0.974} 200`"

                />

              </svg>

            </div>

          </div>

        </div>

      </section>



      <!-- Trend -->

      <section class="bg-white border border-slate-200 rounded-2xl shadow-sm mt-6 overflow-hidden">

        <div class="px-5 sm:px-6 py-5 border-b border-slate-100">

          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

            <div>

              <h2 class="text-base font-semibold text-slate-900">Tren Absensi 7 Hari</h2>

              <p class="text-sm text-slate-500 mt-1"></p>

            </div>



            <div class="inline-flex items-center gap-2 text-xs font-medium text-slate-500">

              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>

              Kehadiran

            </div>

          </div>

        </div>



        <!-- Trend loading -->

        <div v-if="trendLoading" class="py-12 text-center">

          <div class="w-8 h-8 mx-auto mb-3 rounded-full border-4 border-slate-200 border-t-indigo-500 animate-spin"></div>

          <p class="text-sm text-slate-500">Memuat tren absensi...</p>

        </div>



        <!-- Trend error -->

        <div v-else-if="trendError" class="py-12 text-center px-6">

          <p class="text-sm text-red-600">{{ trendError }}</p>

        </div>



        <!-- Empty -->

        <div v-else-if="trend.length === 0" class="py-12 text-center px-6">

          <div class="w-12 h-12 mx-auto rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">

            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">

              <path stroke-linecap="round" stroke-linejoin="round" d="M4 19V5m0 14h16M8 16v-5m4 5V8m4 8V4"/>

            </svg>

          </div>

          <p class="text-sm font-medium text-slate-700 mt-3">Belum ada data tren</p>

          <p class="text-xs text-slate-400 mt-1">Data kehadiran akan muncul setelah tersedia.</p>

        </div>



        <!-- Trend content -->

        <div v-else>

          <!-- Mini bar chart -->

          <div class="px-5 sm:px-6 pt-6 pb-2">

            <div class="flex items-end gap-3 h-28">

              <div v-for="(item, index) in trend" :key="'bar-' + index" class="group/bar flex-1 flex flex-col items-center justify-end h-full">

                <div class="relative w-full flex-1 flex items-end">

                  <div

                    class="w-full max-w-[28px] mx-auto rounded-t-md bg-gradient-to-t from-indigo-500 to-violet-400 group-hover/bar:from-indigo-600 group-hover/bar:to-violet-500 transition-all duration-300"

                    :style="{ height: `${(item.hadir / maxHadir) * 100}%` }"

                  ></div>

                  <span class="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-slate-600 opacity-0 group-hover/bar:opacity-100 transition-opacity">

                    {{ item.hadir }}

                  </span>

                </div>

                <span class="text-[10px] text-slate-400 mt-2 whitespace-nowrap">{{ formatDate(item.tanggal) }}</span>

              </div>

            </div>

          </div>



          <div class="overflow-x-auto">

            <table class="w-full text-sm">

              <thead>

                <tr class="bg-slate-50/80 border-b border-slate-100">

                  <th class="text-left px-5 sm:px-6 py-3.5 font-semibold text-xs uppercase tracking-wide text-slate-500">Tanggal</th>

                  <th class="text-left px-5 sm:px-6 py-3.5 font-semibold text-xs uppercase tracking-wide text-slate-500">Hadir</th>

                  <th class="text-left px-5 sm:px-6 py-3.5 font-semibold text-xs uppercase tracking-wide text-slate-500">Persentase</th>

                </tr>

              </thead>



              <tbody class="divide-y divide-slate-100">

                <tr v-for="(item, index) in trend" :key="index" class="hover:bg-slate-50/70 transition-colors">

                  <td class="px-5 sm:px-6 py-4">

                    <span class="font-medium text-slate-700">{{ formatDate(item.tanggal) }}</span>

                  </td>



                  <td class="px-5 sm:px-6 py-4">

                    <span class="font-semibold text-slate-900">{{ item.hadir }}</span>

                    <span class="text-xs text-slate-400 ml-1">siswa</span>

                  </td>



                  <td class="px-5 sm:px-6 py-4">

                    <span class="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">

                      {{ item.persentase }}%

                    </span>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </section>

    </div>

  </div>





    <!-- Modal daftar siswa dari kartu statistik -->

    <div v-if="attendanceModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 sm:p-6" @click.self="closeAttendanceList" @keydown.esc="closeAttendanceList">

      <section role="dialog" aria-modal="true" :aria-label="`Daftar siswa ${attendanceModalCategory}`" class="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        <header class="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">

          <div>

            <h2 class="text-lg font-bold text-slate-900">Daftar Siswa: {{ attendanceModalCategory }}</h2>

            <p class="mt-1 text-sm text-slate-500">Absensi tanggal {{ todayLabel }}</p>

            <p class="mt-1 text-xs text-slate-400">{{ attendanceTotal }} siswa</p>

          </div>

          <button type="button" @click="closeAttendanceList" aria-label="Tutup" class="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900">✕</button>

        </header>



        <div class="min-h-0 flex-1 overflow-auto p-4 sm:p-6">

          <div v-if="attendanceLoading" class="py-12 text-center text-sm text-slate-500">Memuat daftar siswa...</div>

          <div v-else-if="attendanceError" class="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">

            {{ attendanceError }}

            <button type="button" @click="fetchAttendanceList" class="ml-2 font-semibold underline">Coba lagi</button>

          </div>

          <div v-else-if="attendanceRows.length === 0" class="py-12 text-center">

            <p class="font-semibold text-slate-700">Belum ada siswa dalam kategori ini</p>

            <p class="mt-1 text-sm text-slate-500">Data akan muncul jika absensi hari ini tersedia.</p>

          </div>

          <div v-else class="overflow-x-auto rounded-xl border border-slate-200">

            <table class="min-w-full divide-y divide-slate-200 text-sm">

              <thead class="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">

                <tr><th class="px-4 py-3">Nama siswa</th><th class="px-4 py-3">Kelas</th><th class="px-4 py-3">Status</th><th class="px-4 py-3">Jam</th></tr>

              </thead>

              <tbody class="divide-y divide-slate-100 bg-white">

                <tr v-for="(row, index) in attendanceRows" :key="row.absensi_id || row.peserta_didik_id || index" class="hover:bg-slate-50">

                  <td class="px-4 py-3"><p class="font-medium text-slate-800">{{ row.nama || '-' }}</p><p class="mt-0.5 text-xs text-slate-400">NISN: {{ row.nisn || '-' }}</p></td>

                  <td class="px-4 py-3 text-slate-600">{{ row.nama_rombel || '-' }}</td>

                  <td class="px-4 py-3"><span class="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{{ row.keterangan || row.label_status || row.status || '-' }}</span></td>

                  <td class="whitespace-nowrap px-4 py-3 text-slate-600">{{ formatAttendanceTime(row.jam_absen || row.waktu_absen) }}</td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

        <footer v-if="attendanceTotalPages > 1" class="flex items-center justify-between border-t border-slate-200 px-5 py-3">

          <span class="text-xs text-slate-500">Halaman {{ attendancePage }} dari {{ attendanceTotalPages }}</span>

          <div class="flex gap-2">

            <button type="button" :disabled="attendancePage <= 1 || attendanceLoading" @click="attendancePage--; fetchAttendanceList()" class="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40">Sebelumnya</button>

            <button type="button" :disabled="attendancePage >= attendanceTotalPages || attendanceLoading" @click="attendancePage++; fetchAttendanceList()" class="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40">Berikutnya</button>

          </div>

        </footer>

      </section>

    </div>



</template>



<script setup>

import { ref, computed, onMounted } from 'vue'

import api from '../services/api'

import { currentUser } from '../services/authState'



const loading = ref(true)

const errorMessage = ref('')



// Modal daftar siswa berdasarkan kategori kartu dashboard.

const attendanceModalOpen = ref(false)

const attendanceModalCategory = ref('Hadir')

const attendanceRows = ref([])

const attendanceLoading = ref(false)

const attendanceError = ref('')

const attendancePage = ref(1)

const attendanceTotalPages = ref(1)

const attendanceTotal = ref(0)



const getTodayWIB = () => new Intl.DateTimeFormat('en-CA', {

  timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit',

}).format(new Date())



const categoryParams = (category) => {

  if (category === 'Hadir') return { status: 'Hadir' }

  if (category === 'Terlambat') return { status: 'Terlambat' }

  if (category === 'Izin') return { keterangan: 'Izin' }

  if (category === 'Sakit') return { keterangan: 'Sakit' }

  if (category === 'Alpha') return { keterangan: 'Alpha' }

  return { status: 'Tidak Hadir' }

}



const openAttendanceList = async (category) => {

  attendanceModalCategory.value = category

  attendanceModalOpen.value = true

  attendancePage.value = 1

  await fetchAttendanceList()

}



const fetchAttendanceList = async () => {
  attendanceLoading.value = true
  attendanceError.value = ''

  try {
    const today = getTodayWIB()
    const category = attendanceModalCategory.value

    // Sudah Absen dihitung dari seluruh record hari ini. Kategori Belum Absen
    // sengaja mengikuti filter Alpha sesuai perilaku UI yang diminta.
    if (category === 'Sudah Absen') {

      const firstResponse = await api.get('/api/absensi', {
        params: {
          tanggal_mulai: today,
          tanggal_selesai: today,
          page: 1,
          limit: 200,
        },
      })

      const allRows = [...(firstResponse.data.rows || [])]
      const totalPages = Math.max(1, firstResponse.data.pagination?.total_pages || 1)

      for (let page = 2; page <= totalPages; page += 1) {
        const response = await api.get('/api/absensi', {
          params: {
            tanggal_mulai: today,
            tanggal_selesai: today,
            page,
            limit: 200,
          },
        })
        allRows.push(...(response.data.rows || []))
      }

      const normalize = (value) => String(value || '').trim().toLowerCase()
      const filteredRows = allRows.filter((row) => {
        const status = normalize(row.status || row.label_status)
        return status === 'hadir' || status === 'terlambat'
      })

      attendanceTotal.value = filteredRows.length
      attendanceTotalPages.value = Math.max(1, Math.ceil(filteredRows.length / 50))
      const startIndex = (attendancePage.value - 1) * 50
      attendanceRows.value = filteredRows.slice(startIndex, startIndex + 50)
    } else {
      const response = await api.get('/api/absensi', {
        params: {
          tanggal_mulai: today,
          tanggal_selesai: today,
          page: attendancePage.value,
          limit: 50,
          ...categoryParams(category),
        },
      })

      attendanceRows.value = response.data.rows || []
      attendanceTotal.value = response.data.pagination?.total ?? response.data.results ?? attendanceRows.value.length
      attendanceTotalPages.value = Math.max(1, response.data.pagination?.total_pages || Math.ceil(attendanceTotal.value / 50))
    }
  } catch (error) {
    console.error('Gagal mengambil daftar absensi:', error)
    attendanceRows.value = []
    attendanceTotal.value = 0
    attendanceTotalPages.value = 1
    attendanceError.value = error.response?.data?.message || error.response?.data?.error || 'Gagal memuat daftar siswa. Coba lagi.'
  } finally {
    attendanceLoading.value = false
  }
}

const closeAttendanceList = () => {

  attendanceModalOpen.value = false

}



const formatAttendanceTime = (value) => {

  if (!value) return '-'

  // jam_absen sudah berupa HH:MM WIB dari backend; jangan diproses ulang sebagai Date.
  if (typeof value === 'string' && /^\d{2}:\d{2}$/.test(value)) return value

  return new Date(value).toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit' })

}



const dashboard = ref({

  total_siswa: 0,

  hadir: 0,

  terlambat: 0,

  izin: 0,

  sakit: 0,

  tidak_hadir: 0,

  alpha: 0,

  sudah_absen: 0,

  belum_absen: 0,

  total_tidak_hadir: 0,

  persentase_hadir: 0,

  persentase_tidak_hadir: 0,

})



const trend = ref([])

const trendLoading = ref(false)

const trendError = ref('')



const fetchDashboard = async () => {

  loading.value = true

  errorMessage.value = ''



  try {

    const response = await api.get('/api/dashboard/ringkasan')

    const data = response.data.rows || {}

    dashboard.value = { ...dashboard.value, ...data, alpha: data.alpha ?? data.alfa ?? 0 }

  } catch (error) {

    console.error('Gagal mengambil dashboard:', error)

    errorMessage.value = 'Gagal mengambil data dashboard.'

  } finally {

    loading.value = false

  }

}



const fetchTrend = async () => {

  trendLoading.value = true

  trendError.value = ''



  try {

    const response = await api.get('/api/dashboard/tren')

    trend.value = Array.isArray(response.data.rows)

      ? response.data.rows

      : []

  } catch (error) {

    console.error('Gagal mengambil tren absensi:', error)

    trendError.value = 'Gagal mengambil data tren absensi.'

  } finally {

    trendLoading.value = false

  }

}



const formatDate = (value) => {

  if (!value) return '-'



  return new Date(`${value}T00:00:00`).toLocaleDateString('id-ID', {

    day: '2-digit',

    month: 'short',

    year: 'numeric',

  })

}



// Label tanggal hari ini di header

const todayLabel = new Date().toLocaleDateString('id-ID', {

  weekday: 'long',

  day: 'numeric',

  month: 'long',

  year: 'numeric',

})



// Skala tinggi mini bar chart tren

const maxHadir = computed(() => {

  if (!trend.value.length) return 1

  return Math.max(...trend.value.map((item) => item.hadir || 0), 1)

})



const quickLinks = [

  { label: 'Data Siswa', to: '/siswa', icon: 'users' },

  { label: 'Kartu Siswa', to: '/kartu-siswa', icon: 'card' },

  { label: 'Scanner QR', to: '/scanner', icon: 'scan' },

  { label: 'Absensi Manual', to: '/absensi-manual', icon: 'check' },

  { label: 'Riwayat Absensi', to: '/riwayat', icon: 'history' },

  { label: 'Sinkronisasi Dapodik', to: '/sync-dapodik', icon: 'sync' },

  { label: 'Pengaturan WhatsApp', to: '/pengaturan-whatsapp', icon: 'whatsapp', adminOnly: true },

]



const visibleQuickLinks = computed(() =>

  quickLinks.filter((item) => !item.adminOnly || currentUser.value?.peran_id_str === 'Admin'),

)



onMounted(() => {

  fetchDashboard()

  fetchTrend()

})

</script>



<style scoped>

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



.skeleton-shimmer {

  position: relative;

  overflow: hidden;

  background-color: #eef1f5;

}



.skeleton-shimmer::after {

  content: '';

  position: absolute;

  inset: 0;

  transform: translateX(-100%);

  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.7), transparent);

  animation: shimmer 1.4s infinite;

}



@keyframes shimmer {

  100% {

    transform: translateX(100%);

  }

}

</style>
