<script setup lang="ts">
import { RouterLink } from 'vue-router';
import IconLeft from '@/components/icons/IconLeft.vue';
</script>
<template>
  <div class="board flex justify-center items-center">
    <div class="mainArea">
      <h2 class="text-6xl font-bold pb-2">404</h2>
      <div class="text-3xl pb-3">Page not found</div>
      <RouterLink to="/" class="text-2xl flex items-center gap-2"><IconLeft /> back to home</RouterLink>
    </div>

  </div>
</template>

<style scoped>
.board {
  height: 100vh;
  width: 100vw;
  position: fixed;
}

.mainArea {
  border-left: 12px solid var(--main-color);
  padding: 4px 16px;
}
</style>