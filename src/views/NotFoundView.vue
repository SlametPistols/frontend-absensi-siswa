<template>
  <main class="flex min-h-screen items-center justify-center bg-slate-50 px-6">
    <section class="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p class="text-sm font-bold tracking-widest text-indigo-600">ERROR 404</p>
      <h1 class="mt-3 text-2xl font-bold text-slate-900">Halaman tidak ditemukan</h1>
      <p class="mt-2 text-sm leading-6 text-slate-500">Alamat yang kamu buka tidak tersedia atau sudah dipindahkan.</p>
      <RouterLink to="/dashboard" class="mt-6 inline-flex rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">Kembali ke dashboard</RouterLink>
    </section>
  </main>
</template>
