import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ColorsService } from './colors/colors.service';

import { NgSelectModule } from "@ng-select/ng-select";

import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import {
    ToastrModule,
    ToastNoAnimationModule,
    ToastNoAnimation
  } from "ngx-toastr";




// https://angular.io/styleguide#!#04-10
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        TabsModule.forRoot(),
        NgxWebstorageModule.forRoot(
            {
              prefix: '', separator: ''
            }
          ),
          ConfirmationPopoverModule.forRoot({
            confirmButtonType: "danger" // set defaults here
          }),
          ToastNoAnimationModule,
          ToastrModule.forRoot({ toastComponent: ToastNoAnimation , positionClass : 'toast-top-center' }),
          NgSelectModule
    ],
    providers: [
        ColorsService
    ],
    declarations: [

    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        RouterModule,
        TabsModule,
        NgxWebstorageModule ,
        ConfirmationPopoverModule ,
        ToastrModule ,
        NgSelectModule,
    ]
})

// https://github.com/ocombe/ng2-translate/issues/209
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
