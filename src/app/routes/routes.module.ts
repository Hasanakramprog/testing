import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslatorService} from '../core/translator/translator.service';
import {MenuService} from '../core/menu/menu.service';
import {SharedModule} from '../shared/shared.module';

import {menu} from './menu';
import {menu2} from './regular-menu';
import {routes} from './routes';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes),

  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})

export class RoutesModule {
  role;

  constructor(public menuService: MenuService, tr: TranslatorService) {
    // this.role = localStorage.getItem('role').toString();
    // if (this.role == 'admin') {
    //   menuService.addMenu(menu);
    // } else {
    //   menuService.addMenu(menu2);
    // }

  }
}
