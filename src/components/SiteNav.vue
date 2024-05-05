<script setup lang="ts">
import { onMounted, ref, watch, defineProps } from 'vue';
import { RouterLink } from 'vue-router';
import IconMap from '@/components/icons/IconMap.vue';
import IconSys from '@/components/icons/IconSys.vue';
import IconUp from '@/components/icons/IconUp.vue';
import IconMore from '@/components/icons/IconMore.vue';
import { useColorSchemeStore } from '@/stores/colorScheme';
import { isMapView, mapLocateTo, isMapCollasped, isMapSelected } from '@/stores/mapStore';

interface NavItem {
  name: string;
  path: string;
  icon: any;
}

interface LocationItem {
  name: string;
  location: any;
  zoom: number;
  image: string;
}

defineProps({
  navItems: {
    type: Array as () => NavItem[],
    required: true,
  },
  recommendLocations: {
    type: Array as () => { name: string; items: LocationItem[] }[],
    required: true,
  }
});

const mapCollasped = isMapCollasped();
const colorSchemeStore = useColorSchemeStore();

function toggleColorScheme() {
  colorSchemeStore.toggleMode();
}

function toggleMapCollapsed() {
  mapCollasped.toggleCollapsedMode();
}

const mapStore = mapLocateTo();
const goToLocation = (lon: number, lat: number, zoom: number) => {
  mapStore.locateTo(lon, lat, zoom);
};

const cleanSelected = () => {
  isMapSelected().mode = false;
  isMapSelected().items = [];
};

onMounted(() => {
  if (colorSchemeStore.mode === 'system') {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } else if (colorSchemeStore.mode === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

let mapSelectedItem: any = ref([]);
watch(
  () => isMapSelected().items,
  (newItems) => {
    mapSelectedItem.value = newItems;
    console.log('mapSelectedItem.value', mapSelectedItem.value);
  },
  { immediate: true }
);


const isDialogVisible = ref(false);
const selectedIndex = ref(0);

function toggleDialog(index: number) {
  selectedIndex.value = index;
  console.log('selectedIndex.value', selectedIndex.value);

  isDialogVisible.value = !isDialogVisible.value;

  if (isDialogVisible.value) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
}

</script>
<template>
  <!-- 默认导航栏 -->
  <nav v-if="isMapView().mode == false"
    class="sticky top-0 left-0 w-full shadow-xl bg-white/90 dark:bg-zinc-950/90  backdrop-blur text-zinc-300 dark:text-zinc-700 z-20 text-sm">
    <div class="container h-12 mg:h-14 mx-auto flex items-center justify-evenly gap-6">
      <RouterLink v-for="item in navItems" :key="item.name" :to="item.path">
        <component :is="item.icon" />
      </RouterLink>
      <RouterLink to="/map">
        <IconMap />
      </RouterLink>
    </div>
  </nav>
  <!-- 地图导航栏 -->
  <nav v-if="isMapView().mode == true && isMapCollasped().mode == false"
    class="fixed w-full bottom-12 z-20 flex item-center justify-center">
    <div
      class="p-3 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur text-zinc-300 dark:text-zinc-500 z-20 text-sm shadow-lg flex gap-6">
      <RouterLink v-for="item in navItems" :key="item.name" :to="item.path">
        <component :is="item.icon" />
      </RouterLink>
      <button @click="toggleMapCollapsed()">
        <IconUp />
      </button>
      <button @click="toggleColorScheme()">
        <IconMoon v-if="colorSchemeStore.mode === 'dark'" />
        <IconSun v-if="colorSchemeStore.mode === 'light'" />
        <IconSys v-if="colorSchemeStore.mode === 'system'" />
      </button>
    </div>
  </nav>
  <Transition name="mapNavCollapsed">
    <div v-if="isMapView().mode == true && isMapCollasped().mode == true"
      class="collapsed fixed w-full lg:w-96 bottom-0 z-20 p-5 pb-0 lg:ml-6 justify-center bg-white/90 dark:bg-zinc-800/90 rounded-t-2xl shadow-2xl">
      <nav class="flex item-center justify-start text-zinc-300 dark:text-zinc-500 z-20 text-sm gap-6 pb-4">
        <RouterLink v-for="item in navItems" :key="item.name" :to="item.path">
          <component :is="item.icon" />
        </RouterLink>
        <button class="ml-auto" @click="toggleMapCollapsed(); cleanSelected()">
          <IconDown />
        </button>
      </nav>
      <Transition name="mapSelected" mode="out-in">
        <!--展开导航栏-推荐地点-->
        <div v-if="isMapSelected().mode == false" class="collapsedContent overflow-y-scroll pb-5">
          <div v-for="item in recommendLocations" :key="item.name">
            <div class="text-lg lg:text-xl font-bold pt-4 pb-2">{{ item.name }}</div>
            <div class="grid grid-cols-3 gap-2 lg:flex lg:gap-4 overflow-x-auto">
              <section v-for="location in item.items" :key="location.name"
                class="h-full w-full aspect-square bg-white/90 dark:bg-zinc-900/90 bg-center bg-cover rounded-lg flex items-end justify-start"
                :style="`background-image: url(${location.image});`"
                @click="goToLocation(location.location[0], location.location[1], location.zoom)">
                <p class="lg:text-lg font-bold text-zinc-50 p-2">{{ location.name }}</p>
              </section>
            </div>
          </div>
        </div>
        <!--展开导航栏-选中图片-->
        <div v-else class="collapsedContent grid grid-cols-2 gap-2 lg:gap-4 overflow-y-scroll pb-5">
          <TransitionGroup name="mapSelected" mode="out-in">
            <div v-for="(selectedItem, index) in mapSelectedItem" :key="index">
              <div class="w-full aspect-square object-cover" @click="toggleDialog(index)">
                <img class="w-full h-full object-cover rounded-lg" :src="selectedItem.url">
              </div>
            </div>
          </TransitionGroup>
        </div>
      </Transition>
    </div>
  </Transition>
  <Transition>
    <Model v-if="isDialogVisible" @close="toggleDialog(0)" :index="selectedIndex">
      <div class="modalOverlay bg-gray-50 dark:bg-zinc-800 dark:text-gray-50" @click="toggleDialog(0)">
      </div>
      <div class="flex p-3 text-gray-400 justify-between">
        <div @click="toggleDialog(0)">
          <IconX />
        </div>
        <div @click="toggleDialog(0)">
          <IconMore />
        </div>
      </div>
      <ImageViewer :item="mapSelectedItem[selectedIndex]" />
    </Model>
  </Transition>
</template>

<style scoped>
.router-link-exact-active {
  @apply text-zinc-400;
}

.collapsedContent {
  scrollbar-width: none;
  --webkit-scrollbar-width: none;
}

@media screen and (max-width: 1023px) {
  .collapsed {
    max-height: calc(70vh - 3.5rem);
  }

  .collapsedContent {
    max-height: calc(70vh - 12rem);
  }
}

@media screen and (min-width: 1024px) {
  .collapsed {
    max-height: calc(100vh - 4.5rem);
  }

  .collapsedContent {
    max-height: calc(100vh - 12rem);
  }
}
</style>

<style>
.mapNavCollapsed-enter-from,
.mapNavCollapsed-leave-to {
  transform: translateY(100%);
  /* Start from below the screen */
}

.mapNavCollapsed-enter-to,
.mapNavCollapsed-leave-from {
  transform: translateY(0);
  /* End at its normal position */
}

.mapNavCollapsed-enter-active,
.mapNavCollapsed-leave-active {
  transition: transform 0.3s ease-in-out;
}

.mapSelected-enter-from,
.mapSelected-leave-to {
  opacity: 0;
  /* Start from below the screen */
}

.mapSelected-enter-to,
.mapSelected-leave-from {
  opacity: 1;
  /* End at its normal position */
}

.mapSelected-enter-active,
.mapSelected-leave-active {
  transition: opacity 0.12s ease-in-out;
}
</style>
