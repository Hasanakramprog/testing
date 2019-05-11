import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {SharedModule as shared} from '../../shared/shared.module';
import {LoginComponent} from './login/login.component';
import {Error404Component} from './error404/error404.component';
import {Error500Component} from './error500/error500.component';
import {CustomersComponent} from './customers/customers.component';
import {ViewCustomersComponent} from './view-customers/view-customers.component';
import {BodyModule, GridModule, SharedModule} from '@progress/kendo-angular-grid';
import {DialogModule} from '@progress/kendo-angular-dialog';
import { ItemsComponent } from './items/items.component';
import { ViewItemsComponent } from './view-items/view-items.component';
import { BranchComponent } from './branch/branch.component';
import { ViewBranchComponent } from './view-branch/view-branch.component';
import { RemoteBindingDirective } from './directives/remote-binding.directive';
import {CustomerService} from './directives/data.service';


/* Use this routes definition in case you want to make them lazy-loaded */
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'customer/view', component: ViewCustomersComponent},
  {path: 'branch/view', component: ViewBranchComponent},
  {path: 'item/view', component: ViewItemsComponent},
  {path: 'customer/add', component: CustomersComponent},
  {path: 'item/add', component: ItemsComponent},
  {path: 'branch/add', component: BranchComponent},
  {path: 'customer/edit/:id', component: CustomersComponent},
  {path: 'item/edit/:id', component: ItemsComponent},
  {path: 'branch/edit/:id', component: BranchComponent},
  {path: '404', component: Error404Component},
  {path: '500', component: Error500Component},
];

@NgModule({
  imports: [
    shared,
    GridModule,
    RouterModule.forChild(routes),
    SharedModule,
    BodyModule,
    DialogModule
  ],
  declarations: [
    LoginComponent,

    Error404Component,
    Error500Component,
    CustomersComponent,
    ViewCustomersComponent,
    ItemsComponent,
    ViewItemsComponent,
    BranchComponent,
    ViewBranchComponent,
    RemoteBindingDirective,

  ],
  exports: [
    RouterModule,
    LoginComponent,
    Error404Component,
    Error500Component
  ]
  ,
  providers: [CustomerService],
})
export class PagesModule {
}
