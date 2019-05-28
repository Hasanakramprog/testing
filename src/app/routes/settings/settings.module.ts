import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule, Router} from '@angular/router';
import {PlanComponent} from './plan/plan.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {FeesConfigComponent} from './fees-config/fees-config.component';
import {RoleGuardService} from '../../core/auth/role-guard.service';
import { CategoryComponent } from './category/category.component';
import {TreeViewModule} from '@progress/kendo-angular-treeview';

const routes: Routes = [
  {path: 'plans', component: PlanComponent, canActivate: [RoleGuardService]},
  {path: 'fees_config', component: FeesConfigComponent, canActivate: [RoleGuardService]},
  {path: 'category', component: CategoryComponent},
];

@NgModule({
  declarations: [PlanComponent, FeesConfigComponent, CategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    TreeViewModule
  ],
  exports: [
    RouterModule
  ]
})
export class SettingsModule {
}
