import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { SettingsService } from '../../core/settings/settings.service';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements CanActivate {

  constructor(public _auth: AuthService, private _settings: SettingsService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    
    if (!this._auth.isAuthenticated())
      return this._auth.getProfile().pipe(map(() => this.isUserAthenticated(route)));

    return this.isUserAthenticated(route);
  }

  private isUserAthenticated(route: ActivatedRouteSnapshot):boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRoles = route.data.expectedRoles;

    if (!_.some(expectedRoles, (r) => r === this._settings.user.role)) {
      this.router.navigate(['401']);
      return false;
    }

    return true;
  }
}
