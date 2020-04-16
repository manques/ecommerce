import { Product } from '../model/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
  price: number;
}
