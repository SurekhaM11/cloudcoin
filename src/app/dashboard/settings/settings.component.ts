import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  nftSettingsForm: FormGroup;
  public generaltab: boolean;
  public historytab: boolean;
  public performtab: boolean;
  public recoverTab: boolean;
  public healthChoose: string;
  public fixSkyvault: boolean = false;
  public passkeyImage: any = "";
  public tabSelector: string;
  public cSelectorImg: string;
  public cSelectorText: string;
  public customSelectorOpen: boolean;
  public cSelectorImgThree: string;
  public cSelectorTextThree: string;
  public customSelectorOpenThree: boolean;
  public deleteUserModal: boolean;
  public cSelectorImgFour: string;
  public cSelectorTextFour: string;
  public customSelectorOpenFour: boolean
  public existingPswShow: boolean;
  public newPswShow: boolean;
  public backupExtPswShow: boolean;
  public skyHealthProgress: boolean = false;
  showLoader: boolean = false;
  show: boolean = false;
  show2: boolean = false;
  file: any;
  public removeProModal: boolean;
  public cSelectorImgFive: string;
  public cSelectorTextFive: string;
  public customSelectorOpenFive: boolean;
  public customSelectorOpenSix: boolean;
  public cSelectorImgSix: string;
  public cSelectorTextSix: string;
  public removeProModalTwo: boolean;
  public customSelectorOpenSeven: boolean;
  public cSelectorImgSeven: string;
  public cSelectorTextSeven: string;
  public customSelectorOpenEight: boolean;
  public cSelectorImgEight: string;
  public cSelectorTextEight: string;
  public customSelectorOpenNine: boolean;
  public cSelectorImgNine: string;
  public cSelectorTextNine: string;
  public customSelectorOpenTen: boolean;
  public cSelectorImgTen: string;
  public cSelectorTextTen: string;
  public customSelectorOpenEleven: boolean;
  public cSelectorImgEleven: string;
  public cSelectorTextEleven: string;
  public health: boolean = false;
  public errorInfo: boolean = false;
  public settings: boolean = false;
  public isSky: boolean;
  public all: any;
  public req: any;
  public max: any;
  public echo: any;
  public allSky: any;
  public fixProg: any
  public goTODash: boolean = false;
  public healthProg: any;
  public latencies: any;
  public isTimeout: boolean = false;
  deleteForm: FormGroup;
  healthProgress: boolean = false;
  public deleteCheck: boolean = false;
  payload: any;
  frackContinue: boolean = false;
  fixProgress: boolean = false;
  loadingMessage: string = '';
  options: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/cloud_loading.json'
  };
  nftsettingsform: any;
  regexp: string;
  upload_url: any;
  secret_key: any;
  api_key: any;
  dname: any;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
  ) {
    this.generaltab = false;
    this.historytab = false;
    this.performtab = true;
    this.recoverTab = false;
    this.tabSelector = 'performance';
    this.cSelectorImg = 'assets/usd.svg';
    this.cSelectorText = 'USD';
    this.customSelectorOpen = false;
    this.cSelectorImgThree = '';
    this.cSelectorTextThree = 'Select a wallet';
    this.customSelectorOpenThree = false;
    this.deleteUserModal = false;
    this.cSelectorImgFour = '';
    this.cSelectorTextFour = 'Select a wallet';
    this.customSelectorOpenFour = false;
    this.removeProModal = false;
    this.cSelectorImgFive = '';
    this.cSelectorTextFive = 'Select a wallet';
    this.customSelectorOpenFive = false;
    this.customSelectorOpenSix = false;
    this.cSelectorImgSix = '';
    this.cSelectorTextSix = 'Select a wallet';
    this.removeProModalTwo = false;
    this.customSelectorOpenSeven = false;
    this.cSelectorImgSeven = '';
    this.cSelectorTextSeven = 'Select a wallet';
    this.customSelectorOpenEight = false;
    this.cSelectorImgEight = '';
    this.cSelectorTextEight = 'Select a wallet';
    this.customSelectorOpenNine = false;
    this.cSelectorImgNine = '';
    this.cSelectorTextNine = 'Select a wallet';
    this.customSelectorOpenTen = false;
    this.cSelectorImgTen = '';
    this.cSelectorTextTen = 'Select a wallet';
    this.customSelectorOpenEleven = false;
    this.cSelectorImgEleven = '';
    this.cSelectorTextEleven = 'Select a SkyVault';
    this.existingPswShow = true;
    this.newPswShow = true;
    this.backupExtPswShow = true;
    this.deleteForm = this.fb.group({
      check2: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.regexp = "^(?:[a-zA-Z0-9\-][a-zA-Z0-9\-]{0,61})*([\.]{1,1}[a-z]{2,})+$";
    this.nftSettingsForm = new FormGroup({
      'dnsname': new FormControl('', Validators.pattern(this.regexp)),
      'url': new FormControl(this.upload_url, [Validators.required]),
      'secretkey': new FormControl(this.secret_key, [Validators.required]),
      'apikey': new FormControl(this.api_key, [Validators.required]),
    });
    this.getEcho();
    this.getAllwallet();
    this.getSetting();
    // this.getAllSky();
    this.getList();
    this.getConfDetails();
  }

  async onSubmit(form: FormGroup) {
    console.log(this.nftSettingsForm)
    this.uploadConfFile();
  }

  isValidInput(value: any) {
    return this.nftSettingsForm.controls[value].invalid &&
      (this.nftSettingsForm.controls[value].dirty || this.nftSettingsForm.controls[value].touched);
  }

  async getEcho() {
    this.errorInfo = false;
    this.payload = null;
    try {
      let response: any = await this.api.raidaEcho();
      if (response) {
        this.payload = response.payload;
        this.doTaskPoll(this.payload?.id);
      }
    }
    catch (e) {
      Swal.fire({
        title: 'Raida servers disconnected!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'SYNC',
      }).then((result) => {
        if (result.value) {
          {
            this.getEcho();
          }
        }
      });
    }
  }

  async doTaskPoll(taskID: any) {
    let task: any = await this.api.doTaskPoll(taskID);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "completed") {
        this.latencies = this.payload?.data?.latencies;
        var item = this.latencies.filter(x => x === 0);
        if (item?.length !== 0) {
          this.isTimeout = true;
        }
        // let data = this.payload.data;
        // let h = "";
        // for (let i = 0; i < data.pownarray.length; i++) {
        //   let st = data.pownarray[i]
        //   if (st != 1) {
        //     h += "<span class='rf'>" + i + "</span>"
        //   } else {
        //     h += "<span class='pf'>" + i + "</span>"
        //   }
        // }
        return;
      }
      setTimeout(() => {
        this.doTaskPoll(taskID)
      }, 500)
    }
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  async getSetting() {
    let response: any = await this.api.setting();
    if (response.status == 'success') {
      this.req = response.payload?.default_timeout_mult;
      this.echo = response.payload?.echo_timeout_mult;
      this.max = response.payload?.max_notes;
    }
  }

  async getAllwallet() {
    try {
      let response: any;
      response = await this.api.getWallet();
      this.all = response.payload;
    }
    catch (e) {
      console.log(e);
    }
  }

  async getPath() {
    try {
      let response: any = await this.api.filePick();
      console.log(response);
      if (response.status === "success") {
        this.file = response?.payload?.items_picked[0];
        var name = <HTMLInputElement>document.getElementById('fileInput');
        name.placeholder = response?.payload?.items_picked[0];
      }
      else {
        Swal.fire({
          title: response?.payload?.message,
          icon: 'error',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) { { } }
        });
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  // async getAllSky() {
  //   try {
  //     let response: any;
  //     response = await this.api.getAllSky();
  //     if (response.status == "success") {
  //       this.doCheck(response.payload?.id, (data: any) => { })
  //     }
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }
  // }

  async getList() {
    try {
      let response: any = await this.api.getList();
      if (response.status === 'success') {
        this.allSky = response.payload;
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  // async doCheck(taskID: any, xdata: any) {
  //   let task: any = await this.api.doCheck(taskID);
  //   console.log("Task done: ", task);
  //   if (task) {
  //     this.payload = task.payload;
  //     if (this.payload.status == "error" || this.payload.status == "completed") {
  //       if (this.payload.status == "completed") {
  //         this.allSky = this.payload.data;
  //       }
  //       return;
  //     }
  //     setTimeout(() => {
  //       this.doCheck(taskID, xdata)
  //     }, 500)
  //   }
  //   else {
  //   }
  // }

  async doCheck1(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    console.log("Task done: ", task);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.deleteCheck = true;
          Swal.fire({
            title: "Wallet deleted successfully!",
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
        } else {
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
        this.doCheck1(taskID, xdata)
      }, 500)
    }
    else {
    }
  }

  changRadio(e: any) {

  }

  tabToggler(val: string) {
    this.tabSelector = val;
  }

  customSelector(val: string) {
    if (val == 'usd') {
      this.cSelectorImg = 'assets/usd.svg';
      this.cSelectorText = 'USD';
    } else if (val == 'gbp') {
      this.cSelectorImg = 'assets/gbp.svg';
      this.cSelectorText = 'GBP';
    } else if (val == 'eur') {
      this.cSelectorImg = 'assets/eur.svg';
      this.cSelectorText = 'EUR';
    }
    this.customSelectorOpen = false;
  }

  customSelToggler() {
    this.customSelectorOpen = !this.customSelectorOpen;
  }

  customSelectorThree(val: string, wallet: string) {
    if (wallet == 'local') {
      this.cSelectorImgThree = 'assets/folder-w-border.svg';
      this.cSelectorTextThree = val;
      this.isSky = false;

    } else if (wallet == 'sky') {
      this.cSelectorImgThree = 'assets/cloud-transfer.svg';
      this.cSelectorTextThree = val;
      this.isSky = true;
    }
    this.customSelectorOpenThree = false;
  }

  async delete() {
    if (this.isSky == true) {
      try {
        if (this.deleteForm.valid) {
          var data = this.cSelectorTextThree;
          let response: any = await this.api.deleteSky(data);
          this.deleteUserModal = !this.deleteUserModal;
          if (response.status == 'success') {
            this.doCheck1(response.payload?.id, (data: any) => { });
          }
        }
      }
      catch (e) {
        console.log(e);
      }
    }
    else {
      try {
        if (this.deleteForm.valid) {
          var data = this.cSelectorTextThree;
          let response: any = await this.api.deleteWallet(data);
          this.deleteUserModal = !this.deleteUserModal;
          if (response.status == "error") {
            Swal.fire({
              title: response.payload.message,
              icon: 'error',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) { { } }
            });
          }
          else {
            this.deleteCheck = true;
            Swal.fire({
              title: "Wallet deleted successfully!",
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
        }
      }
      catch (e) {
        console.log(e);
      }
    }
  }

  formatLabel(value: number) {
    let response = value + '%';
    return response;
  }

  updateSetting(e, name) {
    this.settings = true;
    if (name == 'req') {
      this.req = e.value;
    }
    else if (name == 'echo') {
      this.echo = e.value;
    }
    else if (name == 'max') {
      this.max = e.value;
    }
  }

  async taskSetting() {
    if (this.settings == true) {
      try {
        var data = {
          "default_timeout_mult": this.req,
          "echo_timeout_mult": this.echo,
          "max_notes": this.max,
          "change_server_sn": 2
        }
        let response: any = await this.api.settingTask(data);
        console.log(response);
        if (response.status === "success") {
          Swal.fire({
            title: "Changes saved successfully!",
            icon: 'success',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) { { } }
          });
        }
      }
      catch (e) {
        console.log(e);
      }
    }
  }

  async uploadConfFile() {
    // var domain_name = String(this.nftSettingsForm.get('dnsname').value);
    try {
      var data = {
        upload_url: String(this.nftSettingsForm.get('url').value),
        upload_secret_key: String(this.nftSettingsForm.get('secretkey').value),
        cf_api_key: String(this.nftSettingsForm.get('apikey').value)
      }
      console.log(data);
      let response: any = await this.api.updateNftConf(data);
      this.showLoader = true;
      this.loadingMessage = "Saving changes..."
      if (response.status === "success") {
        console.log("success!!!")
        this.showLoader = false;
        Swal.fire({
          title: 'Changes have been uploaded successfully',
          icon: 'success',
          confirmButtonText: 'Okay'
        });
        this.router.navigate(['/dashboard/create-settings']);
        // this.clearForm();

      } else {
        this.showLoader = false;
        Swal.fire({
          title: 'Failed to save changes',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
        this.router.navigate(['/dashboard/create-settings']);
        // this.clearForm();
      }
    }
    catch (e) {
      console.log(e);

    }
  }

  async getConfDetails() {
    console.log('yayyyyy')
    try {
      let response: any = await this.api.returnNftConf();
      if (response.status === "success") {
        this.upload_url = response.payload.upload_url;
        this.secret_key = response.payload.upload_secret_key;
        this.api_key = response.payload.cf_api_key;
        //console.log("test" + " " + this.secret_key)
        var splitted = this.upload_url.split("/", 3)
        console.log("splitted:" + splitted[2])
        this.dname = splitted[2]
      } else {
        console.log('no previous configurations found');
      }
      this.nftSettingsForm.patchValue({
        secretkey: this.secret_key,
        apikey: this.api_key,
        url: this.upload_url,
        dnsname: this.dname

      })
    }

    catch (e) {
      console.log(e);

    }

  }

  customSelTogglerThree() {
    this.customSelectorOpenThree = !this.customSelectorOpenThree;
  }

  deleteUserModalToggler() {
    if (this.cSelectorTextThree != 'Select a wallet') {
      this.deleteUserModal = !this.deleteUserModal;
    }
  }
  removeProModalToggler() {
    this.removeProModal = !this.removeProModal;
  }

  customSelectorFour(val: string) {
    if (val == 'userThree') {
      this.cSelectorImgFour = 'assets/cloud-transfer.svg';
      // this.cSelectorTextfour = 'johnHaltiwanger.skywallet.cc';
      this.cSelectorTextFour = 'johnHaltiwanger.skywallet.cc';
    } else if (val == 'userFour') {
      this.cSelectorImgFour = 'assets/folder-w-border.svg';
      // this.cSelectorTextfour = 'johny4';
      this.cSelectorTextFour = 'johny4';
    }
    this.customSelectorOpenFour = false;
  }
  customSelTogglerFour() {
    this.customSelectorOpenFour = !this.customSelectorOpenFour;
  }

  toggleExtPswType() {
    this.existingPswShow = !this.existingPswShow;
  }
  toggleNewPswType() {
    this.newPswShow = !this.newPswShow;
  }
  toggleBkpPswType() {
    this.backupExtPswShow = !this.backupExtPswShow;
  }

  customSelectorFive(val: string, wallet: string) {
    if (wallet == 'sky') {
      this.cSelectorImgFive = 'assets/cloud-transfer.svg';
      this.cSelectorTextFive = val;
    } else if (wallet == 'local') {
      this.cSelectorImgFive = 'assets/folder-w-border.svg';
      this.cSelectorTextFive = val;
    }
    this.customSelectorOpenFive = false;
  }
  customSelTogglerFive() {
    this.customSelectorOpenFive = !this.customSelectorOpenFive;
  }

  customSelectorSix(val: string, wallet: string) {
    if (wallet == 'sky') {
      this.cSelectorImgSix = 'assets/cloud-transfer.svg';
      this.cSelectorTextSix = val;
    } else if (wallet == 'local') {
      this.cSelectorImgSix = 'assets/folder-w-border.svg';
      this.cSelectorTextSix = val;
    }
    this.customSelectorOpenSix = false;
  }
  recoveryEmailToggler() {
    this.customSelectorOpenSix = !this.customSelectorOpenSix;
  }

  removeProModalTogglerTwo() {
    this.removeProModalTwo = !this.removeProModalTwo;
  }

  customSelectorSeven(val: string, wallet: string) {
    if (wallet == 'sky') {
      this.cSelectorImgSeven = 'assets/cloud-transfer.svg';
      this.cSelectorTextSeven = val;
    } else if (wallet == 'local') {
      this.cSelectorImgSeven = 'assets/folder-w-border.svg';
      this.cSelectorTextSeven = val;
    } else if (wallet == 'anotherFolder') {
      this.cSelectorImgSeven = 'assets/folder-w-border.svg';
      this.cSelectorTextSeven = 'Choose another folder';
    }
    this.customSelectorOpenSeven = false;
  }
  listSecrialToggler() {
    this.customSelectorOpenSeven = !this.customSelectorOpenSeven;
  }

  customSelectorEight(val: string, wallet: string) {
    this.health = true;
    if (wallet == 'local') {
      this.cSelectorImgEight = 'assets/folder-w-border.svg';
      this.cSelectorTextEight = val;
      this.healthChoose = "local";
    } else if (wallet == 'sky') {
      this.cSelectorImgEight = 'assets/cloud-transfer.svg';
      this.cSelectorTextEight = val;
      this.healthChoose = "sky";
    }
    this.customSelectorOpenEight = false;
  }

  healthCheckToggler() {
    this.customSelectorOpenEight = !this.customSelectorOpenEight;
  }

  async checkhealth() {
    if (this.healthChoose === 'local') {
      try {
        var data = {
          name: this.cSelectorTextEight
        }
        let response: any = await this.api.health(data);
        console.log(response);
        if (response.status == "success") {
          this.healthProgress = true;
          this.doCheckHealth(response.payload?.id, (data: any) => { })
        }
      }
      catch (e) {
        console.log(e);
      }
    } else {
      try {
        var data = {
          name: this.cSelectorTextEight
        }
        let response: any = await this.api.skyhealth(data);
        console.log(response);
        if (response.status == "success") {
          this.skyHealthProgress = true;
          this.doCheckSkyHealth(response.payload?.id, (data: any) => { })
        }
      }
      catch (e) {
        console.log(e);
      }
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
        this.doCheckHealth(taskID, xdata)
      }, 500)
    }
  }

  async doCheckSkyHealth(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    console.log("Task done: ", task);
    if (task) {
      this.payload = task.payload;
      this.healthProg = this.payload;
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
        this.doCheckSkyHealth(taskID, xdata)
      }, 500)
    }
  }

  getColor(bal: any) {
    if (bal === 1 || bal > 1) {
      return 'green';
    } else if (bal === 0) {
      return 'red';
    }
  }

  backFix() {
    this.cSelectorTextTen = 'Select a wallet';
    this.cSelectorImgTen = '';
    this.fixProgress = false;
    this.goTODash = false;
    this.fixProg.progress = 0;
  }

  backHealth() {
    this.skyHealthProgress = false;
    this.healthProgress = false;
    this.goTODash = false;
    this.healthProg.progress = 0;
    this.cSelectorTextEight = 'Select a wallet';
    this.cSelectorImgEight = '';
  }

  backFixsky() {
    this.skyHealthProgress = false;
    this.cSelectorTextEight = 'Select a wallet';
    this.cSelectorImgEight = '';
    this.healthProgress = false;
    this.goTODash = false;
    this.healthProg.progress = 0;
    this.fixSkyvault = false;
  }

  async fixSky() {
    try {
      var data = {
        name: this.cSelectorTextEight,
        sync_items: this.healthProg?.data?.sns
      }
      let response: any = await this.api.fixSky(data);
      if (response.status == "success") {
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
          this.fixSkyvault = true;
        } else {
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

  customSelectorNine(val: string, wallet: string) {
    if (wallet == 'local') {
      this.cSelectorImgNine = 'assets/folder-w-border.svg';
      this.cSelectorTextNine = val;
    } else if (wallet == 'sky') {
      this.cSelectorImgNine = 'assets/cloud-transfer.svg';
      this.cSelectorTextNine = val;
    }
    this.customSelectorOpenNine = false;
  }

  backupToggler() {
    this.customSelectorOpenNine = !this.customSelectorOpenNine;
  }


  customSelectorTen(val: string, wallet: string) {
    if (wallet == 'local') {
      this.cSelectorImgTen = 'assets/folder-w-border.svg';
      this.cSelectorTextTen = val;
    } else if (wallet == 'sky') {
      this.cSelectorImgTen = 'assets/cloud-transfer.svg';
      this.cSelectorTextTen = val;
    }
    this.frackContinue = true;
    this.customSelectorOpenTen = false;
  }

  frackedToggler() {
    this.customSelectorOpenTen = !this.customSelectorOpenTen;
  }

  async fixFracked() {
    try {
      var data = {
        name: this.cSelectorTextTen
      }
      let response: any = await this.api.fix(data);
      if (response.status === "success") {
        this.fixProgress = true;
        this.doCheckFix(response.payload?.id, (data: any) => { })
      }
    }
    catch (e) {
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

  async customSelectorEleven(val: string) {
    this.cSelectorImgEleven = 'assets/cloud-transfer.svg';
    this.cSelectorTextEleven = val;
    this.customSelectorOpenEleven = false;
    this.getSkywallet(val);
  }
  passkeyToggler() {
    this.customSelectorOpenEleven = !this.customSelectorOpenEleven;
  }

  async getSkywallet(name: string) {
    try {
      let response: any = await this.api.getSky(name);
      if (response.status == "success") {
        this.showLoader = true;
        this.doCheck(response.payload?.id, (data: any) => {
        })
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async doCheck(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    console.log("task:" + task)
    console.log("task Id :" + taskID)
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.showLoader = false;
          this.passkeyImage = await fetch(`data:image/png;base64,${this.payload?.data?.png}`);
        } else {
          this.showLoader = false;
          Swal.fire({
            title: this.payload.data.message,
            icon: 'error',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) { }
          });
        }
        return;
      }
      setTimeout(() => {
        this.doCheck(taskID, xdata)
      }, 500)
    }
  }

  async donwload() {
    const blobs = await this.passkeyImage.blob();
    const newBlob = new Blob([blobs], { type: 'image/png' });
    var downloadURL = window.URL.createObjectURL(blobs);
    var link = document.createElement('a');
    link.href = downloadURL;
    link.download = this.cSelectorTextEleven + ".png";
    link.click();
  }

  showLoading(state): void {
    this.loadingMessage = '';
    if (state) {

      this.showLoader = true;

    } else {

      this.showLoader = false;

    }

  }

  clearForm() {
    this.nftSettingsForm.reset();
  }


}
