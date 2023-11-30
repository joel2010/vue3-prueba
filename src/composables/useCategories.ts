import { storeToRefs } from 'pinia';
import http from '../plugins/http';
import { useCategoriesStore } from '../store/categories';
import { Category } from '../models/category.model';

const useCategories = () => {
  const categoriesStore = useCategoriesStore();

  const { records } = storeToRefs(categoriesStore);

  const fnFetchData = async () => {
    http.get<Category[]>('products/categories').then((response) => {
      categoriesStore.fnSetRecords(
        response.data.map((c: string) => {
          return {
            title: c,
          } as Category;
        })
      );
    });
  };

  return {
    fnFetchData,
    records,
  };
};

export default useCategories;
