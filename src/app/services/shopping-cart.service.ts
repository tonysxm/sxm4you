import { Injectable } from '@angular/core';
import {ShoppingCartItem} from '../models/shopping-cart-item';
import {Product} from '../models/product';

@Injectable()
export class ShoppingCartService {

  userId: number;
  shoppingCartItems: ShoppingCartItem[] = new Array();
  shoppingCartTotals: number[] = new Array();

  constructor() { }

  getSubTotalForItem(shoppingCartItem: ShoppingCartItem) {
    const product = shoppingCartItem.product;
    const price =  (product.discountedPrice !== 0 ) ? product.discountedPrice : product.activePrice;
    return price * shoppingCartItem.amount;
  }

  addCartItem(product: Product, amount: number) {
      const shoppingCartItem = new ShoppingCartItem();
      shoppingCartItem.product = product;
      shoppingCartItem.amount = amount;

      const doesExist = this.shoppingCartItems.some(shoppingCartItem => {
          return product === shoppingCartItem.product;
      });

      if (doesExist) {
        this.updateShoppingCartItemAmountByOne(shoppingCartItem.product);
      } else {
        this.shoppingCartItems.push(shoppingCartItem);
      }
  }

  updateShoppingCartItemAmount(product: Product, amount: number) {
    const indexOfShoppingCartItem = this.shoppingCartItems.findIndex(function(element) {
      return element.product === product;
    });

    this.shoppingCartItems[indexOfShoppingCartItem].amount = amount;
  }

  updateShoppingCartItemAmountByOne(product: Product) {
    const indexOfShoppingCartItem = this.shoppingCartItems.findIndex(function(element) {
      return element.product === product;
    });

    this.shoppingCartItems[indexOfShoppingCartItem].amount++;
  }

  reduceCartItemAmountByOne(product: Product) {
    const indexOfShoppingCartItem = this.shoppingCartItems.findIndex(function(element) {
      return element.product === product;
    });

    this.shoppingCartItems[indexOfShoppingCartItem].amount--;
  }

  removeCartItem(product: Product) {
    const indexOfShoppingCartItem = this.shoppingCartItems.findIndex(function(element) {
      return element.product === product;
    });

    this.shoppingCartItems.splice(indexOfShoppingCartItem, 1);
  }

  getShoppingCartItems() {
    return this.shoppingCartItems;
  }

  getTotals() {
    this.shoppingCartTotals = this.shoppingCartItems.map(shoppingCartItem => shoppingCartItem.getSubTotal());
    return this.shoppingCartTotals;
  }

}
