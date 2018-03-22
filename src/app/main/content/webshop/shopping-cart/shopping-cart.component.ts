///<reference path="../../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'fuse-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ShoppingCartComponent implements OnInit {

  date: Date;
  settings: any;
  notes = [];

  constructor() { }

  ngOnInit() {
  }

}
