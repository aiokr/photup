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
