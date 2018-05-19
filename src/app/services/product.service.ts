import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {}

  getAllProduct() {
    // return ECommerceFakeDb.products;
    const companyId = 1;
    return this.http.get(`http://localhost:18080/company/${companyId}/products`);
  }

  getProductsFromCompany(companyId) {
    return this.http.get(`http://localhost:18080/company/${companyId}/products`);
  }

}
