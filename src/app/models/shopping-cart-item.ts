import {Product} from "../main/content/e-commerce/product/product.model";

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
