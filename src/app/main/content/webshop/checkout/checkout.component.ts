import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../../../../services/shopping-cart.service";
import {ShoppingCartItem} from "../../../../models/shopping-cart-item";
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations : fuseAnimations
})
export class CheckoutComponent implements OnInit, AfterContentChecked {

  shoppingCartItems: ShoppingCartItem[] =  new Array();
  shoppingCartTotals: number[] = new Array();
  shoppingCartTotal = 0;

  public order = [
    {
      'id'             : 1,
      'reference'      : '70d4d7d0',
      'subtotal'       : '39.97',
      'tax'            : '77.44',
      'discount'       : '-10.17',
      'total'          : '73.31',
      'date'           : '2015/04/25 02:07:59',
      'customer'       : {
        'id'             : 1,
        'firstName'      : 'Dollie',
        'lastName'       : 'Bullock',
        'avatar'         : 'assets/images/avatars/Abbott.jpg',
        'company'        : 'Saois',
        'jobTitle'       : 'Digital Archivist',
        'email'          : 'abbott@withinpixels.com',
        'phone'          : '+1-202-555-0175',
        'invoiceAddress' : {
          'address': '704 6th Ave, New York, NY 10010, USA',
          'lat'    : 40.7424739,
          'lng'    : -73.99283919999999
        },
        'shippingAddress': {
          'address': '377 E South Omaha Bridge Rd, Council Bluffs, IA 51501, USA',
          'lat'    : 41.2183223,
          'lng'    : -95.8420876
        }
      },
      'payment'        : {
        'transactionId': '2a894b9e',
        'amount'       : '73.31',
        'method'       : 'Credit Card',
        'date'         : '2016/02/23 15:50:23'
      },
      'shippingDetails': [
        {
          'tracking': '',
          'carrier' : 'TNT',
          'weight'  : '10.44',
          'fee'     : '7.00',
          'date'    : '2015/04/10 07:03:52'
        }
      ]
    }
  ];


  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.shoppingCartItems = this.shoppingCartService.getShoppingCartItems();
  }

  ngAfterContentChecked() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    this.shoppingCartTotals = this.shoppingCartService.getTotals();
    if (this.shoppingCartTotals.length !== 0) {
      this.shoppingCartTotal = this.shoppingCartTotals.reduce(reducer);
    }
  }

  checkoutOrder() {

  }

}
