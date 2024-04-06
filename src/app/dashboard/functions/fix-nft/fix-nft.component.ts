import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-fix-nft',
  templateUrl: './fix-nft.component.html',
  styleUrls: ['./fix-nft.component.scss']
})
export class FixNftComponent implements OnInit {
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
  constructor(private api : ApiService,
    public router : Router) { }

  ngOnInit(): void {
    this.fixNftFracked();
  }

  async fixNftFracked(){
    try{
      var data = {
        name : "NFTs"
      }
      let response : any = await this.api.fix(data);
      if(response.status === "success"){
        this.doCheckNftFix(response.payload?.id, (data: any) => { })
      }
    }
    catch(e){
      console.log(e);
    }
  }

  async doCheckNftFix(taskID: any, xdata: any) {
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
        this.doCheckNftFix(taskID, xdata)
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
