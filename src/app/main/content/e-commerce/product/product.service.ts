import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Product} from "./product.model";

@Injectable()
export class EcommerceProductService implements Resolve<any>
{
    routeParams: any;
    product: any;
    onProductChanged: BehaviorSubject<any> = new BehaviorSubject({});

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

        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getProduct()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getProduct(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onProductChanged.next(false);
                resolve(false);
            }
            else
            {
                this.http.get('http://localhost:18080/product/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.product = response.product[0] as Product;
                        console.log(this.product.categories)
                        this.product.categories = JSON.parse(this.product.categories);
                        this.onProductChanged.next(this.product);
                        resolve(response);
                    }, reject);
            }
        });
    }

    saveProduct(product)
    {
        return new Promise((resolve, reject) => {
            this.http.put('http://localhost:18080/product/' + product.id, product)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    addProduct(product)
    {
        return new Promise((resolve, reject) => {
            this.http.post('http://localhost:18080/product/', product)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
