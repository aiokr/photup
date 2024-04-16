<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="w-full h-16 font-mono font-bold text-lg flex justify-center items-center">Photup by FlexType</div>
  <header class="sticky top-0 left-0 w-full h-14 font-mono shadow-xl bg-white"></header>
  <section>
    <RouterView />
  </section>
</template>

<style scoped></style>
