import { Component, OnInit } from '@angular/core';
import { User } from '../contract/User';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../services/user-service.service';
import { Ticket } from '../contract/ticket';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-user',
  imports: [CommonModule],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent implements OnInit{
  constructor(private serv : UserServiceService , private router : Router){}
  customer: User[] = [];
  tickets : Ticket[]=[];
  ngOnInit(): void {
    const userData = localStorage.getItem('customer');
    console.log('customerData' , userData);
    if(userData){
    this.customer=JSON.parse(userData);
    }
  }

  getTicket(id : number){
    console.log('customerId' , id);
      this.serv.getAllTicket(id).subscribe({
        next :(data : Ticket[])=>{
          console.log('===' , data);
          this.tickets=data;
           console.log('customerTickets' , this.tickets);
          localStorage.setItem('customerTickets' , JSON.stringify(this.tickets));
        this.router.navigate(['/view-ticket-by-user'])
        }
      })
  }





}
