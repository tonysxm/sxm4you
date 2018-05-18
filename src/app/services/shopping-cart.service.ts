import {Inject, Injectable} from '@angular/core';
import {ShoppingCartItem} from '../models/shopping-cart-item';
import {Product} from '../models/product';
import {LOCAL_STORAGE, WebStorageService} from "angular-webstorage-service";

@Injectable()
export class ShoppingCartService {

  userId: number;
  shoppingCartItems: ShoppingCartItem[] = new Array();
  shoppingCartTotals: number[] = new Array();
  shoppingCart = new Map();

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    this.userId = 1; // FIXME: remove this to fix it
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
    const shoppingCartItemsFromLocalStorage = this.getShoppingCartItemsFromLocalStorage(1)
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

  private saveInLocalStorage(userId, ShoppingCartItems: any): void {
    const serializedShoppingCartItems = JSON.stringify(ShoppingCartItems);
    this.storage.set(userId, serializedShoppingCartItems);
  }

  private getShoppingCartItemsFromLocalStorage(userId): void {
    const shoppingCartItems = this.storage.get(userId);
    return JSON.parse(shoppingCartItems) as ShoppingCartItem[];
  }

}
