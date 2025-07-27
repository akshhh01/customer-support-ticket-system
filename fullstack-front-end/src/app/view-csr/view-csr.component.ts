import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { Ticket } from '../contract/ticket';
import { User } from '../contract/User';
import { CommonModule } from '@angular/common';
import { AdminNavComponent } from "../admin-nav/admin-nav.component";

@Component({
  selector: 'app-view-csr',
  imports: [CommonModule, AdminNavComponent],
  templateUrl: './view-csr.component.html',
  styleUrl: './view-csr.component.css'
})
export class ViewCsrComponent {
  constructor(private router : Router,private serv : UserServiceService){}
 csrs: User[] = [];
  tickets : Ticket[]=[];
  ngOnInit(): void {
    const userData = localStorage.getItem('csr');
    console.log('csr' , userData);
    if(userData){
    this.csrs=JSON.parse(userData);
    }
  }

  getTicket(id : number){
    console.log('csr' , id);
      this.serv.getAllTicket(id).subscribe({
        next :(data : Ticket[])=>{
          console.log('===' , data);
          this.tickets=data;
           console.log('customerTickets' , this.tickets);
          localStorage.setItem('customerTickets' , JSON.stringify(this.tickets));
        this.router.navigate(['/view-ticket-by-user']);
        }
      });
  }
}
