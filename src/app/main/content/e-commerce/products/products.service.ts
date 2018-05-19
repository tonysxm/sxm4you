import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Product} from '../product/product.model';

@Injectable()
export class EcommerceProductsService implements Resolve<any>
{
    products: Product[];
    onProductsChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(
        private http: HttpClient
    )
    {
    }

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getProducts()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    // getProducts(): Promise<any>
    // {
    //     return new Promise((resolve, reject) => {
    //         this.http.get('api/e-commerce-products')
    //             .subscribe((response: any) => {
    //                 this.products = response;
    //                 this.onProductsChanged.next(this.products);
    //                 resolve(response);
    //             }, reject);
    //     });
    // }

  getProducts(): Promise<any>
  {
    const companyId = 1;
    return new Promise((resolve, reject) => {
      this.http.get(`http://localhost:18080/company/${companyId}/products`)
        .subscribe((response: any) => {
          this.products = response.products as Product[];
          this.onProductsChanged.next(this.products);
          resolve(response);
        }, reject);
    });
  }
}
