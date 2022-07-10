import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  //api url
  apiUrl: string = 'tasks/';

  constructor(private http: HttpClient) { }
  create(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  task() {
    return this.http.get(`${this.apiUrl}`);
  }

  getById(id:any): Observable<any> {
    return this.http.get(this.apiUrl + id)
    .pipe(
      catchError(this.handleError)
    )
  }

  update(id: any, data: any): Observable<any> {
    let API_URL = `${this.apiUrl}${id}`;
    return this.http.put(API_URL, data).pipe(
      catchError(this.handleError)
    )
  }

  delete(id: any): Observable<any> {
    var API_URL = `${this.apiUrl}/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
