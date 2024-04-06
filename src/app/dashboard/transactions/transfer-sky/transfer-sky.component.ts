import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-transfer-sky',
  templateUrl: './transfer-sky.component.html',
  styleUrls: ['./transfer-sky.component.scss'],
})

export class TransferSkyComponent implements OnInit {

  public amount = 0;
  public memo: string = null;
  public to: string = null;
  errorMessage: string = null;
  customSelectorOpenSky: boolean = false;
  loadingOptions: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/cloud_loading.json'
  };
  options: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/cloud_transfer.json'
  };
  errorOptions: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/error.json'
  };
  showLoader = false;
  balanceLoader = false;
  showNormal = true;
  showError = false;
  complete = false;
  public balance = 0;
  public balanceString = '0';
  balanceBreakup: string = null;
  opinions = 0;
  public balances: any = {};
  loadingMessage = '';
  skyAll: any;

  public cSelectorImg: string;
  public cSelectorText: string;
  public customSelectorOpen: boolean;
  transaction: any;
  errorInfo: boolean;
  errorMsg: string;
  all: any;
  tag: any;
  destName: string;
  transferForm: FormGroup;
  successInfo: boolean;
  successMsg: string;
  payload: any;
  afterClick: boolean;
  raidaCheck: boolean;
  serversList: string;
  cSelectorImgSky: string;
  cSelectorTextSky: string;
  userSky: string;
  radioButton: boolean;
  record: any[] = [];
  transSky: any;
  id: any;
  userDetail: any[] = [];
  skySerial: any;
  newskyarray: any[] = [];
  userLocal: any;
  filteredOptions: any;

  constructor(private auth: LoginService,
    private storage: EventService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService) {
    this.cSelectorImg = 'assets/search-w-border.svg';
    this.cSelectorText = 'Search wallets';
    this.cSelectorImgSky = 'assets/search-w-border.svg';
    this.cSelectorTextSky = 'Select a SkyVault';
    this.customSelectorOpen = false;
    this.transferForm = this.fb.group({
      amount: ['', Validators.required],
      tag: ['', Validators.maxLength(64)],
      anotherSky: ['']
    })
    this.transferForm.get('anotherSky').valueChanges.subscribe(response => {
      this.filterData(response);
    })

  }
  @ViewChild('autofocus') autoFocusField: ElementRef;
  ngAfterViewInit(): void {
    if (this.autoFocusField)
      this.autoFocusField.nativeElement.focus();
  }
  ngOnInit(): void {
    this.userSky = localStorage.getItem('userSky');
    this.userLocal = localStorage.getItem("userLocal");
    this.route.queryParams
      .subscribe(params => {
        this.id = params.id
      });
    if (this.id == 1) {
      this.getSky();
    }
    this.storage.changeSky.subscribe
      (message => {
        this.newskyarray = message;
      });
  }

  async pastrecord() {
    // try{
    //   let response : any = this.api.pastrecord()
    //   if(response.status === "success"){
    //     this.userDetail = response?.payload?.names;
    //   }
    // }
    // catch(e){
    //   console.log(e);
    // }
  }
  isValidInput(value: any) {
    return this.transferForm.controls[value].invalid &&
      (this.transferForm.controls[value].dirty || this.transferForm.controls[value].touched);
  }
  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  showLoading(state): void {
    if (state) {
      this.showNormal = false;
      this.showLoader = true;
      this.showError = false;
      this.balanceLoader = false;
    }
    else {
      this.showNormal = true;
      this.showLoader = false;
      this.showError = false;
      this.balanceLoader = false;
      const that = this;
      setTimeout(() => {
        if (this.autoFocusField) {
          this.autoFocusField.nativeElement.focus();
        }
      }, 100);
    }
  }

  showLoadingBalance(state): void {
    if (state) {
      this.showNormal = false;
      this.showLoader = false;
      this.showError = false;
      this.balanceLoader = true;
    } else {
      this.showNormal = true;
      this.showLoader = false;
      this.showError = false;
      this.balanceLoader = false;
      setTimeout(() => {
        if (this.autoFocusField) {
          this.autoFocusField.nativeElement.focus();
        }
      }, 100);
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

  customSelector(id: any, val: string, type: string) {
    if (type === 'sky') {
      this.cSelectorImgSky = 'assets/cloud-transfer.svg';
      this.cSelectorTextSky = val;
      this.skySerial = id;
      this.customSelectorOpenSky = false;
    } else {
      this.customSelectorOpen = false;
      this.transferForm.get('anotherSky').patchValue(val);
    }

  }
  filterData(enteredData) {
    this.filteredOptions = this.userDetail.filter((item) => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }

  async removeDrop(e: any) {
    if (e != "") {
      this.cSelectorTextSky = e;
      var index = this.userDetail.findIndex(x =>
        x == e
      );
      if (index < 1) {
        this.customSelectorOpen = !this.customSelectorOpen;
      }
      // try {
      //   let response: any = await this.api.pastrecord();
      //   if (response.status === "success") {
      //     this.userDetail = [...new Set(response?.payload?.names)];
      //   }
      // }
      // catch (e) {
      //   console.log(e);
      // }
    }
  }

  async customSelToggler(val: string) {
    if (val == 'sky') {
      this.customSelectorOpenSky = !this.customSelectorOpenSky;
    } else {
      try {
        let response: any = await this.api.pastrecord();
        if (response.status === "success") {
          // this.userDetail = response?.payload?.names;
          // for (let i = 0; i < this.newskyarray?.length; i++) {
          //   var index1 = this.userDetail.findIndex(x =>
          //     x == this.newskyarray[i].name
          //   );
          //   this.userDetail.splice(index1, 1);
          this.userDetail = [...new Set(response?.payload?.names)]
          this.userDetail.sort();
          this.filteredOptions = this.userDetail;
          console.log(this.userDetail);

          //}
          // var index = this.userDetail.findIndex(x =>
          //   x == this.userSky
          // );
          // this.userDetail = [...new Set(response?.payload?.names)];
          this.customSelectorOpen = !this.customSelectorOpen;
          // this.userDetail.splice(index, 1);
        }
      }
      catch (e) {
        console.log(e);
      }
    }
  }
  closeDropdown() {
    this.customSelectorOpenSky = false;
    this.customSelectorOpen = false;
  }
  changRadio(e: any) {
    // if (e.target.value == "other") {
    //   this.radioButton = false;
    //   this.cSelectorImgSky = 'assets/search-w-border.svg';
    //   this.cSelectorTextSky = 'Search wallets';
    //   this.customSelectorOpenSky = false;
    //   this.transferForm.get('anotherSky').enable();
    // } else {
    //   this.radioButton = true;
    //   this.customSelectorOpen = false;
    //   this.transferForm.get('anotherSky').patchValue('');
    //   this.transferForm.get('anotherSky').disable();
    // }
  }

  async getSky() {

    try {
      let response: any = await this.api.getList();
      if (response.status == "success") {
        this.skyAll = response.payload;
        var index = this.skyAll.findIndex(x =>
          x.name === this.userSky
        );
        this.skyAll.splice(index, 1);
        if (this.skyAll?.length == 1) {
          this.cSelectorTextSky = this.skyAll[0].name;
          this.skySerial = this.skyAll[0].idcoin?.sn;
          this.cSelectorImgSky = 'assets/cloud-transfer.svg';
        }
      }
      else {
        this.skyAll = ['Failed to load data'];
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  _keyUp(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  async transferCoin() {
    if (this.transferForm.valid) {
      try {
        if (this.id == 1) {
          const data = {
            srcname: this.userSky,
            to: this.skySerial,
            amount: Number(this.transferForm.get('amount').value),
            tag: this.transferForm.get('tag').value
          }
          let response: any = await this.api.transfersky(data);
          if (response.status == 'error') {
            Swal.fire({
              title: 'Validation Error. Amount cannot be blank or zero.',
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
          // } else if ( this.id == 2 || this.id == 3) {
          //    if (this.transferForm.get('anotherSky').value.startsWith('cloudcoin')) {
          //     const data = {
          //       toname: this.transferForm.get('anotherSky').value,
          //       name: localStorage.getItem('userLocal'),
          //       amount: Number(this.transferForm.get('amount').value),
          //       tag: this.transferForm.get('tag').value
          //     }
          //     let response: any = await this.api.pay(data);
          //     if (response.status == 'error') {
          //       Swal.fire({
          //         title: response.payload.message,
          //         icon: 'warning',
          //         confirmButtonText: 'Okay',
          //       }).then((result) => {
          //         if (result.value) { }
          //       });
          //     }
          //     else {
          //       this.showLoading(true);
          //       this.doCheck(response.payload?.id, (data: any) => {
          //         this.successInfo = true;
          //         this.successMsg = "Done " + JSON.stringify(data);
          //       })
          //     }
        } else if (this.id == 2) {
          if (this.transferForm.get('anotherSky').value.startsWith('cloudcoin')) {

            Swal.fire({
              title: "You can't send CC to this address",
              icon: 'warning',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) { }
            });
          } else {
            const data = {
              srcname: this.userSky,
              dstname: this.transferForm.get('anotherSky').value,
              amount: Number(this.transferForm.get('amount').value),
              tag: this.transferForm.get('tag').value
            }
            let response: any = await this.api.transfersky(data);
            if (response.status == 'error') {
              Swal.fire({
                title: 'Validation Error. Amount cannot be blank or zero.',
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

        }

        else if (this.id == 4) {
          if (this.transferForm.get('anotherSky').value.startsWith('cloudcoin')) {
            const data = {
              srcname: this.userSky,
              dstname: this.transferForm.get('anotherSky').value,
              amount: Number(this.transferForm.get('amount').value),
              tag: this.transferForm.get('tag').value
            }
            let response: any = await this.api.skypay(data);
            if (response.status == 'error') {
              Swal.fire({
                title: 'Validation Error. Amount cannot be blank or zero.',
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
          } else {
            Swal.fire({
              title: "You can't send CC to this address",
              icon: 'warning',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) { }
            });
          }
          // else {
          //   const data = {
          //     srcname: this.userSky,
          //     dstname: this.transferForm.get('anotherSky').value,
          //     amount: Number(this.transferForm.get('amount').value),
          //     tag: this.transferForm.get('tag').value
          //   }
          //   let response: any = await this.api.transfersky(data);
          //   if (response.status == 'error') {
          //     Swal.fire({
          //       title: ' Validation Error. Amount cannot be blank or zero.' ,
          //       icon: 'warning',
          //       confirmButtonText: 'Okay',
          //     }).then((result) => {
          //       if (result.value) { }
          //     });
          //   }
          //   else {
          //     this.showLoading(true);
          //     this.doCheck(response.payload?.id, (data: any) => {
          //       this.successInfo = true;
          //       this.successMsg = "Done " + JSON.stringify(data);
          //     })
          //   }
          // }

        }
      }

      catch (e) {
        console.log(e);
      }
    }
  }



  async doCheck(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    console.log("Task done: ", task);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.showLoading(false);
          this.storage.setItem("wallet", "skywallet", "skytransfer");
          // let currentUrl = this.router.url;
          // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          // this.router.onSameUrlNavigation = 'reload';
          // this.router.navigate([currentUrl]);
          if (this.id == 1) {
            const newArr = this.newskyarray.map(obj => {
              if (obj.name == this.cSelectorTextSky) {
                return { ...obj, balance: obj.balance + Number(this.transferForm.get('amount').value) };
              }
              return obj;
            });
            this.storage.changeskydata(newArr);

            this.router.navigate(["/dashboard/home"]);
            Swal.fire({
              title: "You have transferred " + this.payload?.data?.TotalCoins + " CC to " + this.cSelectorTextSky,
              icon: 'success',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) { { } }
            });
          } else if (this.id == 2) {
            Swal.fire({
              title: "You have transferred " + this.payload?.data?.TotalCoins + " CC to " + this.transferForm.get('anotherSky').value,
              icon: 'success',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) { { } }
            });
            this.router.navigate(['dashboard/home']);
          } else if (this.id == 4) {
            Swal.fire({
              title: "You have transferred " + this.payload?.data?.TotalCoins + " CC to " + this.transferForm.get('anotherSky').value + " " + " and " + " " + this.transferForm.get('anotherSky').value + " " + "has been notified",
              icon: 'success',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) { { } }
            });
            this.router.navigate(['dashboard/home']);
          }
          // this.afterClick = true;
          // this.getSky();
        } else {
          this.showLoading(false);
          Swal.fire({
            title: this.payload.data.message,
            icon: 'warning',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) { { } }
          });
        }
        return;
      }
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
    console.log("Task done: ", task);

    if (task) {
      if (task.payload.status == "error" || task.payload.status == "completed") {
        if (task.payload.status == "completed") {
          this.skyAll = task.payload.data;
          for (let i = 0; i < this.skyAll.length; i++) {
            if (this.skyAll[i].name == this.userSky) {
              this.transSky = this.skyAll[i].balance
            }
          }
        } else {
          Swal.fire({
            title: task.payload.data.message,
            icon: 'warning',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) { { } }
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

}
