<script setup lang="ts">
import MapContainer from '@/components/MapContainer.vue';
import { isMapView } from '@/stores/isMap';

isMapView().toggleMap(true)

</script>

<template>
  <MapContainer class="map-container" />
</template>

<style scoped>
.map-container {
  height: 100vh;
  width: 100%;
  flex: 1;
}
</style>