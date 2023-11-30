import { defineStore } from 'pinia';
import { User } from '../models/user.model';
import { Cart, CartProduct } from '../models/cart.model';

export const useUserStore = defineStore('user', {
  state: () => ({
	userId: 1,
    user: null as User | null,
    cart: null as Cart | null,
  }),
  actions: {
    fnSetUser(value: User) {
      this.user = value;
    },
    fnSetCart(value: Cart) {
      this.cart = value;
    },
    fnCalculateTotalCart() {
      if (this.cart) {
        const total =
          this.cart.products
            .map((p: CartProduct) => p.product.price * p.quantity)
            .reduce((acc: number, it: number) => it + acc, 0) || 0;

        const totalItems = this.cart.products
          .map((p: CartProduct) => p.quantity)
          .reduce((acc: number, it: number) => acc + it, 0);

        this.cart.total = total;
        this.cart.totalItems = totalItems;
      }
    },
  },
});
