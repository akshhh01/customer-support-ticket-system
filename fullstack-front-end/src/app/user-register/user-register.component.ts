import { Component } from '@angular/core';
import { User } from '../contract/User';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../services/user-service.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  constructor(private serv: UserServiceService,private router : Router) {}


  public user : User={
     id: null,
    name: '',
    email: '',
    password: '',
    mobile: '',
    role : '',
  };

  newrole : string ='';

  isEmail : boolean = false;
  isPassword : boolean=false;
  isMobile : boolean = false;
  resourse:string="";
  email:string='';
  password : string='';
  mobile : string ='';
  message: string = '';
  isError: boolean = false;
  onSubmit() {
    console.log('this.newrole=========',this.user);
    // this.user.role.push(this.newrole);
  this.serv.userRegister(this.user).subscribe({
       next:(data) => {
      console.log("✅ Backend Response:", data);
      this.message = 'Registration succesfull '
      console.log(this.message);
        this.router.navigate(['log-in']);
    },
  error:(err) => {
    console.log('=========++++',err);
  console.log("Error Response:", err.error);
  const keys = Object.keys(err.error);
  if (keys.length > 0) {
    for(let i=0 ; i<keys.length ;i++){
      console.log("type of " ,  err.error[keys[i]]);
      if(keys[i] === 'password'){
        this.password=err.error[keys[i]];
        this.isPassword=true;
      }
      else if(keys[i]==='email'){
        this.email=err.error[keys[i]];
        this.isEmail=true;
      }
      else if (keys[i] === 'mobile') {
        this.mobile=err.error[keys[i]];
        this.isMobile=true;
      }
      else{
         this.message = err.error[keys[i]];
          this.isError = true;
      }
    }
  } else {
    this.message = 'Unexpected error occurred!';
  }
  if(keys[0] === 'isTrusted'){
    this.message='some thing went wrong ';
  }
}
  });
   this.message='';
}
  }
