import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/register";
  private _loginUrl = "http://localhost:3000/login";

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  registerUser(fullName: any, email: any, password: any): Observable<any> {
    const body = { fullName, email, password }
    return this.http.post<any>(this._registerUrl, body, { withCredentials: true }).pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => new Error('Có lỗi xảy ra, vui lòng thử lại sau.'));
      })
    );
  }

  loginUser(email: any, password: any): Observable<any> {
    const body = { email, password }
    return this.http.post(this._loginUrl, body, { withCredentials: true })
  }

  refreshToken() {
    return this.http.post<any>(`http://localhost:3000/refresh-token`, {}, { withCredentials: true });
  }

  handleTokenExpiration() {
    this.refreshToken().subscribe(
      (response) => {
        // this.snackBar.open('Access token refreshed successfully', 'Close', { duration: 0 });
      },
      (error) => {
        console.log("error::::", error)
        this.snackBar.open('Session expired. Please log in again.', 'Close', { duration: 0 });
        this.router.navigate(['/login']);
      }
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    }
    else {
      errorMessage = error.error.data.errors.map((err: any) => err.message).join(', ');
    }
    return throwError(errorMessage);
  }
}
