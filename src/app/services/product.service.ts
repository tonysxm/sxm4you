import { Injectable } from '@angular/core';
import {ECommerceFakeDb} from "../fuse-fake-db/e-commerce";

@Injectable()
export class ProductService {

  constructor() {}

  getAllProduct() {
    return ECommerceFakeDb.products;
  }

  getProductsFromCompany(companyId) {
    ECommerceFakeDb.products.filter( product => {
      return true;//product.active === true;
    });
  }

}
