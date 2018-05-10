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
import { MatSnackBar } from '@angular/material';

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
    orderItems: any[];
    statusForm: FormGroup;
    orderStatuses = orderStatuses;

    constructor(
        private orderService: EcommerceOrderService,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
    )
    {

    }

    ngOnInit()
    {
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
        this.statusForm = this.formBuilder.group({
            newStatus: ['']
        });
    }

    ngOnDestroy()
    {
        this.onOrderChanged.unsubscribe();
    }

    updateStatus(order: Order)
    {
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

        this.orderService.saveOrder(order).then((res) => {
          this.snackBar.open('Order Updated', 'OK', {
            verticalPosition: 'top',
            duration        : 2000
          });
        });
    }
}
