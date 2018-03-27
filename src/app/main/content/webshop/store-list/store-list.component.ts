import { Component, OnInit } from '@angular/core';
import {StoreService} from "../../../../services/store.service";
import {Store} from "../../../../models/store";

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {

  title = 'All Stores';
  stores: Store[];

  constructor(private storeService: StoreService) {
    this.stores = storeService.getAllStores();
  }

  ngOnInit() {
  }

}
