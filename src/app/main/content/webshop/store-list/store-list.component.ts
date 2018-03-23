import { Component, OnInit } from '@angular/core';
import {MatGridTile MatGridList} from '@angular/material';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {

  title = 'All Stores';
  stores = [
      {id: 1, name: 'FoodCenter'},
      {id: 2, name: 'VanDorp'},
      {id: 3, name: 'FirstCaribbean'},
      {id: 4, name: 'SevenEleven'},
      {id: 4, name: 'SevenEleven'},
      {id: 4, name: 'SevenEleven'},
      {id: 4, name: 'SevenEleven'},
      {id: 4, name: 'SevenEleven'},
      {id: 4, name: 'SevenEleven'},
      {id: 4, name: 'SevenEleven'},
    ]
  constructor() { }

  goToStore(storeId) {
    console.log('Clicked: ' + storeId);
  }

  ngOnInit() {
  }

}
