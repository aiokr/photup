<script setup lang="ts">
import MapContainer from '@/components/MapContainer.vue';

let url = `https://flex.tripper.press/flex/flow`;

async function fetchData() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
}

</script>


<template>
  <MapContainer class="map-container" />
</template>

<style scoped>
.map-container {
  height: calc(100vh - 48px - 76px);
  width: 100%;
  flex: 1;
}
</style>