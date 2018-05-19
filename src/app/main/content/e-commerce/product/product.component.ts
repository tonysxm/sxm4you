import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { Product } from './product.model';
import { EcommerceProductService } from './product.service';
import { Location } from '@angular/common';
import {HttpClient, HttpEventType} from '@angular/common/http';

@Component({
    selector     : 'fuse-e-commerce-product',
    templateUrl  : './product.component.html',
    styleUrls    : ['./product.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class FuseEcommerceProductComponent implements OnInit, OnDestroy
{
    product = new Product();
    onProductChanged: Subscription;
    pageType: string;
    productForm: FormGroup;
    selectedFile = null;


  constructor(
        private productService: EcommerceProductService,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private location: Location,
        private http: HttpClient
    )
    {
    }

    ngOnInit()
    {
        // Subscribe to update product on changes
        this.onProductChanged =
            this.productService.onProductChanged
                .subscribe(product => {

                    if ( product )
                    {
                        this.product = new Product(product);
                        this.pageType = 'edit';
                    }
                    else
                    {
                        this.pageType = 'new';
                        this.product = new Product();
                    }

                    this.productForm = this.createProductForm();
                });
    }

    ngOnDestroy()
    {
        this.onProductChanged.unsubscribe();
    }

    createProductForm()
    {
        return this.formBuilder.group({
            id              : [this.product.id],
            name            : [this.product.name],
            handle          : [this.product.handle],


            description     : [this.product.description],
            categories      : [this.product.categories],
            tags            : [this.product.tags],
            images          : [this.product.images],
            price           : [this.product.price],
            tax_rate        : [this.product.tax_rate],
            comparedPrice   : [this.product.comparedPrice],
            quantity        : [this.product.quantity],
            sku             : [this.product.sku],
            width           : [this.product.width],
            height          : [this.product.height],
            depth           : [this.product.depth],
            weight          : [this.product.weight],
            extraShippingFee: [this.product.extraShippingFee],
            active          : [this.product.active],
            thumbnail       : [this.product.thumbnail]
        });
    }

    saveProduct()
    {
      const data = this.productForm.getRawValue();
      data.handle = FuseUtils.handleize(data.name);
      data.active = (data.active === true ) ? 1 : 0;
      this.productService.saveProduct(data)
            .then(() => {

                // Trigger the subscription with new data
                data.categories =  JSON.stringify(data.categories);
                this.productService.onProductChanged.next(data);

                // Show the success message
                this.snackBar.open('Product saved', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });
    }

    addProduct()
    {
      const data = this.productForm.getRawValue();
      data.handle = FuseUtils.handleize(data.name);
      data.active = (data.active === true ) ? 1 : 0;
      this.productService.addProduct(data)
            .then(() => {

                // Trigger the subscription with new data
              data.categories =  JSON.stringify(data.categories);
              this.productService.onProductChanged.next(data);

                // Show the success message
                this.snackBar.open('Product added', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // Change the location with new one
                this.location.go('apps/e-commerce/products/' + this.product.id + '/' + this.product.handle);
            });
    }

    onFileSelected(event) {
        this.selectedFile = event.target.file[0];
    }

    uploadFile() {
        // const fd =  new FormData()
        // fd.append('image', this.selectedFile, this.selectedFile.name)
        // this.http.post('localhost/src/assests/images', fd)
        //   .subscribe(res => {
        //     console.log(res);
        //   });
    }
}
