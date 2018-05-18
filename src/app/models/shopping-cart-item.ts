import {Product} from "./product";

export class ShoppingCartItem {
  id?: number;
  product: Product;
  amount: number;

  constructor(product: Product, amount: number) {
    this.product = product;
    this.amount = amount;
  }

  getSubTotal() {
    return this.product.price * this.amount;
  }
}
