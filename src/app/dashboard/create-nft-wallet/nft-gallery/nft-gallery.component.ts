import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import Swal from 'sweetalert2';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-nft-gallery',
  templateUrl: './nft-gallery.component.html',
  styleUrls: ['./nft-gallery.component.scss']
})
export class NftGalleryComponent implements OnInit {

  public passkeyImage: any = "";
  img: any[] = [];
  payload: any;
  tag: any;
  path: string;
  sn: any;
  userLocal: string;
  all: any;
  png;
  slicedstr: string;
  picture: any;
  data: any;
  blob: any;
  arr: string[] = [];
  title1: string[] = [];
  dname1: string[] = [];
  sn1: any[] = [];
  total_sns: any[] = []
  description1: string[] = [];
  title_detail: any;
  desc_detail: any;
  sn_detail: any;
  dname_detail: any;
  domain_name: any;
  img_detail: any[] = [];
  png_detail: any;
  sn_arr: any[] = [];
  sn_arr_all: any[] = [];
  healthProg: any;
  goTODash: boolean;
  healthModal: boolean = false;
  transaction: any;
  diff_sn: any
  frackedcount: any;
  limbocount: any;
  title_name: any;
  fixModal: boolean;
  fixlimboModal: boolean;
  syncTitle: any[] = [];
  titlesToSync: any[] = [];
  dnsToSync: any[] = [];
  showLoader = false;
  loadingMessage: string = '';
  options: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/cloud_loading.json',
  };
  verifiedPng: any;
  verifiedImg: any;
  verifiedDesc: any;
  verifiedSn: any;
  response: any;
  merged = [];
  condition: any;
  hasaccepted : boolean;

  public nftDetails: boolean;
  public modalOpen: boolean;
  public modalOpen2: boolean;
  public showWalletDropdown: boolean;
  file: any ='Select path';
  WithdrawModal: boolean;
  gallery = [];
  nft_gallery: [{
    nft_sn: number,
    nft_image: string

  }] = [{
    nft_sn: 0,
    nft_image: ""
  }]
  count = 0;

  constructor(private api: ApiService, private sanitizer: DomSanitizer, private storage: EventService, private router: Router) {
    this.nftDetails = true;
    this.modalOpen = false;
    this.modalOpen2 = false;
    // this.hasaccepted = false;
  }

  ngOnInit(): void {
    this.userLocal = localStorage.getItem('userLocal');
    if (localStorage.getItem('withdraw_path') != "" && localStorage.getItem('withdraw_path') != null && localStorage.getItem('withdraw_path') != undefined) {
      this.file = localStorage.getItem('withdraw_path');
      console.log("bye");

    } else {
      console.log("hye");
    }
    this.getNftByGroups();
    this.getBalance();
  }
  imgArray = new Array();

  async getNftByGroups() {
    try {
      let response: any = await this.api.nftGroups();
      if (response.status === "success") {
        console.log(response);
        let data = response.payload;
        console.log(data.length)
        for (let i = 0; i < data.length; i++) {
          let png = data[i].PNG
          this.title1[i] = data[i].title
          this.dname1[i] = data[i].domain
          this.description1[i] = data[i].description
          this.sn1[i] = data[i].sns
          this.total_sns[i] = data[i].total_sns
          this.passkeyImage = await fetch(`data:image/png;base64,${png}`);
          const blobs = await this.passkeyImage.blob();
          const newBlob = new Blob([blobs], { type: 'image/png' });
          var downloadURL = window.URL.createObjectURL(blobs);
          var link = document.createElement('a');
          link.href = downloadURL;
          this.blob = link.href;
          this.arr[i] = this.blob
          this.img[i] = this.sanitizer.bypassSecurityTrustResourceUrl(this.blob)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  async getDetails(snvalue: any) {
    this.modalOpen = !this.modalOpen;
    // this.hasaccepted = true;
    // this.selectImgs(this.sn_detail , this.title_detail , this.dname_detail, true);

    try {
      var data;
      if (snvalue.length > 1) {
        data = snvalue[0]
        this.sn_arr_all = snvalue;
        this.nftDetails = true
        this.modalOpen2 = true;

        this.nft_gallery = [{
          nft_sn: 123,
          nft_image: ""
        }]
        for (let i = 0; i < snvalue.length; i++) {
          let response: any = await this.api.displayDetails(snvalue[i]);
          if (response.status === "success") {
            //console.log(response);
            this.title_detail = response.payload?.hostname
            this.desc_detail = response.payload?.description
            this.sn_detail = response.payload?.sn
            this.dname_detail = response.payload?.domain;
            this.png_detail = response.payload?.PNG
            this.passkeyImage = await fetch(`data:image/png;base64,${this.png_detail}`);
            const blobs = await this.passkeyImage.blob();
            const newBlob = new Blob([blobs], { type: 'image/png' });
            var downloadURL = window.URL.createObjectURL(blobs);
            var link = document.createElement('a');
            link.href = downloadURL;
            this.blob = link.href;
            this.img_detail[i] = this.sanitizer.bypassSecurityTrustResourceUrl(this.blob)
            this.nft_gallery.push({ nft_image: this.img_detail[i], nft_sn: this.sn_detail })
            var count = Object.keys(this.nft_gallery).length
            //console.log("count:" + count)
          }
        }
        var dup_array = this.nft_gallery.splice(0, 1)
        // console.log("removed item:" + dup_array)
        // for (let i = 0; i < count; i++) {
        //   let item = this.nft_gallery[i]
        //   console.log("final gallery:" + item['nft_image'])
        //   console.log("final gallery:" + item['nft_sn'])
        // }
      }
      else {
        data = snvalue
        this.nftDetails = true;
        this.modalOpen2 = false

        this.nft_gallery = [{
          nft_sn: 123,
          nft_image: ""
        }]

        let response: any = await this.api.displayDetails(data);
        if (response.status === "success") {
          console.log(response);
          this.title_detail = response.payload?.hostname
          this.desc_detail = response.payload?.description
          this.sn_detail = response.payload?.sn
          this.dname_detail = response.payload?.domain;
          this.png_detail = response.payload?.PNG
          this.passkeyImage = await fetch(`data:image/png;base64,${this.png_detail}`);
          const blobs = await this.passkeyImage.blob();
          const newBlob = new Blob([blobs], { type: 'image/png' });
          var downloadURL = window.URL.createObjectURL(blobs);
          var link = document.createElement('a');
          link.href = downloadURL;
          this.blob = link.href;
          //console.log("image:" + this.blob)
          this.img_detail[0] = this.sanitizer.bypassSecurityTrustResourceUrl(this.blob)
          //console.log("image:" + this.img_detail)
          this.nft_gallery.push({ nft_image: this.blob, nft_sn: this.sn_detail })
        }
        var dup_array = this.nft_gallery.splice(0, 1)
        //console.log("removed item:" + dup_array)
        var count = Object.keys(this.nft_gallery).length
        console.log("count:" + count)
        for (let i = 0; i < count; i++) {
          let item = this.nft_gallery[i]
          console.log("final gallery:" + item['nft_image'])
          console.log("final gallery:" + item['nft_sn'])
        }
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async download_pngImg() {
    try {
      var data = this.sn_detail

      let response: any = await this.api.checkPngValidity(data);
      // console.log(data);
      console.log("test:" + this.sn_detail)
      if (response.status === "success") {
        this.verifiedPng = response.payload?.Data
        console.log("validity :" + this.verifiedPng);
        this.passkeyImage = await fetch(`data:image/png;base64,${this.verifiedPng}`);
        const blobs = await this.passkeyImage.blob();
        const newBlob = new Blob([blobs], { type: 'image/png' });
        var downloadURL = window.URL.createObjectURL(blobs);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.title_detail + ".png";
        link.click();
      }
    }
    catch (e) {
      console.log(e);

    }
  }

  withdraw() {
    if (this.sn_arr.length == 0) {
      Swal.fire({
        title: 'Please select an NFT',
        icon: 'info',
        confirmButtonText: 'Okay',
      })
    }
    else {
      this.WithdrawModal = !this.WithdrawModal;
    }
  }
  async getPath() {
    try {
      let response: any = await this.api.filePick();
      console.log(response);
      if (response.status === "success") {
        this.file = response?.payload?.items_picked[0];
        localStorage.setItem('withdraw_path', this.file);
        console.log(this.file)
      }
    }
    catch (e) {
      console.log(e);
    }
  }
  async exportBySerialNo() {
    try {
      var data = {
        name: "NFTs",
        tag: "From John",
        type: "png",
        folder: this.file,
        sns: this.sn_arr
      }
      let response: any = await this.api.exportSNs(data);
      console.log(data);
      if (response.status === "success") {
        this.doCheck12(response.payload?.id, (data: any) => {
        });
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async doCheck12(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);

    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          window.location.reload();
          Swal.fire({
            title: "Successfully withdrawn NFTs.",
            icon: 'success',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) { }
          });
          console.log("yay! process completed");
        }

        return;
      }
      setTimeout(() => {
        this.doCheck12(taskID, xdata)
      }, 500)
    }
  }

  async selectImgs(snvalue: any, titlevalue: any, dnvalue: any, isChecked: boolean) {
    try {
      //alert(isChecked)
      if (isChecked) {

        this.merged = this.merged.concat(snvalue);
        this.titlesToSync = this.titlesToSync.concat(titlevalue)
        this.dnsToSync = this.dnsToSync.concat(dnvalue)
        //console.log("merged:" + this.merged)
        //this.titlesToSync.push(titlevalue)
        //this.dnsToSync.push(dnvalue)
        this.sn_arr = this.merged
        for (let i = 0; i < this.sn_arr.length; i++) {
          //console.log("if :" + this.sn_arr)
          //console.log('synctitle:' + this.titlesToSync)
          //console.log('synctitle:' + this.titlesToSync)
        }
      }
      else {
        //console.log("snarray :" + snvalue)
        this.sn_arr.forEach((item, index) => {
          if (snvalue == item) this.sn_arr.splice(index, 1)
          // console.log("snvalue:" + snvalue)
          // console.log("item to be removed:" + item)
          // console.log("snarray in else:" + this.sn_arr)
        });
        this.titlesToSync.forEach((item, index) => {
          if (titlevalue == item) this.titlesToSync.splice(index, 1)
        });
        this.dnsToSync.forEach((item, index) => {
          if (dnvalue == item) this.dnsToSync.splice(index, 1)
        });
      }
      for (let i = 0; i < this.sn_arr.length; i++) {
        console.log("final title:" + this.titlesToSync)
        console.log("final:" + this.sn_arr)
        console.log("final dname:" + this.dnsToSync)
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async getBalance() {
    var data = "NFTs";
    try {
      let response: any = await this.api.getTransaction(data);
      this.transaction = response.payload?.balance;
      this.frackedcount = response.payload?.fracked_count;
      this.limbocount = response.payload?.limbo_count;
      console.log("balance:" + response)
    }
    catch (e) {
      console.log(e);
    }
  }
  healthCheck() {
    if (this.transaction === 0) {
      Swal.fire({
        title: "Wallet is empty.",
        icon: 'info',
        confirmButtonText: 'Okay',
      }).then((result) => {
        if (result.value) { }
      });
    } else {
      this.healthModal = !this.healthModal;
    }
  }
  frackedCheck() {
    if (this.transaction === 0) {
      Swal.fire({
        title: "Wallet is empty.",
        icon: 'info',
        confirmButtonText: 'Okay',
      }).then((result) => {
        if (result.value) { }
      });
    } else {
      this.fixModal = !this.fixModal;
    }
  }
  limboCheck() {
    if (this.transaction === 0) {
      Swal.fire({
        title: "Wallet is empty.",
        icon: 'info',
        confirmButtonText: 'Okay',
      }).then((result) => {
        if (result.value) { }
      });
    } else {
      this.fixlimboModal = !this.fixlimboModal;
    }
  }
  async Recycle() {
    try {
      if (this.sn_arr.length == 0) {
        Swal.fire({
          title: 'Please select an NFT',
          icon: 'info',
          confirmButtonText: 'Okay',
        });
        return;
      }
      console.log("data from recycle:" + this.sn_arr)
      //var data = this.sn_arr;
      var name = this.userLocal;
      if (this.sn_arr.length > 0) {
        for (let i = 0; i <= this.sn_arr.length; i++) {
          this.data = this.sn_arr[i]
          // alert("sn.arr" + this.sn_arr[i])
          console.log("snarr recycle:" + this.data)
          let response: any = await this.api.deleteNfts(this.data, name);
          // console.log(data);
          if (response.status === "success") {
            console.log("recycle call :" + response)
            Swal.fire({
              title: "Your NFTs have been successfully turned into coins and your coins have been moved to" + " " + this.userLocal,
              icon: 'success',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) { }
            });
            setTimeout(() => {
              window.location.reload();
            }, 3000)
           
            this.router.navigate(['/dashboard/create-nft-gallery'])
          }
        }
      }

    }
    catch (e) {
      console.log(e);

    }
    setTimeout(() => {
      this.Recycle()
    }, 500)
  }

  async UploadNft() {
    try {
      this.showLoading(true);
      this.loadingMessage = "Syncing NFTs..."
      if (this.titlesToSync.length == 0) {
        Swal.fire({
          title: 'Please select an NFT',
          confirmButtonText: 'Okay',
          icon: 'info'
        })
      }
      for (let i = 0; i < this.titlesToSync.length; i++) {
        var data = {
          host_name: this.titlesToSync[i],
          domain_name: this.dnsToSync[i],
          create_txt: true,
          nft_name: "NFTs",
        }
        this.response = await this.api.syncNft(data);
        console.log(data);
        if (this.response.status === "success") {
          console.log('wohoo! it works.')
          this.showLoading(false);
          Swal.fire({
            title: "Successfully synced NFTs",
            icon: 'info',
            confirmButtonText: 'Okay',
          })
          window.location.reload();
          this.router.navigate(['/dashboard/create-nft-gallery']);
        }
        else {
          this.showLoading(false);
          this.count = this.count + 1;
          // this.title = this.response.payload.message
        }

      }
      if (this.count >= 1) {
        console.log(this.count)
        Swal.fire({
          title: this.response.payload.message,
          icon: 'error',
          confirmButtonText: 'Okay',
        })
        setTimeout(() => {
          window.location.reload();
        }, 3000)
        this.router.navigate(['/dashboard/create-nft-gallery']);
      }
      this.showLoading(false);
      return;

    }



    catch (e) {
      // this.showLoader = false;
      console.log(e);
    }
    setTimeout(() => {
      this.UploadNft()
    }, 500)

  }


  checkValidity() {
    this.toggleAuthentication();
    this.confirmAuthenticity();

  }
  async confirmAuthenticity() {
    try {
      var data = this.sn_detail

      let response: any = await this.api.checkPngValidity(data);
      // console.log(data);
      console.log("test:" + this.sn_detail)
      this.condition = response.status;
      if (response.status === "success") {
        this.verifiedPng = response.payload?.Data
        console.log("validity :" + this.verifiedPng);
        this.passkeyImage = await fetch(`data:image/png;base64,${this.verifiedPng}`);
        const blobs = await this.passkeyImage.blob();
        const newBlob = new Blob([blobs], { type: 'image/png' });
        var downloadURL = window.URL.createObjectURL(blobs);
        var link = document.createElement('a');
        link.href = downloadURL;
        this.blob = link.href;
        this.verifiedImg = this.sanitizer.bypassSecurityTrustResourceUrl(this.blob)
        this.confirmDescription();
      } else if (response.status === "error") {
        Swal.fire({
          title: response.payload?.message,
          icon: 'error',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) {

          }
        });
      }

    }
    catch (e) {
      console.log(e);

    }
  }

  async confirmDescription() {
    try {
      var data = this.sn_detail

      let response: any = await this.api.checkDescValidity(data);
      // console.log(data);
      console.log("test:" + this.sn_detail)
      if (response.status === "success") {
        this.verifiedDesc = response.payload;
        this.confirmUnique()
      }
    }
    catch (e) {
      console.log(e);

    }
  }

  async confirmUnique() {
    try {
      var data = this.sn_detail

      let response: any = await this.api.checkUniqueValidity(data);
      // console.log(data);
      console.log("test:" + this.sn_detail)
      if (response.status === "success") {
        this.verifiedSn = response.payload?.Data[0].Sn;
        console.log(this.verifiedSn)
      }
    }
    catch (e) {
      console.log(e);

    }
  }

  toggleWltFunc() {
    this.showWalletDropdown = !this.showWalletDropdown;
  }
  closeWltFunc() {
    this.showWalletDropdown = false;
  }

  toggleAuthentication() {
    this.nftDetails = !this.nftDetails;
  }
  modalToggler() {
    this.modalOpen = !this.modalOpen;
    this.nftDetails = true;
  }

  modalToggler2() {
    this.modalOpen2 = !this.modalOpen2
  }

  showLoading(state): void {
    this.loadingMessage = '';
    if (state) {

      this.showLoader = true;

    } else {

      this.showLoader = false;

    }

  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  getCorrectRoute() {
    this.router.navigate(['/dashboard/create-nft']);
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
  }
  getRoute(){
    this.router.navigate(['/dashboard/import-nft']);
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
  }
  MintToExisting() {
    this.title_name = this.title_detail
    this.domain_name = this.dname_detail
    console.log("tab" + this.title_name)
    if (this.title_name != '') {
      this.router.navigate(['/dashboard/existing-nft'], { queryParams: { title_name: this.title_name, domain_name: this.domain_name, snvalue: this.sn_detail } })
    }
  }


}
