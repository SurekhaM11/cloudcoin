import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-cc',
  templateUrl: './upload-cc.component.html',
  styleUrls: ['./upload-cc.component.scss']
})
export class UploadCcComponent implements OnInit {

  detect: boolean = false;
  successInfo: boolean = false;
  successMsg: any = '';
  errorInfo: boolean = false;
  errorMsg: any = '';
  raidaCheck: boolean = false;
  payload: any = null;
  taskId: any = null;
  serversList: any;
  showError: boolean = false;
  isSelect: boolean;
  user: any;
  fileName: string = '';
  userLocal: any;
  baseAdd: any;
  file: any;
  btn: boolean = false;

  constructor(private raida: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.userLocal = localStorage.getItem('userLocal');
  }

  getUploadedFiles(files) {
    this.fileName = files.target.files[0].name;
    this.btn = false;
    this.successInfo = false;
    this.errorInfo = false;
    let reader = new FileReader();
    let file = files.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result)
      this.baseAdd = reader.result
    }
  }


  //  async doCheck(taskID: any, xdata: any){
  //   let task:any = await this.raida.doCheck(taskID);
  //     console.log("Task done: ", task);

  //     if(task){
  //       this.payload = task.payload;
  //       if (this.payload.status == "error" || this.payload.status == "completed") {
  //         if(this.payload.status == "completed"){
  //           this.router.navigate(['/localwallet/localstep-completed'])
  //         }
  //         let data = this.payload.data;
  //         this.successMsg = "Done: " + data.message;
  //         let h = "";
  //         this.raidaCheck = true;
  //         this.serversList = h;
  //         this.errorInfo = false;
  //         return;
  //       }
  //       this.successMsg = "Doing.... Task ID " + taskID + ", Progress " + this.payload.progress + "%";
  //       setTimeout(() => {
  //         this.doCheck(taskID, xdata)
  //       },1000)

  //     }
  //     else{
  //       this.errorInfo = true;
  //       this.successInfo = false;
  //       this.errorMsg = "Call Failed";
  //     }
  // }

  // async detectWallet(File){
  //   this.raidaCheck = true;
  //     try{
  //       var cs = JSON.parse(File);
  //       if(cs.cloudcoin.length !== 0){
  //       }
  //     }
  //     catch(e) {
  //       this.detect = false;
  //       this.errorInfo = true;
  //       this.successInfo =false;
  //       this.errorMsg = "Failed to parse json";
  //    } 
  //    let idata = {
  //     coins: [
  //      { 'sn':parseInt('sn'),
  //       'ans': String
  //     }
  //   ]
  //  }

  //   for (let i = 0; i < cs?.cloudcoin?.length; i++) {
  //     let cc = cs.cloudcoin[i]
  //     idata.coins[i] =  {
  //     'sn': parseInt(cc.sn, 10),
  //     'ans': cc.an
  //   }
  // }

  //   let detection: any = await this.raida.detect(JSON.stringify(idata));
  //   console.log(detection, "response");
  //   if(detection.status == 'success'){
  //     this.raidaCheck = true;
  //     this.successInfo = true;
  //     this.errorInfo = false;
  //     let taskId = detection.payload
  //     this.successMsg = "Detect sent. Task ID " + taskId.id;
  //     this.doCheck(taskId.id, (data: any)=>{
  //       this.successInfo = true;
  //       this.successMsg  ="Done " + JSON.stringify(data)
  //     })
  //   }
  //   else{
  //     this.errorInfo = true;
  //     this.successInfo = false;
  //     this.errorMsg = "Failed " + detection.payload.message;
  //   }

  // }

  async doCheck(taskID: any, xdata: any) {
    let task: any = await this.raida.doCheck(taskID);
    console.log("Task done: ", task);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          localStorage.setItem('wallet', "localwallet");
          Swal.fire({
            title: "Localwallet created successfully.",
            icon: 'success',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) {
              {
                let currentUrl = this.router.url;
                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                this.router.onSameUrlNavigation = 'reload';
                this.router.navigate([currentUrl]);
              }
            }
          });
        }
        else {
          this.btn = true;
          Swal.fire({
            title: this.payload.data.message,
            icon: 'warning',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) { { } }
          });
        }
        if (this.payload.data.limbo != 0) {
          Swal.fire({
            title: 'Contact was lost with the RAIDA during your request due to loss of internet connectivity. It is unknown if the coin passwords have been changed. This can be fixed once a solid internet connection is restored.',
            icon: 'warning',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) {
              {
                let currentUrl = this.router.url;
                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                this.router.onSameUrlNavigation = 'reload';
                this.router.navigate([currentUrl]);
                this.router.navigate(["/dashboard/home"]);
              }
            }
          });
        }
        else if (this.payload.data.counterfeit != 0) {
          Swal.fire({
            title: this.payload.data.counterfeit + ' Counterfeit CC found!',
            icon: 'info',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) {
              {
                let currentUrl = this.router.url;
                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                this.router.onSameUrlNavigation = 'reload';
                this.router.navigate([currentUrl]);
                this.router.navigate(["/dashboard/home"]);
              }
            }
          });


        }
        else if (this.payload.data.fracked != 0) {
          Swal.fire({
            title: this.payload.data.fracked + ' Fracked CC found!',
            icon: 'info',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) {
              {
                let currentUrl = this.router.url;
                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                this.router.onSameUrlNavigation = 'reload';
                this.router.navigate([currentUrl]);
                this.router.navigate(["/dashboard/home"]);
              }
            }
          });
        }
        let data = this.payload.data;
        this.successInfo = true;
        this.successMsg = "Done: " + this.payload.message;
        let h = "";
        this.raidaCheck = true;
        this.serversList = h;
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

  async next() {
    // console.log(this.file[0]?.name);
    var file = this.baseAdd.split(',')[1];
    try {
      var data = {
        name: this.userLocal,
        items: [{
          type: 'inline',
          data: file
        }]
      }
      let response: any = await this.raida.import(data);
      this.doCheck(response.payload?.id, (data: any) => {
        this.successInfo = true;
        this.successMsg = "Done " + JSON.stringify(data)
      })
    }
    catch (e) {

    }
  }

  skip() {
    localStorage.setItem('wallet', "localwallet");
    Swal.fire({
      title: "Localwallet created successfully.",
      icon: 'success',
      confirmButtonText: 'Okay',
    }).then((result) => {
      if (result.value) {
        {
          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
          this.router.navigate(["/dashboard/home"]);
        }
      }
    });
  }

}
