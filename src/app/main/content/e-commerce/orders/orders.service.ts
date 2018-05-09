import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class EcommerceOrdersService implements Resolve<any>
{
    orders: any[];
    onOrdersChanged: BehaviorSubject<any> = new BehaviorSubject({});

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
                this.getOrders()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getOrders(): Promise<any>
    {
        const companyId = 1;
        return new Promise((resolve, reject) => {
        this.http.get(`http://localhost:18080/order/list/${companyId}`)
                .subscribe((response: any) => {
                    this.orders = response.orders;
                    this.onOrdersChanged.next(this.orders);
                    console.log(JSON.stringify(response))
                    resolve(response);
                }, reject);
        });
    }
}
