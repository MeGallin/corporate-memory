import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
// import { URL_CONFIG } from "../__envProd";
import { URL_CONFIG } from "../__envDev";

@Injectable({
  providedIn: "root",
})
export class ContactFormService {
  constructor(private _httpFormService: HttpClient) {}

  sendFormData(message): Observable<any> {
    const url = URL_CONFIG.baseUrl + URL_CONFIG.contactFormHandlerUrl;
    return this._httpFormService
      .post(`${url}`, message)
      .pipe(
        map((res) => {
          console.log("Form successfully submitted", res);
        })
      )
      .pipe(catchError(this.handleError));
  }

  // Error handling
  handleError(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
