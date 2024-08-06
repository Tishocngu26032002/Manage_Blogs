import { Component } from '@angular/core';
import { AuthService } from '../auth_service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMessage: string = '';
  registerUserData = { fullName: '', email: '', password: '' };
  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) { }
  ngOnInit() { }

  registerUser() {
    this.auth.registerUser(this.registerUserData.fullName, this.registerUserData.email, this.registerUserData.password)
      .subscribe(respone => {
        this.snackBar.open('Congratulation... Register success!', 'Đóng', {
          duration: 3000
        });

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      }, error => {
        this.errorMessage = error;
      });
    console.log("register 1")
  }

}
