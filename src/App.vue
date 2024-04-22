<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="w-full h-16 font-mono font-bold text-lg flex justify-center items-center">Photup by FlexType</div>
  <header class="sticky top-0 left-0 w-full shadow-xl bg-white text-gray-400 z-20 text-sm">
    <div class="container h-12 mg:h-14 mx-auto flex items-center justify-evenly gap-6">
      <RouterLink to="/">
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" stroke-width="4" />
          <path d="M5 25H44" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
          <circle cx="19" cy="15" r="4" fill="none" stroke="currentColor" stroke-width="4" />
          <path d="M31 31H43" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
          <path d="M34 17L42 17" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
          <path d="M25 37H39" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
          <path d="M40 11.998C42.5116 15.341 44 19.4967 44 24C44 31.8085 39.5252 38.5718 33 41.8654"
            stroke="currentColor" stroke-width="4" />
          <path d="M4.40007 20C4.13772 21.2924 4 22.6301 4 24C4 25.7265 4.21876 27.4019 4.63009 29"
            stroke="currentColor" stroke-width="4" />
        </svg>
      </RouterLink>
      <RouterLink to="/star">
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M23.9986 5L17.8856 17.4776L4 19.4911L14.0589 29.3251L11.6544 43L23.9986 36.4192L36.3454 43L33.9586 29.3251L44 19.4911L30.1913 17.4776L23.9986 5Z"
            fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" />
        </svg>
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
