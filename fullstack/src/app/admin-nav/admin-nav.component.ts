import { Component } from '@angular/core';
import { User } from '../contract/User';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent {

  public user: User = {
    id: null,
    name: '',
    email: '',
    password: '',
    mobile: '',
    role: '',
  };
  isanalysis: boolean = false;

  constructor(private router: Router , private serv: UserServiceService) {}

  ngOnInit() {
    const userData = localStorage.getItem('admin');
    if (userData) {
      this.user = JSON.parse(userData);
      if (this.user?.role !== 'ADMIN') {
        alert('Unauthorized person');
        this.router.navigate(['/home']);
      }
    }
  }

  changeDash() {
    this.isanalysis = !this.isanalysis;

    if (!this.isanalysis) {
      this.router.navigate(['admin-dash']);
    } else {
      // ✅ Pass user via state
      console.log("admin ==nav", this.user);
      this.serv.setUser(this.user);
      this.router.navigate(['analysis']);
    }
  }
}
