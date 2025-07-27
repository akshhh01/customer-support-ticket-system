import { Component, OnInit } from '@angular/core';
import { Ticket } from '../contract/ticket';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../contract/User';
import { CustomerNavComponent } from "../customer-nav/customer-nav.component";
import { AdminNavComponent } from "../admin-nav/admin-nav.component";

@Component({
  selector: 'app-view-ticket',
  imports: [CommonModule, RouterLink, AdminNavComponent, CustomerNavComponent],
  templateUrl: './view-ticket.component.html',
  styleUrl: './view-ticket.component.css'
})
export class ViewTicketComponent implements OnInit{

  tickets : Ticket[]=[];
  constructor(private router : Router){}

user : User|null=null;
  i : number=0;
  ngOnInit(): void {
     const userData = localStorage.getItem('user');
    console.log('dash->userdata' , userData);
    if (userData) {
      this.user = JSON.parse(userData);
    }else{
      this.router.navigate(['/log-in']);
    }
   const ticketData = localStorage.getItem('tickets');
   if(ticketData){
    this.tickets=JSON.parse(ticketData);
   }
  }

  addComment(ticket : Ticket){
    console.log('qqqqqqqqqqqq' , ticket);
    localStorage.setItem('commentTicket' , JSON.stringify(ticket));
this.router.navigate(['/add-comment']);
  }

  logout(){
    this.router.navigate(['/logout']);
  }


}
