import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth-module/auth_service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("ddax vao interceptor");
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expired, handle token expiration
          return this.authService.refreshToken().pipe(
            switchMap((response: any) => {
              return next.handle(req);
            }),
            catchError(err => {
              this.authService.handleTokenExpiration();
              return throwError(err);
            })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }
}