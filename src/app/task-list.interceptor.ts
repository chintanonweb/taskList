import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TaskListInterceptor implements HttpInterceptor {

  constructor() {}
 
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    console.log(request)
    const apiUrl = 'http://localhost:3000/';
    const apiReq = request.clone({ url: `${apiUrl}${request.url}`, headers  });
    return next.handle(apiReq);
  }
}
