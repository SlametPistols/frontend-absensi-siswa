<script setup>
import AppLayout from './components/AppLayout.vue'
</script>

<template>
  <AppLayout v-if="$route.meta.layout === 'app'">
    <RouterView />
  </AppLayout>

  <RouterView v-else />
</template>