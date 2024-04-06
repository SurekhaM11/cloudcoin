import { HttpParams } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})

export class UploadComponent implements OnInit {

  dragDropConfig = {
    showList: true,
    showProgress: true
  }

  userLocal: string;
  successInfo: boolean;
  receiptdetails: any;
  errorInfo: boolean;
  payload: any;
  taskId: any;
  successMsg: string;
  errorMsg: string;
  raidaCheck: boolean;
  iscounterfeit: boolean = false;
  serversList: string;
  loadingMessage: string;
  showNormal: boolean;
  showLoader: boolean;
  showError: boolean;
  dateTime: any;
  afterClick: boolean = false;
  showreceipt: boolean = false;
  file: any = [];
  baseAdd: any = [];
  btn: boolean = true;
  transaction: any = [];
  files: any[] = [];
  base: any = [];
  type: string;
  tag: any;
  frackedDetail: any;
  isFracked: boolean;
  totalimport: any;
  counterfeitCoin: any;
  delButton: boolean = false;
  fileData: any;
  coinsInfo: any = '';

  remarkInvalid: boolean
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;

  options: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/cloud_loading.json'
  };
  errorOptions: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/error.json'
  };

  constructor(
    private api: ApiService,
    private router: Router,
    private storage: EventService
  ) { }

  ngOnInit(): void {
    this.userLocal = localStorage.getItem('userLocal');
    this.type = localStorage.getItem('wallet');
    // this.getTransaction();
  }

  async getTransaction() {
    var data = localStorage.getItem('userLocal');
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

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  showLoading(state): void {
    this.loadingMessage = '';
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
  async doCheck(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    //console.log("Task done: ", taskID);

    if (task) {
      this.payload = task.payload;
      this.totalimport = this.payload.data?.pown_results?.total;
      //console.log("payload.status:"+ this.payload.status)
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.afterClick = true;
          this.dateTime = new Date();
          this.storage.setItem("wallet", "localwallet", 'upload');
          //console.log("in docheck, after click value:"+ this.afterClick)
          // let currentUrl = this.router.url;
          // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          // this.router.onSameUrlNavigation = 'reload';
          // this.router.navigate([currentUrl]);
          // this.getTransaction();
          // if (this.payload.data.limbo != 0) {
          //   Swal.fire({
          //     title: 'Contact was lost with the RAIDA during your request due to loss of internet connectivity. It is unknown if the coin passwords have been changed. This can be fixed once a solid internet connection is restored.',
          //     icon: 'warning',
          //     confirmButtonText: 'Okay',
          //   }).then((result) => {
          //     if (result.value) { { } }
          //   });
          // }
          // else if (this.payload.data.counterfeit != 0) {
          //   this.counterfeitCoin = this.payload.data.coins.filter(x=>{
          //     return x.result === "Counterfeit";
          //   })
          //   this.iscounterfeit = true;
          //   Swal.fire({
          //     title: this.payload.data.counterfeit + ' Counterfeit CC found!',
          //     icon: 'info',
          //     confirmButtonText: 'Okay',
          //   }).then((result) => {
          //     if (result.value) { { } }
          //   });
          // }
          if (this.payload?.data?.pown_results?.fracked != 0) {
            let data = {
              name: this.userLocal,
              pown_items: [{
                sn: this.payload.data.pown_results?.coins[0].sn,
                pownstring: this.payload.data?.pown_results?.coins[0].pownstring
              }],
              tickets: [this.payload.data?.pown_results?.tickets[0]]
            }
            this.fixfracked(data);
          }
        } else {
          this.afterClick = false;
          this.btn = true;
          this.successInfo = false;
          this.errorInfo = false;
          this.baseAdd = [];
          this.files = [];
          this.base = [];
          Swal.fire({
            // title: "Failure! could not proceed with the transaction. " + this.payload?.data?.message,
            title: 'The coins you attempted to import are not CloudCoins and not supported by this program. Please upgrade to a newer version',
            icon: 'error',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) { { } }
          });
        }
        this.successInfo = false;
        this.errorInfo = false;
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
      this.btn = true;
    }
  }

  // async getPath() {
  //   try {
  //     let response: any = await this.api.importFile();
  //     console.log(response);
  //     if (response.status == "success") {
  //       this.files = response?.payload?.items_picked;
  //       this.btn = false;
  // var name = <HTMLInputElement>document.getElementById('fileInput');
  // name.placeholder = "Selected " + response?.payload?.items_picked.length + " files";
  //     } else {
  //       Swal.fire({
  //         title: "Try again!",
  //         icon: 'error',
  //         confirmButtonText: 'Okay',
  //       }).then((result) => {
  //         if (result.value) { { } }
  //       });
  //     }
  //   }
  //   catch (e) {
  //     console.log(e);
  //     Swal.fire({
  //       title: "Try again!",
  //       icon: 'error',
  //       confirmButtonText: 'Okay',
  //     }).then((result) => {
  //       if (result.value) { { } }
  //     });
  //   }
  // }

  changRadio(e: any) {
    this.coinsInfo = e.target.value;
    this.files = [];
  }
  email: string;
  async getPath() {
    try {
      let response: any = await this.api.importFile();
      if (response.status == "success") {
        this.files = response?.payload?.items_picked;
        this.btn = false;
        for (let i = 0; i < this.files.length; i++) {
          var last = this.files[i].substring(this.files[i].lastIndexOf(".") + 1, this.files[i].length);
          switch (last) {
            case 'stack': {
              this.coinsInfo = 'old';
              Swal.fire({
                title: ' You are attempting to load Legacy CloudCoins into Coin Manager. These coins will be upgraded at the rate of 1 new CC for every 85.125 Legacy CC. Your share of the CC pie will remain the same but you will have fewer slices that are each 85.125 times larger. A maximum of 300K Legacy coins can be converted at one time. Do you wish to continue?',
                icon: 'info',
                confirmButtonText: 'Okay',
                showCancelButton: true,
                showConfirmButton: true,
                cancelButtonText: 'Cancel'
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const { value: email } = await Swal.fire({
                    title: 'Enter email address',
                    input: 'email',
                    inputLabel: 'Email',
                    inputPlaceholder: 'Email address'
                  })
                  this.email = email;
                  console.log("email is:" + this.email)
                } else {
                  this.router.navigate(['/dashboard/home'])
                }
              })

              break;
            }
            case 'png': {
              this.coinsInfo = 'new';
              break;
            }
            case 'bin': {
              this.coinsInfo = 'new';
              break;
            }
            default: {
              Swal.fire({
                title: "Please select files with bin or png extension.",
                icon: 'error',
                confirmButtonText: 'Okay',
              }).then((result) => {
                if (result.value) { { } }
              });
              break;
            }
          }
          console.log("number of files:" + this.files.length);
          if (this.files.length > 24000) {

            this.files = []
            Swal.fire({
              title: 'Too many files selected. Maximum number of files that can be selected per import is 24000',
              icon: 'error',
              confirmButtonText: 'Okay',


            })
          }
          // if (this.coinsInfo == 'new') {
          //   if (last == 'stack') {
          //     this.files = [];
          //     Swal.fire({
          //       title: "Please select only new coins to import.",
          //       icon: 'error',
          //       confirmButtonText: 'Okay',
          //     }).then((result) => {
          //       if (result.value) { { } }
          //     });
          //   }
          // }
          //  else if (this.coinsInfo == 'old') {
          //   if (last != 'stack') {
          //     this.files = [];
          //     Swal.fire({
          //       title: "Please select only old coins to import.",
          //       icon: 'error',
          //       confirmButtonText: 'Okay',
          //     }).then((result) => {
          //       if (result.value) { { } }
          //     });
          //   }
          // }
        }
        // var name = <HTMLInputElement>document.getElementById('fileInput');
        // name.placeholder = "Selected " + response?.payload?.items_picked.length + " files";
        // } else {
        //   Swal.fire({
        //     title: "Try again!",
        //     icon: 'error',
        //     confirmButtonText: 'Okay',
        //   }).then((result) => {
        //     if (result.value) { { } }
        //   });
      }
    }
    catch (e) {
      console.log(e);
    }
  }



  // Only AlphaNumeric with Some Characters [-_ ]
  keyPressAlphaNumericWithCharacters(event) {

    var inp = String.fromCharCode(event.keyCode);
    // Allow numbers, alpahbets, space, underscore
    if (/[a-zA-Z0-9-_ ]/.test(inp)) {

      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  // async importOld() {
  //   try {
  //     var toConvert: any[]
  //     for (let i = 0; i < this.files.length; i++) {
  //       toConvert.push({ 'type': 'file', 'data': this.files[i] })
  //     }
  //     var data = {
  //       name: this.userLocal,
  //       items: toConvert
  //     }
  //     let response: any = await this.api.convert(data);
  //     if (response.status == 'success') {
  //       this.showLoading(true);
  //       this.doConvert(response.payload?.id, (data: any) => {
  //         this.successInfo = true;
  //         this.successMsg = "Done " + JSON.stringify(data)
  //       });
  //     }
  //     console.log(response);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  getLength() {
    // alert("length")
    console.log("tag :" + this.tag.length)
    if (this.tag.length > 64) {
      this.remarkInvalid = true
      Swal.fire({
        title: "Remarks only allows for 64 character memo",
        icon: 'info',
        confirmButtonText: 'Okay'
      })
    }
    else {
      this.remarkInvalid = false
    }
  }
  async next() {
    // if (this.files[this.files.length - 1].progress == 100) {
    this.delButton = true;

    if (this.coinsInfo == 'new') {
      try {
        // for (let i = 0; i < this.baseAdd.length; i++) {
        //   this.base.push({ 'type': 'inline', 'data': this.baseAdd[i] })
        // }
        for (let i = 0; i < this.files?.length; i++) {
          this.base.push({ 'type': 'file', 'data': this.files[i] })
        }
        var data = {
          name: this.userLocal,
          tag: this.tag,
          items: this.base
        }
        let response: any = await this.api.import(data);
        if (response.status === "success") {
          this.btn = true;
          //this.afterClick = true ;
          //console.log("before loop:"+ this.afterClick)
          this.doCheck(response.payload?.id, (data: any) => {
            this.successInfo = true;
            this.successMsg = "Done " + JSON.stringify(data)
          });
        } else {
          if (response.payload.message == "Validation error. tag: must be in a valid format.") {
            Swal.fire({
              title: "Remark must be in valid format",
              icon: 'warning',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) { { } }
            });
          } else {
            Swal.fire({
              title: response.payload.message,
              icon: 'error',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) { { } }
            });
          }
        }
      }
      catch (e) {
        console.log(e);
      }
    } else if (this.coinsInfo == 'old') {

      try {
        console.log("the email is:" + this.email)
        console.log("old coins block:" + this.files.length)
        var toConvert: any = []
        for (let i = 0; i < this.files.length; i++) {
          toConvert.push({ 'type': 'file', 'data': this.files[i] })
        }
        var data1 = {
          name: this.userLocal,
          items: toConvert,
          email: this.email
        }
        console.log("Before insert data:" + data1.name)
        console.log("items:" + data1.items)
        console.log("email:" + data1.email)

        let response: any = await this.api.convert(data1);
        if (response.status == 'success') {
          console.log("message:" + response.payload?.data?.message)
          this.showLoading(true);
          this.loadingMessage = 'Importing Coins...'
          this.doConvert(response.payload?.id, (data: any) => {
            this.successInfo = true;
            this.successMsg = "Done " + JSON.stringify(data)
          });
        }
        //console.log("payload code:" + response.payload.code);
        else if (response.status == 'error') {
          if (response.payload.code == 4121) {
            Swal.fire({
              title: 'Please provide Email that exists',
              icon: 'error',
              confirmButtonText: 'Okay',
            }).then(async (result) => {
              if (result.isConfirmed) {
                const { value: email } = await Swal.fire({
                  title: 'Input email address',
                  input: 'email',
                  inputLabel: 'Please provide email address',
                  inputPlaceholder: 'Email address'
                })
                this.email = email;
              }

            });
          }
        }

      } catch (e) {
        console.log(e);
      }
    }

  }

  async fixfracked(data: any) {
    this.showLoading(true);
    this.loadingMessage = "Fixing fracked coin..."
    try {
      let response: any = await this.api.postFix(data);
      console.log(response);
      if (response.status === "success") {
        this.isFracked = true;
        this.doCheck1(response.payload?.id, (data: any) => {
          this.successInfo = true;
          this.successMsg = "Done " + JSON.stringify(data)
        })
      } else {
        this.showLoading(false);
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async doCheck1(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    //console.log("Task done: ", task);
    if (task) {
      // this.payload = task.payload;
      if (task.payload.status == "error" || task.payload.status == "completed") {
        this.showLoading(false);
        if (task.payload.status == "completed") {
          this.frackedDetail = task.payload.data;
          if (task.payload.data.total_errors != 0 || task.payload.data.total_skipped != 0) {
            this.showLoading(false);
            // Swal.fire({
            //   title: "Coin could not be fixed!",
            //   icon: 'info',
            //   confirmButtonText: 'Okay',
            // }).then((result) => {
            //   if (result.value) { { } }
            // });
          }
        } else {
          this.btn = true;
          this.showLoading(false);
          Swal.fire({
            title: "Failure! could not fix the coin.",
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
      this.btn = true;
    }
  }

  async doConvert(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    console.log("Task done: ", task);
    if (task) {
      this.payload = task.payload;
      if (task.payload.status == "error" || task.payload.status == "completed") {
        this.showLoading(false);
        if (task.payload.status == "completed") {
          this.btn = false;
          this.afterClick = true;
          this.dateTime = new Date();
          this.storage.setItem("wallet", "localwallet", 'upload');
        } else {
          this.btn = true;
          this.showLoading(false);
          this.files = [];
          Swal.fire({
            title: 'Failure to import!',
            text: 'Error code:' + ' ' + this.payload?.data?.code + '.' + ' ' + this.payload?.data?.message,
            icon: 'warning',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) { { } }
          });
        }
        return;
      }
      setTimeout(() => {
        this.doConvert(taskID, xdata)
      }, 500)
    }
    else {
      this.errorInfo = true;
      this.successInfo = false;
      this.errorMsg = "Call Failed";
      this.btn = true;
    }
  }

  go() {
    // let currentUrl = this.router.url;
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.router.onSameUrlNavigation = 'reload';
    // this.router.navigate([currentUrl]);
    // this.storage.setItem("wallet", "localwallet", "upload");
    // sessionStorage.setItem('trans', 'transaction');
    this.router.navigate(["/dashboard/home"]);
  }

  onFileDropped($event) {
    // this.prepareFilesList($event);
  }

  fileBrowseHandler(files) {
    console.log(files);

    // this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    // if (this.files[index].progress < 100) {
    //   Swal.fire({
    //     title: "Upload in progress",
    //     icon: 'warning',
    //     confirmButtonText: 'Okay',
    //   }).then((result) => {
    //     if (result.value) { { } }
    //   });
    //   return;
    // }
    this.files.splice(index, 1);
    // var name = <HTMLInputElement>document.getElementById('fileInput');
    // name.placeholder = "Selected " + this.files.length + " files";
    if (this.files.length == 0) {
      this.btn = true;
      this.successInfo = false;
      this.errorInfo = false;
    }
  }

  // /**
  //  * Simulate the upload process
  //  */
  // uploadFilesSimulator(index: number) {
  //   // setTimeout(() => {
  //   //   if (index === this.files.length) {
  //   //     return;
  //   //   } else {
  //   //     const progressInterval = setInterval(() => {
  //   //       if (this.files[index].progress === 100) {
  //   //         clearInterval(progressInterval);
  //   //         this.uploadFilesSimulator(index + 1);
  //   //       } else {
  //   //         this.files[index].progress += 5;
  //   //       }
  //   //     }, 1);
  //   //   }
  //   // }, 500);
  //   // if (this.files[this.files.length - 1].progress != 100) {
  //   //   this.btn = true;
  //   // } else {
  //   //   this.btn = false;
  //   // }
  // }

  // /**
  //  * Convert Files list to normal array list
  //  * @param files (Files List)
  //  */
  // prepareFilesList(files: Array<any>) {
  //   this.btn = false;
  //   this.successInfo = false;
  //   this.errorInfo = false;

  //   for (const item of files) {
  //     item.progress = 0;
  //     this.files.push(item);
  //     console.log(this.files);
  //   }
  //   // for (let i = 0; i <= this.files.length; i++) {
  //   //     if (this.files[i]?.type === "application/x-zip-compressed") {
  //   //       const jsZip = require('jszip');
  //   //       jsZip.loadAsync(this.files[i]).then((zip) => { // <----- HERE
  //   //         console.log(zip);
  //   //         Object.keys(zip.files).forEach((filename) => { // <----- HERE
  //   //           console.log(filename);
  //   //           Object.keys(filename).forEach((directry)=>{
  //   //           })
  //   //           zip.files[filename].async('string').then((fileData) => { // <----- HERE
  //   //             this.fileData = this.fileData + '**$$##$$**' + fileData;
  //   //             console.log(this.fileData, "converted");
  //   //           });
  //   //         });
  //   //       });
  //   //     }
  //   //   }
  //   this.tobase64Handler(this.files)
  //   this.fileDropEl.nativeElement.value = "";
  //   // this.uploadFilesSimulator(0);
  // }

  // toBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = error => reject(error);
  //   });
  // };

  // async tobase64Handler(files) {
  //   const filePathsPromises = [];
  //   files.forEach(file => {
  //     filePathsPromises.push(this.toBase64(file));
  //   });
  //   const filePaths = await Promise.all(filePathsPromises);
  //   const mappedFiles = filePaths.map((base64File) => (base64File.split(',')[1]));
  //   this.baseAdd = mappedFiles;
  //   this.btn = false;
  //   return mappedFiles;
  // }

  // /**
  //  * format bytes
  //  * @param bytes (File size in bytes)
  //  * @param decimals (Decimals point)
  //  */
  // formatBytes(bytes, decimals = 2) {
  //   if (bytes === 0) {
  //     return "0 Bytes";
  //   }
  //   const k = 1024;
  //   const dm = decimals <= 0 ? 0 : decimals;
  //   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  // }
}
