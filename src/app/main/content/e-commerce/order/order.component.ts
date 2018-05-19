import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';

import { fuseAnimations } from '@fuse/animations';

import { Order } from './order.model';
import { EcommerceOrderService } from './order.service';
import { orderStatuses } from './order-statuses';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {Payment} from './payment.model';

@Component({
    selector     : 'fuse-e-commerce-order',
    templateUrl  : './order.component.html',
    styleUrls    : ['./order.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class FuseEcommerceOrderComponent implements OnInit, OnDestroy
{
    order = new Order();
    onOrderChanged: Subscription;
    onOrderItemsChanged: Subscription;
    onOrderPaymentsChanged: Subscription;
    orderItems: any[];
    payments: any[];
    statusForm: FormGroup;
    paymentForm: FormGroup;
    orderStatuses = orderStatuses;
    statusColor: string;

    constructor(private orderService: EcommerceOrderService, private formBuilder: FormBuilder, public snackBar: MatSnackBar)
    {

    }

    ngOnInit() {
        // Subscribe to update order on changes
        this.onOrderChanged =
            this.orderService.onOrderChanged
                .subscribe(order => {
                    this.order = new Order(order);
                });

        this.onOrderItemsChanged =
            this.orderService.onOrderItemsChanged
                .subscribe(orderItems => {
                    this.orderItems = orderItems;
                });

        this.onOrderPaymentsChanged =
            this.orderService.onOrderPaymentsChanged
              .subscribe(payments => {
                this.payments = payments;
              });

        this.statusForm = this.formBuilder.group({
            newStatus: ['']
        });

        this.paymentForm = this.formBuilder.group({
          paymentMethod: [''],
          amount: [''],
          paymentDate: ['']
        });
    }

    ngOnDestroy() {
        this.onOrderChanged.unsubscribe();
        this.onOrderItemsChanged.unsubscribe();
        this.onOrderPaymentsChanged.unsubscribe();
    }

    updateStatus(order) {
        const newStatusId = Number.parseInt(this.statusForm.get('newStatus').value);
        if ( !newStatusId )
        {
            return;
        }

        const newStatus = this.orderStatuses.find((status) => {
            return status.id === newStatusId;
        });
        order.status = newStatus.name;
        order.status_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.statusForm.reset();

        this.orderService.saveOrder(order).then((res) => {
          this.snackBar.open('Order Updated', 'OK', {
            verticalPosition: 'top',
            duration        : 2000,
          });
        });
    }

    addPaymentToOrder(order, orderItems) {
      const paymentMethod = this.paymentForm.get('paymentMethod').value;
      const amount = this.paymentForm.get('amount').value;
      const paymentDate = new Date(this.paymentForm.get('paymentDate').value).toISOString().slice(0, 19).replace('T', ' ');

      if ( (!paymentMethod && !amount && !paymentDate) || (amount <= 0) ) {
        return;
      }

      const paymentsTotalAmount = this.payments.map(x => x.amount).reduce((prevVal, elem) => prevVal + elem, 0);
      const orderTotalCost = orderItems.map(orderItem => orderItem.price * orderItem.quantity).reduce((prevVal, elem) => prevVal + elem, 0);

      if (paymentsTotalAmount + amount > orderTotalCost) {

        this.snackBar.open('Payment will exceed to total cost of the order', 'OK', {
          verticalPosition: 'top',
          duration        : 2000,
        });
        return;
      }

      const payment =  new Payment();

      payment.orderId = order.id;
      payment.amount = amount;
      payment.paymentMethod = paymentMethod;
      // @ts-ignore
      payment.paymentDate = paymentDate;

      this.orderService.addPayment(payment).then((res) => {
        this.snackBar.open('Payment Updated', 'OK', {
          verticalPosition: 'top',
          duration        : 2000
        });
        this.paymentForm.reset();
        // @ts-ignore
        this.payments.push(
          // @ts-ignore
          {
            // @ts-ignore
            id: res.payment.insertId,
            // @ts-ignore
            order_id: payment.orderId,
            // @ts-ignore
            amount: payment.amount,
            // @ts-ignore
            payment_method: payment.paymentMethod,
            // @ts-ignore
            payment_date: payment.paymentDate
          });

      });
    }
}
