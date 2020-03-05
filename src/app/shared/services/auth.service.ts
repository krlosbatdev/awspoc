import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Observable } from 'rxjs/internal/Observable';
import { tap, map } from 'rxjs/operators';
import { SettingsService } from '../../core/settings/settings.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  constructor(private _api: ApiService, private _settings: SettingsService) {

  }

  public getProfile(): Observable<boolean> {
    return this._api.get('api/auth/')
      .pipe(
        tap(token => {
          console.log(token);

          // this._settings.user.name = token['name'];
          // this._settings.user.email = token['email'];
          // this._settings.user.department = token['department'];
          // this._settings.user.officerId = token['officerId'];
          // this._settings.user.role = token['role'];

          // this._settings.app.name = token['app'];
          // this._settings.app.env = token['env'];

          this._settings.setUserSetting("name", token["name"]);
          this._settings.setUserSetting("email", token["email"]);
          this._settings.setUserSetting("department", token["department"]);
          this._settings.setUserSetting("officerId", token["officerId"]);
          this._settings.setUserSetting("role", token["role"]);

          this._settings.setAppSetting("name", token["app"]);
          this._settings.setAppSetting("env", token["env"]);

        }),
        map(res => res)
    );
  }

  public isAuthenticated(): boolean {
    return !!this._settings.user.officerId;
  }
}

