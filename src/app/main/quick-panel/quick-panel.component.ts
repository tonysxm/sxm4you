import {AfterContentChecked, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ShoppingCartItem} from "../../models/shopping-cart-item";

@Component({
    selector     : 'fuse-quick-panel',
    templateUrl  : './quick-panel.component.html',
    styleUrls    : ['./quick-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseQuickPanelComponent implements OnInit, AfterContentChecked
{
    date: Date;
    settings: any;
    notes = [];
    events = [];
    shoppingCartItems: ShoppingCartItem[] =  new Array();
    shoppingCartTotals: number[] = new Array();
    shoppingCartTotal = 0;

    constructor(private shoppingCartService: ShoppingCartService)
    {
        this.date = new Date();
        this.settings = {
            notify: true,
            cloud : false,
            retro : true
        };
    }

    ngOnInit()
    {
      this.shoppingCartItems = this.shoppingCartService.getShoppingCartItems();
    }

    ngAfterContentChecked() {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      this.shoppingCartTotals = this.shoppingCartService.getTotals();
      if(this.shoppingCartTotals.length !== 0) {
        this.shoppingCartTotal = this.shoppingCartTotals.reduce(reducer);
      }
    }

}
