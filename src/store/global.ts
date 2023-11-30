import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    loading: false,
  }),
  actions: {
    fnSetLoading(value: boolean) {
      this.loading = value;
    },
  },
});
