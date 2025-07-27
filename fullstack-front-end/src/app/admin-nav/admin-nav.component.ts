import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../contract/User';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-admin-nav',
  imports: [],
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.css'
})
export class AdminNavComponent {
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
    //  console.log('dash->userdata' , userData);
     if (userData) {
       this.user = JSON.parse(userData);
     }else{
       this.router.navigate(['/log-in']);
     }
   }

}
