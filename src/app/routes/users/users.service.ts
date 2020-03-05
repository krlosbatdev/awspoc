import { Observable} from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { User, UserAccessForm, Employee } from "./user.model";
import { ApiService } from "../../shared/services/api.service";
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: "root"
})
export class UserService {

  private path = "api/users/";

  constructor(private _api: ApiService) { }

  saveUser(user: User): Observable<boolean> {
    return this._api.post(this.path, user);
  }

  getAll(): Observable<Array<User>> {
    return this._api.get(this.path);
  }

  getUserByOfficerId(officerId: string): Observable<User> {
    return this._api.get(this.path + officerId);
  }

  getUserAccessForm(officerId: string): Observable<UserAccessForm> {
    return this._api.get(`${this.path}getUserAccessForm/?officerId=${officerId}`);
  }

  removeUser(officerId: string): Observable<Array<User>> {
    return this._api.delete(`${this.path}?officerId=${officerId}`);
  }

  getAvailableEmployees(fullName: string): Observable<Array<Employee>> {
    return this._api.get(`${this.path}getAvailableEmployees/?fullName=${fullName}`);
  }
}
