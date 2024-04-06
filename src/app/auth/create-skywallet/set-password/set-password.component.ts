import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { EventService } from 'src/app/services/event.service';
import * as CryptoJS from 'crypto-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../create-localwallet/setup-mail-psw/custom-validators';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {

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

  // @ViewChild('autofocus') autoFocusField: ElementRef;
  ngAfterViewInit(): void {
    // this.autoFocusField.nativeElement.focus();
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('userSky');
    // console.log(environment.card_image);
    /* const params = {
      // array of coins
      coins: [{
        sn: 4343,
        nn: 1,
        an: ['f9f2b05d74192e31478846f1b7bdd661', '74025cf02053edb09b93ef532a37099d', 'c3518632d60f897d84ae62e75a7059a3', '66dfb17c08b6dbc2846fbe8938bece1a', '2f0744735d8b124cc0e31a349770d1f4', 'cd13fcc1a2806a75322d5a9fda0feaa4', 'f611a8eb968d4d4b0dd82d8a05b2d8eb', '23f8f118f4e76e8cc1488514e6bc6881', 'd31849f975223a06e765d3433d3e6a9b', '4502d00825ccae4c3507cfe1749980d1', '62925225e48a9b0fe497dcde66de9227', '54688f1c40550d113b8f4f513bf6b8d4', '9c2b39d22d0b3e4012eb6e962e99b31b', '1564dacd34ace94eb4abfe2f378abe87', '1b890b7fa38069745c1b7c7729b242c1', '23a0120db1384da7fed62a9100c2f56f', '07500e20b49fd14ea5880aa279061aea', '72c35043e9a0ea06dc3a29e0409af6ed', '415110f4d85b09cf6618aa13164f6b87', '8bcf9c8ca170528891bb9eb4ffcbaec0', '506c76f5422e92297f4daa453a0d195b', '8608a6edb997d0abfec8f88782ff61bd', '56d153108902aa4bfe5dab55d9298250', '763ec57476e3923eb3f4d9309c5651d6', '6938b4aafd39bd136141a2ac31fc8141']
      }],
      template: 'assets/card.png',
    };
    try {
      this.raidaJS.embedInImage(params).then(coinResponse => {
        // console.log(coinResponse);
        // alert(coinResponse);
        this.showCompleteMessage('Registration Successful!');
        const cardData = {
          name: 'Partha Dasgupta',
          number: '1234 5678 9012 3456',
          expiry: '04-2026',
          pin: '519'
        }; // 'Partha Dasgupta', 50, 50, '#FFFFFF', '18px courier'
        this.addTextToImage('data:image/png;base64,' + coinResponse,cardData);
        // this.cardImage =
      });
    } catch (e) {
      console.log(e);
    }
    */
  }



  // onFileChanged(event): void {
  //   this.buttonText = 'Select CloudCoin';
  //   this.selectedFile = event.target.files[0];
  //   const fileReader = new FileReader();
  //   const me = this;
  //   fileReader.readAsText(this.selectedFile, 'UTF-8');
  //   fileReader.onload = () => {
  //     this.selectedData = fileReader.result;
  //     // console.log(JSON.parse(this.selectedData));
  //     try {
  //       const coin = JSON.parse(this.selectedData);
  //       if (coin.cloudcoin) {
  //         const stack = coin.cloudcoin;
  //         if (stack.length > 1) {
  //           this.showErrorMessage('Stack for registration must contain only one CloudCoin');
  //           this.selectedData = {};
  //           return;
  //         }
  //         for (let i = 0; i < stack.length; i++) {
  //           const cc = stack[i];
  //           if (!cc.sn) {
  //             this.showErrorMessage('Please choose a valid CloudCoin');
  //             this.selectedData = {};
  //             return;
  //           }
  //           const total = me.raida.getDenomination(cc.sn);
  //           if (total < 1) {
  //             this.showErrorMessage('Please choose a valid CloudCoin');
  //             this.selectedData = {};
  //             return;
  //           } else {
  //             this.buttonText = '1 CloudCoin Selected';
  //           }
  //         }
  //       } else {
  //         this.showErrorMessage('Please choose a valid CloudCoin');
  //         this.selectedData = {};
  //         return;
  //       }

  //     } catch (e) {
  //       if (e.indexOf('Failed to resolve DNS name') === -1) {
  //         console.log(e);
  //         me.showErrorMessage('Failed to parse CloudCoin');
  //         return;
  //       }
  //     }

  //   };
  //   fileReader.onerror = (error) => {
  //     console.log(error);
  //     this.showErrorMessage('Cannot Parse CloudCoin');
  //   };
  // }

  validateEmail(email): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  animationCreated(animationItem: AnimationItem): void {
    // console.log(animationItem);
  }

  showLoading(state): void {
    if (state) {
      this.showNormal = false;
      this.showLoader = true;
      this.showError = false;
    } else {
      this.showNormal = true;
      this.showLoader = false;
      this.showError = false;
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

  showCompleteMessage(message): void {
    this.errorMessage = '';
    this.showNormal = false;
    this.showError = false;
    this.showLoader = false;
    this.completeMessage = message;
    this.complete = true;
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
