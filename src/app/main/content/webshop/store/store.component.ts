import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../../../../services/shopping-cart.service";
import 'rxjs/add/operator/mergeMap';
import {ProductService} from "../../../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../e-commerce/product/product.model";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  title = 'Store';
  products: any;
  categories = new Set();
  storeId = 0;

  constructor(private shoppingCartService: ShoppingCartService, private productService: ProductService, private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.storeId = params.id );
  }

  addtoCart(product: Product, amount: number) {
    this.shoppingCartService.addCartItem(product, amount);
  }

  ngOnInit() {
    this.productService.getProductsFromCompany(this.storeId).subscribe( data => {
      // @ts-ignore
      this.products = data.products as Product;
      console.log(this.products);
      this.categories = new Set(this.products.flatMap(x => JSON.parse(x.categories)));
    });
  }

}
