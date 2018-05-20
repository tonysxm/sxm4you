import {Inject, Injectable} from '@angular/core';
import {ShoppingCartItem} from '../models/shopping-cart-item';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {Product} from '../main/content/e-commerce/product/product.model';

@Injectable()
export class ShoppingCartService {

  userId: number;
  shoppingCartItems: ShoppingCartItem[] = new Array();
  shoppingCartTotals: number[] = new Array();
  shoppingCartTotal: number;
  shoppingCart = new Map();

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    this.userId = 1; // FIXME: remove this to fix it
  }

  addCartItem(product: Product, amount: number) {

      const shoppingCartItem = new ShoppingCartItem(product, amount);
      const doesExist = this.shoppingCartItems.some(cartItem => {
          return product === cartItem.product;
      });

      if (doesExist) {
        this.updateShoppingCartItemAmountByOne(shoppingCartItem.product);
      } else {
        this.shoppingCartItems.push(shoppingCartItem);
        this.saveInLocalStorage(this.userId, this.shoppingCartItems);
      }
  }

  updateShoppingCartItemAmount(product: Product, amount: number) {
    const indexOfShoppingCartItem = this.shoppingCartItems.findIndex(function(element) {
      return element.product === product;
    });

    this.shoppingCartItems[indexOfShoppingCartItem].amount = amount;
    this.saveInLocalStorage(this.userId, this.shoppingCartItems);
  }

  updateShoppingCartItemAmountByOne(product: Product) {
    const indexOfShoppingCartItem = this.shoppingCartItems.findIndex(function(element) {
      return element.product === product;
    });
    this.shoppingCartItems[indexOfShoppingCartItem].amount++;
    this.saveInLocalStorage(this.userId, this.shoppingCartItems);
  }

  reduceCartItemAmountByOne(product: Product) {
    const indexOfShoppingCartItem = this.shoppingCartItems.findIndex(function(element) {
      return element.product === product;
    });

    this.shoppingCartItems[indexOfShoppingCartItem].amount--;
    this.saveInLocalStorage(this.userId, this.shoppingCartItems);
  }

  removeCartItem(product: Product) {
    const indexOfShoppingCartItem = this.shoppingCartItems.findIndex(function(element) {
      return element.product === product;
    });

    this.shoppingCartItems.splice(indexOfShoppingCartItem, 1);
    this.saveInLocalStorage(this.userId, this.shoppingCartItems);
  }

  getShoppingCartItems() {
    const shoppingCartItemsFromLocalStorage = this.getShoppingCartItemsFromLocalStorage(1);
    if (shoppingCartItemsFromLocalStorage) {
      const shoppingCartItems = shoppingCartItemsFromLocalStorage.map(x => new ShoppingCartItem(x.product, x.amount));
      return this.shoppingCartItems = shoppingCartItems;
    } else {
      return this.shoppingCartItems;
    }
  }

  getTotals() {
    this.shoppingCartTotals = this.shoppingCartItems.map(shoppingCartItem => shoppingCartItem.getSubTotal());
    return this.shoppingCartTotals;
  }

  getTotalPrice() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    if ( this.getTotals().length !== 0) {
      this.shoppingCartTotal = this.shoppingCartTotals.reduce(reducer);
    }
    return this.shoppingCartTotal;
  }

  private saveInLocalStorage(userId, ShoppingCartItems: any): void {
    const serializedShoppingCartItems = JSON.stringify(ShoppingCartItems);
    this.storage.set(userId, serializedShoppingCartItems);
  }

  private getShoppingCartItemsFromLocalStorage(userId) {
    const shoppingCartItems = this.storage.get(userId);
    return JSON.parse(shoppingCartItems);
  }

  public clearShoppingCartItemsForLocalStorage(userId) {
    console.log('Before:' + this.storage.get(userId));
    this.shoppingCartItems  = new Array();
    this.shoppingCartTotals = new Array();
    this.shoppingCartTotal  = 0;
    this.storage.remove(userId);
    console.log('After:' + this.storage.get(userId));
  }

}
