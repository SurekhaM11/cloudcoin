import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { EventService } from '../services/event.service';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  userName: string = null;
  password: string = null;
  options: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/cloud_login.json'
  };
  errorOptions: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/error.json'
  };
  showLoader = false;
  showNormal = true;
  showError = false;
  errorMessage: string = null;
  public themeDarkActive: boolean;
  public themeLightActive: boolean;

  constructor(private auth: LoginService, private router: Router,private eventService: EventService) {
    if(localStorage.getItem('themeLightActive')=='1'){
      this.themeLightActive = true;
      this.themeDarkActive = false;
    }else if(localStorage.getItem('themeLightActive')=='0'){
      this.themeLightActive = false;
      this.themeDarkActive = true;
    }else{
      this.themeLightActive = true;
      this.themeDarkActive = false;
    }
   }
  @ViewChild('autofocus') autoFocusField: ElementRef;
  ngAfterViewInit(): void {
    this.autoFocusField.nativeElement.focus();
  }

  ngOnInit(): void {
    if (this.auth.getLoggedIn())
    {
      this.router.navigate(['/dashboard']);
    }
  }

  // login(): void {
  //   this.showLoading(true);
  //   if (!this.userName || this.userName === '') {
  //     this.showErrorMessage('Invalid wallet name');
  //     return;
  //   }
  //   if (!this.password || this.password === '') {
  //     this.showErrorMessage('Invalid card number');
  //     return;
  //   }


  //   const params = {
  //     // Username
  //     username : this.userName,

  //     // Password
  //     password : this.password
  //   };
  //   this.raida.loginWithPassword(params).then(response => {
  //     console.log(response);
  //     if (response.status === 'error')
  //     {
  //       this.showErrorMessage(response.errorText);
  //     }
  //     else {
  //       if (response.status === 'done')
  //       {
  //         const cloudcoin = response.cc;
  //         // console.log(cloudcoin);
  //         if (!cloudcoin.an && cloudcoin.ans) {
  //           cloudcoin.an = cloudcoin.ans;
  //         }
  //         localStorage.setItem('cc', JSON.stringify(cloudcoin));
  //         localStorage.setItem('skywallet', this.userName);
  //         localStorage.setItem('gcc', atob(this.password));
  //         // console.log('inside');
  //         this.auth.checkLoginStatus();
  //         setTimeout(() => {
  //           this.router.navigate(['/dashboard']);
  //         }, 2500);
  //       }
  //       //  console.log(response);
  //     }
  //   });

  // }
  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  showLoading(state):void {
    if(state)
    {
      this.showNormal=false;
      this.showLoader=true;
      this.showError=false;
    }
    else
    {
      this.showNormal=true;
      this.showLoader=false;
      this.showError=false;
    }

  }

  showErrorMessage(message): void {
    this.errorMessage = message;
    this.showNormal = false;
    this.showError = true;
    this.showLoader = false;


  }
  hideErrorMessage(): void {
    this.errorMessage = '';
    this.showNormal = true;
    this.showError = false;
    this.showLoader = false;
  }

  themeDarkCaller(){
    if (this.themeDarkActive == false) {
      this.themeDarkActive = true;
      this.themeLightActive = false;
      localStorage.setItem('themeLightActive','0');
      this.eventService.emitThemeTogEvent();
    }
  }
  themeLightCaller(){
    if (this.themeLightActive == false) {
      this.themeLightActive = true;
      this.themeDarkActive = false;
      localStorage.setItem('themeLightActive','1');
      this.eventService.emitThemeTogEvent();
    }
  }
}
