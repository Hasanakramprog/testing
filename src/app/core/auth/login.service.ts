import { Injectable } from '@angular/core';

import { Principal } from '../auth/principal.service';
import { AuthServerProvider } from '../auth/auth-jwt.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../constants/constants.service';
import {LocalStorage} from 'ngx-webstorage';

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(private principal: Principal,
        private authServerProvider: AuthServerProvider,
        private httpClient: HttpClient,
        private router: Router,
        private constants: ConstantsService
    ) { }

    login(credentials, callback?) {
        const cb = callback || function () { };

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe(
                data => {
                    this.principal.identity(true).then(account => {
                        resolve(data);

                    });
                    return cb();
                },
                err => {
                    this.logout();
                    reject(err);
                    return cb(err);
                }
            );
        });
    }

    loginWithToken(jwt, rememberMe) {
        return this.authServerProvider.loginWithToken(jwt, rememberMe);
    }

    logout() {

        if (this.principal.isAuthenticated()) {
            this.httpClient.post(this.constants.API_ENDPOINT + "auth/logout", {}).subscribe(result => {
                this.logoutCallBack();
            })

        }
        else {
            this.logoutCallBack();
        }

    }

    logoutCallBack(){
        this.authServerProvider.logout().subscribe();
        let message = { 'command': 'logout' };
        localStorage.setItem('message', JSON.stringify(message));
        localStorage.removeItem('message');
        localStorage.removeItem('role');
      localStorage.setItem('role', '');
        this.principal.authenticate(null);
        this.router.navigate(['/login']);
    }
     
}
