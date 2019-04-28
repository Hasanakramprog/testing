import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { ConstantsService } from '../constants/constants.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private constants : ConstantsService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request || !request.url || (/^http/.test(request.url) && !(this.constants.API_ENDPOINT && request.url.startsWith(this.constants.API_ENDPOINT)))) {
            return next.handle(request);
        }

        const token = localStorage.getItem('authenticationToken') || sessionStorage.getItem('authenticationToken');
        if(!token){
            console.log("Token in AuthInterceptor" , token) ;
        }
        

        if (!!token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });
        }
        return next.handle(request);
    }
}
