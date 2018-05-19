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
    payments: any[];
    onOrderChanged: BehaviorSubject<any> = new BehaviorSubject({});
    onOrderItemsChanged: BehaviorSubject<any> = new BehaviorSubject({});
    onOrderPaymentsChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private http: HttpClient) {}

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
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

      const orderPayments = new Promise((resolve, reject) => {
        Promise.all([
          this.getPayments()
        ]).then(
          () => {
            resolve();

          },
          reject
        );
      });

      return {orderPromise, orderItemsPromise, orderPayments};
    }

      getOrder(): Promise<any> {
          return new Promise((resolve, reject) => {
              this.http.get('http://localhost:18080/order/' + this.routeParams.id)
                  .subscribe((response: any) => {
                      this.order = response.order[0];
                      this.onOrderChanged.next(this.order);
                      resolve(response);
                  }, reject);
          });
      }

    getOrderItems(): Promise<any> {
      return new Promise((resolve, reject) => {
        this.http.get('http://localhost:18080/order/items/' + this.routeParams.id)
          .subscribe((response: any) => {
            this.orderItems = response.orderItems;
            this.onOrderItemsChanged.next(this.orderItems);
            resolve(response);
          }, reject);
      });
    }


  addOrderItems(orderItems){
    const orderId = orderItems[0].order_id;
    const body = JSON.stringify(orderItems);
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:18080/order/' + orderId, JSON.parse(`{"orderItems"  : ${body} }`))
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

    saveOrder(order) {
        return new Promise((resolve, reject) => {
            this.http.put('http://localhost:18080/order/' + order.id, order)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    addOrder(order) {
        return new Promise((resolve, reject) => {
            this.http.post('http://localhost:18080/order/', order)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getPayments(): Promise<any> {
      return new Promise((resolve, reject) => {
        this.http.get('http://localhost:18080/payment/order/' + this.routeParams.id)
          .subscribe((response: any) => {
            this.payments = response.payments;
            this.onOrderPaymentsChanged.next(this.payments);
            resolve(response);
          }, reject);
      });
    }

    addPayment(payment) {
      return new Promise((resolve, reject) => {
        this.http.post('http://localhost:18080/payment/', payment)
          .subscribe((response: any) => {
            resolve(response);
          }, reject);
      });
    }

}
