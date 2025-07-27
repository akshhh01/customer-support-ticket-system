import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { Ticket } from '../contract/ticket';
import { User } from '../contract/User';
import { CommonModule } from '@angular/common';
import { AssignToComponent } from '../assign-to/assign-to.component';

@Component({
  selector: 'app-view-ticket-user-id',
  imports: [CommonModule],
  templateUrl: './view-ticket-user-id.component.html',
  styleUrl: './view-ticket-user-id.component.css'
})
export class ViewTicketUserIdComponent implements OnInit{
  constructor(private serv : UserServiceService , private router : Router ){}
  tickets : Ticket[] =[];
   user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    mobile: '',
    role: ''
  };
  ngOnInit(): void {
     const userData = localStorage.getItem('user');
    console.log('userData' , userData);

    if (userData) {
      this.user = JSON.parse(userData);
       console.log('userData' , userData);
    }else{
      this.router.navigate(['/log-in']);
    }
     const ticket =localStorage.getItem('customerTickets');
   if(ticket){
    this.tickets=JSON.parse(ticket);
   }
  }

  assignTo(assignTicket : Ticket): void{
         localStorage.setItem('assignTicket' , JSON.stringify(assignTicket));
          this.router.navigate(['/assignTo']);
  }
 addComment(ticket : Ticket){
    console.log('qqqqqqqqqqqq' , ticket);
    localStorage.setItem('commentTicket' , JSON.stringify(ticket));
this.router.navigate(['/add-comment']);
  }
}
