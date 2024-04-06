import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-import-nft',
  templateUrl: './import-nft.component.html',
  styleUrls: ['./import-nft.component.scss']
})
export class ImportNftComponent implements OnInit {

  userLocal: string;
  file: any = [];
  filepick: any[] = [];
  files: any[] = [];
  base: any = [];
  tag: any;
  type: string;
  totalimport: any;
  payload: any;
  btn: boolean = true;
  loadingMessage: string;
  showLoader: boolean;
  options: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/cloud_loading.json'
  };

  constructor(
    private api: ApiService,
    private router: Router,
    private storage: EventService
  ) { }

  ngOnInit(): void {
    this.userLocal = localStorage.getItem('userLocal');
    this.type = localStorage.getItem('wallet');
  }


  async getPath() {
    try {
      let response: any = await this.api.importFile();
      if (response.status == "success") {
        this.files = response?.payload?.items_picked;
        this.btn = false;
        for (let i = 0; i < this.files.length; i++) {
          var last = this.files[i].substring(this.files[i].lastIndexOf(".") + 1, this.files[i].length);
          var file = this.files[i]
          var pop = file.split('.').slice(0, -1).join('.')
          var pop2 = pop.split('.').pop();
          if (pop2 != 'ccnft') {
            Swal.fire({
              title: 'Please make sure all the files that you have selected have proper format',
              icon: 'info',
              confirmButtonText: 'Okay'
            })
            this.files = [];
            this.btn = true;
          }
        }
      }
    }
    catch (e) {
      console.log(e);
    }
  }
  async importNFT() {
    console.log("test")
    try {
      for (let i = 0; i < this.files?.length; i++) {
        this.base.push({ 'type': 'file', 'data': this.files[i] })
      }
      var data = {
        name: "NFTs",
        tag: this.tag,
        items: this.base
      }
      this.showLoading(true);
      this.loadingMessage = 'Importing NFTs...'
      let response: any = await this.api.import(data);
      if (response.status === "success") {
        console.log('hi');
        this.doCheck(response.payload?.id, (data: any) => {

        });
      } else {
        this.showLoading(false);
        Swal.fire({
          title: response.payload.message,
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

  async doCheck(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          if ((this.payload?.data?.pown_results?.fracked != 0) || (this.payload?.data?.pown_results?.limbo != 0) || this.payload?.data?.pown_results?.counterfeit != 0) {
            Swal.fire({
              title: 'Failed to Import. The NFT that you are trying to import is not Authentic.',
              icon: 'error',
              confirmButtonText: 'Okay'
            });
            setTimeout(() => {
              window.location.reload();
            }, 3000)
          }
          else {
            this.showLoading(false);
            Swal.fire({
              title: 'Successfully imported NFT to NFT Gallery',
              icon: 'success',
              confirmButtonText: 'Okay'
            });
            this.router.navigate(['/dashboard/create-nft-gallery']);
          }
        }
        else {
          this.showLoading(false)
          this.files = [];
          this.btn = true;
          Swal.fire({
            title: this.payload.data.message,
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        }
        return;
      }
      setTimeout(() => {
        this.doCheck(taskID, xdata)
      }, 500)

    }

  }
  deleteFile(index: number) {
    this.files.splice(index, 1);

    if (this.files.length == 0) {
      this.btn = true;

    }
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  showLoading(state): void {
    this.loadingMessage = '';
    if (state) {
      this.showLoader = true;

    } else {
      this.showLoader = false;
    }
  }
}

