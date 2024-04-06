import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { LoginService } from 'src/app/services/login.service';
import JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver'
import { ApiService } from 'src/app/services/api.service';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EventService } from 'src/app/services/event.service';
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  @ViewChild('quoteCanvas') canvas: ElementRef<HTMLCanvasElement>;
  skywallet: any;
  username: any;
  selectedFile: any;
  selectedData: any;
  imageWidth: any = 100;
  imageHeight: any = 100;
  pngCheck: any;
  userLocal: string;
  afterClick: boolean = false;
  public amount: any = 0;
  errorMessage: string = null;
  loadingMessage: string;
  file: any = "Choose folder";
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
  errorInfo: boolean;
  successInfo: boolean;
  errorMsg: string;
  exportForm: FormGroup;
  transaction: any = [];
  localUrl: any;
  product: any;
  filePath: any;
  blob: any;
  maxnotes: Number;
  totalnotes: Number;
  fil: any;
  all: any[] = [];

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
      amount: ['', [Validators.required, Validators.pattern('^(500000|[1-5]?[0-9]?[0-9]?[0-9]?[0-9]?[0-9]?)$')]],
      tag: [''],
      format: ['png'],
      fileName: ['', Validators.maxLength(64)],
      folder: ['']
    })
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.userLocal = localStorage.getItem('userLocal');
    if (localStorage.getItem('path') != "" && localStorage.getItem('path') != null && localStorage.getItem('path') != undefined) {
      this.file = localStorage.getItem('path');
      console.log("bye");

    } else {
      console.log("hye");

      this.file = 'C:/Users/user/Downloads';
    }
    this.storage.changeLocal.subscribe
      (message => {
        this.all = message;
      });
    // this.getTransaction();
  }
  isValidInput(value: any) {
    return this.exportForm.controls[value].invalid &&
      (this.exportForm.controls[value].dirty || this.exportForm.controls[value].touched);
  }
  _keyUp(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      // return false;
    } else {
      // if(this.totalnotes < 2001){
      //   if (event.target.value > this.maxnotes) {
      //     Swal.fire({
      //       title: "inorrect amount",
      //       icon: 'warning',
      //       confirmButtonText: 'Okay',
      //     }).then((result) => {
      //       if (result.value) { }
      //     });
      //   }
      // }
    }
  }

  onFileChanged(event): void {
    // this.buttonText = 'Select CloudCoin';
    this.selectedFile = event.target.files[0];
    console.log("fileDetails", this.selectedFile);
    const fileReader = new FileReader();
    const me = this;
    fileReader.readAsDataURL(this.selectedFile);
    fileReader.onload = (e) => {
      this.selectedData = fileReader.result;
      let image: any = new Image();
      image.src = fileReader.result;
      let that = this;
      image.onload = function (en) {
        // const canvas:any = document.getElementById('canvas');
        that.selectedData = this;
        that.canvas.nativeElement.width = this.width;
        that.imageWidth = this.width;
        that.canvas.nativeElement.height = this.height;
        that.imageHeight = this.height;
        const ctx = that.canvas.nativeElement.getContext('2d');
        ctx.drawImage(this, 0, 0, this.width, this.height);
        // ctx.font = "1px serif";
        // ctx.textBaseline = "hanging";
        // ctx.strokeText("Hello world", 0, this.width);
      };
      // console.log("result",fileReader.result);

    };
    fileReader.onerror = (error) => {
      console.log(error);
      this.showErrorMessage('Cannot Parse CC');
    };
  }

  changeDownloadFormat(e) {
    this.pngCheck = e;
  }

  download(filename, text): void {
    const pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
      const event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      pom.dispatchEvent(event);
    } else {
      pom.click();
    }
  }

  go() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
    this.router.navigate(["/dashboard/home"]);
  }

  _stringifyJSONCoin(stack): string {
    const coins = stack.cloudcoin;
    let first = true;
    let json = '{\n\t"cloudcoin": [{\n';

    for (const cc of coins) {
      if (!first) {
        json += ', {\n';
      }
      json += '\t\t"nn": "' + cc.nn + '",\n';
      json += '\t\t"sn": "' + cc.sn + '",\n';
      json += '\t\t"an": [\n\t\t\t"';
      let i = 0;
      for (const an of cc.an) {
        json += an;
        if (i !== 24) {
          json += '", ';
          if (((i + 1) % 5) === 0) {
            json += '\n\t\t\t';
          }
          json += '"';
        }

        i++;

      }
      json += '"\n\t\t],\n';
      if ('pown' in cc) {
        json += '\t\t"pown": "' + cc.pown + '"';
      }
      if ('ed' in cc) {
        json += ',\n\t\t"ed": "' + cc.ed + '"';
      }

      if ('aoid' in cc) {
        if (cc.aoid.length === 0) {
          json += ',\n\t\t"aoid": []\n';
        }
        else {
          json += ',\n\t\t"aoid": "' + cc.aoid + '"\n';
        }
      }
      else {
        json += ',\n\t\t"aoid": []\n';
      }

      json += '\t}';
      first = false;
    }
    json += ']\n}';

    return json;
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  showLoading(state): void {
    if (state) {
      this.showNormal = false;
      this.showLoader = true;
      this.showError = false;
    }
    else {
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

  async getPath() {
    try {
      let response: any = await this.api.filePick();
      console.log(response);
      if (response.status === "success") {
        this.file = response?.payload?.items_picked[0];
        localStorage.setItem('path', this.file);
        // this.exportForm.get('folder').patchValue(this.file);
      }
      // else {
      //   Swal.fire({
      //     title: response?.payload?.message,
      //     icon: 'error',
      //     confirmButtonText: 'Okay',
      //   }).then((result) => {
      //     if (result.value) { { } }
      //   });
      // }
    }
    catch (e) {
      console.log(e);
    }
  }

  async doCheck(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    console.log("Task done: ", task);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        this.showLoading(false);
        if (this.payload.status == "completed") {
          // let currentUrl = this.router.url;
          // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          // this.router.onSameUrlNavigation = 'reload';
          // this.router.navigate([currentUrl]);
          this.storage.setItem("wallet", "localwallet", 'download');
          const newArr = this.all.map(obj => {
            if (obj.name === this.userLocal) {
              return { ...obj, balance: obj.balance - Number(this.exportForm.get('amount')!.value) };
            }
            return obj;
          });
          this.storage.changeLocaldata(newArr);
          var nuumb: any = Number(sessionStorage.getItem('totalBal')) - Number(this.exportForm.get('amount')!.value);
          sessionStorage.setItem('totalBal', nuumb)
          this.router.navigate(["/dashboard/home"]);
          Swal.fire({
            title: "You have withdrawn " + Number(this.exportForm.get('amount').value) + " CC in " + this.exportForm.get('format')!.value + " format.",
            icon: 'success',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) { { } }
          });
          // this.afterClick = true;
          // if (this.pngCheck === 1) {
          //   const base64Response = await fetch(`data:image/png;base64,${this.payload.data?.coins}`);
          //   const blobs = await base64Response.blob();
          //   this.blob = new Blob([blobs], { type: 'image/png' });
          //   var downloadURL = window.URL.createObjectURL(blobs);
          //   var link = document.createElement('a');
          //   link.href = downloadURL;
          //   link.download = Number(this.exportForm.get('amount').value) + ".CC.1." + this.exportForm.get('fileName')!.value + ".png";
          //   link.click();
          //   let currentUrl = this.router.url;
          //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          //   this.router.onSameUrlNavigation = 'reload';
          //   this.router.navigate([currentUrl]);
          //   this.router.navigate(["/dashboard/home"]);
          //   Swal.fire({
          //     title: "You have exported " + Number(this.exportForm.get('amount').value) + " CC in PNG format.",
          //     icon: 'success',
          //     confirmButtonText: 'Okay',
          //   }).then((result) => {
          //     if (result.value) { { } }
          //   });
          //   window.open(downloadURL);
          // } else if (this.pngCheck === 2) {
          //   const base64Response = await fetch(`data:image/png;base64,${this.payload.data?.coins}`);
          //   const blobs = await base64Response.blob();
          //   var zip = new JSZip();
          //   // var img = zip.folder("Cloudcoins");
          //   var byteString = atob(this.payload.data?.coins);
          //   var ab = new ArrayBuffer(byteString.length);
          //   var ia = new Uint8Array(ab);
          //   for (var i = 0; i < byteString.length; i++) {
          //     ia[i] = byteString.charCodeAt(i);
          //   }
          //   var name = Number(this.exportForm.get('amount').value) + ".CC.1." + this.exportForm.get('fileName')!.value + '.zip';
          //   var downloadURL = window.URL.createObjectURL(blobs);
          //   var link = document.createElement('a');
          //   link.href = downloadURL;
          //   let currentUrl = this.router.url;
          //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          //   this.router.onSameUrlNavigation = 'reload';
          //   this.router.navigate([currentUrl]);
          //   this.router.navigate(["/dashboard/home"]);
          //   Swal.fire({
          //     title: "You have exported " + Number(this.exportForm.get('amount').value) + " CC in ZIP format.",
          //     icon: 'success',
          //     confirmButtonText: 'Okay',
          //   }).then((result) => {
          //     if (result.value) { { } }
          //   });
          //   zip.file("CC_" + Math.floor(100000 + Math.random() * 900000) + ".png", blobs, { base64: true });
          //   var link12 = zip.generateAsync({ type: "blob" })
          //     .then(function (content) {
          //       FileSaver.saveAs(content, name);
          //     });
          //   console.log(link12);
          // }
          // this.getTransaction();
        } else {
          Swal.fire({
            title: this.payload.data.message,
            icon: 'warning',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) { }
          });
        }
        let data = this.payload.data;
        this.successMsg = "Done: " + data?.message;
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

  getPng(e: any) {
    this.fil = e.files[0].name;
  }

  async exoprt() {
    if (this.exportForm.valid && this.file != "Choose folder") {
      // if (this.exportForm.get('fileName')!.value === "") {
      //   this.exportForm.get('fileName').patchValue('CC_' + Math.floor(100000 + Math.random() * 900000));
      // }
      try {
        var exportData = {
          name: this.userLocal,
          amount: Number(this.exportForm.get('amount')!.value),
          tag: this.exportForm.get('fileName')!.value,
          folder: this.file,
          type: this.exportForm.get('format')!.value
        }
        let response: any = await this.api.export(exportData);
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
          this.loadingMessage = "Withdrawing CC..."
          this.doCheck(response.payload?.id, (data: any) => {
            this.successInfo = true;
            this.successMsg = "Done " + JSON.stringify(data);
          });
        }
      }
      catch (e) {
        console.log(e);
      }
    }
  }

  async getTransaction() {
    var data = localStorage.getItem('userLocal');
    try {
      let response: any = await this.api.getTransaction(data);
      this.transaction = response;
      var ones = 1 * Number(this.transaction.payload.denominations[1]);
      var fives = 5 * Number(this.transaction.payload.denominations[5]);
      var tens = 25 * Number(this.transaction.payload.denominations[25]);
      var hundreds = 100 * Number(this.transaction.payload.denominations[100]);
      var twofiftys = 250 * Number(this.transaction.payload.denominations[250]);
      this.totalnotes = ones + fives + tens + hundreds + twofiftys;
      this.maxnotes = Number(this.transaction.payload.denominations[1]) + Number(this.transaction.payload.denominations[5])
        + Number(this.transaction.payload.denominations[25]) + Number(this.transaction.payload.denominations[100]) + Number(this.transaction.payload.denominations[250]);
    }
    catch (e) {
      console.log(e);
      this.errorInfo = true;
      this.errorMsg = "Failed";
    }

  }

}
