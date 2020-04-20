import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError, map, tap, delay } from 'rxjs/operators';
import { URL_CONFIG } from '../__envDev';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _Http: HttpClient) {}

  //get memories
  getMemory(): Observable<any> {
    const url = URL_CONFIG.baseUrl + URL_CONFIG.getMemoryUrl;
    return this._Http
      .get(`${url}`)
      .pipe(
        tap(res => {
          // console.log(res);
        })
      )
      .pipe(catchError(this.handleError));
  }

  // Post Memory to DB
  postMemory(memory): Observable<any> {
    console.log(memory);
    const url = URL_CONFIG.baseUrl + URL_CONFIG.postMemoryUrl;
    return this._Http
      .post(`${url}`, memory)
      .pipe(
        map(res => {
          return res;
        })
      )
      .pipe(catchError(this.handleError));
  }

  // Send email and subId to session API
  postSession(sessionData): Observable<any> {
    console.log(sessionData);
    const url = URL_CONFIG.baseUrl + URL_CONFIG.postSessionUrl;
    return this._Http
      .post(`${url}`, sessionData)
      .pipe(catchError(this.handleError));
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
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