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
        document.documentElement.classList.remove('dark');
      } else if (this.mode === 'light') {
        this.mode = 'dark';
        document.documentElement.classList.add('dark');
      } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        this.mode = 'system';
      }
      localStorage.setItem('colorScheme', this.mode);
    },
  },
});