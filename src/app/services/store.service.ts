import { Injectable } from '@angular/core';
import {Store} from "../models/store";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class StoreService {

  constructor(private http: HttpClient) { }

  stores: Store[] = [
    {id: 1, name: 'FoodCenter'},
    {id: 2, name: 'VanDorp'},
    {id: 3, name: 'FirstCaribbean'},
    {id: 5, name: 'SevenEleven'},
    {id: 6, name: 'GrandMarche'},
    {id: 7, name: 'Cost-U-Less'},
  ];

  getAllStores() {
    return this.http.get('http://localhost:18080/company/list');
  }

  updateStore(store: Store) {}

  removeStore(storeId) {}

}
