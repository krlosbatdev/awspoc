import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// import { Headers, Http, Response } from "@angular/http";
import { Observable, throwError as observableThrowError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { SettingsService } from "../../core/settings/settings.service";


const swal = require("sweetalert");


@Injectable({
  providedIn: "root",
})
export class ApiService {


  constructor(private http: HttpClient, private router: Router, private _settings: SettingsService) { }

  get(path: string): Observable<any> {

    const url = `${this._settings.baseUrl}${path}`;


    return this.http.get(url)
      .pipe(
        catchError((err) => this.handleError(err))
      );
  }

  post(path: string, body): Observable<any> {

    return this.http.post(`${this._settings.baseUrl}${path}`, body)
      .pipe(
        catchError((err) => this.handleError(err))
      );
  }

  delete(path, body?): Observable<any> {

    return this.http.delete(`${this._settings.baseUrl}${path}`)
      .pipe(
        catchError((err) => this.handleError(err))
      );
  }

  patch(path: string, body): Observable<any> {

    const url = `${this._settings.baseUrl}${path}`;

    return this.http.patch(url, body)
      .pipe(
        catchError((err) => this.handleError(err))
      );
  }



  private handleError(exception: HttpErrorResponse) {
    console.log(exception);
    switch (exception.status) {
      case 400:
        // build <ul> html element to display the list of errors
        if (exception.error.ValidationErrors) {
          let errorListTemplate = /*'<div class="col-md-12 align-left"><ul class="model-state-error">'*/"";
          for (let entry of exception.error.ValidationErrors) {
            errorListTemplate += /*`<li>${entry.Description}</li>`*/ `- ${entry.Description}\n`;
          }
          //errorListTemplate += "</ul></div>";

          exception.error.message = errorListTemplate;

          this.showError(new SwalError(errorListTemplate, exception.error.title/*, { element: errorListTemplate }*/));

        } else {
          this.router.navigate(["/500"]);
        }
        break;
      case 401:
      case 403:
        this.router.navigate(["/401"]);
        break;
      case 404:
        this.router.navigate(["/404"]);
        break;
      case 500:
        this.router.navigate(["/500"]);
        break;
      default:
      // display error message using sweet alert
     //   this.showError(new SwalError(exception.error.message));

      break;
    }
    return observableThrowError(exception.error);
  }

  showError(error: SwalError) {
    swal({
      title: error.title,
      icon: "error",
      text: error.text,
      content: error.content
    });
  }

}

class SwalError {

  text: string;
  title: string;
  content: any;

  constructor(text: string, title: string = "Error", content?: any) {
    this.text = text;
    this.title = title;
    this.content = content;
  }


}
