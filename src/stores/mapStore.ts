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

export const isMapCollasped = defineStore('isMapCollasped', {
  state: () => ({ mode: false }),
  actions: {
    toggleCollapsedMode() {
      this.mode = !this.mode
    }
  }
})

export const isMapSelected = defineStore('isMapSelected', {
  state: () => ({ mode: false, items: [] }),
  actions: {
    selected(items: any) {
      this.mode = true
      this.items = items
    },
    unSelected() {
      this.mode = false
    }
  }
})