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

let url = `https://flex.tripper.press/flex/flow`;
let data = ref();
let isDataLoaded = ref(false);

async function fetchData() {
  try {
    const response = await fetch(url);
    data.value = await response.json();
    isDataLoaded.value = true;
    addMarkers();
  } catch (error) {
    console.error(error);
  }
}

fetchData();

const mapContainer = ref();
const markers = ref<mapboxgl.Marker[]>([]);
const map = ref<mapboxgl.Map | null>(null);
const mapOptions: options = {
  container: mapContainer.value!,
  style: 'mapbox://styles/aiokr/clv6uhepi00lg01og9zb2fh18',
  center: ['109.5', '24.19'],
  zoom: 5
};

const createMap = () => {
  if (mapContainer.value instanceof HTMLElement) {
    mapOptions.container = mapContainer.value;
    map.value = new mapboxgl.Map(mapOptions);
  } else {
    console.error('Map container HTMLElement not found.');
  }
};

const addMarkers = () => {
  for (const item of data.value) {
    const longitude = parseFloat(item.exif.GPSLongitude);
    if (longitude > 0) {
      const markerElement = document.createElement('div');
      markerElement.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 48 48" fill="none" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="20" fill="#71afdd90" stroke="#222831" stroke-width="8" />
        </svg>
      `;
      const marker = new mapboxgl.Marker({
        element: markerElement
      })
        .setLngLat([longitude, item.exif.GPSLatitude])
        .addTo(map.value!);
      markers.value.push(marker);
    }
  }
};

onMounted(() => {
  createMap();
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