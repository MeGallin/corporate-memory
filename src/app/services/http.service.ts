import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Observable,
  throwError,
  of,
  interval,
  timer,
  BehaviorSubject,
  pipe
} from 'rxjs';
import {
  retry,
  catchError,
  map,
  tap,
  delay,
  switchMap,
  take,
  distinctUntilChanged,
  last,
  distinct,
  finalize
} from 'rxjs/operators';
import { URL_CONFIG } from '../__envDev';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private delayTrigger: number = 0;
  private triggerPolling: number;

  constructor(private _Http: HttpClient) {}

  //countDown
  countDown(): Observable<any> {
    return timer(100, 3000)
      .pipe(map(i => 12 - i))
      .pipe(take(12 + 1))
      .pipe(
        tap(res => {
          this.delayTrigger = res * 1000;
        })
      );
  }

  //get memories
  getMemory(): Observable<any> {
    const url = URL_CONFIG.baseUrl + URL_CONFIG.getMemoryUrl;
    return timer(1000, 2000).pipe(
      switchMap(() => {
        return this._Http
          .get(`${url}`)
          .pipe(take(1))
          .pipe(delay(this.delayTrigger))
          .pipe(
            tap(res => {
              // console.log(res);
            })
          )
          .pipe(catchError(this.handleError))
          .pipe(finalize(() => console.log(' Memory Sequence complete')));
      })
    );
  }

  // Post Memory to DB
  postMemory(memory): Observable<any> {
    console.log(memory);
    const url = URL_CONFIG.baseUrl + URL_CONFIG.postMemoryUrl;
    return this._Http.post(`${url}`, memory).pipe(catchError(this.handleError));
  }

  // UPDATE title and memory in DB
  updateMemory(memory): Observable<any> {
    console.log('memory SERVICE', memory);
    const url = URL_CONFIG.baseUrl + URL_CONFIG.updateMemoryUrl;
    return this._Http.put(`${url}`, memory).pipe(catchError(this.handleError));
  }

  // DELETE a memory from DB
  deleteMemory(id: any): Observable<any> {
    const url = URL_CONFIG.baseUrl + URL_CONFIG.deleteMemoryUrl;
    const params = new HttpParams().set('id', id.toLocaleString());
    return this._Http.delete(`${url}`, { params: params });
  }

  // Send email and subId to session API
  postSession(sessionData): Observable<any> {
    console.log('sessionData SERVICE:', sessionData);
    const url = URL_CONFIG.baseUrl + URL_CONFIG.postSessionUrl;
    return this._Http
      .post(`${url}`, sessionData)
      .pipe(catchError(this.handleError));
  }

  //GET tags
  getTags(): Observable<any> {
    const url = URL_CONFIG.baseUrl + URL_CONFIG.getTagsUrl;
    return timer(1000, 2000).pipe(
      switchMap(() => {
        return this._Http
          .get(`${url}`)
          .pipe(
            tap(res => {
              // console.log(res);
            })
          )
          .pipe(catchError(this.handleError))
          .pipe(finalize(() => console.log(' Tag Sequence complete')));
      })
    );
  }

  //POST tags
  postTag(tag): Observable<any> {
    console.log(tag);
    const url = URL_CONFIG.baseUrl + URL_CONFIG.postTagUrl;
    return this._Http
      .post(`${url}`, tag)
      .pipe(
        map(res => {
          return res;
        })
      )
      .pipe(catchError(this.handleError));
  }

  // Delete TAGS
  deleteTag(id: any): Observable<any> {
    const url = URL_CONFIG.baseUrl + URL_CONFIG.deleteTagURL;
    const params = new HttpParams().set('id', id.toLocaleString());
    return this._Http.delete(`${url}`, { params: params });
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
