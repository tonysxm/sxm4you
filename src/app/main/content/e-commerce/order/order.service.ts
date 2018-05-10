import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class EcommerceOrderService implements Resolve<any>
{
    routeParams: any;
    order: any;
    orderItems: any;
    onOrderChanged: BehaviorSubject<any> = new BehaviorSubject({});
    onOrderItemsChanged: BehaviorSubject<any> = new BehaviorSubject({});

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

      const orderItemsPromise = new Promise((resolve, reject) => {
        Promise.all([
          this.getOrderItems()
        ]).then(
          () => {
            resolve();

          },
          reject
        );
      });

      const orderPromise = new Promise((resolve, reject) => {
        Promise.all([
          this.getOrder()
        ]).then(
          () => {
            resolve();

          },
          reject
        );
      });


      return {orderPromise, orderItemsPromise};
    }

      getOrder(): Promise<any>
      {
          return new Promise((resolve, reject) => {
              this.http.get('http://localhost:18080/order/' + this.routeParams.id)
                  .subscribe((response: any) => {
                      this.order = response.order[0];
                      this.onOrderChanged.next(this.order);
                      resolve(response);
                  }, reject);
          });
      }

    getOrderItems(): Promise<any>
    {
      return new Promise((resolve, reject) => {
        this.http.get('http://localhost:18080/order/items/' + this.routeParams.id)
          .subscribe((response: any) => {
            this.orderItems = response.orderItems;
            this.onOrderItemsChanged.next(this.orderItems);
            resolve(response);
          }, reject);
      });
    }

    saveOrder(order)
    {
        return new Promise((resolve, reject) => {
            this.http.put('http://localhost:18080/order/' + order.id, order)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    addOrder(order)
    {
        return new Promise((resolve, reject) => {
            this.http.post('api/e-commerce-orders/', order)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
