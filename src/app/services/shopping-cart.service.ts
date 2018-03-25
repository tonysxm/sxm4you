import { Injectable } from '@angular/core';
import {ShoppingCartItem} from '../models/shopping-cart-item';
import {Product} from '../models/product';

@Injectable()
export class ShoppingCartService {

  userId: number;
  shoppingCartItems: ShoppingCartItem[] = new Array();

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

      const doesExist = this.shoppingCartItems.map(shoppingCartItem => {
          return product === shoppingCartItem.product;
      });

      if (doesExist.toString()) {
        this.updateShoppingCartItemAmountByOne(shoppingCartItem);
      } else {
        this.shoppingCartItems.push(shoppingCartItem);
      }
      console.log(this.shoppingCartItems);
  }
  //
  // updateShoppingCartItemAmount(shoppingCartItem: ShoppingCartItem, amount: number) {
  //   // const updatedShoppingCartItem: ShoppingCartItem = this.shoppingCartItems.indexOf(shoppingCartItem);
  //   // updatedShoppingCartItem.amount = amount;
  //   // this.shoppingCartItems.indexOf(shoppingCartItem) = updatedShoppingCartItem;
  // }
  //
  updateShoppingCartItemAmountByOne(shoppingCartItem: ShoppingCartItem) {
    console.log('Still needs to be implemented');

  }
  //
  // removeCartItem(product: Product) {
  //   this.shoppingCartItems.splice(this.shoppingCartItems.indexOf(product), 1);
  //   console.log(this.shoppingCartItems);
  // }

}
