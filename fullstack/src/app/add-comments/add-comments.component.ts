import { Comment } from './../contract/comment';
import { Component, OnInit } from '@angular/core';
import { Ticket } from '../contract/ticket';
import { User } from '../contract/User';
import { UserServiceService } from '../services/user-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-comments',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-comments.component.html',
  styleUrl: './add-comments.component.css'
})
export class AddCommentsComponent implements OnInit {
  public user: User = {
    id: null,
    name: '',
    email: '',
    password: '',
    mobile: '',
    role: '',
  };

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


  comment: Comment = {
    id: null,
    comments: '',
    ticketId: 0,
    userId: 0
  };
  comments: Comment[] = [];
  newComment: string = '';

  constructor(private serv: UserServiceService) { }

  ngOnInit(): void {
    const ticket = localStorage.getItem('commentTicket');
    const user = localStorage.getItem('user');
    if (ticket) {
      this.ticket = JSON.parse(ticket);
      if (this.ticket.id !== null) {
        this.getComment(this.ticket.id);
      }
    }
    if (user) {
      this.user = JSON.parse(user);
    }
  }
  message: string | null = null;
  addComment() {
    console.log('1')
    if (this.ticket.id && this.user.id && this.newComment) {
      this.comment.comments = this.newComment;
      this.comment.ticketId = this.ticket.id;
      this.comment.userId = this.user.id;
      console.log('2')
    }
    console.log('3')
    console.log(this.comment)
    this.serv.addComment(this.comment).subscribe({
      next: (data) => {
        console.log('next')
        alert('success');
        if (this.ticket.id !== null) {
          this.comment.comments = '';
          this.newComment = ''
          this.getComment(this.ticket.id);
        }
      },
      error: (err) => {
        console.log(err)
        this.message = err.error;
        alert(this.message);
      }
    });
  }

  getComment(id: number) {
    this.serv.getComment(id).subscribe({
      next: (data: Comment[]) => {
        this.comments = data;
        console.log(this.comments)
      }, error: (err) => {
        this.message = err.error;
        alert(this.message);
      }
    });
  }




}
