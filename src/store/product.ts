import { defineStore } from 'pinia';
import { Product } from '../models/product.model';

export const useProductStore = defineStore('products', {
  state: () => ({
    records: [] as Product[],
	filter: ''
  }),
  actions: {
    fnSetRecords(value: Product[]) {
      this.records = value;
    },
  },
});
