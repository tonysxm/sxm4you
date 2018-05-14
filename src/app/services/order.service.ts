import { Injectable } from '@angular/core';
import {ShoppingCartItem} from "../models/shopping-cart-item";
import {ECommerceFakeDb} from "../fuse-fake-db/e-commerce";

@Injectable()
export class OrderService {

  constructor() { }

  getAllProduct() {
    return ECommerceFakeDb.orders;
  }


  createOrder(userId: number, shoppingCartItems: ShoppingCartItem[]) {

  }

}
