import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-account',
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterLink, CommonModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  host: { 'skiphydration': 'true' }
})
export class AccountComponent {
  registerForm: FormGroup;
  loginForm: FormGroup;
  http = inject(HttpClient);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      phoneNumber: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const registerData = {
        "phoneNumber": this.registerForm.value.phoneNumber,
        "username": this.registerForm.value.username,
        "email": this.registerForm.value.email,
        "password": this.registerForm.value.password,
        "role":"owner"
      };
console.log(registerData);
      // this.checkUsernameAndEmail(registerData.username, registerData.email).subscribe(
      //   (exists: boolean) => {
      //     if (exists) {
      //       alert('Username or email is already taken');
      //     } else {
            this.http.post('https://localhost:7023/api/Auth/register', registerData).subscribe(
              (res: any) => {
                console.log(res); // Debugging log
                if (res) {
                  alert('Registration Successful');
                } else {
                  alert('Registration Failed');
                }
              },
              (error: HttpErrorResponse) => {
                console.error('Registration failed', error); // Debugging log
                alert('Registration Failed');
              }
            );
        //   }
        // },
        // (error: HttpErrorResponse) => {
        //   console.error('Error checking username and email', error); // Debugging log
        //   alert('Error checking username and email');
        // }
      // );
    }
  }

  checkUsernameAndEmail(username: string, email: string) {
    return this.http.post<boolean>('http://localhost:5083/api/auth/check-username-email', { username, email });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      this.http.post('https://localhost:7023/api/Auth/login', loginData).subscribe(
        (res: any) => {
          console.log(res); // Debugging log
          if (res && res.token) { // Check if the response contains a token
            alert('Login Successful');
            localStorage.setItem('token', res.token);
            this.router.navigate(['/owners']);
          } else {
            alert('Login Failed');
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Login failed', error); // Debugging log
          alert('Login Failed');
        }
      );
    }
  }
}