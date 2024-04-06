import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'ngx-lottie/src/symbols';
import { CustomValidators } from 'src/app/auth/create-localwallet/setup-mail-psw/custom-validators';
import { EventService } from 'src/app/services/event.service';
@Component({
  selector: 'app-simple-dash',
  templateUrl: './simple-dash.component.html',
  styleUrls: ['./simple-dash.component.scss']
})
export class SimpleDashComponent implements OnInit {

  setPassForm: FormGroup;
  fieldTextType: boolean;
  isShow: boolean = true;
  isCheck : boolean = false;
  isSelect: boolean = false;
  isLow: boolean = false;
  isMedium: boolean = false;
  isStrong: boolean = false;

  public themeDarkActive: boolean;
  public themeLightActive: boolean;
  selectedFile: File;
  selectedData: any = null;
  username:any='USERNAME';
  walletName: any;
  walletEmail: any;
  walletPin: string;
  agreed1 = false;
  agreed2 = true;
  registerTapped = false;
  complete = false;
  errorMessage: string = null;
  registerParams: any = null;
  completeMessage: string = null;
  cardImage: string = null;
  cardImageBlank: string = null;
  progressMessage: string = null;
  options: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/cloud_login.json'
  };
  errorOptions: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/error.json'
  };
  showLoader = false;
  showNormal = true;
  showError = false;
  buttonText = 'Select CC';
  freeCoin = true;
  user: string;
  uniqueString = null;
  constructor(
    private eventService: EventService,
    private router:Router,
    public fb : FormBuilder) {
      this.setPassForm = this.fb.group({
        password: [null,
          Validators.compose([
            Validators.required,
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true
              }
            ),
            Validators.minLength(8)
          ])
        ],
        email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]]
      })

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
    if(localStorage.getItem('userDetails')){
      let user = JSON.parse(localStorage.getItem('userDetails'));
      if(user.hostname){
        this.username = user.hostname;
        this.walletName = user.hostname;
      }
    }
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

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('userSky');
  }

  setNewvalues(e){
    let z = this.setPassForm.get('password').value
    if ((/[A-Z]/.test(z) && z?.length >= 8) || (z?.length > 8 && /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(z)) || (/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(z) &&  /[A-Z]/.test(z) )){
      this.isMedium = true;
    }
    else{
      this.isMedium = false;
    }
  }

  getStatus(e){
    this.isSelect = e.target.checked;
    if(this.isSelect == false) {
      this.setPassForm.controls['email'].disable();
      this.setPassForm.controls['email'].patchValue('');
    } else {
       this.setPassForm.controls['email'].enable();

    } 
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  isValidInput(value: any){
    return this.setPassForm.controls[value].invalid &&
    (this.setPassForm.controls[value].dirty || this.setPassForm.controls[value].touched);
  }

  save(){
    localStorage.setItem('emailSky', this.setPassForm.controls.email.value);
    localStorage.setItem('passSky', this.setPassForm.controls.password.value);
    localStorage.setItem('setupType', 'simple');
  }

}
