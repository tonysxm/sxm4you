import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  MatCardModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule,
  MatSlideToggleModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseQuickPanelComponent } from 'app/main/quick-panel/quick-panel.component';

@NgModule({
    declarations: [
        FuseQuickPanelComponent
    ],
    imports     : [
        RouterModule,

        MatDividerModule,
        MatListModule,
        MatSlideToggleModule,
        MatIconModule,
        MatInputModule,
        MatCardModule,
        MatFormFieldModule,

        FuseSharedModule,
    ],
    exports: [
        FuseQuickPanelComponent
    ]
})
export class FuseQuickPanelModule
{
}
