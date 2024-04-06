import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CustomValidators } from '../../create-localwallet/setup-mail-psw/custom-validators';
import { UsernameValidator } from './username.validator';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.scss']
})
export class CreateAddressComponent implements OnInit {

  addressForm: FormGroup;
  createWallet: boolean;
  successInfo: boolean;
  successMsg: string;
  errorInfo: boolean;
  errorMsg: string;
  payload: any;
  raidaCheck: boolean;
  serversList: string;
  btnDis: boolean = false;

  constructor(private fb: FormBuilder,
    private raida: ApiService,
    private router: Router) {
    this.addressForm = this.fb.group({
      "username": ['', [Validators.required,
      Validators.pattern('^([^-]|[^-].*)$'),
      // Validators.minLength(6),
      Validators.maxLength(64),
      // CustomValidators.patternValidator(
      //   /[a-zA-Z]+/,
      //   {
      //     onlyNumber: true
      //   }
      // ),
      CustomValidators.patternValidator(
        /^[a-zA-Z0-9-]*$/,
        {
          special: true
        }
      ),
      UsernameValidator.cannotContainSpace]],

    })
  }

  isValidInput(value: any) {
    return this.addressForm.controls[value].invalid &&
      (this.addressForm.controls[value].dirty || this.addressForm.controls[value].touched);
  }

  ngOnInit(): void {
  }

  add() {
    var name = this.addressForm.get('username').value + '.skyvault.cc'
    localStorage.setItem('userSky', name);
    this.router.navigate(['/skywallet/upload-cc']);
  }

  async doCheck(taskID: any, xdata: any) {
    let task: any = await this.raida.doCheck(taskID);
    console.log("Task done: ", task);

    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.router.navigate(['/skywallet/security-setup']);
          let data = this.payload.data;
          this.successInfo = true;
          this.errorInfo = false;
          this.successMsg = "Done: " + JSON.stringify(data);
        }
        else {
          this.errorInfo = true;
          this.successInfo = false;
          this.errorMsg = this.payload.data.message;
        }

        let h = "";
        this.raidaCheck = true;
        this.serversList = h;
        return;
      }
      this.successInfo = true;
      this.successMsg = "Doing.... Task ID " + taskID + ", Progress " + this.payload.progress + "%";
      setTimeout(() => {
        this.doCheck(taskID, xdata)
      }, 500)

    }
    else {
      this.errorInfo = true;
      this.successInfo = false;
      this.errorMsg = "Call Failed";
    }
  }

}
