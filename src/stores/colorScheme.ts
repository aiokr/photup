import { defineStore } from 'pinia';

export const useColorSchemeStore = defineStore('colorScheme', {
  state: () => ({
    mode: 'system', // system, light or dark
  }),
  actions: {
    initializeMode() {
      this.mode = localStorage.getItem('colorScheme') || 'system';
    },
    toggleMode() {
      if (this.mode === 'system') {
        this.mode = 'light';
      } else if (this.mode === 'light') {
        this.mode = 'dark';
      } else {
        this.mode = 'system';
      }
      localStorage.setItem('colorScheme', this.mode);
    },
  },
});