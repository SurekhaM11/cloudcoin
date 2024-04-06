import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { EventService } from '../services/event.service';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-imagelogin',
  templateUrl: './imagelogin.component.html',
  styleUrls: ['./imagelogin.component.scss']
})
export class ImageloginComponent implements OnInit {

  userName: string = null;
  password: string = null;
  userimage:any;
  userfile:any;
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
  // @ViewChild('autofocus') autoFocusField: ElementRef;
  ngAfterViewInit(): void {
    // this.autoFocusField.nativeElement.focus();
  }
  onFileChanged(event): void {
    this.userfile = event.target.files[0];
    const fileReader = new FileReader();
    const me = this;
    fileReader.readAsDataURL(this.userfile);
    fileReader.onload = () => {
      this.userimage = fileReader.result;
    };
    fileReader.onerror = (error) => {
      console.log(error);
    };
  }
  ngOnInit(): void {
    if (this.auth.getLoggedIn())
    {
      this.router.navigate(['/dashboard']);
    }
  }

  // login(): void {
  //   this.showLoading(true);
  //   if(!this.userimage){
  //     this.showErrorMessage('Please provide a valid image');
  //   }
  //   let params = {
  //     template:this.userimage
  //   };
  //   console.log("login",params);
  //   this.raida.loginWithCardImage(params).then(response => {
  //     console.log(response);
  //     if (response.status === 'error')
  //     {
  //       this.showErrorMessage(response.errorText);
  //     }
  //     else {
  //       if (response.status === 'done')
  //       {
  //         const cloudcoin = response.cloudcoin;
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
