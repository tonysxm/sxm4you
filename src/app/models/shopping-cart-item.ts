import {Product} from "./product";

export class ShoppingCartItem {
  id?: number;
  product: Product;
  amount: number;

  getSubTotal() {
    return this.product.activePrice * this.amount;
  }
}
