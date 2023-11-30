import { Router, createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard/products',
    },
    {
      path: '/dashboard',
      component: MainLayout,
      children: [
        {
          path: 'products',
          name: 'Products.List',
          component: () => import('@/views/ProductList.vue'),
        },
		{
          path: 'categories',
          name: 'Categories.List',
          component: () => import('@/views/CategoryList.vue'),
        },
		{
          path: 'cart',
          name: 'Carts.Cart',
          component: () => import('@/views/Cart.vue'),
        },
      ],
    },
  ],
});

export default router;
