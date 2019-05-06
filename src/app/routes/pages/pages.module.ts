import {NgModule} from '@angular/core';
import {Routes, RouterModule , ActivatedRoute} from '@angular/router';


import {SharedModule} from '../../shared/shared.module';
import {LoginComponent} from './login/login.component';
import {Error404Component} from './error404/error404.component';
import {Error500Component} from './error500/error500.component';
import {CustomersComponent} from './customers/customers.component';
import {ViewCustomersComponent} from './view-customers/view-customers.component';

/* Use this routes definition in case you want to make them lazy-loaded */
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'view', component: ViewCustomersComponent},
  {path: 'add', component: CustomersComponent},
  {path: 'edit/:id', component: CustomersComponent},
  {path: '404', component: Error404Component},
  {path: '500', component: Error500Component},
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LoginComponent,

    Error404Component,
    Error500Component,
    CustomersComponent,
    ViewCustomersComponent
  ],
  exports: [
    RouterModule,
    LoginComponent,
    Error404Component,
    Error500Component
  ]
})
export class PagesModule {
}
