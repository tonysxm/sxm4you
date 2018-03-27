import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreComponent } from './store/store.component';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CdkTableModule } from '@angular/cdk/table';
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatFormFieldModule, MatGridListModule, MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatRippleModule, MatSelectModule, MatSortModule, MatTableModule, MatTabsModule
} from '@angular/material';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MatDividerModule, MatListModule, MatSlideToggleModule } from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ProductCategoryFilterPipe } from './store/product-category-filter.pipe';
import { ProductFilterPipe } from './store/product-filter.pipe';
import {ShoppingCartService} from "../../../services/shopping-cart.service";
import {StoreService} from "../../../services/store.service";

const routes = [
  {
    path     : 'store-list',
    component: StoreListComponent
  },
  {
    path     : 'store/:id',
    component: StoreComponent
  },
  {
    path     : 'product-list',
    component: ProductListComponent
  },
  {
    path     : 'shopping-cart',
    component: ShoppingCartComponent
  }
];

@NgModule({
  providers: [ShoppingCartService, StoreService],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    CdkTableModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule,

    MatDividerModule,
    MatListModule,
    MatSlideToggleModule,

    TranslateModule,

    FuseSharedModule
  ],
  declarations: [StoreListComponent, StoreComponent, ProductListComponent, ShoppingCartComponent, ProductCategoryFilterPipe, ProductFilterPipe],

})
export class WebshopModule { }
