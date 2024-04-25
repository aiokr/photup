<script setup lang="ts">
import { onMounted, ref } from 'vue';
import mapboxgl from 'mapbox-gl';

import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

interface options {
  container: string | HTMLElement;
  style: string;
  center: any;
  zoom: number;
}

const mapContainer = ref();
const map = ref();
const mapOptions: options = {
  container: mapContainer.value!,
  style: 'mapbox://styles/aiokr/clv6uhepi00lg01og9zb2fh18',
  center: ['121', '24'],
  zoom: 3
};

onMounted(() => {
  if (mapContainer.value instanceof HTMLElement) {
    mapOptions.container = mapContainer.value;
    map.value = new mapboxgl.Map(mapOptions);
  } else {
    console.error('Map container HTMLElement not found.');
  }
});
</script>

<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<style scoped>
.map-container {
  flex: 1;
}
</style>