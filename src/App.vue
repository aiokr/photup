<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import IconStar2 from './components/icons/IconStar2.vue';
import IconTime from './components/icons/IconTime.vue';
import IconMap from './components/icons/IconMap.vue';
import SiteHeader from './components/SiteHeader.vue';
import { useColorSchemeStore } from './stores/colorScheme';
import { isMapView } from '@/stores/isMap';
import IconSys from './components/icons/IconSys.vue';

const colorScheme = useColorSchemeStore();
const colorSchemeStore = useColorSchemeStore();

onMounted(() => {
  if (colorScheme.mode === 'system') {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } else if (colorScheme.mode === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

function toggleColorScheme() {
  colorSchemeStore.toggleMode();
}

</script>

<template>
  <div v-if="isMapView().mode == false" class="dark:bg-zinc-950 dark:text-gray-50">
    <SiteHeader />
  </div>
  <nav v-if="isMapView().mode == false"
    class="sticky top-0 left-0 w-full shadow-xl bg-white/90 dark:bg-zinc-950/90  backdrop-blur text-zinc-300 dark:text-zinc-700 z-20 text-sm">
    <div class="container h-12 mg:h-14 mx-auto flex items-center justify-evenly gap-6">
      <RouterLink to="/">
        <IconStar2 />
      </RouterLink>
      <RouterLink to="/recent">
        <IconTime />
      </RouterLink>
      <RouterLink to="/map">
        <IconMap />
      </RouterLink>
    </div>
  </nav>
  <nav v-if="isMapView().mode == true" class="fixed w-full bottom-12 z-20 flex item-center justify-center">
    <div
      class="p-3 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur text-zinc-300 dark:text-zinc-500 z-20 text-sm shadow-lg flex gap-6">
      <RouterLink to="/">
        <IconStar2 />
      </RouterLink>
      <RouterLink to="/recent">
        <IconTime />
      </RouterLink>
      <button @click="toggleColorScheme()">
        <IconMoon v-if="colorScheme.mode === 'dark'" />
        <IconSun v-if="colorScheme.mode === 'light'" />
        <IconSys v-if="colorScheme.mode === 'system'" />
      </button>
    </div>
  </nav>
  <section class="dark:bg-zinc-900 dark:text-gray-50">
    <RouterView />
  </section>
</template>

<style scoped>
.router-link-exact-active {
  @apply text-zinc-400;
}
</style>
