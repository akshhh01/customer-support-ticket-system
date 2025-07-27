import { Component, OnInit } from '@angular/core';
import { Ticket } from '../contract/ticket';
import { CommonModule } from '@angular/common';
import { User } from '../contract/User';
import { Router } from '@angular/router';
import { AdminNavComponent } from "../admin-nav/admin-nav.component";
import { CustomerNavComponent } from "../customer-nav/customer-nav.component";

@Component({
  selector: 'app-view-resolved',
  imports: [CommonModule, CustomerNavComponent, AdminNavComponent],
  templateUrl: './view-resolved.component.html',
  styleUrl: './view-resolved.component.css'
})
export class ViewResolvedComponent implements OnInit{
 resolve : Ticket[]=[];
  tickets : Ticket[]=[];
  user : User|null=null;
  i : number=0;
  constructor(private router : Router){}
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
   for(let ticket of this.tickets){
    if(ticket.status==='RESOLVED'){
      this.resolve.push(ticket);
    }
   }
  }
    addComment(ticket : Ticket){
    localStorage.setItem('commentTicket' , JSON.stringify(ticket));
this.router.navigate(['/add-comment']);
  }

}
