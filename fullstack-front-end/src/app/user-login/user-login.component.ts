import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { User } from '../contract/User';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  logInData = {
    email: '',
    password: '',
  };


  message: string = '';
  email: string = '';
  password: string = '';
  isEmail: boolean = false;
  isPassword: boolean = false;
  isError: boolean = false;

  constructor(private serv: UserServiceService, private router: Router) {}

  userLogIn() {
    this.serv.userLogIn(this.logInData.email, this.logInData.password).subscribe({
      next: (response : any) => {
        const token = response.token;
        const roles = response.roles;
        const user = response.user;
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        alert('Login successful');
          if (user.role === 'ADMIN') {
            alert('Welcome to Admin Dashboard');
            window.open('admin-dash')
            return;
          } else if (user.role === 'CSR') {
            alert('Welcome to CSR Dashboard');
             window.open('csr-dash');
            return;
          } else if (user.role === 'CUSTOMER') {
            alert('Welcome to Customer Dashboard');
            window.open('user-dash');
            return;
          }

        // ❗ Unknown role fallback
        alert('Unknown role. Please login again.');
        this.router.navigate(['log-in']);
      },

      error: (err) => {
        const keys = Object.keys(err.error);
        for (let i = 0; i < keys.length; i++) {
          if (keys[i] === 'password') {
            this.password = err.error[keys[i]];
            this.isPassword = true;
          } else if (keys[i] === 'email') {
            this.email = err.error[keys[i]];
            this.isEmail = true;
          } else {
            this.message = err.error[keys[i]];
            this.isError = true;
          }
        }
      }
    });

    this.message = '';
  }
}
