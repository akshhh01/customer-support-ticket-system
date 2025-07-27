import { Component, OnInit } from '@angular/core';
import { Ticket } from '../contract/ticket';
import { UserServiceService } from '../services/user-service.service';
import { CommonModule } from '@angular/common';
import { User } from '../contract/User';
import { Router } from '@angular/router';
import { AdminNavComponent } from "../admin-nav/admin-nav.component";

@Component({
  selector: 'app-assign-to',
  imports: [CommonModule, AdminNavComponent],
  templateUrl: './assign-to.component.html',
  styleUrl: './assign-to.component.css'
})
export class AssignToComponent implements OnInit{

  ticket: Ticket = {
  id: 0,
  subject: '',
  description: '',
  priority: '',
  createdBy: 0,
  assignedTo: null,
  createdAt: new Date(),
  status: '',
};


  csrs : User[] = [];



constructor(private serv : UserServiceService , private router : Router){}
  ngOnInit(): void {
       const csr = localStorage.getItem('csr');
       const ticket = localStorage.getItem('assignTicket');
          if(csr ){
            this.csrs=JSON.parse(csr);
            console.log('csrs=' , this.csrs);
          }
          if(ticket){
            console.log('assignTo1234567890-' , ticket);
            this.ticket=JSON.parse(ticket);
            console.log('this-ticket' , this.ticket);
          }
  }



  error : string | null=null;

  assignToCsr(id : number){
    console.log('assignTo====1234567890-' , this.ticket);
    this.ticket.assignedTo=id;
    this.ticket.status='IN_PROGRESS';
    this.serv.createTicket(this.ticket).subscribe({next : (data)=>
    {
         alert('assign ticket succes-full');
         this.router.navigate(['/admin-dash']);
    },
   error : (err)=>{
   this.error = err?.error?.message || "Something went wrong";
}
    })
  }
}
