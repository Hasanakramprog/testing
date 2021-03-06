import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { StateStorageService } from './state-storage.service';
import { Principal } from './principal.service';

@Injectable({ providedIn: 'root' })
export class UserRouteAccessService implements CanActivate {
    constructor(
        private router: Router,
        private principal: Principal,
        private stateStorageService: StateStorageService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
        const authorities = route.data['authorities'];
        // We need to call the checkLogin / and so the principal.identity() function, to ensure,
        // that the client has a principal too, if they already logged in by the server.
        // This could happen on a page refresh.
        return this.checkLogin(authorities, state.url);
    }

    checkLogin(authorities: string[], url: string): Promise<boolean> {

        const principal = this.principal;
        console.log("principal" ,principal)
        this.stateStorageService.storeUrl(url);
        return Promise.resolve(
            principal.identity().then(account => {
                if(account==null){
                    this.router.navigate(['login']) ;
                    // console.log('not login');
                    return false ;
                }
                if (!authorities || authorities.length === 0) {
                    return true;
                }

                if (account) {
                    return principal.hasAnyAuthority(authorities).then(response => {
                        if (response) {
                            return true;
                        }
                        if (isDevMode()) {
                            console.error('User has not any of required authorities: ', authorities);
                        }
                        return false;
                    });
                }



                return false;
            })
        );
    }
}
