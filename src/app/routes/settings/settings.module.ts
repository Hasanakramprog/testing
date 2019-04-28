import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { PlanComponent } from './plan/plan.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeesConfigComponent } from './fees-config/fees-config.component';

const routes: Routes = [
  { path: 'plans', component: PlanComponent },
  { path: 'fees_config', component: FeesConfigComponent },
];

@NgModule({
  declarations: [PlanComponent, FeesConfigComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [
    RouterModule 
  ]
})
export class SettingsModule { }
