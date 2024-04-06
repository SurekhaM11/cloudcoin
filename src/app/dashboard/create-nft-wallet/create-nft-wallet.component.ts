import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import Swal from 'sweetalert2';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';


@Component({
  selector: 'app-create-nft-wallet',
  templateUrl: './create-nft-wallet.component.html',
  styleUrls: ['./create-nft-wallet.component.scss']
})
export class CreateNftWalletComponent implements OnInit {

  nftForm: FormGroup;
  public format: any;
  public direction: any;
  public transperancy: number;
  public textformat: boolean;
  public colorpicker: any;
  public cSelectorImg: string;
  public cSelectorText: string;
  public destName: string;
  public customSelectorOpen: boolean;
  public all: any;
  public userLocal: any;
  public form: any;
  public nftnumber: number
  public alertmessage: string;
  base: any = [];
  tag: any;
  baseAdd: any = [];
  files: any[] = [];
  file: string;
  payload: any;
  totalimport: any;
  type: string;
  path: string;
  sn: any;
  regexp: string
  filepick: boolean = false;
  walletselected: boolean = false;
  fileselected: boolean = false;
  showLoader = false;
  loadingMessage: string = '';
  options: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/cloud_loading.json',
  };
  upload_url: any;
  secret_key: any;
  api_key: any;
  dname: any;
  nftSettingsForm: any;
  dname_enable: boolean
  constructor(private fb: FormBuilder,
    private storage: EventService,
    private api: ApiService,
    private router: Router) {
    this.cSelectorText = '';
  }

  async ngOnInit(): Promise<string> {
    // this.regexp = "^(?:[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.)+[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]$";
    this.regexp = "^(?:[a-zA-Z0-9\-][a-zA-Z0-9\-]{0,61})*([\.]{1,1}[a-z]{2,})+$";
    this.nftForm = new FormGroup({
      'title': new FormControl('', [Validators.required, Validators.pattern('[a-zA-z0-9-]*')]),
      'dnsname': new FormControl('', Validators.pattern(this.regexp)),
      'nftnumber': new FormControl(1, [Validators.required, Validators.min(1)]),
      'format_one': new FormControl('false'),
      'xcoordinates': new FormControl(10),
      'ycoordinates': new FormControl(10),
      'colorpicker': new FormControl('#000000',),
      'transparency': new FormControl(1, [Validators.min(0), Validators.max(1)]),
      'fontsize': new FormControl(16, [Validators.min(16), Validators.max(72)]),
      'description': new FormControl(),
      'personal_text': new FormControl()
    });
    this.userLocal = localStorage.getItem('userLocal');
    this.getAllwallet();
    this.textformat = false;
    this.type = localStorage.getItem('wallet');
    this.getConfDetails();
    //console.log("this.dname:" + dname)
    let response: any = await this.api.returnNftConf();
    if (response.status === "success") {
      this.upload_url = response.payload.upload_url;
      console.log("test" + " " + this.upload_url)
      if (this.upload_url != 'undefined') {
        var splitted = this.upload_url.split("/", 3)
        console.log("splitted:" + splitted[2])
        this.dname = splitted[2]
        this.dname_enable = true;
      }
      else {
        //alert("undefined url")
        console.log("any thing")
        this.dname_enable = false;
      }
      this.nftForm.patchValue({
        dnsname: this.dname
      })
    } else {
      console.log('no previous configurations found');
    }
    console.log(this.dname)
    //if(this.d)
    return response
  }


  isValidInput(value: any) {
    return this.nftForm.controls[value].invalid &&
      (this.nftForm.controls[value].dirty || this.nftForm.controls[value].touched);
  }

  async onSubmit(form: FormGroup) {
    console.log(this.nftForm)
    this.exportNft()
  }

  async balancecheck() {
    this.nftnumber = this.nftForm.get('nftnumber').value;
    let response: any = await this.api.getTransaction(this.destName);
    if (response.payload.balance < this.nftnumber) {
      Swal.fire({
        title: 'You cannot make this number of NFTs because selected wallet balance is ' + response.payload.balance + 'cc',
        icon: 'info',
        confirmButtonText: 'Okay'
      })
    }
  }

  async customSelector(val: string, type: string) {
    this.destName = val;
    this.cSelectorImg = 'assets/folder-w-border.svg';
    this.cSelectorText = this.all[0].name;
    this.customSelectorOpen = false;
    console.log("val " + this.destName)
    this.cSelectorText = val
    this.walletselected = true;
    console.log("wallet selected:" + this.walletselected)
    let response: any = await this.api.getTransaction(this.destName);
    if (response.payload.balance == 0) {
      Swal.fire({
        title: 'You cannot make NFTs because your wallet is empty.',
        icon: 'info',
        confirmButtonText: 'Okay'
      });
    }

  }
  customSelToggler(val: string) {
    this.customSelectorOpen = !this.customSelectorOpen;
  }

  async getAllwallet() {
    try {
      let response: any;
      response = await this.api.getWallet();
      if (response.status == 'success') {
        this.all = response.payload;
        //console.log(this.all)
        console.log("this.all" + this.all)
        this.cSelectorImg = 'assets/folder-w-border.svg';
        // if (this.all.length == 1) {
        this.cSelectorText = this.all[0].name;
        this.customSelectorOpen = false;
        this.walletselected = true;
        this.destName = this.all[0].name
        //}
      }
    }
    catch (e) {
      console.log(e);
    }
  }
  formatradio(e) {
    this.format = e.target.value;
    console.log(" radio button value:" + this.format)
    if (this.format == 'false') {
      this.textformat = false;
      console.log("textformat if:" + this.textformat)
    }
    else if (this.format == 'true') {
      this.textformat = true
      console.log(this.textformat)
    }
  }

  async getPath() {
    try {
      let response: any = await this.api.importFile();
      if (response.status == "success") {
        this.file = response.payload.items_picked[0];
        var last = this.file.substring(this.file.lastIndexOf(".") + 1, this.file.length);
        if (last == 'bin' || last == 'stack') {
          Swal.fire({
            title: 'Please select an image with png format',
            icon: 'info',
            confirmButtonText: 'Okay'
          })
          this.file = '';
        }
        this.filepick = true;
      }
      else {
        this.filepick = false;
        Swal.fire({
          title: 'Dialog Canceled',
          icon: 'info',
          confirmButtonText: 'Okay'
        })
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  // async importNFT() {

  //   try {

  //     for (let i = 0; i < this.files?.length; i++) {
  //       this.base.push({ 'type': 'file', 'data': this.files[i] })
  //     }
  //     var data = {
  //       name: this.destName,
  //       tag: this.tag,
  //       items: this.base
  //     }
  //     let response: any = await this.api.import(data);
  //     if (response.status === "success") {
  //       console.log('hi');
  //       this.doCheck(response.payload?.id, (data: any) => {

  //       });
  //     } else {

  //       Swal.fire({
  //         title: response.payload.message,
  //         icon: 'error',
  //         confirmButtonText: 'Okay',
  //       }).then((result) => {
  //         if (result.value) { { } }
  //       });
  //     }
  //   }

  //   catch (e) {
  //     console.log(e);

  //   }
  // }

  // async doCheck(taskID: any, xdata: any) {
  //   let task: any = await this.api.doCheck(taskID);


  //   if (task) {
  //     this.payload = task.payload;
  //     this.totalimport = this.payload.data?.pown_results?.total;

  //     if (this.payload.status == "error" || this.payload.status == "completed") {
  //       if (this.payload.status == "completed") {

  //         this.storage.setItem("wallet", "localwallet", 'upload');

  //       }
  //       return;
  //     }
  //     setTimeout(() => {
  //       this.doCheck(taskID, xdata)
  //     }, 500)

  //   }
  // }

  async exportNft() {
    try {
      var data = {
        name: this.destName,
        amount: Number(this.nftForm.get('nftnumber').value),
        template_path: this.file,
        // text_color: String(this.nftForm.get('colorpicker').value),
        // domain_name: String(this.nftForm.get('dnsname').value),
        // text: String(this.nftForm.get('personal_text').value),
        // x: Number(this.nftForm.get('xcoordinates').value),
        // y: Number(this.nftForm.get('ycoordinates').value),
        // is_vertical: true,
        // font_size: Number(this.nftForm.get('fontsize').value),
        text_color: "#000000",
        domain_name: String(this.nftForm.get('dnsname').value),
        text: "",
        x: 10,
        y: 10,
        is_vertical: true,
        font_size: 16,
        host_name: String(this.nftForm.get('title').value),
        description: String(this.nftForm.get('description').value),
        is_transparent: true,
        write_sn: false
      }
      let response: any = await this.api.exportCoinasNft(data);
      console.log(data);
      this.showLoader = true;
      this.loadingMessage = "Creating NFT..."
      if (response.status === "success") {
        this.doCheck1(response.payload?.id, (data: any) => {
        });
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async doCheck1(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          console.log("process completed")
          this.showLoader = false;
          Swal.fire({
            title: 'NFT has been created successfully',
            icon: 'success',
            confirmButtonText: 'Okay'
          })
          this.router.navigate(['/dashboard/create-nft-gallery']);
        } else {
          this.showLoader = false;
          Swal.fire({
            title: 'Failed to create NFT',
            icon: 'error',
            confirmButtonText: 'Okay'
          })
          this.router.navigate(['/dashboard/create-nft']);
          window.location.reload();
        }
        return;
      }
      setTimeout(() => {
        this.doCheck1(taskID, xdata)
      }, 500)
    }
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
  async getConfDetails(): Promise<string> {
    console.log('yayyyyy')
    try {
      let response: any = await this.api.returnNftConf();
      if (response.status === "success") {
        this.upload_url = response.payload.upload_url;
        // this.secret_key = response.payload.upload_secret_key;
        // this.api_key = response.payload.cf_api_key;
        //console.log("test" + " " + this.secret_key)
        var splitted = this.upload_url.split("/", 3)
        console.log("splitted:" + splitted[2])
        this.dname = splitted[2]
      } else {
        console.log('no previous configurations found');
      }
      // this.nftForm.patchValue({
      // secretkey: this.secret_key,
      // apikey: this.api_key,
      // url: this.upload_url,
      //   dnsname: this.dname

      // })
      return this.dname;
    }

    catch (e) {
      console.log(e);

    }

  }

}