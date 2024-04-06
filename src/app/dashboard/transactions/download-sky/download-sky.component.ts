import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-download-sky',
  templateUrl: './download-sky.component.html',
  styleUrls: ['./download-sky.component.scss']
})
export class DownloadSkyComponent implements OnInit {

  userSky: string;
  skywallet: any;
  username: any;
  selectedFile: any;
  transactionSky: any;
  selectedData: any;
  imageWidth: any = 100;
  imageHeight: any = 100;
  pngCheck: boolean = true;
  afterClick: boolean = false;
  transSky: any;
  public amount: any = 0;
  errorMessage: string = null;
  options: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/cloud_download.json'
  };
  errorOptions: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/error.json'
  };
  showLoader = false;
  showNormal = true;
  showError = false;
  upload
  uploadFiles: any;
  title: null;
  payload: any;
  successMsg: string;
  raidaCheck: boolean;
  serversList: string;
  errorInfo: boolean;
  successInfo: boolean;
  errorMsg: string;
  exportForm: FormGroup;
  transaction: any = [];
  localUrl: any;
  product: any;
  filePath: any;
  loadingMessage: string;
  blob: any;
  export: boolean = false;
  customSelectorOpenThree: boolean = false;
  cSelectorTextThree: string = 'Select a wallet';
  cSelectorImgThree: string = '';
  all: any;
  fixProg: any;
  goTODash: boolean = false;
  constructor(private auth: LoginService,
    private storage: EventService,
    private router: Router,
    private fb: FormBuilder,
    private api: ApiService) {
    if (localStorage.getItem('skywallet')) {
      this.skywallet = localStorage.getItem('skywallet');
      this.username = (localStorage.getItem('skywallet')).split(".", 1)[0];
    }
    this.exportForm = this.fb.group({
      amount: ['', [Validators.required, Validators.pattern('[0-9]')]],
      tag: ['', Validators.maxLength(64)]
    });
  }

  ngOnInit(): void {
    this.userSky = localStorage.getItem('userSky');
    this.storage.changeLocal.subscribe
      (message => {
        if (message.length == 0) {
          this.getAllwallet();
        } else {
          this.all = message;
          if (this.all?.length == 1) {
            this.export = true;
            this.cSelectorTextThree = this.all[0].name;
            this.cSelectorImgThree = 'assets/folder-w-border.svg';
          }
        }
      });
  }
  isValidInput(value: any) {
    return this.exportForm.controls[value].invalid &&
      (this.exportForm.controls[value].dirty || this.exportForm.controls[value].touched);
  }
  _keyUp(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  async getAllwallet() {
    try {
      let response: any;
      response = await this.api.getWallet();
      if (response.status == 'success') {
        this.all = response.payload;
        this.storage.changeLocaldata(this.all);
        if (this.all?.length == 1) {
          this.export = true;
          this.cSelectorTextThree = this.all[0].name;
          this.cSelectorImgThree = 'assets/folder-w-border.svg';
        }
      }
    }
    catch (e) {
      console.log(e);
    }
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


  handleFileInput(files) {
    this.uploadFiles = files;
  }

  customSelTogglerThree() {
    this.customSelectorOpenThree = !this.customSelectorOpenThree;
  }
  closeDropdown() {
    this.customSelectorOpenThree = false;
  }

  customSelectorThree(name, type) {
    this.export = true;
    this.customSelectorOpenThree = false;
    this.cSelectorTextThree = name;
    this.cSelectorImgThree = 'assets/folder-w-border.svg';
  }


  async doCheck(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    console.log("Task done: ", task);

    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.afterClick = true;
          this.showLoading(false);
          // this.getTransaction();
          // let currentUrl = this.router.url;
          // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          // this.router.onSameUrlNavigation = 'reload';
          // this.router.navigate([currentUrl]);
          this.storage.setItem("wallet", "skywallet", "withdraw");
          const newArr = this.all.map(obj => {
            if (obj.name === this.cSelectorTextThree) {
              return { ...obj, balance: obj.balance + Number(this.exportForm.get('amount').value) };
            }
            return obj;
          });
          this.storage.changeLocaldata(newArr);
          this.router.navigate(["/dashboard/home"]);
          Swal.fire({
            title: "You have withdrawn " + this.payload?.data?.TotalCoins + " CC to " + this.cSelectorTextThree,
            icon: 'success',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) { { } }
          });
          // this.getSky();
        } else {
          this.showLoading(false);
          Swal.fire({
            title: this.payload.data.message,
            icon: 'warning',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) { }
          });
        }
        let data = this.payload.data;
        this.successMsg = "Done: " + data.message;
        let h = "";
        this.raidaCheck = true;
        this.serversList = h;
        this.errorInfo = false;
        return;
      }
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

  go() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
    this.router.navigate(["/dashboard/home"]);
  }

  async withdraw() {
    if (this.export == true) {
      try {
        var exportData = {
          srcname: this.userSky,
          dstname: this.cSelectorTextThree,
          amount: Number(this.exportForm.get('amount').value),
          tag: this.exportForm.get('tag').value
        }
        let response: any = await this.api.withdraw(exportData);
        if (response.status == 'error') {
          Swal.fire({
            title: response.payload.message,
            icon: 'warning',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) { }
          });
        }
        else {
          this.showLoading(true);
          this.loadingMessage = "Withdrawing CC...";
          try {
            var data = {
              name: this.cSelectorTextThree
            }
            let response1: any = await this.api.fix(data);
            if (response1.status === "success") {
              this.doCheckFix(response1.payload?.id, (data: any) => { })
            }
          }
          catch (e) {
            console.log(e);
          }
          this.doCheck(response.payload?.id, (data: any) => {
            this.successInfo = true;
            this.successMsg = "Done " + JSON.stringify(data);
          })
        }
      }
      catch (e) {
      }
    }
  }
  async doCheckFix(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    console.log("Task done: ", task);
    if (task) {
      this.payload = task.payload;
      this.fixProg = this.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.goTODash = true;
        } else {
          this.goTODash = true;
          Swal.fire({
            title: this.payload.data.message,
            icon: 'error',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) { { } }
          });
        }
        return;
      }
      setTimeout(() => {
        this.doCheckFix(taskID, xdata)
      }, 500)
    }
  }
  async getTransaction() {
    var data = this.cSelectorTextThree;
    try {
      let response: any = await this.api.getTransaction(data);
      this.transaction = response;
    }
    catch (e) {
      console.log(e);
      this.errorInfo = true;
      this.errorMsg = "Failed";
    }
  }

  async getSky() {
    try {
      let response: any = await this.api.getAllSky();
      if (response.status == "success") {
        this.showLoading(true);
        this.loadingMessage = "Fetching balance..."
        this.doCheck1(response.payload?.id, (data: any) => {
          // this.successInfo = true;
          // this.successMsg  ="Done " + JSON.stringify(data)
        })
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async doCheck1(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    if (task) {
      if (task.payload.status == "error" || task.payload.status == "completed") {
        if (task.payload.status == "completed") {
          for (let i = 0; i < task.payload.data.length; i++) {
            if (task.payload.data[i].name === this.userSky) {
              this.transSky = task.payload.data[i].balance;
            }
          }
          this.showLoading(false);
        } else {
          this.showLoading(false);
          Swal.fire({
            title: task.payload.data.message,
            icon: 'warning',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) { }
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
}
