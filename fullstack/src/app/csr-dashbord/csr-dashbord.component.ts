import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { Ticket } from "../contract/ticket";
import { User } from "../contract/User";
import { CsrNavComponent } from "../csr-nav/csr-nav.component";
import { UserServiceService } from "../services/user-service.service";


@Component({
  selector: 'app-csr-dashbord',
  imports: [CommonModule, FormsModule, CsrNavComponent],
  templateUrl: './csr-dashbord.component.html',
  styleUrl: './csr-dashbord.component.css'
})
export class CsrDashbordComponent implements OnInit {

  tickets: Ticket[] = [];
  error: string | null = null;
  status: string = 'IN_PROGRESS';

  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    mobile: '',
    role: ''
  };

  constructor(private serv: UserServiceService, private router: Router) { }
  ngOnInit() {
    const userData = localStorage.getItem('csr');
    console.log('csrdash',userData)
    if (userData) {
      this.user = JSON.parse(userData);
      if (this.user.role !== 'CSR') {
        alert('unothorize person');
        this.router.navigate(['/home']);
      }
      if (this.user.id) {
        this.get(this.user.id);
      }
    } else {
      this.router.navigate(['/home']);
    }
  }
  updateTicket(ticket: Ticket, status: string) {
    if (status === ticket.status) {
      alert('ticket status alredy ' + status);
    }
    else {
      ticket.status = status;
      this.serv.createTicket(ticket).subscribe({
        next: (data) => {
          alert('ticket update status ->' + ticket.status);
        }
      })
    }
  }
  get(id: number) {
    this.serv.getTicketByCsr(id).subscribe({
      next: (data: Ticket[]) => {
        this.tickets = data;
      },
      error: (err) => {
        this.error = err.error
      }
    })
  }




  addComment(ticket: Ticket) {
    localStorage.setItem('commentTicket', JSON.stringify(ticket));
    this.router.navigate(['/add-comment']);
  }}
