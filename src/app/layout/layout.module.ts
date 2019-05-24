import {NgModule, OnChanges, SimpleChanges} from '@angular/core';

import {LayoutComponent} from './layout.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component';
import {NavsearchComponent} from './header/navsearch/navsearch.component';
import {OffsidebarComponent} from './offsidebar/offsidebar.component';
import {UserblockComponent} from './sidebar/userblock/userblock.component';
import {UserblockService} from './sidebar/userblock/userblock.service';
import {FooterComponent} from './footer/footer.component';

import {SharedModule} from '../shared/shared.module';
import {MenuService} from '../core/menu/menu.service';
import {TranslatorService} from '../core/translator/translator.service';
import {menu2} from '../routes/regular-menu';
import {menu} from '../routes/menu';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    UserblockService
  ],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    UserblockComponent,
    HeaderComponent,
    NavsearchComponent,
    OffsidebarComponent,
    FooterComponent
  ],
  exports: [
    LayoutComponent,
    SidebarComponent,
    UserblockComponent,
    HeaderComponent,
    NavsearchComponent,
    OffsidebarComponent,
    FooterComponent
  ]
})
export class LayoutModule {
  role;

  constructor(public menuService: MenuService, tr: TranslatorService) {
    this.role = localStorage.getItem('role').toString();
    console.log(this.role);
    if (this.role == 'admin') {
      menuService.addMenu(menu);
    } else {
      menuService.addMenu(menu2);
    }

  }


}
