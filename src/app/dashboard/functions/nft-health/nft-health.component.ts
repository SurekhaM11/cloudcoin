import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nft-health',
  templateUrl: './nft-health.component.html',
  styleUrls: ['./nft-health.component.scss']
})
export class NftHealthComponent implements OnInit {
  payload: any;
  healthProg: any;
  goTODash: boolean;
  afterClick: boolean;
  afterClick1: boolean
  goTODash1: boolean;

  constructor(public router: Router, private api: ApiService) {

  }
  ngOnInit() {
    this.checkhealthNFT()
  }

  async checkhealthNFT() {
    try {
      var data = {
        name: "NFTs"
      }
      let response: any = await this.api.health(data);
      if (response.status == "success") {
        this.doCheckHealthNFT(response.payload?.id, (data: any) => { })
      }
    }
    catch (e) {
      console.log(e);
    }
  }
  async doCheckHealthNFT(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    console.log("Task done: ", task);
    if (task) {
      this.payload = task.payload;
      this.healthProg = this.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          // this.fixFracked();
          this.goTODash = true;
        }
        else {
          // this.goTODash = true;
          if (this.payload?.data?.message == "No coins to detect") {
            // Swal.fire({
            //   title: "Fracked coins found. Use the Fix Fracked tool to fix them.",
            //   icon: 'info',
            //   confirmButtonText: 'Okay',
            // }).then((result) => {
            //   if (result.value) {
            //     {
            //       this.router.navigate(['/dashboard/home'])
            //     }
            //   }
            // });
            console.log('hehe')

            //  this.goTODash = true;
          } else {
            Swal.fire({
              title: this.payload.data.message,
              icon: 'error',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) {
                {
                  this.router.navigate(['/dashboard/home'])
                }
              }
            });
          }
        }
        return;
      }
      setTimeout(() => {
        this.doCheckHealthNFT(taskID, xdata)
      }, 500)
    }
  }




}