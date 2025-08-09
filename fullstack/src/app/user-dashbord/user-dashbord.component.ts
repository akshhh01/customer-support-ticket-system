import { Ticket } from './../contract/ticket';
import { Component, OnInit } from '@angular/core';
import { User } from '../contract/User';
import { UserServiceService } from '../services/user-service.service';
import { CommonModule } from '@angular/common';
import { CustomerNavComponent } from "../customer-nav/customer-nav.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashbord',
  standalone: true,
  imports: [CommonModule, CustomerNavComponent],
  templateUrl: './user-dashbord.component.html',
  styleUrls: ['./user-dashbord.component.css'] // ✅ fixed
})
export class UserDashbordComponent implements OnInit {
  users:User[]=[];
  user: User | null = null
  tickets: Ticket[] = [];
  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('customer') || '{}');
    if (user) {
      this.user = user;
      if (user.role !== 'CUSTOMER') {
        alert('unothorize person');
        this.router.navigate(['/home']);
      }
      if (user.id) {
        this.get(user.id);
      }
    } else {
      this.router.navigate(['/home']);
    }
  }



  constructor(private serv: UserServiceService, private router: Router) { }
  error: string | null = null;
  created: number = 0;
  total: number = 0;
  pandding: number = 0;
  resolve: number = 0;

  get(id: number) {
    this.serv.getAllTicket(id).subscribe({
      next: (data: Ticket[]) => {
        this.tickets = data;
        localStorage.setItem('tickets', JSON.stringify(data));
        for (let ticket of this.tickets) {
          if (ticket.status === 'PENDDING') {
            this.pandding++;
          } if (ticket.status === 'RESOLVED') {
            this.resolve++;
          }
          if (ticket.status === 'RESOLVED') {
            this.resolve++;
          }
        }
        this.total = this.tickets.length;
      },
      error: (err) => {
        this.error = err.error
      }
    })
  }

}
