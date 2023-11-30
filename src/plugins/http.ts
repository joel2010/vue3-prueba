import axios from 'axios';
import { useGlobalStore } from '../store/global';

const http = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    Accept: 'application/json',
    common: {
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'X-Requested-With, Content-Type, X-Token-Auth, Authorization',
    },
  },
});

http.interceptors.request.use(
  (config) => {
    const globalStore = useGlobalStore();
    globalStore.fnSetLoading(true);
    return config;
  },
  (error) => {
    const globalStore = useGlobalStore();
    globalStore.fnSetLoading(false);
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    const globalStore = useGlobalStore();
    globalStore.fnSetLoading(false);
    return response;
  },
  (error) => {
    const globalStore = useGlobalStore();
    globalStore.fnSetLoading(true);
    return Promise.reject(error);
  }
);

export default http;
