import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss']
})
export class HealthComponent implements OnInit {
  type: string;
  userSky: string;
  userLocal: string;
  payload: any;
  healthProg: any;
  goTODash: boolean;
  syncProg: any;
  fixSkyvault: boolean = false;
  showLoader: boolean = false;
  valueAscOrder: any;
  options: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/cloud_loading.json'
  };

  constructor(
    private api: ApiService,
    public router: Router
  ) {
    this.type = localStorage.getItem('wallet');
    this.userSky = localStorage.getItem('userSky');
    this.userLocal = localStorage.getItem('userLocal');
  }

  ngOnInit(): void {
    if (this.type === 'localwallet') {
      this.checkhealth();
    } else {
      this.checkSky();
    }
  }

  returnZero() {
    return 0
  }
  async checkhealth() {
    try {
      var data = {
        name: this.userLocal
      }
      let response: any = await this.api.health(data);
      if (response.status == "success") {
        this.doCheckHealth(response.payload?.id, (data: any) => { })
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async doCheckHealth(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    console.log("Task done: ", task);
    if (task) {
      this.payload = task.payload;
      this.healthProg = this.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.goTODash = true;
        } else {
          // this.goTODash = true;
          if (this.payload?.data?.message == "No coins to detect") {
            Swal.fire({
              title: "Fracked coins found. Use the Fix Fracked tool to fix them.",
              icon: 'info',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) {
                {
                  this.router.navigate(['/dashboard/home'])
                }
              }
            });
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
        this.doCheckHealth(taskID, xdata)
      }, 500)
    }
  }

  async checkSky() {
    try {
      var data = {
        name: this.userSky
      }
      let response: any = await this.api.skyhealth(data);
      console.log(response);
      if (response.status == "success") {
        this.doCheckSkyHealth(response.payload?.id, (data: any) => { })
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  getColor(bal: any) {
    if (bal === 1 || bal > 1) {
      return 'green';
    } else if (bal === 0) {
      return 'red';
    }
  }

  getBalColor(status: any) {
    if (status == 1) {
      return 'green';
    } else if (status == 2) {
      return 'red';
    } else if (status == 3 || status == 5) {
      return 'gray';
    } else if (status == 4) {
      return 'yellow';
    }
  }

  checkQuorum(quor: any) {
    var x = this.syncProg?.data?.quorum_sns.some(x => { return x == quor });
    if (x == true) {
      return 'green';
    } else {
      return 'red';
    }
  }

  async doCheckSkyHealth(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    console.log("Task done: ", task);
    if (task) {
      this.payload = task.payload;
      this.syncProg = this.payload;
      // Array.from(this.syncProg?.data?.sns).sort((a,b) => a-b);
      if (this.payload.status == "error" || this.payload.status == "completed") {
        var sync = this.syncProg?.data?.sns || {};
        if (Object.keys(sync).length === 0) {
          Swal.fire({
            title: "There are no coins to sync",
            icon: 'error',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) {
              {
                this.router.navigate(['/dashboard/home']);
              }
            }
          });
        }
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
        var sync = this.syncProg?.data?.sns;
        sync = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
          return a.value.localeCompare(b.value);
        }
        console.log(sync);

        return;
      }
      setTimeout(() => {
        this.doCheckSkyHealth(taskID, xdata)
      }, 500)
    }
  }

  async fixSky() {
    try {
      var data = {
        name: this.userSky,
        sync_items: this.syncProg?.data?.sns
      }
      let response: any = await this.api.fixSky(data);
      if (response.status == "success") {
        this.showLoading(true);
        this.doFixsky(response.payload?.id, (data: any) => { })
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async doFixsky(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    console.log("Task done: ", task);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.showLoading(false);
          this.fixSkyvault = true;
        } else {
          this.showLoading(false);
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

  async syncOne(item: any) {
    try {
      var data = {
        name: this.userSky,
        sync_items: { [item.key]: item.value }
      }
      let response: any = await this.api.fixSky(data);
      if (response.status == "success") {
        this.showLoading(true);
        this.doFixsky(response.payload?.id, (data: any) => { })
      }
    }
    catch (e) {
      console.log(e);
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

  again() {
    this.goTODash = !this.goTODash;
    this.fixSkyvault = !this.fixSkyvault;
    this.syncProg.progress = 0;
    this.checkSky();
  }


}
