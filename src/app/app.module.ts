import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';

import { fuseConfig } from './fuse-config';

import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { WebshopModule } from './main/content/webshop/webshop.module';
import {FuseEcommerceModule} from "./main/content/e-commerce/e-commerce.module";
import {FuseFakeDbService} from "./fuse-fake-db/fuse-fake-db.service";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";

const appRoutes: Routes = [
    {
        path      : '**',
        redirectTo: 'store-list'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),

        InMemoryWebApiModule.forRoot(FuseFakeDbService, {
          delay             : 0,
          passThruUnknownUrl: true
        }),

        // Fuse Main and Shared modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseMainModule,
        WebshopModule,
        FuseEcommerceModule
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
