import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-fix',
  templateUrl: './fix.component.html',
  styleUrls: ['./fix.component.scss']
})
export class FixComponent implements OnInit {
  type: string;
  userSky: string;
  userLocal: string;
  payload: any;
  fixProg: any;
  goTODash: boolean = false;
  syncProg : any;
  fixSkyvault : boolean = false;
  showLoader : boolean = false;
  options: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/cloud_loading.json'
  };

  constructor(
    private api : ApiService,
    private router : Router
  ) {
    this.type = localStorage.getItem('wallet');
    this.userSky = localStorage.getItem('userSky');
    this.userLocal = localStorage.getItem('userLocal');
   }

  ngOnInit(): void {
    if(this.type == 'localwallet'){
      this.fixFracked();
    }else{
      this.detectSky();
    }
  }

  async fixFracked(){
    try{
      var data = {
        name : this.userLocal
      }
      let response : any = await this.api.fix(data);
      if(response.status === "success"){
        this.doCheckFix(response.payload?.id, (data: any) => { })
      }
    }
    catch(e){
      console.log(e);
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

  async detectSky(){
    try{
      var data = {
        name: this.userSky
      }
      let response: any = await this.api.detectsky(data);
      console.log(response);
      if (response.status == "success") {
        this.detectSkyvault(response.payload?.id, (data: any) => { })
      }
    }
    catch(e){
      console.log(e);
    }
  }

  // getColor(bal: any){
  //   if(bal === 1 || bal > 1){
  //     return 'green';
  //   }else if( bal === 0){
  //     return 'red';
  //   }
  // }

  async detectSkyvault(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    console.log("Task done: ", task);
    if (task) {
      this.payload = task.payload;
      this.syncProg = this.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.fixSky();
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
        this.detectSkyvault(taskID, xdata)
      }, 500)
    }
  }

  async fixSky(){
    try{
      var data = {
        name:  this.userSky,
        pownstring: this.syncProg?.data?.coins[0].pownstring
      }
      let response: any = await this.api.idFix(data);
      if (response.status == "success") {
        this.showLoading(true);
        this.doFixsky(response.payload?.id, (data: any) => { })
      }
    }
    catch(e){
      console.log(e);
    }
  }

  async doFixsky(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.showLoading(false);
          this.goTODash = true;
        } else {
          this.showLoading(false);
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
        this.doFixsky(taskID, xdata)
      }, 500)
    }
  }

  showLoading(state): void {
    if (state) {
      this.showLoader = true;
    } else {
      this.showLoader = false;
    }
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

}
