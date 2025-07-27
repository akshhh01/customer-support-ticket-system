import { Component, OnInit } from '@angular/core';
import { Ticket } from '../contract/ticket';
import { CommonModule } from '@angular/common';
import { User } from '../contract/User';
import { Router } from '@angular/router';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { CustomerNavComponent } from '../customer-nav/customer-nav.component';

@Component({
  selector: 'app-view-pandding',
  imports: [CommonModule, AdminNavComponent, CustomerNavComponent],
  templateUrl: './view-pandding.component.html',
  styleUrl: './view-pandding.component.css'
})
export class ViewPanddingComponent implements OnInit{
  pandding : Ticket[]=[];
  tickets : Ticket[]=[];
  user : User | null=null;
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
    if(ticket.status==='PENDDING'){
      this.pandding.push(ticket);
    }
   }
   console.log('=======');
   console.log("pandding===",this.tickets);
  }


    addComment(ticket : Ticket){
    console.log('qqqqqqqqqqqq' , ticket);
    localStorage.setItem('commentTicket' , JSON.stringify(ticket));
this.router.navigate(['/add-comment']);
  }

}
