import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { User } from '../contract/User';

@Component({
  selector: 'app-csr-nav',
  imports: [],
  templateUrl: './csr-nav.component.html',
  styleUrl: './csr-nav.component.css'
})
export class CsrNavComponent {

  user: User = {
     id: 0,
     name: '',
     email: '',
     password: '',
     mobile: '',
     role: ''
   };

   constructor(private serv: UserServiceService,private router : Router) {}


 ngOnInit(){
      const userData = localStorage.getItem('user');
     console.log('dash->userdata' , userData);
     if (userData) {
       this.user = JSON.parse(userData);
     }else{
       this.router.navigate(['/log-in']);
     }
   }

}
