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

const routes = [
  {
    path     : 'store-list',
    component: StoreListComponent
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

    MatDividerModule,
    MatListModule,
    MatSlideToggleModule,


    TranslateModule,

    FuseSharedModule
  ],
  declarations: [StoreListComponent, StoreComponent, ProductListComponent, ShoppingCartComponent],

})
export class WebshopModule { }
