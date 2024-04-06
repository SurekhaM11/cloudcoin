import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-setup-mail-psw',
  templateUrl: './setup-mail-psw.component.html',
  styleUrls: ['./setup-mail-psw.component.scss']
})
export class SetupMailPswComponent implements OnInit {

  setupForm: FormGroup;
  fieldTextType: boolean;
  isCheck : boolean = false;
  isSelect: boolean = false;
  isLow: boolean = false;
  isMedium: boolean = false;
  isStrong: boolean = false;
  user : string;
  successInfo: boolean = true;
  errorInfo: boolean;
  errorMsg: string;

  constructor(private fb: FormBuilder,
    private router: Router,
    private raida: ApiService) {
    this.setupForm = this.fb.group({
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
    this.user = localStorage.getItem('userLocal');
   }

  ngOnInit(): void { 
  }

  setNewvalues(e){
    let z = this.setupForm.get('password').value
    if ((/[A-Z]/.test(z) && z.length >= 8) || (z.length > 8 && /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(z)) || (/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(z) &&  /[A-Z]/.test(z) )){
      this.isMedium = true;
      this.isLow = false;
      this.isStrong = false;
    }
    else{
      this.isMedium =false;
      this.isLow = false;
      this.isStrong =  false;
    }
  }

  isValidInput(value: any){
    return this.setupForm.controls[value].invalid &&
    (this.setupForm.controls[value].dirty || this.setupForm.controls[value].touched);
  }

  getStats(e){
    this.isCheck = e.target.checked;
    if(this.isCheck == false) {
      this.setupForm.controls['password'].disable();
      this.setupForm.controls['password'].patchValue('');
    } else {
       this.setupForm.controls['password'].enable();
    } 
  }

  getStatus(e){
    this.isSelect = e.target.checked;
    if(this.isSelect == false) {
      this.setupForm.controls['email'].disable();
      this.setupForm.controls['email'].patchValue('');
    } else {
       this.setupForm.controls['email'].enable();
    } 
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  async save(){
    try{
      let idata = {
        name: this.user,
        email: this.setupForm.controls.email.value
        }
        let wallet: any = await this.raida.addWallet(idata);        
        if(wallet.status == 'success'){
          this.successInfo = true;
          this.errorInfo = false;
          this.router.navigate(['/localwallet/uplaod-local-cc']);
        }
        else{
          this.errorInfo = true;
          this.successInfo = false;
          this.errorMsg = "Error!! " + wallet.payload.message;
          // this.router.navigate(['/localwallet/localstep-completed']);
        }
     }
     catch(e){
      this.errorInfo = true;
      this.errorMsg = "Create Wallet Failed";
     }
    localStorage.setItem('emailAdd', this.setupForm.controls.email.value);
    localStorage.setItem('passLocal', this.setupForm.controls.password.value);
  }

}
