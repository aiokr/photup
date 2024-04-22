<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import IconStar from './components/icons/IconStar.vue';
import IconStar2 from './components/icons/IconStar2.vue';
import IconTime from './components/icons/IconTime.vue';
</script>

<template>
  <div class="w-full h-16 font-mono font-bold text-lg flex justify-center items-center">Photup by FlexType</div>
  <header class="sticky top-0 left-0 w-full shadow-xl bg-[#ffffffd7] backdrop-blur text-gray-400 z-20 text-sm">
    <div class="container h-12 mg:h-14 mx-auto flex items-center justify-evenly gap-6">
      <RouterLink to="/">
        <IconStar2 />
      </RouterLink>
      <RouterLink to="/recent">
        <IconTime />
      </RouterLink>
      <RouterLink to="/about">
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none" class="w-5 h-5 " xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="14" width="36" height="26" rx="2" stroke="currentColor" stroke-width="4" stroke-linecap="round"
            stroke-linejoin="round" />
          <path d="M10 14L12.1667 8H19.8333L22 14H10Z" fill="none" stroke="currentColor" stroke-width="4"
            stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="29" cy="27" r="7" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"
            stroke-linejoin="round" />
          <path d="M36 10V14" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
        </svg>
      </RouterLink>
    </div>
  </header>
  <section>
    <RouterView />
  </section>
</template>

<style scoped></style>
