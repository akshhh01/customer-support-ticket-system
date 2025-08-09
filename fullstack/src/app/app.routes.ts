import { ViewCsrComponent } from './view-csr/view-csr.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserDashbordComponent } from './user-dashbord/user-dashbord.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { LogoutComponent } from './logout/logout.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';
import { ViewPanddingComponent } from './view-pandding/view-pandding.component';
import { ViewResolvedComponent } from './view-resolved/view-resolved.component';
import { AdminDashboardComponent } from './admin-dashbord/admin-dashbord.component';
import { ViewTicketUserIdComponent } from './view-ticket-user-id/view-ticket-user-id.component';
import { AssignToComponent } from './assign-to/assign-to.component';
import { CsrDashbordComponent } from './csr-dashbord/csr-dashbord.component';
import { CsrNavComponent } from './csr-nav/csr-nav.component';
import { AddCommentsComponent } from './add-comments/add-comments.component';
import { HomeComponent } from './home/home.component';
import { AnlysisComponent } from './anlysis/anlysis.component';

export const routes: Routes = [
  {path: '', component:HomeComponent},
  {path : 'home' , component:HomeComponent},
  {path:'user-dash',component:UserDashbordComponent},
  {path:'sing-up',component:UserRegisterComponent},
  {path:'log-in',component:UserLoginComponent},
  {path:'create-ticket' , component : CreateTicketComponent},
  {path : 'logout' , component:LogoutComponent},
  {path : 'view-all' , component:ViewTicketComponent},
  {path : 'pandding' , component:ViewPanddingComponent},
  {path : 'resolve' , component:ViewResolvedComponent},
   {path : 'view-customer' , component:ViewUserComponent},
  {path : 'view-csr' , component:ViewCsrComponent},
  {path : 'admin-dash' , component:AdminDashboardComponent},
   {path : 'view-ticket-by-user' , component:ViewTicketUserIdComponent},
    {path : 'assignTo' , component:AssignToComponent},
    {path : 'csr-dash' , component : CsrDashbordComponent},
    {path:'add-comment' , component:AddCommentsComponent},
    {path : 'analysis' , component : AnlysisComponent}

];
