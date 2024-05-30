<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useViewModeStore } from '@/stores/viewMode';
import { useColorSchemeStore } from '@/stores/colorScheme';
import { isImageView } from '@/stores/viewMode';
import IconMore from './icons/IconMore.vue';
import IconMoon from './icons/IconMoon.vue';
import IconWaterFall from './icons/IconWaterFall.vue';
import IconSun from './icons/IconSun.vue';
import IconSys from './icons/IconSys.vue';
import IconList from './icons/IconList.vue';

const isMenuVisible = ref(false);
const viewModeStore = useViewModeStore();
const colorSchemeStore = useColorSchemeStore();

onMounted(() => {
  viewModeStore.initializeMode();
  colorSchemeStore.initializeMode();
});

function toggleColorScheme() {
  colorSchemeStore.toggleMode();
}

function toggleMenu() {
  isMenuVisible.value = !isMenuVisible.value;
}

function toggleViewMode() {
  viewModeStore.toggleMode();
}

</script>

<template>
  <a href="/">
    <h1 class="text-2xl md:text-4xl font-bold mr-auto text-center text-main">Phot.</h1>
  </a>
  <div
    class="fixed left-32 right-32 bottom-6 bg-white/60 dark:bg-black/60 md:bg-white/0 md:dark:bg-white/0 md:static flex px-4 py-1 rounded-full items-center justify-center z-50 backdrop-blur text-zinc-400"
    :class="isImageView().mode === true ? 'hidden' : ''">
    <button class="block px-3 py-2 " @click=toggleViewMode()>
      <span v-if="viewModeStore.mode === 'list'">
        <IconList class="inline-block" />
      </span>
      <span v-if="viewModeStore.mode === 'grid'">
        <IconWaterFall class="inline-block" />
      </span>
    </button>
    <button class="block px-3 py-2 " @click="toggleColorScheme()">
      <span v-if="colorSchemeStore.mode === 'light'">
        <IconSun class="inline-block" />
      </span>
      <span v-if="colorSchemeStore.mode === 'dark'">
        <IconMoon class="inline-block" />
      </span>
      <span v-if="colorSchemeStore.mode === 'system'">
        <IconSys class="inline-block" />
      </span>
    </button>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.15s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.menuBg {
  position: absolute;
  width: 148px;
  height: fit-content;
  right: 0;
  top: 24px;
  z-index: 30;
}
</style>