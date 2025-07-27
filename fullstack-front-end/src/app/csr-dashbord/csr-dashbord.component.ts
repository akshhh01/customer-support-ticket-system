import { Component, OnInit } from '@angular/core';
import { CsrNavComponent } from '../csr-nav/csr-nav.component';
import { User } from '../contract/User';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { Ticket } from '../contract/ticket';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-csr-dashbord',
  imports: [CommonModule,FormsModule,CsrNavComponent],
  templateUrl: './csr-dashbord.component.html',
  styleUrl: './csr-dashbord.component.css'
})
export class CsrDashbordComponent implements OnInit{

  tickets : Ticket[] = [];
  error : string | null=null;
  status : string='IN_PROGRESS';

   user: User = {
     id: 0,
     name: '',
     email: '',
     password: '',
     mobile: '',
     role: ''
   };

   constructor(private serv: UserServiceService,private router : Router) {}
 ngOnInit(){
      const userData = localStorage.getItem('user');
     console.log('dash->userdata' , userData);
     if (userData) {
       this.user = JSON.parse(userData);
    // if(this.user.role!=='CSR'){
    //     alert('unothorize person');
    //     this.router.navigate(['/log-in']);
    //   }
     if(this.user.id){
         this.get(this.user.id);
     }
     }else{
       this.router.navigate(['/log-in']);
     }
       }
   updateTicket(ticket : Ticket,status : string){
              if(status===ticket.status){
                alert('ticket status alredy '+status);
              }
            else{
              ticket.status=status;
    this.serv.createTicket(ticket).subscribe({
      next:(data) =>{
        alert('ticket update status ->'+ticket.status);
      }
    })
  }
   }
   get(id:number){
     console.log('user-id-------',this.user.id);
     this.serv.getAllTicket(id).subscribe({
       next:(data : Ticket[])=>{
         console.log('data',data);
            this.tickets=data;
            // localStoragse.setItem('tickets' , JSON.stringify(data));
            console.log(this.tickets);
       },
       error : (err)=>{
   this.error=err.error
       }
     })
   }












}
