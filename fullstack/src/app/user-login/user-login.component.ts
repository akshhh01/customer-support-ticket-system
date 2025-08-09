import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../contract/User';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
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
   users:User[]=[];

  constructor(private serv: UserServiceService, private router: Router) {
    this.logInData = serv.getLogInData();
    console.log('getLogInData', this.logInData)
  }

  userLogIn(email: string, password: string) {

    if(!email||!password){
         this.message='please enter email & password'
    }else{

    this.serv
      .userLogIn(email, password)
      .subscribe({
        next: (response: any) => {
          const token = response.token;
          const user = response.user;
          console.log(user)
          localStorage.setItem('jwtToken', token);
          this.logInData.email = ''
            this.logInData.password = ''
          alert('Login successful');
          if (user.role === 'ADMIN') {
            alert('Welcome to '+user.role+' Dashboard');
          localStorage.setItem('admin', JSON.stringify(user));
            window.open('/admin-dash');
            return;
          } else if (user.role === 'CSR') {
             alert('Welcome to '+user.role+' Dashboard');
          localStorage.setItem('csr', JSON.stringify(user));
            window.open('csr-dash');
            return;
          } else if (user.role === 'CUSTOMER') {
             alert('Welcome to '+user.role+' Dashboard');
          localStorage.setItem('customer', JSON.stringify(user));
            window.open('/user-dash');
            return;
          }
          // alert('Unknown role. Please login again.');
          // this.router.navigate(['log-in']);
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
        },
      });
    this.message = '';
  }}
}
