import { Component, OnInit } from '@angular/core';
import {Product} from "../../../../models/product";
import {ShoppingCartService} from "../../../../services/shopping-cart.service";
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  get products(): any {
    return this._products;
  }

  set products(value: any) {
    this._products = value;
  }
  title = 'Store';
  private _products: any = [
    { id: 1,
      name: 'Beans',
      activePrice: 4.50,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n' +
      '      Donec mattis pretium massa. Aliquam erat volutpat.',
      categories: [
        'Fruit & Vegetables',
        'Whole Grain'
      ]
    },
    { id: 2,
      name: 'Pizza',
      activePrice: 20,
      description: 'Sherwin mattis pretium massa. Aliquam erat volutpat.',
      categories: [
        'Dairy',
        'Whole Grain',
      ]
    },
    { id: 3,
      name: 'Beer',
      activePrice: 4,
      description: 'Lorem Ispum',
      categories: [
        'Beverages',
      ]
    },
    { id: 4,
      name: 'Soda',
      activePrice: 12,
      description: 'Lorem Ispum',
      categories: [
        'Beverages',
        'zen'
      ]
    },
  ];

  categories = this._products.flatMap(x => x.categories);

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  addtoCart(product: Product, amount: number) {
    this.shoppingCartService.addCartItem(product, amount);
  }


  ngOnInit() {
  }

}
