import { defineStore } from 'pinia';
import { Category } from '../models/category.model';

export const useCategoriesStore = defineStore('products', {
  state: () => ({
    records: [] as Category[],
	filter: ''
  }),
  actions: {
    fnSetRecords(value: Category[]) {
      this.records = value;
    },
  },
});
