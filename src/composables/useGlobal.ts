import { ref } from 'vue';
import { User } from '../models/user.model';
import http from '../plugins/http';
import { useUserStore } from '../store/user';
import { Product } from '../models/product.model';
import { Cart, CartProduct } from '../models/cart.model';
import { storeToRefs } from 'pinia';
import { useProductStore } from '../store/product';

const useGlobal = () => {
  const productsStore = useProductStore();
  const { records: products } = storeToRefs(productsStore);
  const userStore = useUserStore();
  const { userId, cart } = storeToRefs(userStore);

  const fnFetchData = async () => {
    await http.get<User>('users/1').then((response) => {
      userStore.fnSetUser(response.data);
    });
  };

  const fnFetchMyCart = async () => {
    await http.get<Cart>('carts/1').then((response) => {
      const { data } = response;
      const cart = formatterCart(data);
      userStore.fnSetCart(cart);
      userStore.fnCalculateTotalCart();
    });
  };

  const menuItems = ref([
    {
      separator: true,
    },
    {
      label: 'Productos',
      items: [
        {
          label: 'Listado de productos',
          icon: 'pi pi-plus',
          routeName: 'Products.List',
        },
      ],
    },
    {
      label: 'Categorías',
      items: [
        {
          label: 'Listado de categorías',
          icon: 'pi pi-plus',
          routeName: 'Categories.List',
        },
      ],
    },
    {
      label: 'Carrito',
      items: [
        {
          label: 'Mi carrito',
          icon: 'pi pi-plus',
          routeName: 'Carts.Cart',
        },
      ],
    },
    {
      separator: true,
    },
  ]);

  const fnUpdateQuantity = async () => {
    const date = new Date().toJSON().slice(0, 10);
    const params = {
      userId: userId.value,
      date,
      products: cart.value?.products.map((p) => {
        return {
          quantity: p.quantity,
          productId: p.productId,
        };
      }),
    };
    try {
      const responseUpdateCart = await http.put<Cart>(
        `carts/${userId.value}`,
        params
      );

      const cart = formatterCart(responseUpdateCart.data);

      userStore.fnSetCart(cart);
      userStore.fnCalculateTotalCart();
    } catch (error) {
      console.log(error);
    }
  };

  const fnAddProductToCart = async (productId: number) => {
    const date = new Date().toJSON().slice(0, 10);
	if (!cart.value) {
		await fnFetchMyCart();
	}
    const productsData = cart.value?.products.map((p) => {
      return {
        quantity: p.quantity,
        productId: p.productId,
      };
    });

    productsData?.push({
      quantity: 1,
      productId,
    });
    const params = {
      userId: userId.value,
      date,
      products: productsData,
    };
    try {
      const responseUpdateCart = await http.put<Cart>(
        `carts/${userId.value}`,
        params
      );

      const cart = formatterCart(responseUpdateCart.data);

      userStore.fnSetCart(cart);
      userStore.fnCalculateTotalCart();
    } catch (error) {
      console.log(error);
    }
  };

  const fnDeleteProduct = async (productId: number) => {
    const date = new Date().toJSON().slice(0, 10);
    const params = {
      userId: userId.value,
      date,
      products: cart.value?.products.filter((p) => p.productId !== productId),
    };
    try {
      const responseUpdateCart = await http.put<Cart>(
        `carts/${userId.value}`,
        params
      );

      const cart = formatterCart(responseUpdateCart.data);

      userStore.fnSetCart(cart);
      userStore.fnCalculateTotalCart();
    } catch (error) {
      console.log(error);
    }
  };

  const formatterCart = (cart: Cart): Cart => {
    cart.products.map((p: CartProduct) => {
      const product = products.value.find(
        (pf: Product) => pf.id === p.productId
      );
      if (product) {
        p.product = product;
      }
      return p;
    });

    return cart;
  };

  return {
    fnFetchData,
    menuItems,
    fnFetchMyCart,
    fnUpdateQuantity,
    fnDeleteProduct,
    fnAddProductToCart,
  };
};

export default useGlobal;
