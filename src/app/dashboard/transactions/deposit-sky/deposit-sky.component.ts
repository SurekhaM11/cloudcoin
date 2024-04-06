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
  selector: 'app-deposit-sky',
  templateUrl: './deposit-sky.component.html',
  styleUrls: ['./deposit-sky.component.scss'],
})
export class DepositSkyComponent implements OnInit {

  userSky: any;
  skywallet: any;
  username: any;
  selectedFile: any;
  selectedData: any;
  imageWidth: any = 100;
  imageHeight: any = 100;
  pngCheck: boolean = true;
  afterClick: boolean = false;
  public amount: any = 0;
  loadingMessage: string;
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
  tag: string;
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
  transSky: any;
  product: any;
  filePath: any;
  type: string;
  userLocal: string;
  blob: any;
  export: boolean = false;
  customSelectorOpenThree: boolean = false;
  cSelectorTextThree: string = 'Select a wallet';
  cSelectorImgThree: string = '';
  all: any;
  skyName: string;
  name: any;
  filteredOptions: any;
  cSelectorImgSky: string;
  cSelectorTextSky: string;
  customSelectorOpenSky: boolean;
  skyAll: any;


  constructor(private auth: LoginService,
    private router: Router,
    private event: EventService,
    private fb: FormBuilder,
    private api: ApiService) {
    this.cSelectorImgSky = 'assets/search-w-border.svg';
    if (localStorage.getItem('skywallet')) {
      this.skywallet = localStorage.getItem('skywallet');
      this.username = (localStorage.getItem('skywallet')).split(".", 1)[0];
    }
    this.exportForm = this.fb.group({
      // skyName: [''],
      amount: ['', [Validators.required, Validators.pattern('^(500000|[1-5]?[0-9]?[0-9]?[0-9]?[0-9]?[0-9]?)$')]],
      tag: ['', Validators.maxLength(64)]
    })
    // this.exportForm.get('skyName').valueChanges.subscribe(response => {
    //   this.filterData(response);
    // })
  }

  ngOnInit(): void {
    this.userSky = localStorage.getItem('userSky');
    this.type = localStorage.getItem("wallet");
    this.userLocal = localStorage.getItem("userLocal");
    this.event.changeLocal.subscribe
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
    this.getSky();
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
        this.event.changeLocaldata(this.all);
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
      // this.event.changeMessage(this.showLoader);
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

  async customSelTogglerThree() {
    try {
      let response: any = await this.api.pastrecord();
      if (response.status === "success") {
        this.name = [...new Set(response?.payload?.names)];
        this.name.sort();
        this.filteredOptions = this.name
        this.customSelectorOpenThree = !this.customSelectorOpenThree;

      }
    }
    catch (e) {
      console.log(e);
    }

  }

  closeDropdown() {
    this.customSelectorOpenThree = false;
  }
  filterData(enteredData) {
    this.filteredOptions = this.name.filter((item) => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }
  customSelectorThree(name, type) {
    this.export = true;
    this.cSelectorTextThree = name;
    this.customSelectorOpenThree = false;
    if (type === 'local') {
      this.cSelectorImgThree = 'assets/folder-w-border.svg';
    } else {
      this.exportForm.get('skyName').patchValue(name);
    }
  }
  async getSky() {
    try {
      let response: any = await this.api.getList();
      if (response.status == "success") {
        this.skyAll = response.payload;
        // var index = this.skyAll.findIndex(x =>
        //   x.name === this.userSky
        // );
        //this.skyAll.splice(index, 1);
        // this.cSelectorTextSky = this.skyAll[0].name;
        // if (this.skyAll?.length == 1) {
        this.export = true;
        this.cSelectorTextSky = this.skyAll[0].name;
        this.cSelectorImgSky = 'assets/cloud-transfer.svg';
        this.customSelectorOpenSky = false;
      }
      else {
        this.skyAll = ['Failed to load data'];
      }
    }
    catch (e) {
      console.log(e);
    }
  }
  customSelector(val: string) {
    this.export = true;
    this.cSelectorImgSky = 'assets/cloud-transfer.svg';
    this.cSelectorTextSky = val;
    console.log(this.cSelectorTextSky)
    this.customSelectorOpenSky = false;
  }
  customSelToggler() {
    this.customSelectorOpenSky = !this.customSelectorOpenSky;
  }
  closeDropdownSky() {
    this.customSelectorOpenSky = false;
  }

  async doCheck(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          //console.log("taskId:" +taskID)
          //console.log("coin:"+ this.payload.data.TotalCounterfeit)
          // this.afterClick = true;
          this.showLoading(false);
          // this.getTransaction();
          // let currentUrl = this.router.url;
          // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          // this.router.onSameUrlNavigation = 'reload';
          // this.router.navigate([currentUrl]);
          if (this.type === 'skywallet') {
            this.event.setItem("wallet", "skywallet", "deposit");
          } else {
            this.event.setItem("wallet", "localwallet", "deposit");
          }
          this.getAllwallet();
          this.afterClick = true;
          //this.router.navigate(["/dashboard/home"]);
          if (this.type === 'skywallet') {
            this.afterClick = false;
            Swal.fire({
              title: "You have deposited " + this.payload?.data?.TotalCoins + " CC from " + this.cSelectorTextThree,
              icon: 'success',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) { { } }
            });
            this.router.navigate(['/dashboard/home']);

            if (this.payload?.data?.TotalCounterfeit > 0 && this.payload?.data?.TotalAuthentic > 0) {
              this.afterClick = true;
            }
            else if (this.payload?.data?.TotalCounterfeit > 0 && this.payload?.data?.TotalAuthentic == 0) {
              this.afterClick = false;
              Swal.fire({
                title: "Could not Transfer. All coins were counterfeit",
                icon: 'error',
                confirmButtonText: 'Okay',
              });
              this.router.navigate(['/dashboard/home']);
            }
          }

          else if (this.type == 'localwallet') {
            this.afterClick = false;
            Swal.fire({
              title: "You have sent " + this.payload?.data?.TotalCoins + " CC to " + this.cSelectorTextSky,
              icon: 'success',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) { { } }
            });
            this.router.navigate(['dashboard/home']);
          }
        } else {
          this.afterClick = false;
          this.showLoading(false);
          Swal.fire({
            title: this.payload.data.message,
            icon: 'warning',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) { }
          });
          this.router.navigate(['dashboard/home']);
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

  go() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
    this.router.navigate(["/dashboard/home"]);
  }

  async getName(e: any) {
    if (e !== "") {
      this.export = true;
      this.exportForm.get('skyName').patchValue(e);
    }
  }

  async deposit() {
    if (this.export == true) {
      try {
        if (this.type === "skywallet") {
          var exportData = {
            name: this.cSelectorTextThree,
            to: Number(localStorage.getItem('serial')),
            amount: Number(this.exportForm.get('amount')!.value),
            tag: this.exportForm.get('tag').value
          }
          var response: any = await this.api.deposit(exportData);
          this.loadingMessage = "Depositing CC...";
        } else {
          var exportData1 = {
            name: this.userLocal,
            toName: this.cSelectorTextSky,
            amount: Number(this.exportForm.get('amount')!.value),
            tag: this.exportForm.get('tag')!.value
          }
          var response: any = await this.api.deposit(exportData1);
          this.loadingMessage = "Sending CC...";
        }
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
          this.doCheck(response.payload?.id, (data: any) => {
            this.successInfo = true;
            this.successMsg = "Done " + JSON.stringify(data);
          })
        }
      }
      catch (e) {
        console.log(e);
      }
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

  // async getSky() {
  //   try {
  //     let response: any = await this.api.getAllSky();
  //     if (response.status == "success") {
  //       this.showLoading(true);
  //       this.loadingMessage = "Fetching balance..."
  //       this.doCheck1(response.payload?.id, (data: any) => {
  //       })
  //     }
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }
  // }

}
