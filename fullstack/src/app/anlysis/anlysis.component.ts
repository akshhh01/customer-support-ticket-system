// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';
// import { UserServiceService } from '../services/user-service.service';
// import { User } from '../contract/User';
// import { Ticket } from '../contract/ticket';
// import { Comment } from '../contract/comment';
// import { CommonModule } from '@angular/common';
// import { AdminNavComponent } from "../admin-nav/admin-nav.component";
// import { CustomerNavComponent } from "../customer-nav/customer-nav.component";
// import { CsrNavComponent } from "../csr-nav/csr-nav.component";
// import { BrowserModule } from '@angular/platform-browser';
// import { NgChartsModule } from 'ng2-charts';
// import { jsPDF } from 'jspdf';

// @Component({
//   selector: 'app-anlysis',
//   templateUrl: './anlysis.component.html',
//   styleUrls: ['./anlysis.component.css'],
//   standalone: true,
//   imports: [
//     CommonModule,
//     AdminNavComponent,
//     NgChartsModule,
//     CustomerNavComponent,
//     CsrNavComponent
//   ]
// })
// export class AnlysisComponent implements OnInit {
//   user: User;
//   users: User[] = [];
//   tickets: Ticket[] = [];
//   comments: Comment[] = [];

//   // Totals
//   totalAdmin = 0;
//   totalCsr = 0;
//   totalCustomer = 0;
//   totalComment = 0;
//   totalTicket = 0;
//   pending = 0;
//   resolve = 0;
//   open = 0;
//   inprogress = 0;
//   your = 0;
//   another = 0;

//   // Chart data (updated dynamically)
//   callsLabels = ['Admin', 'Customer', 'Csr'];
//   callsData: number[] = [];
//   callsColors = ['#7b2cbf', '#f76868', '#ffafcc'];

//   messagesLabels = ['pending', 'In-progress', 'open', 'Resolve'];
//   messagesData: number[] = [];
//   messagesColors = ['#4361ee', '#b5179e', '#ff758f', '#33f40cff'];

//   commentLabels = ['your', 'another'];
//   commentData: number[] = [];
//   commentColors = ['#4361ee', '#b5179e'];

//   constructor(private serv: UserServiceService, private router: Router) {
//     this.user = this.serv.getUser();
//     console.log('Analysis user:', this.user);
//   }

//   ngOnInit(): void {
//     this.getUsers();
//     this.getTicketsAndComments();
//   }

//   getUsers(): void {
//     this.serv.getAllUsers().subscribe({
//       next: (data: User[]) => {
//         this.users = data;
//         this.users.forEach(user => {
//           switch (user.role) {
//             case 'ADMIN': this.totalAdmin++; break;
//             case 'CSR': this.totalCsr++; break;
//             default: this.totalCustomer++; break;
//           }
//         });
//         this.updateChartData();
//       },
//       error: err => console.error('Error fetching users:', err)
//     });
//   }

//   getTicketsAndComments(): void {
//     if (!this.user?.id) return;

//     this.serv.getAllTicket(this.user.id).subscribe({
//       next: (tickets: Ticket[]) => {
//         this.tickets = tickets;
//         this.totalTicket = tickets.length;

//         const commentRequests = tickets
//           .filter(ticket => ticket.id)
//           .map(ticket => this.serv.getComment(ticket.id!));

//         // Fetch all comments in parallel using forkJoin
//         if (commentRequests.length > 0) {
//           import('rxjs').then(rxjs => {
//             rxjs.forkJoin(commentRequests).subscribe({
//               next: (results: Comment[][]) => {
//                 results.forEach((comments: Comment[]) => {
//                   interface CommentWithUser extends Comment {
//                     userId: number;
//                   }

//                   (comments as CommentWithUser[]).forEach((comment: CommentWithUser) => {
//                     this.comments.push(comment);
//                     // Fake condition: assuming 'your' means current user wrote it
//                     if (comment.userId === this.user.id) {
//                       this.your++;
//                     } else {
//                       this.another++;
//                     }
//                   });
//                 });

//                 // Analyze ticket statuses
//                 this.tickets.forEach(ticket => {
//                   switch (ticket.status?.toLowerCase()) {
//                     case 'pending': this.pending++; break;
//                     case 'in-progress': this.inprogress++; break;
//                     case 'open': this.open++; break;
//                     case 'resolve': this.resolve++; break;
//                   }
//                 });

//                 this.updateChartData();
//               },
//               error: err => console.error('Error fetching comments:', err)
//             });
//           });
//         } else {
//           this.tickets.forEach(ticket => {
//             switch (ticket.status?.toLowerCase()) {
//               case 'pending': this.pending++; break;
//               case 'in-progress': this.inprogress++; break;
//               case 'open': this.open++; break;
//               case 'resolve': this.resolve++; break;
//             }
//           });
//           this.updateChartData();
//         }
//       },
//       error: err => console.error('Error fetching tickets:', err)
//     });
//   }

//   updateChartData(): void {
//     this.callsData = [this.totalAdmin, this.totalCustomer, this.totalCsr];
//     this.messagesData = [this.pending, this.inprogress, this.open, this.resolve];
//     this.commentData = [this.your, this.another];
//   }


// generateSimplePdf() {
//   const doc = new jsPDF();

//   // Title
//   doc.setFontSize(18);
//   doc.text('Customer Analysis Report', 14, 20);

//   doc.setFontSize(12);
//   doc.text('Generated with Angular and jsPDF', 14, 30);

//   let y = 40; // vertical position tracker

//   // User role totals
//   doc.setFontSize(14);
//   doc.text('User Role Summary:', 14, y);
//   y += 10;
//   doc.setFontSize(12);
//   doc.text(`Total Admin: ${this.totalAdmin}`, 14, y);
//   y += 7;
//   doc.text(`Total CSR: ${this.totalCsr}`, 14, y);
//   y += 7;
//   doc.text(`Total Customer: ${this.totalCustomer}`, 14, y);

//   // Ticket status summary
//   y += 15;
//   doc.setFontSize(14);
//   doc.text('Ticket Status Summary:', 14, y);
//   y += 10;
//   doc.setFontSize(12);
//   doc.text(`Pending: ${this.pending}`, 14, y);
//   y += 7;
//   doc.text(`In-progress: ${this.inprogress}`, 14, y);
//   y += 7;
//   doc.text(`Open: ${this.open}`, 14, y);
//   y += 7;
//   doc.text(`Resolved: ${this.resolve}`, 14, y);

//   // Comments summary
//   y += 15;
//   doc.setFontSize(14);
//   doc.text('Comments Summary:', 14, y);
//   y += 10;
//   doc.setFontSize(12);
//   doc.text(`Your Comments: ${this.your}`, 14, y);
//   y += 7;
//   doc.text(`Others' Comments: ${this.another}`, 14, y);

//   // Save the PDF
//   doc.save('customer-analysis-report.pdf');
// }


// // / /your existing properties and methods...

//   @ViewChild('callsChart', { static: false }) callsChart!: ElementRef<HTMLCanvasElement>;
//   @ViewChild('messagesChart', { static: false }) messagesChart!: ElementRef<HTMLCanvasElement>;
//   @ViewChild('commentsChart', { static: false }) commentsChart!: ElementRef<HTMLCanvasElement>;

//   // existing methods ...

//   generatePdfWithCharts() {
//     const doc = new jsPDF();

//     // Title
//     doc.setFontSize(18);
//     doc.text('Customer Analysis Report with Charts', 14, 20);

//     let y = 30;

//     // Add KPI data
//     doc.setFontSize(14);
//     doc.text(`Total Users: ${this.users.length}`, 14, y);
//     y += 10;
//     doc.text(`Total Tickets: ${this.totalTicket}`, 14, y);
//     y += 10;
//     doc.text(`Total Comments: ${this.comments.length}`, 14, y);
//     y += 10;
//     doc.text(`Your Comments: ${this.your}`, 14, y);
//     y += 20;

//     // Function to add canvas image to PDF with resizing
//     const addCanvasImage = (canvas: HTMLCanvasElement, title: string, posY: number) => {
//       const imgData = canvas.toDataURL('image/png');
//       doc.setFontSize(14);
//       doc.text(title, 14, posY);
//       doc.addImage(imgData, 'PNG', 14, posY + 5, 180, 80); // width=180, height=80 - adjust as needed
//     };

//     // Add charts as images
//     if(this.user.role === 'ADMIN' && this.callsChart) {
//       addCanvasImage(this.callsChart.nativeElement, 'User Roles', y);
//       y += 90;
//     }

//     if(this.messagesChart) {
//       addCanvasImage(this.messagesChart.nativeElement, 'Ticket Status', y);
//       y += 90;
//     }

//     if(this.commentsChart) {
//       addCanvasImage(this.commentsChart.nativeElement, 'Comments Source', y);
//       y += 90;
//     }

//     // Save PDF
//     doc.save('customer-analysis-with-charts.pdf');
//   }
// }








import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import { UserServiceService } from '../services/user-service.service';
import { User } from '../contract/User';
import { Ticket } from '../contract/ticket';
import { Comment } from '../contract/comment';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { CsrNavComponent } from '../csr-nav/csr-nav.component';
import { CustomerNavComponent } from '../customer-nav/customer-nav.component';

@Component({
  selector: 'app-anlysis',
  templateUrl: './anlysis.component.html',
  styleUrls: ['./anlysis.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    AdminNavComponent,
    NgChartsModule,
    CustomerNavComponent,
    CsrNavComponent
  ]
})
export class AnlysisComponent implements OnInit {

  user: User;
  users: User[] = [];
  tickets: Ticket[] = [];
  comments: Comment[] = [];

  // Totals
  totalAdmin = 0;
  totalCsr = 0;
  totalCustomer = 0;
  totalComment = 0;
  totalTicket = 0;
  pending = 0;
  resolve = 0;
  open = 0;
  inprogress = 0;
  your = 0;
  another = 0;

  // Chart data
  callsLabels = ['Admin', 'Customer', 'Csr'];
  callsData: number[] = [];
  callsColors = ['#7b2cbf', '#f76868', '#ffafcc'];

  messagesLabels = ['pending', 'In-progress', 'open', 'Resolve'];
  messagesData: number[] = [];
  messagesColors = ['#4361ee', '#b5179e', '#ff758f', '#33f40cff'];

  commentLabels = ['your', 'another'];
  commentData: number[] = [];
  commentColors = ['#4361ee', '#b5179e'];

  // Get canvas references
  @ViewChild('callsChart', { static: false }) callsChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('messagesChart', { static: false }) messagesChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('commentsChart', { static: false }) commentsChart!: ElementRef<HTMLCanvasElement>;

  constructor(private serv: UserServiceService) {
    this.user = this.serv.getUser();
  }

  ngOnInit(): void {
    this.getUsers();
    this.getTicketsAndComments();
  }

  getUsers(): void {
    this.serv.getAllUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.users.forEach(user => {
          switch (user.role) {
            case 'ADMIN': this.totalAdmin++; break;
            case 'CSR': this.totalCsr++; break;
            default: this.totalCustomer++; break;
          }
        });
        this.updateChartData();
      },
      error: err => console.error('Error fetching users:', err)
    });
  }

  getTicketsAndComments(): void {
    if (!this.user?.id) return;

    this.serv.getAllTicket(this.user.id).subscribe({
      next: (tickets: Ticket[]) => {
        this.tickets = tickets;
        this.totalTicket = tickets.length;
          console.log(tickets);
        const commentRequests = tickets
          .filter(ticket => ticket.id)
          .map(ticket => this.serv.getComment(ticket.id!));

        if (commentRequests.length > 0) {
          import('rxjs').then(rxjs => {
            rxjs.forkJoin(commentRequests).subscribe({
              next: (results: Comment[][]) => {
                results.forEach((comments: Comment[]) => {
                  comments.forEach(comment => {
                    this.comments.push(comment);
                    if (comment.userId === this.user.id) {
                      this.your++;
                    } else {
                      this.another++;
                    }
                  });
                });

                this.tickets.forEach(ticket => {
                  switch (ticket.status?.toLowerCase()) {
                    case 'pending': this.pending++; break;
                    case 'in-progress': this.inprogress++; break;
                    case 'open': this.open++; break;
                    case 'resolve': this.resolve++; break;
                  }
                });

                this.updateChartData();
              },
              error: err => console.error('Error fetching comments:', err)
            });
          });
        } else {
          this.tickets.forEach(ticket => {
            switch (ticket.status?.toLowerCase()) {
              case 'pending': this.pending++; break;
              case 'in-progress': this.inprogress++; break;
              case 'open': this.open++; break;
              case 'resolve': this.resolve++; break;
            }
          });
          this.updateChartData();
        }
      },
      error: err => console.error('Error fetching tickets:', err)
    });
  }

  updateChartData(): void {
    this.callsData = [this.totalAdmin, this.totalCustomer, this.totalCsr];
    this.messagesData = [this.pending, this.inprogress, this.open, this.resolve];
    this.commentData = [this.your, this.another];
  }

  generatePdfWithCharts() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Customer Analysis Report with Charts', 14, 20);

    let y = 30;

    // KPI Cards info
    doc.setFontSize(14);
    if(this.user.role==='ADMIN'){
    doc.text(`Total Users: ${this.users.length}`, 14, y);
    y += 10;
    }
    doc.text(`Total Tickets: ${this.totalTicket}`, 14, y);
    y += 10;
    doc.text(`Total Comments: ${this.comments.length}`, 14, y);
    y += 10;
    doc.text(`Your Comments: ${this.your}`, 14, y);
    y += 20;

    // Function to add a canvas image to PDF with resizing
    const addCanvasImage = (canvas: HTMLCanvasElement, title: string, posY: number) => {
      const imgData = canvas.toDataURL('image/png');
      doc.setFontSize(14);
      doc.text(title, 14, posY);
      doc.addImage(imgData, 'PNG', 14, posY + 5, 180, 80);
    };

    // Add charts only if canvas is available
    if (this.user.role === 'ADMIN' && this.callsChart) {
      addCanvasImage(this.callsChart.nativeElement, 'User Roles', y);
      y += 90;
    }

    if (this.messagesChart) {
      addCanvasImage(this.messagesChart.nativeElement, 'Ticket Status', y);
      y += 90;
    }

    if (this.commentsChart) {
      addCanvasImage(this.commentsChart.nativeElement, 'Comments Source', y);
      y += 90;
    }
    doc.save('customer-analysis-with-charts.pdf');
  }
}
