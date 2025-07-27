import { Ticket } from './../contract/ticket';
import { Component, OnInit } from '@angular/core';
import { User } from '../contract/User';
import { UserServiceService } from '../services/user-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashbord',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashbord.component.html',
  styleUrls: ['./user-dashbord.component.css'] // ✅ fixed
})
export class UserDashbordComponent implements OnInit {
  ngOnInit(){
     const user =  JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      this.user=user;
     if(user.role!=='CUSTOMER'){
        alert('unothorize person');
        this.router.navigate(['/log-in']);
      }
     if(user.id){
      this.get(user.id);
     }
    }else{
      this.router.navigate(['/log-in']);
    }
  }

   user : User | null=null
  tickets : Ticket[]=[];

  constructor(private serv: UserServiceService,private router : Router) {}
   error : string|null=null;
 created : number=0;
  total : number=0;
  pandding : number=0;
  resolve:number=0;

get(id:number){
  this.serv.getAllTicket(id).subscribe({
    next:(data : Ticket[])=>{
      console.log('data',data);
         this.tickets=data;
         localStorage.setItem('tickets' , JSON.stringify(data));
         console.log('=================================',this.tickets);
         for(let ticket of this.tickets){
               if(ticket.status==='PENDDING'){
                this.pandding++;
               }if(ticket.status==='RESOLVED'){
                this.resolve++;
               }
               if(ticket.status==='RESOLVED'){
                this.resolve++;
               }
         }
      this.total=this.tickets.length;
    },
    error : (err)=>{
this.error=err.error
    }
  })
}

}
