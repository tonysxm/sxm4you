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
  title = 'Store';
  products: any;
  categories = new Set();

  constructor(private shoppingCartService: ShoppingCartService, private productService: ProductService) {}

  // public products = this.productService.getAllProduct();

  addtoCart(product: Product, amount: number) {
    this.shoppingCartService.addCartItem(product, amount);
  }

  ngOnInit() {
    this.productService.getProductsFromCompany(1).subscribe( data => {
      // @ts-ignore
      this.products = data.products as Product;
      console.log(this.products);
      this.categories = new Set(this.products.flatMap(x => JSON.parse(x.categories)));
    });
  }

}
