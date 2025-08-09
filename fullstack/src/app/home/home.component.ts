import { CommonModule } from "@angular/common";
import { Component, OnInit, ElementRef, Renderer2 } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { UserServiceService } from "../services/user-service.service";
import { UserLoginComponent } from "../user-login/user-login.component";
import { UserRegisterComponent } from "../user-register/user-register.component";


@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, RouterModule, UserLoginComponent, UserRegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements  OnInit,OnInit{
  private typingInterval: any;
  private loopInterval: any;
  private fullText: string = 'How can we help you?';
  private currentIndex: number = 0;
  islogin: boolean = true;
  logInData = {
    email: '',
    password: '',
  };
  constructor(private act: ActivatedRoute,private element: ElementRef, private renderer: Renderer2,private serv: UserServiceService, private router: Router) {}

  ngOnInit(): void {

    this.act.fragment.subscribe((frag) => {
      if(frag){
        const element  = document.getElementById(frag);
        if(element){
           element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
   const navigat = this.router.getCurrentNavigation();
    const state = navigat?.extras?.state;
    this.logInData = typeof state === 'string' ? JSON.parse(state) : (state || { email: '', password: '' });
  }

  ngAfterViewInit(): void {
    this.startLoopingTypewriter();
  }

  startLoopingTypewriter(): void {
    const heading = this.element.nativeElement.querySelector('.hero .hero-a1 h1');
    if (!heading) return;

    this.loopInterval = setInterval(() => {
      heading.textContent = '';
      this.currentIndex = 0;

      // Start typing
      this.typingInterval = setInterval(() => {
        if (this.currentIndex < this.fullText.length) {
          heading.textContent += this.fullText.charAt(this.currentIndex);
          this.currentIndex++;
        } else {
          clearInterval(this.typingInterval); // stop typing after finishing
        }
      }, 200); // Typing speed
    }, 4000); // Repeat every 3 seconds
  }

  ngOnDestroy(): void {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
    if (this.loopInterval) {
      clearInterval(this.loopInterval);
    }
  }

  pageChange(){
    this.islogin = !this.islogin;
  }

goToLogin() {
    const target = this.element.nativeElement.ownerDocument.querySelector('.container1');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      // target.style.transition = 'all 0.9s';
    }
  }

}
