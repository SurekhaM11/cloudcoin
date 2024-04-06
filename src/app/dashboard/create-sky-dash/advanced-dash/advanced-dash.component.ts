import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import Swal from 'sweetalert2';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-advanced-dash',
  templateUrl: './advanced-dash.component.html',
  styleUrls: ['./advanced-dash.component.scss']
})

export class AdvancedDashComponent implements OnInit {

  public themeDarkActive: boolean;
  public themeLightActive: boolean;
  public showDownload: boolean = false;
  options: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/cloud_loading.json',
  };
  successInfo: boolean = false;
  successMsg: any = '';
  errorInfo: boolean = false;
  errorMsg: any = '';
  payload: any = null;
  taskId: any = null;
  emailForm: FormGroup;
  showError: boolean = false;
  isSelect: boolean;
  user: any;
  fileName: string = '';
  idata: any;
  allSky: any[];
  showLoader: boolean;
  isDownload: boolean = false;
  continue: boolean = false;
  passkey: string;
  constructor(private eventService: EventService,
    private router: Router,
    private storage: EventService,
    private raida: ApiService,
    private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]]
    })
    this.user = localStorage.getItem('userSky');
    if (localStorage.getItem('themeLightActive') == '1') {
      this.themeLightActive = true;
      this.themeDarkActive = false;
    } else if (localStorage.getItem('themeLightActive') == '0') {
      this.themeLightActive = false;
      this.themeDarkActive = true;
    } else {
      this.themeLightActive = true;
      this.themeDarkActive = false;
    }
  }

  ngOnInit(): void {
    this.passkey = 'newpasskey';
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }



  isValidInput(value: any) {
    return this.emailForm.controls[value].invalid &&
      (this.emailForm.controls[value].dirty || this.emailForm.controls[value].touched);
  }

  themeDarkCaller() {
    if (this.themeDarkActive == false) {
      this.themeDarkActive = true;
      this.themeLightActive = false;
      localStorage.setItem('themeLightActive', '0');
      this.eventService.emitThemeTogEvent();
    }
  }

  themeLightCaller() {
    if (this.themeLightActive == false) {
      this.themeLightActive = true;
      this.themeDarkActive = false;
      localStorage.setItem('themeLightActive', '1');
      this.eventService.emitThemeTogEvent();
    }
  }

  getStatus(e) {
    this.isSelect = e.target.checked;
    if (this.isSelect == false) {
      this.emailForm.controls['email'].disable();
      this.emailForm.controls['email'].patchValue('');
    } else {
      this.emailForm.controls['email'].enable();
    }
  }

  onFileInput(event) {
    this.errorInfo = false;
    this.isDownload = true;
    this.successInfo = false;
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
        this.unpack(reader.result);
      };
      reader.readAsDataURL(file);
      // this.fileName = file.name;
      // const formData = new FormData();
      // formData.append("thumbnail", file);
      // let fileReader = new FileReader();
      // fileReader.onload = (e) => {
      //   this.isDownload = true;
      // this.detectWallet(fileReader.result);
      // }
      // fileReader.readAsText(file);
    }
  }

  async unpack(val: any) {
    try {
      var log = val.split(',')[1]
      var data = { data: log };
      let response: any = await this.raida.readbin(data);
      if (response.status === "success") {
        this.idata = {
          sn: response.payload[0].sn,
          ans: response.payload[0].ans
        }
        this.detectWallet(this.idata, "0");
      } else {
        Swal.fire({
          title: "Failed to unpack coin.",
          icon: 'error',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) { }
        });
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async detectWallet(File, type) {
    this.isDownload = true;
    // try {
    //   var cs = JSON.parse(File);
    //   if (cs.cloudcoin.length !== 0) {
    //   }
    // }
    // catch (e) {
    //   this.errorInfo = true;
    //   this.errorMsg = "Failed to parse json";
    // }
    // this.idata = {
    //   coins: [
    //     {
    //       'sn': parseInt('sn'),
    //       'ans': String
    //     }
    //   ]
    // }
    // for (let i = 0; i < cs?.cloudcoin?.length; i++) {
    //   let cc = cs.cloudcoin[i]
    //   this.idata.coins[i] = {
    //     'sn': parseInt(cc.sn, 10),
    //     'ans': cc.an
    //   }
    // }
    try {

      File.coin_type = Number(type)
      var data =
      {
        coins: [
          File
        ]
      }
      console.log(data);

      let detection: any = await this.raida.detect(data);
      //console.log(detection, "response");
      if (detection.status == 'success') {
        this.successInfo = true;
        this.errorInfo = false;
        let taskId = detection.payload
        this.doCheckcoin(taskId.id, (data: any) => { })
      }
      else {
        this.showDownload = false;
        this.isDownload = false;
        this.errorInfo = true;
        this.successInfo = false;
        this.errorMsg = detection.payload.message;
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async doCheckcoin(taskID: any, xdata: any) {
    let task: any = await this.raida.doCheck(taskID);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          if (this.payload?.data?.counterfeit === 0 && this.payload?.data?.limbo === 0) {
            this.successInfo = true;
            this.errorInfo = false;
            this.continue = true;
            this.successMsg = "Done: Detected Pass Key is healthy!";
          } else {
            this.successInfo = false;
            this.isDownload = false;
            Swal.fire({
              title: "Pass Key is not authentic. Please upload or generate another Pass Key.",
              icon: 'error',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) {
                this.showDownload = false;
              }
            });
          }
        }
        else {
          this.showDownload = false;
          this.isDownload = false;
          this.errorInfo = true;
          this.successInfo = false;
          this.errorMsg = this.payload.data.message;
        }
        return;
      }
      this.successInfo = true;
      this.successMsg = "Doing.... Task ID " + taskID + ", Progress " + this.payload.progress + "%";
      setTimeout(() => {
        this.doCheckcoin(taskID, xdata)
      }, 500)
    }
    else {
      this.isDownload = false;
      this.errorInfo = true;
      this.successInfo = false;
      this.errorMsg = "Call Failed";
    }
  }
  passkeyradio(e) {
    this.passkey = e.target.value;
    this.isDownload = true
    //console.log("isdownload: " + this.isDownload)
    console.log(" passkey radio:" + this.passkey)
  }
  createSky() {
    this.passkey = this.passkey
    console.log("In createsky " + this.passkey)
    if (this.passkey != '') {
      this.router.navigate(['/dashboard/create-skyvault-dash/new-address'], { queryParams: { passkey: this.passkey } })
    }
  }

}
