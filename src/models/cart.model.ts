import { Product } from './product.model';

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartProduct[];
  total: number;
  totalItems: number;
}

export interface CartProduct {
  productId: number;
  quantity: number;
  product: Product;
}
