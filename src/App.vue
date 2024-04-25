<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import IconStar2 from './components/icons/IconStar2.vue';
import IconTime from './components/icons/IconTime.vue';
import IconWaterFall from './components/icons/IconWaterFall.vue';
import IconMoon from './components/icons/IconMoon.vue';
import { useViewModeStore } from '@/stores/viewMode';
import { useColorSchemeStore } from '@/stores/colorScheme';

// 视图模式 View Mode
const viewModeStore = useViewModeStore();

onMounted(() => {
  viewModeStore.initializeMode();
});

function toggleViewMode() {
  viewModeStore.toggleMode();
}

const colorSchemeStore = useColorSchemeStore();

onMounted(() => {
  colorSchemeStore.initializeMode();
});

function toggleDarkMode() {
  colorSchemeStore.toggleMode();
}


</script>

<template>
  <div class="w-full h-16 font-mono font-bold text-lg flex justify-center items-center">Photup by FlexType</div>
  <header class="sticky top-0 left-0 w-full shadow-xl bg-[#ffffffee] backdrop-blur text-gray-300 z-20 text-sm">
    <div class="container h-12 mg:h-14 mx-auto flex items-center justify-evenly gap-6">
      <RouterLink to="/">
        <IconStar2 />
      </RouterLink>
      <RouterLink to="/recent">
        <IconTime />
      </RouterLink>
      <IconMap />
      <button @click=toggleViewMode()>
        <IconWaterFall v-if="viewModeStore.mode === 'list'" />
        <IconList v-if="viewModeStore.mode === 'grid'" />
      </button>
      <button @click="toggleDarkMode()">
        <IconMoon />
      </button>
    </div>
  </header>
  <section>
    <RouterView />
  </section>
</template>

<style scoped>
.router-link-exact-active {
  @apply text-gray-500;
}
</style>
