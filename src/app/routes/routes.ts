import { LayoutComponent } from '../layout/layout.component';
import { UserRouteAccessService } from '../core/auth/user-route-access-service';
import { LoginComponent } from './pages/login/login.component';

export const routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },
            { path: 'customers', loadChildren: './pages/pages.module#PagesModule' },

        ]
        , canActivate: [UserRouteAccessService]
    }
    ,
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'home' }
]


