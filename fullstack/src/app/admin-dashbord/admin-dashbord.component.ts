import { Component, OnInit } from '@angular/core';
import { Ticket } from '../contract/ticket';
import { User } from '../contract/User';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { AnlysisComponent } from "../anlysis/anlysis.component";
import { AdminNavComponent } from "../admin-nav/admin-nav.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashbord',
  imports: [CommonModule, AdminNavComponent],
  templateUrl: './admin-dashbord.component.html',
  styleUrl: './admin-dashbord.component.css'
})
export class AdminDashboardComponent implements OnInit {
  tickets: Ticket[] = [];
  users: User[] = [];
  csr: User[] = [];
  customer: User[] = [];
  selectedTicketId: number | null = null;
  selectedCsrId: number | null = null;
 user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    mobile: '',
    role: ''
  };
    isdashbord: boolean = true;
  constructor(private serv: UserServiceService, private router : Router ) { }

  ngOnInit(){
     const userData = localStorage.getItem('admin');
     console.log('adminDash' , userData);
    if (userData) {
      this.user = JSON.parse(userData);
      if(this.user.role!=='ADMIN'){
        alert('unothorize person');
        this.router.navigate(['/home']);
      }
      this.getAll();
      if(this.user.id){
      this.getTickets(this.user.id);
      }
    }else{
      this.router.navigate(['/home']);
    }
  }
error : string | null=null;
message : string | null=null;
isError : boolean = false;

getAll(){
this.serv.getAllUsers().subscribe({
  next : (data : User[]) => {
    this.users=data;
    for(let user of this.users){
      if(user.role==='CSR'){
        this.csr.push(user);
      }else if(user.role==='CUSTOMER'){
        this.customer.push(user);
      }
    }
    localStorage.setItem('customer',JSON.stringify(this.customer));
    localStorage.setItem('csr',JSON.stringify(this.csr));
  },
  error:(err)=>{
    console.log('err===',err)
      const keys = Object.keys(err.error);
       for(let i=0 ; i<keys.length ;i++){
      if(keys[i] === 'password'){
        this.message= this.message+err.error[keys[i]];
      }
      this.isError=true;
  }
}
})
this.message='';
 }


 created : number=0;
  total : number=0;
  pandding : number=0;
  resolve:number=0;

getTickets(id:number){
  this.serv.getAllTicket(id).subscribe({
    next:(data : Ticket[])=>{
         this.tickets=data;
         localStorage.setItem('tickets' , JSON.stringify(data));
         for(let ticket of this.tickets){
               if(ticket.status==='PENDDING'){
                this.pandding++;
               }if(ticket.status==='RESOLVED'){
                this.resolve++;
               }
               if(ticket.status!=='RESOLVED'){
                this.created++;
               }
         }
      this.total=this.tickets.length;

    },
    error:(err)=>{
      const keys = Object.keys(err.error);
       for(let i=0 ; i<keys.length ;i++){
      if(keys[i] === 'password'){
        this.message= this.message+err.error[keys[i]];
      }
      this.isError=true;
  }
}
})
this.message='';
 }


}
