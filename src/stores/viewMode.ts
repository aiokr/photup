import { defineStore } from 'pinia';

export const useViewModeStore = defineStore('viewMode', {
  state: () => ({
    mode: 'list', // 默认值
  }),
  actions: {
    initializeMode() {
      this.mode = localStorage.getItem('viewMode') || 'list';
    },
    toggleMode() {
      this.mode = this.mode === 'grid' ? 'list' : 'grid';
      localStorage.setItem('viewMode', this.mode);
    },
  },
});