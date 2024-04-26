<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useViewModeStore } from '@/stores/viewMode';
import { useColorSchemeStore } from '@/stores/colorScheme';
import IconMore from './icons/IconMore.vue';
import IconMoon from './icons/IconMoon.vue';
import IconWaterFall from './icons/IconWaterFall.vue';
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
  <div class="container max-w-[1200px] mx-auto flex items-center py-6 px-6 md:px-4 lg:px-0">
    <h1 class="text-lg font-bold font-mono mr-auto">Photup Art</h1>
    <div @click="toggleMenu" class="relative">
      <IconMore />
      <TransitionGroup>
        <Menu v-if="isMenuVisible">
          <div class="menuBg py-4 flex flex-col shadow-lg rounded-xl bg-white dark:bg-gray-900">
            <button class="block px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700" @click=toggleViewMode()>
              <span v-if="viewModeStore.mode === 'list'">
                <IconWaterFall class="inline-block" /> 切换网格模式
              </span>
              <span v-if="viewModeStore.mode === 'grid'">
                <IconList class="inline-block" /> 切换列表模式
              </span>
            </button>
            <button class="block px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700" @click="toggleColorScheme()">
              <span v-if="colorSchemeStore.mode === 'light'">
                <IconMoon class="inline-block" /> 暗色模式
              </span>
              <span v-if="colorSchemeStore.mode === 'dark'">
                <IconMoon class="inline-block" /> 跟随系统
              </span>
              <span v-if="colorSchemeStore.mode === 'system'">
                <IconMoon class="inline-block" /> 亮色模式
              </span>
            </button>
          </div>
        </Menu>
      </TransitionGroup>
    </div>
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