import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../contract/User';
import { Ticket } from '../contract/ticket';
import { Comment } from '../contract/comment';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient) {}

  header = new HttpHeaders().set('content-type', 'application/json');
  public url = 'http://localhost:8080';

  public userRegister(user: User): Observable<any> {
    return this.http.post<any>(this.url + '/user/register', user, {
      headers: this.header,
    });
  }
  public getAllUsers(): Observable<User[]> {
     const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
        });
    return this.http.get<User[]>(this.url + '/user/getall', {
      headers
    });
  }
  // user-service.service.ts
  public userLogIn(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(this.url + '/user/login', body, {
      headers: this.header,
    });
  }

  public getAllTicket(id: number): Observable<Ticket[]> {
     const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
        });
    return this.http.get<Ticket[]>(this.url + '/ticket/get/' + id, {
      headers   });
  }
  public createTicket(ticket: Ticket): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
        });
    return this.http.post<any>(this.url + '/ticket/create', ticket, { headers });
  }
  public addComment(comment: Comment): Observable<any> {
     const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
        });
    return this.http.post<any>(this.url + '/comment/create', comment, {
      headers
    });
  }
  public getComment(id: number): Observable<Comment[]> {
     const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
        });
    return this.http.get<Comment[]>(this.url + '/comment/get/' + id, {
      headers
    });
  }

  public getTicketByCsr(id: number): Observable<Ticket[]> {
     const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
        });
    return this.http.get<Ticket[]>(this.url + '/ticket/csr/get/' + id, {
      headers
    });
  }
}
