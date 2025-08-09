import { Component } from '@angular/core';
import { User } from '../contract/User';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../services/user-service.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
  constructor(private serv: UserServiceService, private router: Router) { }

  logInData = {
    email: '',
    password: '',
  };

  public user: User = {
    id: null,
    name: '',
    email: '',
    password: '',
    mobile: '',
    role: '',
  };

  otp: string = '';
  otp1: string = '';
  // isOtpSent: boolean = true;
  isOtpSent: boolean = false;
  resendButton: boolean = false;
  time: number = 0;
  intervalId: any;

  // Validation/Error states
  isEmail: boolean = false;
  isPassword: boolean = false;
  isMobile: boolean = false;
  isError: boolean = false;

  // Error messages
  email: string = '';
  password: string = '';
  mobile: string = '';
  message: string = '';

  // Get OTP
  getOtp() {
    console.log("getOtp" , this.user)
    this.serv.generateOtp(this.user.email).subscribe({
      next: (otp) => {
        this.otp1 = otp;
        this.isOtpSent = true;
        console.log("this.otp1" , this.otp1 , this.isOtpSent)
        this.startTimer();
      },
      error: (err) => {
        console.error('OTP Error:', err);
      },
    });
  }

  startTimer() {
    this.resendButton = false;
    this.time = 0;
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.time++;
      if (this.time > 29) {
        this.resendButton = true;
        clearInterval(this.intervalId);
      }
    }, 1500);
  }

  resend() {
    this.getOtp();
  }

  verify() {
    clearInterval(this.intervalId);
    console.log('this.otp === this.otp1', this.otp == this.otp1);
    if (this.otp == this.otp1) {
      console.log('qwerfghj');
      this.onSubmit();
    } else {
      this.message = 'Invalid OTP';
      console.log(this.message);
      this.isError = true;
    }
    this.otp=''
  }

  // Final Submit
  onSubmit() {
    this.serv.userRegister(this.user).subscribe({
      next: () => {
        this.message = 'Registration successful!';
        this.isError = false;
        this.logInData.email=this.user.email
        this.logInData.password=this.user.password
        this.serv.setLogInData(this.logInData);
        // this.router.navigate(['/log-in'],{state : this.logInData});
         this.router.navigate(['/home'], { fragment: 'container1'});
      },
      error: (err) => {
        const keys = Object.keys(err.error || {});
        this.resetErrors();
        keys.forEach((key) => {
          switch (key) {
            case 'email':
              this.email = err.error[key];
              this.isEmail = true;
              break;
            case 'password':
              this.password = err.error[key];
              this.isPassword = true;
              break;
            case 'mobile':
              this.mobile = err.error[key];
              this.isMobile = true;
              break;
            default:
              this.message = err.error[key];
              this.isError = true;
          }
        });

        if (keys.length === 0 || keys[0] === 'isTrusted') {
          this.message = 'Something went wrong!';
          this.isError = true;
        }
        this.isOtpSent=false
      },
    });
  }

  resetErrors() {
    this.email = '';
    this.password = '';
    this.mobile = '';
    this.message = '';
    this.isEmail = false;
    this.isPassword = false;
    this.isMobile = false;
    this.isError = false;
  }
}
