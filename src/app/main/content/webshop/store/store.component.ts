import { Component, OnInit } from '@angular/core';
import {Product} from "../../../../models/product";
import {ShoppingCartService} from "../../../../services/shopping-cart.service";
import 'rxjs/add/operator/mergeMap';
import {ProductService} from "../../../../services/product.service";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService, private productService: ProductService) {}

  title = 'Store';
  public products = this.productService.getAllProduct();
  categories = new Set(this.products.flatMap(x => x.categories));

  addtoCart(product: Product, amount: number) {
    this.shoppingCartService.addCartItem(product, amount);
  }

  ngOnInit() {
    console.log(this.products);
  }

}
