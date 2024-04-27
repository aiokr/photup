<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import IconStar2 from './components/icons/IconStar2.vue';
import IconTime from './components/icons/IconTime.vue';
import IconMap from './components/icons/IconMap.vue';
import SiteHeader from './components/SiteHeader.vue';
import { useColorSchemeStore } from './stores/colorScheme';
import { isMapView, mapLocateTo, isMapCollasped, isMapSelected } from '@/stores/mapStore';
import IconSys from './components/icons/IconSys.vue';
import IconUp from './components/icons/IconUp.vue';

const colorSchemeStore = useColorSchemeStore();
const mapCollasped = isMapCollasped();

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

let mapSelectedItem: any = ref([]);
watch(
  () => isMapSelected().items,
  (newItems) => {
    mapSelectedItem.value = newItems;
    console.log('mapSelectedItem.value', mapSelectedItem.value);
  },
  { immediate: true }
);

const navItems = [
  {
    name: '首页',
    path: '/',
    icon: IconStar2,
  },
  {
    name: '最近',
    path: '/recent',
    icon: IconTime,
  },
];

const recommendLocations = [
  {
    name: '城市记忆',
    items: [
      {
        name: '柳州市',
        location: [109.4284, 24.3262],
        zoom: 9,
        image: 'https://imgur.lzmun.com/tricms/1712461091301-DSC01133.jpg_itp',
      },
      {
        name: '南宁市',
        location: [108.3664, 22.8161],
        zoom: 8,
        image: 'https://imgur.lzmun.com/tricms/1712675251864-DSC06702im.jpg_itp',
      },
    ]
  },
  {
    name: '向着星辰与深渊',
    items: [
      {
        name: '龙女沟',
        location: [109.2028160, 25.226878],
        zoom: 14,
        image: 'https://imgur.lzmun.com/tricms/1713662884707-20231004_DSC01937-%E7%BC%96%E8%BE%91_MARK.jpg',
      },
      {
        name: '麒麟水库',
        location: [109.161667, 24.412677],
        zoom: 12,
        image: 'https://imgur.lzmun.com/tricms/1713663117870-20231014_DJI_0070-web.jpg',
      }
    ]
  }
]

</script>

<template>
  <div v-if="isMapView().mode == false" class="dark:bg-zinc-950 dark:text-gray-50">
    <SiteHeader />
  </div>
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
  <div v-if="isMapView().mode == true && isMapCollasped().mode == true"
    class="collapsed fixed w-full lg:w-96 bottom-0 z-20 p-5 lg:ml-6 justify-center bg-white/90 dark:bg-zinc-800/90 rounded-t-2xl">
    <nav class="flex item-center justify-start text-zinc-300 dark:text-zinc-500 z-20 text-sm gap-6 pb-3">
      <RouterLink v-for="item in navItems" :key="item.name" :to="item.path">
        <component :is="item.icon" />
      </RouterLink>
      <button @click="toggleMapCollapsed()">
        <IconDown />
      </button>
    </nav>
    <div v-if="isMapSelected().mode == false" class="overflow-y-auto">
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
    <div v-if="isMapSelected().mode == true" class="grid grid-cols-2 gap-2 lg:gap-4">
      <div v-for="selectedItem in mapSelectedItem" :key="selectedItem.id">
        <div class="w-full aspect-square object-cover">
          <img class="w-full h-full object-cover rounded-lg" :src="selectedItem.url">
        </div>
      </div>
    </div>
  </div>
  <section class="dark:bg-zinc-900 dark:text-gray-50">
    <RouterView />
  </section>
</template>

<style scoped>
.router-link-exact-active {
  @apply text-zinc-400;
}

.collapsed {
  height: calc(100vh - 3.5rem);
}
</style>
