import { defineStore } from 'pinia'

export const isMapView = defineStore('isMap', {
  state: () => ({
    mode: false
  }),
  actions: {
    toggleMap(value: boolean) {
      if (value === true) {
        this.mode = true;
        localStorage.setItem('isMap', 'true');
      } else {
        this.mode = false;
        localStorage.setItem('isMap', 'false');
      }
    }
  }
})

export const mapLocateTo = defineStore('mapLocateTo', {
  state: () => ({}),
  actions: {
    locateTo(lon: number, lat: number, zoom: number) {
      this.$state = { lon, lat, zoom };
    }
  } 
});