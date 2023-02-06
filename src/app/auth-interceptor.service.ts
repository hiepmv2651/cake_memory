import {
  HttpErrorResponse,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token: any = localStorage.getItem('token');
    // This retrieves a token from local storage

    req = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    }); // This clones HttpRequest and Authorization header with Bearer token added
    // req = req.clone({
    //   headers: req.headers.set('Content-Type', 'application/json'),
    // });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Catching Error Stage
        if (error && error.status === 401) {
          console.log('ERROR 401 UNAUTHORIZED'); // in case of an error response the error message is displayed
        }
        const err = error.error.message || error.statusText;
        return throwError(error); // any further errors are returned to frontend
      })
    );
  }
}
