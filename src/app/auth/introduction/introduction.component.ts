import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import * as $ from 'jquery'
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
// import { Observable, Subscription } from 'rxjs';
// import 'rxjs/add/observable/timer';
@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  public themeDarkActive: boolean;
  public themeLightActive: boolean;
  public themeDropdwnToggler: boolean;
  // private subscription: Subscription;
  // private timer: Observable<any>;
  isShow: boolean = false;
  loadingMessage: string;
  showNormal: boolean;
  showContent: boolean = false;
  showLoader: boolean;
  showError: boolean = false;
  all: any;
  bal: any;
  options: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/cloud_loading.json'
  };
  errorOptions: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/error.json'
  };
  payload: any;
  successInfo: boolean;
  successMsg: string;
  raidaCheck: boolean;
  serversList: string;
  errorInfo: boolean;
  errorMsg: string;
  showSky: boolean;
  skyAll: any;
  walletName: any;
  skyLen: any;
  localLen: any;
  userLocal: any;
  skyName: string;
  userSky: string;
  localLength: number;
  skyLength: number;
  localbalance: number;

  constructor(
    private eventService: EventService,
    private router: Router,
    private api: ApiService
  ) {
    localStorage.setItem('wallet', 'localwallet')
    // localStorage.setItem('userLocal' , this.walletName)
    this.getAllwallet();
    this.getAllvaults();
    if (localStorage.getItem('themeLightActive') == '1') {
      this.themeLightActive = true;
      this.themeDarkActive = false;
    } else if (localStorage.getItem('themeLightActive') == '0') {
      this.themeLightActive = false;
      this.themeDarkActive = true;
    } else {
      this.themeLightActive = true;
      this.themeDarkActive = false;
    }
    this.themeDropdwnToggler = false;

  }

  ngOnInit(): void {
    // window.open(window.location.href, "_self");

    this.userLocal = localStorage.getItem('userLocal')
    this.userSky = localStorage.getItem('userSky')
    this.localLength = Number(localStorage.getItem('localLength'))
    this.skyLength = Number(localStorage.getItem('skyLength'))
    this.localbalance = Number(sessionStorage.getItem('skyLength'))


    Swal.fire({
      title: "Coin Manager",
      text: "\n Used to authenticate, store and pay out CC. This software is provided as-is with all faults, defects and errors, and without warranty of any kind. This software is provided free of charge by the CC Consortium.",
      icon: 'info',
      // input: 'checkbox',
      // inputPlaceholder: 'I have a bike'
      // showCancelButton: true,
      confirmButtonText: 'Okay',
    }).then((result) => {
      if (result.value) {
        {
          // this.goToDash(this.userLocal)
          // if (this.payload?.length != 0 || this.all?.length > 1) {
          //   this.router.navigate(['/dashboard']);
          // }
        }
      } else {
        window.close();
      }
    });
    this.initialize();
    // setInterval(() => {
    //   this.initialize();
    //   this.isShow = false;
    // }, 10000);
    // this.getAllvaults();
  }

  async initialize() {
    this.showLoading(true);
    // var self = this;
    // setTimeout(() => {
    //   this.showLoading(false);
    //   this.isShow = true;
    // }, 3000);
    try {
      let response: any = await this.api.init();
      if (response.status == "success") {
        this.showContent = true;
        this.showLoading(false);
        // this.goToDash(this.userLocal)
        this.isShow = false;
        // if(Number(localStorage.getItem('skyLength')) > 0 || Number(localStorage.getItem('localLength')) > 1 || this.bal > 0){
        if (this.skyLength > 0 || this.localLength > 1 || this.localbalance > 0) {
          this.showContent = false;
          // this.router.navigate(['/dashboard']);
          this.goToDash(this.walletName);
        }
      } else {
        this.showContent = false;
      }
    }
    catch (e) {
      this.initialize();
      this.showContent = false;
    }
  }

  async getAllwallet() {
    try {
      let response: any;
      response = await this.api.getWallet();
      if (response.status === "success") {
        this.all = response.payload;
        this.bal = this.all[0].balance
        sessionStorage.setItem('totalBal', this.bal)
        this.walletName = this.all[0].name
        localStorage.setItem('userLocal', this.walletName)
        this.localLen = this.all.length
        localStorage.setItem('localLength', this.localLen)
        // if (this.all.length > 1) {
        //   this.router.navigate(['/dashboard']);
        // }
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async getAllvaults() {
    try {
      let response: any = await this.api.getList();
      this.payload = response.payload;
      if (response.status == "success") {
        this.skyAll = response.payload;
        this.skyLen = this.skyAll?.length;
        this.skyName = response.payload[0].name
        localStorage.setItem('skyLength', this.skyLen)
        localStorage.setItem('userSky', this.skyName)
        // if (response?.payload?.length != 0) {
        //   this.router.navigate(['/dashboard']);
        // }
      }
      console.log(response);
    }
    catch (e) {
      console.log(e);
    }
  }

  themeDarkCaller() {
    if (this.themeDarkActive == false) {
      this.themeDarkActive = true;
      this.themeLightActive = false;
      localStorage.setItem('themeLightActive', '0');
      this.eventService.emitThemeTogEvent();
    }
    this.themeDropdwnToggler = false;
  }

  themeLightCaller() {
    if (this.themeLightActive == false) {
      this.themeLightActive = true;
      this.themeDarkActive = false;
      localStorage.setItem('themeLightActive', '1');
      this.eventService.emitThemeTogEvent();
    }
    this.themeDropdwnToggler = false;
  }

  themeDropDownCaller() {
    this.themeDropdwnToggler = !this.themeDropdwnToggler;
  }

  closeThemeDropdown() {
    this.themeDropdwnToggler = false;
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

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  goToDash(name) {
    this.userLocal = name;
    localStorage.setItem('wallet', 'localwallet')
    this.eventService.setItem('userLocal', name, "changelocal")
    // this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
    this.router.navigate(['/dashboard']);
  }

}
