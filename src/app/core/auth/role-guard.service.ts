import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Principal} from './principal.service';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private principle: Principal, private router: Router, private loginservice: LoginService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.principle.isAdmin()) {
      return true;
    } else {
      // this.router.navigate(['login']);
      this.loginservice.logout();
      // console.log('not login');
      return false;
    }
  }
}
