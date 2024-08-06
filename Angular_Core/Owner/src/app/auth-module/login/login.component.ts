import { Component } from '@angular/core';
import { AuthService } from '../auth_service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string = '';
  loginUserData = { email: '', password: '' };

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOninit() {
  }

  loginUser() {
    this.auth.loginUser(this.loginUserData.email, this.loginUserData.password)
      .subscribe(respone => {
        localStorage.setItem("id", respone.data.userid);
        this.snackBar.open('Login success!', '', {
          duration: 2000,
          panelClass: ['custom-snackbar']
        });

        setTimeout(() => {
          this.router.navigate(['/post/manage-post']);
        }, 0)
      }, error => {
        console.log(error.error.message)
        this.errorMessage = error.error.message;
      });
  }
}


