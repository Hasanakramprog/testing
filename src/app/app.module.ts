import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DateValueAccessorModule } from 'angular-date-value-accessor';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RoutesModule } from './routes/routes.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { PagesModule } from './routes/pages/pages.module';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './core/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './core/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './core/interceptor/notification.interceptor';
import { SettingsModule } from './routes/settings/settings.module';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { UploadModule } from '@progress/kendo-angular-upload';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';











// https://github.com/ocombe/ng2-translate/issues/218
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CoreModule ,
    DateValueAccessorModule,
    LayoutModule ,
    SharedModule.forRoot(),
    RoutesModule,
    PagesModule ,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }) ,
     SettingsModule,
     GridModule,
     BrowserAnimationsModule,
     DialogsModule,
     TreeViewModule,
     DropDownsModule,
     UploadModule,
     InputsModule,
     DateInputsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
