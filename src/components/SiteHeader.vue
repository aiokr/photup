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

console.log(isImageView().mode);

</script>

<template>
  <a href="/">
    <h1 class="text-2xl md:text-4xl font-bold mr-auto text-center text-main">Phot.</h1>
  </a>
  <div class="hidden md:flex py-4 items-center justify-center">
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