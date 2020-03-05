import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { SettingsService } from '../../core/settings/settings.service';

@Injectable({
  providedIn: 'root',
})
export class Interceptor implements HttpInterceptor {

  /**
   *
   */
  constructor(private _settings: SettingsService) {


  }
  intercept(request: HttpRequest<any>, next: HttpHandler):  Observable<HttpEvent<any>> {
    // request = request.clone({
    //  setHeaders: {
    //    'Content-Type': 'application/json',
    //    Accept: 'application/json',
    //    'DateTime': moment(Date()).format('MM/DD/YYYY H:mm:ss'),
    //    Authorization: `Bearer ${this._settings.token}`
    //  },
    //  withCredentials: true
    //});
    return next.handle(request);
  }
}

