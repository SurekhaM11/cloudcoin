import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-advanced-setup',
  templateUrl: './advanced-setup.component.html',
  styleUrls: ['./advanced-setup.component.scss']
})
export class AdvancedSetupComponent implements OnInit {

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
  cloudcoin: any;
  idata: any;
  showLoader: boolean;
  isDownload: boolean = false;
  continue: boolean = false;
  allSky: any[];

  constructor(private eventService: EventService,
    private router: Router,
    private raida: ApiService,
    private storage: EventService,
    private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]]
    });
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
    this.eventService.changeSky.subscribe
      (message => {
        this.allSky = message;
      });
  }

  save() {
    localStorage.setItem('emailSky', this.emailForm.controls.email.value);
    localStorage.setItem('setupType', "advance");
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  showLoading(state): void {
    if (state) {
      this.showLoader = true;
    } else {
      this.showLoader = false;
    }
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

  // continue() {
  //   this.advanceRecovery = true;
  // };

  // closeAdvanceRecovery() {
  //   this.advanceRecovery = false;
  // }

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
    // const file: File = event.target.files[0];
    // if (file) {
    //   this.fileName = file.name;
    //   const formData = new FormData();
    //   formData.append("thumbnail", file);
    //   let fileReader = new FileReader();
    //   fileReader.onload = (e) => {
    //     this.isDownload = true;
    //     this.detectWallet(fileReader.result);
    //   }
    //   fileReader.readAsText(file);
    // }
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
        this.detectWallet(this.idata, "1");
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
    try {
      File.coin_type = Number(type)
      var data = {
        coins: [
          File
        ]
      }
      let detection: any = await this.raida.detect(data);
      console.log(detection, "response");
      if (detection.status == 'success') {
        this.successInfo = true;
        this.errorInfo = false;
        let taskId = detection.payload
        // console.log("sn value:" + this.payload.data['Sn'])
        // console.log("ans value:" + this.payload.data['Ans'])
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

  async doCheck1(taskID: any, xdata: any) {
    let task: any = await this.raida.doCheck(taskID);
    //console.log(taskID)
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.getSky();
          this.showLoading(false);
          var newArr: any[];
          newArr = this.allSky;
          newArr.push({
            'balance': 0,
            'contents': [],
            'denominations': { 1: 0, 5: 0, 25: 0, 100: 0, 250: 0 },
            'idcoin': {},
            'name': this.user,
            'png': "",
            'statements': null
          })
          this.eventService.changeskydata(newArr);
          this.storage.setItem("wallet", "skywallet", 'createsky');
          this.showLoading(false);
          this.successInfo = true;
          this.errorInfo = false;
          //console.log("payload.data:" + task.payload.data)
          // var findsky = task.payload.data.filter(x => {
          //   return x.name == this.user;
          // })
          // console.log("findsky[0].idcoin?.sn" + findsky[0].idcoin?.sn)
          //localStorage.setItem('serial', findsky[0].idcoin?.sn);
          this.router.navigate(['/skywallet/completed']);
        }
        else {
          this.showLoading(false);
          this.showDownload = false;
          this.errorInfo = false;
          this.successInfo = false;
          Swal.fire({
            title: this.payload.data.message,
            icon: 'error',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) {
              {
                if (this.payload.data?.message === "This name already has DNS name") {
                  this.router.navigate(["/skywallet/create-address"]);
                }
              }
            }
          });
        }
        return;
      }
      setTimeout(() => {
        this.doCheck1(taskID, xdata)
      }, 500)
    }
    else {
      this.errorInfo = true;
      this.successInfo = false;
      this.errorMsg = "Call Failed";
    }
  }
  async getSky() {
    try {
      let response: any = await this.raida.getAllSky();
      if (response.status == "success") {
        this.doCheck123(response.payload?.id, (data: any) => {
        })
      }
    }
    catch (e) {
      console.log(e);
    }
  }
  async doCheck123(taskID: any, xdata: any) {
    let task: any = await this.raida.doCheck(taskID);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.eventService.changeskydata(task?.payload?.data);
          localStorage.setItem('userSky', this.user);
          var findsky = task.payload.data.filter(x => {
            return x.name == this.user;
          })
          console.log("findsky[0].idcoin?.sn" + findsky[0].idcoin?.sn)
          localStorage.setItem('serial', findsky[0].idcoin?.sn);
        }
        return;
      }
      setTimeout(() => {
        this.doCheck123(taskID, xdata)
      }, 500)
    }
  }
  async doCheck(taskID: any, xdata: any) {
    let task: any = await this.raida.doCheck(taskID);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.idata = {
            sn: this.payload.data['Sn'],
            ans: this.payload.data['Ans']
          };
          // console.log("sn value:" + this.payload.data['Sn'])
          // console.log("ans value:" + this.payload.data['Ans'])
          this.detectWallet(this.idata, "0");
          // this.createSky(data);
          // this.createSky(this.cloudcoin?.coins[0]);
          this.successInfo = true;
          this.errorInfo = false;
          this.successMsg = "Done: Pass Key downloaded successfully!";
        }
        else {
          this.showDownload = false;
          this.errorInfo = true;
          this.successInfo = false;
          this.errorMsg = this.payload.data.message;
        }
        return;
      }
      // this.successInfo = true;
      // this.successMsg = "Doing.... Task ID " + taskID + ", Progress " + this.payload.progress + "%";
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

  async doCheckcoin(taskID: any, xdata: any) {
    let task: any = await this.raida.doCheck(taskID);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          if (this.payload?.data?.counterfeit === 0 && this.payload?.data?.fracked === 0 && this.payload?.data?.limbo === 0) {
            this.successInfo = true;
            this.errorInfo = false;
            this.continue = true;
            this.successMsg = "Done: Detected Pass Key is healthy!";
          } else {
            this.successInfo = false;
            this.isDownload = false;
            Swal.fire({
              title: "Pass Key is not authentic. Please upload or generate another keykard",
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
      // this.successInfo = true;
      // this.successMsg = "Doing.... Task ID " + taskID + ", Progress " + this.payload.progress + "%";
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

  async download() {
    try {
      let response: any = await this.raida.freeCoin();
      if (response.status == 'success') {
        this.showDownload = true;
        this.doCheck(response.payload?.id, (data: any) => {
          this.successInfo = true;
          this.successMsg = "Done " + JSON.stringify(data)
        })
      }
      console.log(response);
    }
    catch (e) {
      console.log(e);
    }
  }

  async createSky() {
    try {
      let idata = {
        name: this.user,
        type: "card",
        coin: this.idata
      }
      let wallet: any = await this.raida.createSky(idata);
      console.log(wallet, "response");
      // console.log("name:" + this.user)
      // console.log("coin:" + JSON.stringify(idata.coin))
      // console.log("coin:" + JSON.stringify(this.idata))
      if (wallet.status == 'success') {
        this.showLoading(true);
        this.successInfo = true;
        this.errorInfo = false;
        this.doCheck1(wallet.payload?.id, (idata: any) => {
          this.successInfo = true;
          this.successMsg = "Done " + JSON.stringify(idata)
        })

      }
      else {
        this.errorInfo = true;
        this.successInfo = false;
        this.errorMsg = "Error!! " + wallet.payload.message;
      }
    }
    catch (e) {
      this.errorInfo = true;
      this.successInfo = false;
      this.errorMsg = "Create Wallet Failed";
    }
  }

}
