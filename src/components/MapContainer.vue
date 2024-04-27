<script setup lang="ts">
import { onMounted, ref, watch, defineExpose } from 'vue';
import { useColorSchemeStore } from '@/stores/colorScheme';
import { mapLocateTo, isMapSelected, isMapCollasped } from '@/stores/mapStore';
import mapboxgl from 'mapbox-gl';
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';

// 地图配置
interface options {
  container: string | HTMLElement;
  zoom: number;
  minZoom: number;
  [key: string]: any;
}

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

// 地图颜色主题
const colorScheme = useColorSchemeStore();
const prefersColorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)'); // 检测系统颜色

const mapStyleLightUrl = 'mapbox://styles/mapbox/light-v11';
const mapStyleDarkUrl = 'mapbox://styles/mapbox/dark-v11';
const mapStyleUrl = ref(mapStyleLightUrl);

// 切换地图颜色主题
const toggleMapStyle = async () => {
  if (colorScheme.mode === 'system') {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      mapStyleUrl.value = mapStyleDarkUrl;
    } else {
      mapStyleUrl.value = mapStyleLightUrl;
    }
  } else if (colorScheme.mode === 'dark') {
    mapStyleUrl.value = mapStyleDarkUrl;
  } else {
    mapStyleUrl.value = mapStyleLightUrl;
  }
  mapOptions.style = mapStyleUrl.value;
  createMap();
  addMarkers();
};

// 监听系统颜色模式更改
prefersColorSchemeQuery.addEventListener('change', toggleMapStyle); // 监听系统颜色
watch(colorScheme, () => { toggleMapStyle() }) // 监听颜色模式，并切换地图模式

interface dataType {
  [key: string]: any
}

let url = `https://flex.tripper.press/flex/flow`;
let data: dataType[] = [];
let isDataLoaded = ref(false);

// 获取数据
async function fetchData() {
  try {
    const response = await fetch(url);
    data = await response.json();
    isDataLoaded.value = true;
    addMarkers();
  } catch (error) {
    console.error(error);
  }
}

fetchData();

// 创建地图
const mapContainer = ref();
const markers = ref<mapboxgl.Marker[]>([]);
const map = ref<mapboxgl.Map | null>(null);
const mapOptions: options = {
  container: mapContainer.value!,
  projection: 'mercator',
  style: mapStyleUrl.value,
  center: ['109.5', '24.19'],
  zoom: 5,
  minZoom: 0,
};

const createMap = () => {
  if (mapContainer.value instanceof HTMLElement) {
    mapOptions.container = mapContainer.value;
    map.value = new mapboxgl.Map(mapOptions);
    const nav = new mapboxgl.NavigationControl();
    map.value.addControl(nav, 'top-right');
    map.value!.on('mousemove', onHover); // 添加mousemove事件监听
    map.value!.on('click', onClick); // 添加click事件监听
  } else {
    console.error('Map container HTMLElement not found.');
  }
};

// 添加标记
const addMarkers = () => {
  for (const item of data) {
    const longitude = parseFloat(item.exif.GPSLongitude);
    if (longitude !== 0) {
      const markerElement = document.createElement('div');
      markerElement.dataset.id = item.id;
      markerElement.dataset.url = item.url;
      markerElement.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 48 48" fill="none" class="w-3 h-3" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="20" fill="#71afdd90" stroke="#fefefe" stroke-width="6" />
        </svg>
      `;
      const marker = new mapboxgl.Marker({
        element: markerElement
      })
        .setLngLat([item.exif.GPSLongitude, item.exif.GPSLatitude])
        .addTo(map.value!);
      markers.value.push(marker);
    }
  }
};

onMounted(() => {
  toggleMapStyle();
  createMap();
});

const useMapLocateTo = mapLocateTo()

useMapLocateTo.$onAction(({ name, args }: { name: string, args: number[] }) => {
  if (name === 'locateTo') {
    const [lon, lat, zoom] = args
    locateTo(lon, lat, zoom)
  }
})

function locateTo(lon: number, lat: number, zoom: number) {
  if (map.value) {
    map.value.flyTo({
      center: [lon, lat],
      zoom: zoom
    });
  }
}

const hoverMarkerElement = document.createElement('div');
hoverMarkerElement.className = 'hover-marker';
hoverMarkerElement.innerHTML = '<div class="ring"></div>';

const hoverMarker = new mapboxgl.Marker({
  element: hoverMarkerElement,
  anchor: 'center',
  offset: [0, 0]
});

const hoverRadius = 50;

let selectedMarkersCoordinates = ref();

const onHover = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
  const { lngLat } = e;
  hoverMarker.setLngLat(lngLat).addTo(map.value!);
};

const onClick = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
  if (!map.value) return;

  const { lngLat } = e;
  const clickPoint = map.value.project(lngLat);

  selectedMarkersCoordinates.value = []

  // 遍历所有标记，检查它们是否在圆环内
  markers.value.forEach(marker => {
    const markerLngLat = marker.getLngLat();
    const markerPoint = map.value!.project(markerLngLat);
    const distance = Math.sqrt(
      Math.pow(clickPoint.x - markerPoint.x, 2) +
      Math.pow(clickPoint.y - markerPoint.y, 2)
    );

    // 如果标记在圆环内，添加到数组中
    if (distance <= hoverRadius) {
      const markerId = marker.getElement().dataset.id; // 假设你以这种方式存储了id
      const markerUrl = marker.getElement().dataset.url || '';
      selectedMarkersCoordinates.value.push({
        longitude: markerLngLat.lng,
        latitude: markerLngLat.lat,
        id: markerId,
        url: encodeURI(markerUrl)
      });
    }
  });

  if (selectedMarkersCoordinates.value.length > 0) {
    isMapCollasped().mode = true
    isMapSelected().mode = true;
    isMapSelected().items = selectedMarkersCoordinates.value
    console.log(selectedMarkersCoordinates.value)
  } else {
    isMapSelected().mode = false
  }

};

defineExpose({
  locateTo
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

<style>
.mapboxgl-ctrl-group {
  box-shadow: none !important;
}

.ring {
  width: 100px;
  height: 100px;
  border: 2px solid #71afdd;
  border-radius: 9999px;
  background-color: #71afdd10;
  pointer-events: none;
  /* 确保圆环不会影响地图的鼠标事件 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: none;
}
</style>