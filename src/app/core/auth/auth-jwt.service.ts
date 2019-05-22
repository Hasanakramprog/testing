import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {ConstantsService} from '../constants/constants.service';


@Injectable({providedIn: 'root'})
export class AuthServerProvider {
  constructor(private http: HttpClient, private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService, private constants: ConstantsService) {
  }

  getToken() {
    return localStorage.getItem('authenticationToken') || sessionStorage.getItem('authenticationToken');
  }

  login(credentials): Observable<any> {
    const data = {
      username: credentials.username,
      password: credentials.password,
      rememberMe: credentials.rememberMe
    };
    return this.http.post(this.constants.API_ENDPOINT + 'auth/login', data, {observe: 'response'})
      .pipe(map(authenticateSuccess.bind(this)));

    function authenticateSuccess(resp) {
      console.log('resp', resp.body.access_token);
      const jwt = resp.body.access_token;
      this.storeAuthenticationToken(jwt, credentials.rememberMe);
      return jwt;

    }
  }

  loginWithToken(jwt, rememberMe) {
    if (jwt) {
      this.storeAuthenticationToken(jwt, rememberMe);
      return Promise.resolve(jwt);
    } else {
      return Promise.reject('auth-jwt-service Promise reject'); // Put appropriate error message here
    }
  }

  storeAuthenticationToken(jwt, rememberMe) {
    if (rememberMe) {
      localStorage.setItem('authenticationToken', jwt);
    } else {
      sessionStorage.setItem('authenticationToken', jwt);
    }
  }

  logout(): Observable<any> {
    return new Observable(observer => {
      localStorage.removeItem('authenticationToken');
      sessionStorage.removeItem('authenticationToken');
      observer.complete();
    });
  }
}
