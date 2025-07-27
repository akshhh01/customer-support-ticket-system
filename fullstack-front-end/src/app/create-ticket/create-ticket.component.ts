import { User } from './../contract/User';
import { Component, NgModule, OnInit } from '@angular/core';
import { Ticket } from '../contract/ticket';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerNavComponent } from '../customer-nav/customer-nav.component';

@Component({
  selector: 'app-create-ticket',
  imports: [FormsModule,CommonModule,CustomerNavComponent],
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.css'
})
export class CreateTicketComponent{
ticket: Ticket = {
  id: null,
  subject: '',
  description: '',
  priority: '',
  createdBy: null,
  assignedTo: null,
  createdAt: new Date(),
  status: 'PENDDING',
};

constructor(private serv:UserServiceService , private router : Router){}

response : string | null=null;
message : string = '';




createTicket(){
  const user =  JSON.parse(localStorage.getItem('user') || '{}');
  this.ticket.createdBy=user.id
  this.serv.createTicket(this.ticket).subscribe({
    next : (data)=> {
         this.response=data;
         this.ticket=data;
         console.log('ticket',this.ticket);
         console.log('response' , this.response);
         alert('ticket created succesfully');
    },
       error : (err)=>{
          console.log("Error Response:", err.error);
          const keys = Object.keys(err.error);
        for(let i=0 ; i<keys.length ;i++){
        this.message=this.message+err.error[keys[i]];
         }
    }
  });
}
}
