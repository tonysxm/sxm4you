import { Injectable } from '@angular/core';
import {Store} from "../models/store";

@Injectable()
export class StoreService {

  constructor() { }

  stores: Store[] = [
    {id: 1, name: 'FoodCenter'},
    {id: 2, name: 'VanDorp'},
    {id: 3, name: 'FirstCaribbean'},
    {id: 5, name: 'SevenEleven'},
    {id: 6, name: 'GrandMarche'},
    {id: 7, name: 'Cost-U-Less'},
  ];

  getAllStores() {
    return this.stores;
  }

  updateStore(store: Store) {}

  removeStore(storeId) {}

}
