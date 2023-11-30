import { storeToRefs } from 'pinia';
import http from '../plugins/http';
import { useProductStore } from '../store/product';
import { Product } from '../models/product.model';

const useProducts = () => {
  const productsStore = useProductStore();

  const { records } = storeToRefs(productsStore);

  const fnFetchData = async () => {
    http.get<Product[]>('products').then((response) => {
      productsStore.fnSetRecords(response.data);
    });
  };
  
  return {
    fnFetchData,
    records,
  };
};

export default useProducts;
