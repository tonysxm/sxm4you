import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  title = 'Store';
  products = [
    { id: 1,
      name: 'Beans',
      price: 4.50,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n' +
      '      Donec mattis pretium massa. Aliquam erat volutpat.',
      categories: [
        'Fruit & Vegetables',
        'Whole Grain'
      ]
    },
    { id: 2,
      name: 'Pizza',
      price: 20,
      description: 'Sherwin mattis pretium massa. Aliquam erat volutpat.',
      categories: [
       'Dairy',
        'Whole Grain',
      ]
    },
    { id: 3,
      name: 'Beer',
      price: 4,
      description: 'Lorem Ispum',
      categories: [
        'Beverages',
      ]
    },
    { id: 4,
      name: 'Soda',
      price: 12,
      description: 'Lorem Ispum',
      categories: [
        'Beverages',
        'zen'
      ]
    },
  ];
  categories = this.products.flatMap(x => x.categories);

  constructor() {
  }


  ngOnInit() {
  }

}
