import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { ApiService, DataService } from 'src/app/services/api.service';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { info } from 'console';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';

export interface tableData {
  datetime: string;
  message: string;
  type: string;
  amount: any;
  running_balance: any;
}
export interface tableData1 {
  time: string;
  memo: string;
  type: string;
  amount: Number;
  balance: Number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  dtOptions: any = {};
  newPath: any;
  dtTrigger: Subject<any> = new Subject<any>();

  public tansactiondetails: any = [];
  totalSkyBalance: any;
  public tabSelector: string;
  public showDropDown: boolean;
  showRaida: boolean = false;
  public showMoreDropDown: boolean;
  public showWalletDropdown: boolean;
  public emptyHome: boolean;
  public balance = 0;
  public balanceString = '0';
  public balanceAmountString = '0';
  checkFracked: boolean = false;
  public balances: any = {};
  errorMessage: string = null;
  public themeDarkActive: boolean;
  public themeLightActive: boolean;
  totalBalance: any = 0;
  deleteSkyvault: string;
  showbal: boolean = false;
  checkerror: boolean = false;

  public passkeyImage: any = "";
  public customSelectorOpenEleven: boolean;
  public cSelectorImgEleven: string;
  public cSelectorTextEleven: string;


  options: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/cloud_loading.json',
    // animationData: this.lottieTransferState.get('data.json'),
  };
  errorOptions: AnimationOptions = {
    path: 'https://raida11.cloudcoin.global/animation/error.json'
  };
  public showLeftBarOnSm: boolean = true;
  showLoader = false;
  receiptTime: any;
  receipid: any;
  skyLength: any;
  syncProg: any;
  latencies: any;
  updatedBal: any = 0;
  showLoader1: boolean = false;
  showNormal = true;
  recordCheck: any;
  showError = false;
  skywallet: string = null;
  balanceBreakup: string = null;
  opinions = 0;
  deleteUserModal: boolean;
  deleteForm: FormGroup;
  loadingMessage = '';
  successInfo: boolean;
  errorInfo: boolean;
  receiptdetails: any;
  showreceipt: boolean = false;
  deletedAkyvault: string = "";
  payload: any;
  taskId: any;
  successMsg: string;
  errorMsg: string;
  raidaCheck: boolean;
  serversList: string;
  userDetails: any;
  transaction: any = [];
  type: string;
  userLocal: string;
  usersky: string;
  nft: string;
  skyDetails: any;
  term: string;
  getAllsky: any;
  wallet_name: any;
  all: any;
  allSky: any;
  data: any;
  sortedSkyData: tableData1[];
  deleteTrans: FormGroup;
  fixModal: boolean = false;
  fixlimboModal: boolean = false;
  deleteModal: boolean = false;
  backupModal: boolean = false;
  healthModal: boolean = false;
  renameModal: boolean = false;
  listModal: boolean = false;
  change: boolean = false
  test: any;
  detectChange: boolean = false;
  displayedColumns: string[] = ['datetime', 'message', 'type', 'amount', 'running_balance']
  displayedColumnsSky: string[] = ['time', 'memo', 'type', 'amount', 'balance']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('reName') searchElement: ElementRef;
  dataSourceSky: MatTableDataSource<tableData1>;
  sortedData: tableData[];
  serialNo;
  downloadPasskey: string;
  public cSelectorText: string;
  public customSelectorOpen: boolean;
  public customSelectorOpenSky: boolean;
  public cSelectorTextSky: string
  destName: string;
  totalcoins: any;
  totalauthentic: any;
  totalfracked: any;
  totalcounterfeit: any;
  totallimbo: any;
  transactions: any;
  allNft: any;
  skynumber: any;
  skyName: any;
  walletName: any;
  sno: string;

  constructor(
    private auth: LoginService,
    private onlyonce: DataService,
    private router: Router,
    private http: HttpClient,
    private eventService: EventService,
    private api: ApiService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {

    this.totalBalance = Number(sessionStorage.getItem('totalBal'));
    this.totalSkyBalance = Number(sessionStorage.getItem('totalSkyBal'));
    this.usersky = localStorage.getItem('userSky');
    this.type = localStorage.getItem('wallet');
    this.userLocal = localStorage.getItem('userLocal');
    this.nft = localStorage.getItem('Nft')
    this.sno = localStorage.getItem('serial');

    this.customSelectorOpenEleven = false;
    this.cSelectorImgEleven = '';
    this.cSelectorTextEleven = 'Select a skyvault';
    this.cSelectorText = 'Choose Wallet';
    this.cSelectorTextSky = 'Choose SkyVault';
    this.customSelectorOpen = false;
    this.customSelectorOpenSky = false;
    this.activeTab()

  }

  ngOnInit(): void {
    this.getEcho();
    setInterval(() => {
      this.getEcho();
    }, 20000);

    this.eventService.changeLocal.subscribe
      (message => {
        if (message[0] != "Empty") {
          if (message.length == 0) {
            this.totalBalance = 0;
            this.getAllwallet();
          } else {
            this.all = message;
          }
        }
      });
    this.eventService.changeSky.subscribe
      (message => {
        if (message[0] != "Empty") {
          if (message.length == 0) {
            this.totalSkyBalance = 0;
            sessionStorage.setItem('totalSkyBal', '0');
            this.getList();
            this.getSky();
          } else {
            this.showbal = true;
            this.allSky = message;
          }
          console.log(message);
        }
      });
    this.eventService.changeNft.subscribe
      (message => {
        if (message[0] != "Empty") {
          if (message.length == 0) {
            this.getNftByGroups();
          } else {
            this.allNft = message;
          }

        }
      });
    if (window.innerWidth < 992) {
      this.showLeftBarOnSm = false
    }
    this.deleteForm = this.fb.group({
      check2: ['', [Validators.required]]
    });
    this.deleteTrans = this.fb.group({
      check2: ['', [Validators.required]]
    });

    // router.events
    // .pipe(filter(event => event instanceof NavigationEnd))
    // .subscribe((event: NavigationEnd) => {
    //   console.log('prev:', event.url);
    //   alert(event.url);
    // });
    this.test = this.eventService.watchStorage().subscribe((data: string) => {
      this.type = localStorage.getItem('wallet');
      if (data == 'changelocal') {
        this.userLocal = localStorage.getItem('userLocal');
        this.wallet_name = this.userLocal;
        this.getTransaction();
      } else if (data == 'changesky') {
        this.checkerror = false;
        this.usersky = localStorage.getItem('userSky');
        this.getSkywallet();
      } else if (data === 'rename' || data == 'upload' || data === 'download' || data === 'transfer' || data == 'localdelete' || data == 'createlocal') {
        this.userLocal = localStorage.getItem('userLocal');
        this.getTransaction();
        this.getAllwallet();
      } else if (data === 'deposit' || data === 'withdraw' || data == 'skytransfer') {
        this.getSkywallet();
        // alert('sky');
        // this.usersky = localStorage.getItem('userSky');
        // this.skyBal = true;
        // this.sortedSkyData = [];
        // this.skyDetails = [];
        // this.getSkywallet();
        // this.getList();
      } else if (data === 'skydelete' || data == 'createsky') {
        this.usersky = localStorage.getItem('userSky');
        this.getSkywallet();
      }
    })
    this.showDropDown = false;
    this.showMoreDropDown = false;
    this.emptyHome = false;
    let localcoin = JSON.parse(localStorage.getItem('cc'));
    let myCurrentDate = new Date();
    // let myPinitializeastDate=new Date(myCurrentDate);
    // myPastDate.setDate(myPastDate.getDate() - 15);
    let datacheck = {
      "coin": {
        an: localcoin?.an,
        sn: localcoin?.sn
      },
      "start_ts": parseInt((myCurrentDate.getTime() / 1000).toString())
    }
    // this.eventService.currentMessage.subscribe
    // (message => (this.userLocal= message));
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    // <= Always get current value!
    // if (sessionStorage.getItem('trans') != 'transaction') {
    if (localStorage.getItem('wallet') == 'skywallet') {
      this.getSkywallet();
    } else {
      this.getTransaction();
    }
    this.showWalletDropdown = false;
    // this.auth.watch().subscribe((value) => {
    //   if (!value) {
    //     this.router.navigate(['/welcome']);
    //   }
    // });
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 2
    // };
    // this.dtTrigger.next();
    console.log("wallet that will be selected" + " " + this.userLocal)
    console.log("wallet that will be selected" + " " + this.usersky)
  }

  ngOnDestroy() {
    this.test?.unsubscribe()
  }

  // localwallet function

  async getAllwallet() {
    try {
      let response: any;
      response = await this.api.getWallet();
      if (response.status == "success") {
        this.all = response.payload;
        this.walletName = this.all[0].name
        if (this.all?.length == 0) {
          this.eventService.changeLocaldata(["Empty"]);
        } else {
          this.eventService.changeLocaldata(this.all);
        }
        localStorage.setItem('localLength', this.all?.length);
        // localStorage.setItem('userLocal' , this.walletName);

        for (let i = 0; i < this.all.length; i++) {
          this.totalBalance = this.totalBalance + Number(this.all[i]?.balance);
        }
        sessionStorage.setItem('totalBal', this.totalBalance);
        let data = this.onlyonce.getData();
        if (data != 'leftover') {
          this.all.forEach(item => {
            this.leftover(item.name);
          });
        }
      }
      this.createWallet(this.walletName);
    }
    catch (e) {
      console.log(e);
    }
  }

  async getNftByGroups() {
    try {
      let response: any = await this.api.nftGroups();
      if (response.status === "success") {
        this.allNft = response.payload;
        if (this.allNft?.length == 0) {
          this.eventService.changenftdata(['Empty']);
        } else {
          this.eventService.changenftdata(this.allNft)
        }

      }
    } catch (e) {
      console.log(e)
    }
  }

  async leftover(name: string) {
    try {
      let response: any = await this.api.leftover(name);
      if (response.status === "success") {
        this.onlyonce.setData('leftover')
        if (response?.payload?.balance > 0) {
          Swal.fire({
            title: "Looks like the last import did not finish. Continuing import leftover coins",
            icon: 'info',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) {
              {
                this.suspect(name);
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

  async suspect(name: string) {
    try {
      var data = {
        name: name,
        tag: "leftover coin",
        items: [{ type: "suspect" }]
      }
      let response: any = await this.api.suspect(data);

      if (response.status === "success") {
        this.showLoader = true;
        this.doImport(response.payload?.id, (data: any) => {
        });
      }
    }
    catch (e) {
      console.log(e);
    }
  }
  createWallet(name) {
    this.userLocal = name;
    localStorage.setItem('wallet', 'localwallet')
    this.eventService.setItem('userLocal', name, "changelocal")
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
  }
  createSkyVault(name) {
    this.usersky = name;
    localStorage.setItem('wallet', 'skywallet');
    this.eventService.setItem('userSky', name, 'changesky');
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
  }

  goToGallery(name) {

    localStorage.setItem('wallet', 'nftwallet')
    this.eventService.setItem('Nft', name, "changenft")
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
  }
  async doImport(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.showLoader = false;
          this.eventService.setItem("wallet", "localwallet", 'upload');
        } else {
          this.showLoader = false;
          Swal.fire({
            title: "Failure! could not proceed with the transaction. " + this.payload?.data?.message,
            icon: 'error',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) { { } }
          });
        }
        return;
      }
      setTimeout(() => {
        this.doImport(taskID, xdata)
      }, 500)

    }
    else {
      this.showLoader = false;
    }
  }

  async getList() {
    try {
      let response: any = await this.api.getList();
      if (response.status == "success") {
        this.showbal = true;
        this.allSky = response.payload;
        this.skynumber = this.allSky.length;
        // this.skyName = this.allSky[0].name
        var y = this.allSky.filter(x => {
          return x.name == this.usersky
        })

        // alert("from getlist:" + this.allSky?.length)
        localStorage.setItem('skyLength', this.allSky?.length);
        localStorage.setItem('serial', y[0]?.idcoin?.sn);
        let data = this.onlyonce.getData();
        if (data != 'leftover') {
          this.allSky.forEach(item => {
            this.skydetect(item.name);
          });
        }
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async skydetect(d: string) {
    try {
      var data = {
        name: d
      }
      let response: any = await this.api.detectsky(data);
      console.log(response);
      if (response.status == "success") {
        this.onlyonce.setData('leftover');
        this.detectSkyvault(response.payload?.id, d, (data: any) => { })
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async detectSkyvault(taskID: any, name: string, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    console.log("Task done: ", task);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          if (this.payload?.data?.counterfeit != 0) {
            this.deleteSkyvault = name;
            this.deleteSky();
            Swal.fire({
              title: name + " Pass Key is counterfeit!",
              icon: 'info',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) { { } }
            });
          }
          else if (this.payload?.data?.fracked != 0) {
            this.fixKey(name, this.payload?.data?.coins[0].pownstring);
            Swal.fire({
              title: name + " Pass Key is fracked!",
              icon: 'info',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) { { } }
            });
          }
        }
        return;
      }
      setTimeout(() => {
        this.detectSkyvault(taskID, name, xdata)
      }, 500)
    }
  }

  async fixKey(skyname: string, pown: any) {
    try {
      var data = {
        name: skyname,
        pownstring: pown
      }
      let response: any = await this.api.idFix(data);
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
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          if (this.payload?.data?.number_failed === 0) {
            Swal.fire({
              title: "Pass Key was Fixed and is now Healthy",
              icon: 'success',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) { { } }
            });
          } else {
            Swal.fire({
              title: "Pass Key is fracked and the attempt to fix failed. Try again later",
              icon: 'error',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) { { } }
            });
          }
        }
        else {
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

  async deleteSky() {
    try {
      let response: any = await this.api.deleteFromFolder(this.deleteSkyvault);
      if (response.status == "success") {
        this.doCheck1(response.payload?.id, (data: any) => { })
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async doCheck1(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    console.log("Task done: ", task);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.getlistafterDelete();
          var index = this.allSky.findIndex(x =>
            x.name === this.deleteSkyvault
          );
          this.allSky.splice(index, 1);
          this.eventService.changeskydata(this.allSky);
          Swal.fire({
            title: "We deleted " + this.deleteSkyvault + " because it's Pass Key is counterfeit.",
            icon: 'success',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) {
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
  }

  async getlistafterDelete() {
    try {
      let response: any = await this.api.getList();
      if (response.status === 'success') {
        var skyDetails = response.payload;
        if (skyDetails?.length !== 0) {
          // this.eventService.changeskydata(skyDetails);
          this.eventService.setItem('userSky', skyDetails[0].name, 'skydelete');
        } else {
          this.eventService.changeskydata("Empty");
          this.eventService.setItem('wallet', 'localwallet', 'localdelete');
        }
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async getSky() {
    try {
      let response: any = await this.api.getAllSky();
      if (response.status == "success") {
        // this.spinner.show();
        // this.showbal = false;
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
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.allSky = this.payload.data;
          // this.skyName = this.payload.data[0].name
          // localStorage.setItem('userSky' , this.skyName)
          // this.spinner.hide();
          // this.showbal = true;
          if (this.allSky?.length == 0) {
            this.eventService.changeskydata(["Empty"]);
          } else {
            this.eventService.changeskydata(this.allSky);
          }
          for (let i = 0; i < this.allSky.length; i++) {
            this.totalSkyBalance = this.totalSkyBalance + Number(this.allSky[i]?.balance);
          }
          sessionStorage.setItem('totalSkyBal', this.totalSkyBalance);
        }
        return;
      }
      setTimeout(() => {
        this.doCheck(taskID, xdata)
      }, 500)
    }
  }

  getWalletDetail(name) {
    this.userLocal = name;
    localStorage.setItem('wallet', 'localwallet')
    this.eventService.setItem('userLocal', name, "changelocal")
    // this.router.navigate(["/dashboard/home"]);
    this.fixFracked()
  }

  getSkyDetail(name, id) {
    this.usersky = name;
    localStorage.setItem('wallet', 'skywallet');
    this.eventService.setItem('userSky', name, 'changesky');
    localStorage.setItem('serial', id);
    // this.router.navigate(["/dashboard/home"]);
  }

  callLeftBar() {
    if (window.innerWidth < 992) {
      this.showLeftBarOnSm = true;
    }
  }
  closeLeftBar() {
    if (window.innerWidth < 992) {
      this.showLeftBarOnSm = false;
    }
  }

  transferCC() {
    if (this.type === "localwallet") {
      if (Number(localStorage.getItem('localLength')) > 1 && this.transaction.payload?.balance != 0) {
        this.router.navigate(['/dashboard/transactions/transfer']);
        this.fixFracked();
      } else if (Number(localStorage.getItem('localLength')) < 2) {
        Swal.fire({
          title: 'You can not transfer as there is only one localwallet.',
          icon: 'info',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) {
          }
        });
      }
      else if (this.transaction.payload?.balance == 0 || this.checkerror) {
        Swal.fire({
          title: 'You cannot transfer as your wallet is empty.',
          icon: 'info',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) {
          }
        });
      }
    }
    else {
      if (Number(localStorage.getItem('skyLength')) > 1 && this.skyDetails?.balance != 0 && this.checkerror == false) {
        this.router.navigate(['/dashboard/transactions/transfer-cc'], { queryParams: { id: '1' } });
      } else if (this.skynumber < 2) {
        Swal.fire({
          title: 'You can not transfer between as there is only one SkyVault.',
          icon: 'info',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) {
          }
        });
      } else if (this.skyDetails?.balance == 0 || this.checkerror) {
        Swal.fire({
          title: 'You can not transfer between as your skyVault is empty.',
          icon: 'info',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) {
          }
        });
      }
    }
  }

  public doFilter = (value: string) => {
    // this.dataSourceSky.filter = value.trim().toLowerCase();
  }

  toggleDropDown() {
    this.showDropDown = !this.showDropDown;
  }
  closeDropDown() {
    this.showDropDown = false;
  }

  toggleWltFunc() {
    this.showWalletDropdown = !this.showWalletDropdown;
  }
  closeWltFunc() {
    this.showWalletDropdown = false;
  }

  toggleMoreDropdown() {
    this.showMoreDropDown = !this.showMoreDropDown;
  }
  closeMoreDropdown() {
    this.showMoreDropDown = false;
  }

  sortData(sort: Sort) {
    const data = this.transaction.payload?.transactions.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      //console.log("Sorted data:"+ this.sortedData)
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'datetime':
          return this.compare(a.datetime, b.datetime, isAsc);
        case 'message':
          return this.compare(a.message, b.message, isAsc);
        case 'type':
          return this.compare(a.type, b.type, isAsc);
        case 'amount':
          return this.compare(a.amount, b.amount, isAsc);
        case 'running_balance':
          return this.compare(a.running_balance, b.running_balance, isAsc);
        default:
          return 0;
      }
    });
  }

  sortSkyData(sortSky: Sort) {
    const data = this.skyDetails?.statements.slice();
    if (!sortSky.active || sortSky.direction === '') {
      this.sortedSkyData = data;
      return;
    }

    this.sortedSkyData = data.sort((a, b) => {
      const isAsc = sortSky.direction === 'asc';
      switch (sortSky.active) {
        case 'time':
          return this.compare(a.time, b.time, isAsc);
        case 'memo':
          return this.compare(a.memo, b.memo, isAsc);
        case 'type':
          return this.compare(a.type, b.type, isAsc);
        case 'amount':
          return this.compare(a.amount, b.amount, isAsc);
        case 'balance':
          return this.compare(a.balance, b.balance, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  // sortData(name){
  //   if(name == 'Date'){
  //     this.transaction.payload?.transactions.sort((a, b) => b.datetime - a.datetime);
  //   }
  //   else if(name == 'Transaction remarks'){
  //     this.transaction.payload?.transactions.sort((a, b) => {
  //       let fa = a.message.toLowerCase(),
  //           fb = b.message.toLowerCase();

  //       if (fa < fb) {
  //           return -1;
  //       }
  //       if (fa > fb) {
  //           return 1;
  //       }
  //       return 0;
  //   });
  //   }
  //   else if(name === "Type"){
  //     this.transaction.payload?.transactions.sort((a, b) => {
  //       let fa = a.type.toLowerCase(),
  //           fb = b.type.toLowerCase();

  //       if (fa < fb) {
  //           return -1;
  //       }
  //       if (fa > fb) {
  //           return 1;
  //       }
  //       return 0;
  //   });
  //   }
  //   else if(name == 'Amount'){
  //     this.transaction.payload?.transactions.sort((a, b) => a.amount - b.amount);
  //   }
  // }

  ngAfterViewInit(): void { }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  async rename() {
    try {
      var data = this.userLocal;
      var name = { new_name: this.wallet_name };
      //alert("data from rename:"+ data)

      let response: any = await this.api.rename(data, name);
      if (response.status === "success") {
        this.renameModal = !this.renameModal;
        const newArr = this.all.map(obj => {
          if (obj.name === this.userLocal) {
            return { ...obj, name: this.wallet_name };
          }
          return obj;
        });
        this.eventService.changeLocaldata(newArr);
        this.eventService.setItem('userLocal', this.wallet_name, 'changelocal');
        Swal.fire({
          title: 'Wallet has been renamed!',
          icon: 'success',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) {
            // this.eventService.setItem("wallet", "localwallet", "rename");
          }
        });
      } else {
        this.renameModal = !this.renameModal;
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


  async donwload_passkey() {
    const blobs = await this.passkeyImage.blob();
    const newBlob = new Blob([blobs], { type: 'image/png' });
    var downloadURL = window.URL.createObjectURL(blobs);
    var link = document.createElement('a');
    link.href = downloadURL;
    link.download = this.usersky + ".png";
    link.click();
  }

  // async getAllwallet() {
  //   try {
  //     let response: any;
  //     response = await this.api.getWallet();
  //     if (response.status == "success") {
  //       this.all = response.payload;
  //       localStorage.setItem('localData', JSON.stringify(this.all))
  //       localStorage.setItem('localLength', this.all.length);
  //     }
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }
  // }

  download(type: string) {
    if (type === 'local') {
      if (this.transaction?.payload?.transactions?.length === 0) {
        Swal.fire({
          title: 'No Transactions.',
          icon: 'info',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) { }
        });
      } else {
        this.downloadFile(this.transaction?.payload?.transactions, 'jsontocsv', this.userLocal);
      }
    } else {
      if (this.skyDetails?.statements?.length === 0 || this.checkerror) {
        Swal.fire({
          title: 'No Transactions.',
          icon: 'info',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) { }
        });
      } else {
        this.downloadFile(this.skyDetails.statements, 'jsontocsv', this.usersky);
      }
    }
  }
  async customSelectorEleven(val: string) {
    this.cSelectorImgEleven = 'assets/cloud-transfer.svg';
    this.cSelectorTextEleven = val;
    this.customSelectorOpenEleven = false;
    this.downloadpasskey();
  }
  passkeyToggler() {
    this.customSelectorOpenEleven = !this.customSelectorOpenEleven;
    alert("this.customselectoreleven:" + this.customSelectorEleven)
  }

  async downloadpasskey() {
    try {
      let response: any = await this.api.getSky(this.usersky);
      if (response.status == "success") {
        this.showLoader = true;
        this.doCheck_home(response.payload?.id, (data: any) => {
        })
      }
    }
    catch (e) {
      console.log(e);
    }
  }
  async doCheck_home(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.showLoader = false;
          this.passkeyImage = await fetch(`data:image/png;base64,${this.payload?.data?.png}`);
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-primary m-3',
              cancelButton: 'btn btn-primary m-3'
            },
            buttonsStyling: false
          })
          swalWithBootstrapButtons.fire({
            imageUrl: this.passkeyImage?.url,
            imageHeight: 300,
            imageAlt: 'A tall image',
            showCancelButton: true,
            confirmButtonText: 'Okay',
            cancelButtonText: 'Download',
            allowOutsideClick: false,
            reverseButtons: true
          }).then((result) => {
            if (result.isDismissed) {
              this.donwload_passkey();
            }
          })
        }

        else {
          this.showLoader = false;
          Swal.fire({
            title: this.payload.data.message,
            //icon: 'error',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) { }
          });
        }
        return;
      }
      setTimeout(() => {
        this.doCheck_home(taskID, xdata)
      }, 500)
    }
  }




  listDownload() {
    if (this.transaction?.payload?.balance === 0) {
      Swal.fire({
        title: 'Your wallet is empty.',
        icon: 'info',
        confirmButtonText: 'Okay',
      }).then((result) => {
        if (result.value) { }
      });
    } else {
      var content = this.transaction?.payload?.contents;
      var serial = content.join(",");
      this.downloadContent(serial, 'jsontocsv', this.userLocal);
    }
  }

  downloadContent(data, filename = 'data', name) {
    let blob = new Blob(['\ufeff' + data], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", name + ".Serial.csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }



  downloadFile(data, filename = 'data', name) {
    if (this.type === 'localwallet') {
      var arrHeader = ["amount", "datetime", "message", "type", "running_balance"];
    } else {
      var arrHeader = ["amount", "time", "memo", "type", "balance"];
    }
    let csvData = this.ConvertToCSV(data, arrHeader);
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", name + ".History.csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray, headerList) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';
    if (this.type === "localwallet") {
      var newHeaders = ["Amount", "Date", "Message", "Type", "Balance"];
    } else {
      var newHeaders = ["Amount", "Date", "Memo", "Type", "Balance"];
    }
    for (let index in newHeaders) {
      row += newHeaders[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array?.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];
        line += ',' + this.strRep(array[i][head]);
      }
      str += line + '\r\n';
    }
    return str;
  }

  strRep(data) {
    if (typeof data == "string") {
      let newData = data.replace(/,/g, " ");
      return newData;
    }
    else if (typeof data == "undefined") {
      return "-";
    }
    else if (typeof data == "number") {
      return data.toString();
    }
    else {
      return data;
    }
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

  showErrorMessage(message): void {
    this.errorMessage = message;
    this.showNormal = false;
    this.showError = true;
    this.showLoader = false;
  }

  hideErrorMessage(): void {
    this.errorMessage = '';
    this.showNormal = true;
    this.showError = false;
    this.showLoader = false;
  }

  amountExchange(amount: number) {
    return amount;
  }

  async publicChange(e: any) {
    try {
      var data = { private: e };
      let response: any = await this.api.publicChange(this.usersky, data);
      if (response.status === "success") {
        Swal.fire({
          title: 'Successfully changes saved!',
          icon: 'success',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) { }
        });
      } else {
        Swal.fire({
          title: response.payload.message,
          icon: 'warning',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) { }
        });
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async record() {
    // if (e === true) {
    Swal.fire({
      title: "Are you sure you want to delete all statements?",
      icon: 'warning',
      confirmButtonText: 'Confirm',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this.delete();
      } else {
        this.recordCheck = false;
      }
    });
    // } else {
    // Swal.fire({
    //   title: "Successfully updated!",
    //   icon: 'success',
    //   confirmButtonText: 'Okay',
    // }).then((result) => {
    //   if (result.value) { }
    // });
    // }
  }

  async delete() {
    try {
      let response: any = await this.api.recHistory(this.usersky);
      console.log(response);
      if (response.status === "success") {
        this.showLoader1 = true;
        this.loadingMessage = "Deleting statements..."
        this.docheckrecord(response.payload?.id, (data: any) => { })
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async docheckrecord(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.showLoader1 = false;
          Swal.fire({
            title: "Statements deleted successfully",
            icon: 'success',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) {
              // let currentUrl = this.router.url;
              // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              // this.router.onSameUrlNavigation = 'reload';
              // this.router.navigate([currentUrl]);
              // this.eventService.setItem("wallet", "skywallet", 'skydelete');
              this.sortedSkyData = [];
              this.skyDetails.statements = [];
              this.loadingMessage = ''
              this.recordCheck = false;
            }
          });
        } else {
          this.showLoader1 = false;
          this.showLoading(false);
          this.recordCheck = false;
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
        this.docheckrecord(taskID, xdata)
      }, 500)
    }
    else {
      // this.errorInfo = true;
    }
  }

  returnZero() {
    return 0
  }

  async getEcho() {
    this.successInfo = false;
    this.errorInfo = false;
    this.payload = null;
    this.taskId = null;
    try {
      let response: any = await this.api.raidaEcho();
      if (response) {
        this.payload = response.payload;
        this.taskId = this.payload.id;
        this.successInfo = true;
        this.successMsg = "Echo sent. Task ID" + this.taskId;
        this.doTaskPoll(this.taskId);
      }
    }
    catch (e) {
      Swal.fire({
        title: 'Raida Servers disconnected!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Reconnect',
        // cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.value) {
          {
            let currentUrl = this.router.url;
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate([currentUrl]);
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
      this.latencies = this.payload?.data?.latencies;
      if (this.payload.status == "completed") {
        this.showLoading(false);
        let data = this.payload.data;
        this.successMsg = "Echo done. Online: " + data.online + "/25, pown:" + data.pownstring;
        let h = "";
        for (let i = 0; i < data.pownarray.length; i++) {
          let st = data.pownarray[i]
          if (st != 1) {
            h += "<span class='rf'>" + i + "</span>"
          } else {
            h += "<span class='pf'>" + i + "</span>"
          }
        }
        return;
      }
      this.successMsg = "Doing Echo. Task ID " + taskID + ", Progress " + this.payload.progress + "%";
      setTimeout(() => {
        this.doTaskPoll(taskID)
      }, 500)
    }
  }

  async getTransaction() {
    var data = this.userLocal;
    try {
      let response: any = await this.api.getTransaction(data);
      if (response.status == "success") {
        this.transaction = response;
        this.sortedData = this.transaction?.payload?.transactions.reverse();
      } else {
        console.log(response.message);
      }
      // this.dataSourcelocal = new MatTableDataSource(this.transaction.payload.transactions);
      // this.dataSourcelocal.sort = this.sort;
    }
    catch (e) {
      console.log(e);
      this.errorInfo = true;
      this.errorMsg = "Failed";
    }
  }

  async getWallet() {
    var data = this.userLocal;
    try {
      let response: any = await this.api.walletname(data);
      this.userDetails = response.payload;
    }
    catch (e) {
      console.log(e);
      this.errorInfo = true;
      this.errorMsg = "Failed";
    }
  }

  async getSkywallet() {
    try {
      var data = this.usersky;
      let response: any = await this.api.getSky(data);
      if (response.status == "success") {
        this.showLoading(true);
        this.spinner.show();
        this.showbal = false;
        this.loadingMessage = "Collecting Statements...";
        this.doCheck4(response.payload?.id, (data: any) => {
          // this.successInfo = true;
          // this.successMsg  ="Done " + JSON.stringify(data)
        })
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async doCheck4(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed" && this.payload.progress == 100) {
          this.skyDetails = this.payload.data;
          this.sortedSkyData = this.skyDetails.statements.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
          this.eventService.changeskyhistory(this.sortedSkyData);
          const newArr = this.allSky.map(obj => {
            if (obj.name === this.usersky) {
              return { ...obj, balance: this.skyDetails.balance };
            }
            return obj;
          });
          this.eventService.changeskydata(newArr);
          this.loadingMessage == ''
          // this.dataSourceSky = new MatTableDataSource(newArr);
          // this.dataSourceSky.sort = this.sort;
          this.spinner.hide();
          this.showbal = true;
          this.showLoading(false);
        } else {
          this.checkerror = true;
          this.spinner.hide();
          this.showbal = true;
          this.skyDetails = []
          this.sortedSkyData = [];
          this.loadingMessage = '';
          this.showLoading(false);
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
        this.doCheck4(taskID, xdata)
      }, 500)
    }
    else {
      this.showLoading(false);
      // this.errorInfo = true;
    }
  }

  redirect(val: string) {
    this.skyLength = localStorage.getItem("skyLength");
    if (val == 'withdraw') {
      if (this.skyDetails?.balance == 0 || this.checkerror) {
        Swal.fire({
          title: "SkyVault is empty. You can't withdraw.",
          icon: 'info',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) {
          }
        });
      } else {
        this.router.navigate(['/dashboard/transactions/withdraw']);
      }
    } else if (val == "transfer") {
      if (this.skyDetails?.balance == 0 || this.checkerror) {
        Swal.fire({
          title: "SkyVault is empty. You can't transfer.",
          icon: 'info',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) {
          }
        });
      } else {
        this.router.navigate(['/dashboard/transactions/transfer-cc'], { queryParams: { id: '2' } });
      }
    } else if (val == "exchange") {
      if (this.transaction?.payload?.balance == 0 || this.checkerror) {
        Swal.fire({
          title: "Wallet is empty. You can't transfer.",
          icon: 'info',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) {
          }
        });
      } else {
        this.router.navigate(['/dashboard/transactions/transfer-cc'], { queryParams: { id: '3' } });
      }
    } else if (val == 'send') {

      if (this.skynumber == 0) {
        Swal.fire({
          title: "You don't have a SkyVault. Create one now?",
          showConfirmButton: true,
          icon: 'info',
          confirmButtonText: 'Yes',
        }).then((result) => {
          if (result.value) {
            console.log("resu:" + result.isConfirmed)
            this.createSkyVault(this.usersky)
            this.router.navigate(['/dashboard/create-skyvault-dash'])
          }
        })
      }
      else if (this.transaction.payload?.balance == 0) {
        Swal.fire({
          title: "Wallet is empty. You can't send CloudCoin.",
          icon: 'info',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) {
          }
        });
      }
      else {
        this.router.navigate(['/dashboard/transactions/deposit']);
        this.fixFracked();
      }
    }

    else if (val == 'show_colors') {
      if (this.transaction.payload?.balance == 0) {
        Swal.fire({
          title: "Wallet is empty!",
          icon: 'info',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) {
          }
        });
      } else {
        this.router.navigate(['/dashboard/functions/color-coin']);
      }
    } else if (val == 'export') {
      if (this.transaction.payload?.balance == 0) {
        Swal.fire({
          title: "Wallet is empty. You can't export.",
          icon: 'info',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) {
          }
        });
      } else {
        this.router.navigate(['/dashboard/transactions/export']);
        this.fixFracked();
      }
    } else if (val == "sky_exchange") {
      if (this.skyDetails?.balance == 0 || this.checkerror) {
        Swal.fire({
          title: "SkyVault is empty. You can't transfer.",
          icon: 'info',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) {
          }
        });
      } else {
        this.router.navigate(['/dashboard/transactions/transfer-cc'], { queryParams: { id: '4' } });
      }
    }
  }

  deleteUser(val: string) {
    if (val === 'deletewallet') {
      if (this.skyDetails?.balance !== 0) {
        Swal.fire({
          title: "SkyVaults must be empty before they can be deleted. Please empty this SkyVault and try again",
          icon: 'info',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) {
          }
        });
      } else {
        this.deleteUserModal = !this.deleteUserModal;
      }
    } else if (val === 'fix') {
      this.detectFix();
    } else if (val === 'health') {
      if (this.skyDetails?.balance === 0 || this.checkerror) {
        Swal.fire({
          title: "SkyVault is empty.",
          icon: 'info',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) { }
        });
      } else {
        this.healthModal = !this.healthModal;
      }
    } else if (val === 'backup') {
      if (this.skyDetails?.balance === 0 || this.checkerror) {
        Swal.fire({
          title: "SkyVault is empty.",
          icon: 'info',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) { }
        });
      } else {
        this.backupModal = !this.backupModal;
      }
    }
  }

  async detectFix() {
    try {
      var data = {
        name: this.usersky
      }
      let response: any = await this.api.detectsky(data);
      console.log(response);
      if (response.status == "success") {
        this.showLoader1 = true;
        this.loadingMessage = "Detecting Pass Key..."
        this.detectSkyKey(response.payload?.id, (data: any) => { })
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async detectSkyKey(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    console.log("Task done: ", task);
    if (task) {
      this.payload = task.payload;
      this.syncProg = this.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.showLoader1 = false;
          if (this.payload?.data?.fracked != 0) {
            this.fixModal = !this.fixModal;
          } else {
            Swal.fire({
              title: "Pass Key is Healthy.",
              icon: 'info',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) { { } }
            });
          }
        } else {
          this.showLoader1 = false;
          this.fixModal = !this.fixModal;
        }
        return;
      }
      setTimeout(() => {
        this.detectSkyKey(taskID, xdata)
      }, 500)
    }
  }

  async fixKeycard() {
    this.fixModal = !this.fixModal;
    try {
      var data = {
        name: this.usersky,
        pownstring: this.syncProg?.data?.coins[0].pownstring
      }
      let response: any = await this.api.idFix(data);
      if (response.status == "success") {
        this.showLoader1 = true;
        this.doFixsky1(response.payload?.id, (data: any) => { })
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async doFixsky1(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.showLoader1 = false;
          if (this.payload?.data?.number_failed === 0) {
            Swal.fire({
              title: "Pass Key was Fixed and is now Healthy",
              icon: 'success',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) { { } }
            });
          } else {
            Swal.fire({
              title: "Pass Key is fracked and the attempt to fix failed. Try again later",
              icon: 'error',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) { { } }
            });
          }
        } else {
          this.showLoader1 = false;
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

  async deleteUserModalToggler(val: string) {
    if (val === 'deletewallet') {
      if (this.transaction.payload?.balance !== 0) {
        Swal.fire({
          title: "Wallets must be empty before they can be deleted. Please empty this wallet and try again",
          icon: 'info',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) {
          }
        });
      } else {
        this.deleteUserModal = !this.deleteUserModal;
      }
    } else if (val === 'fix') {
      if (this.transaction.payload?.balance === 0) {
        Swal.fire({
          title: "Wallet is empty.",
          icon: 'info',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) { }
        });
      } else if (this.transaction.payload?.balance != 0) {
        // this.checkhealth();
      }
      else {
        this.fixModal = !this.fixModal;
      }
    }
    else if (val === 'fixlimbo') {
      if (this.transaction.payload?.balance === 0) {
        Swal.fire({
          title: "Wallet is empty.",
          icon: 'info',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) { }
        });
      } else if (this.transaction.payload?.balance != 0) {
        this.checkLimbo();
      }
      else {
        this.fixlimboModal = !this.fixlimboModal;
      }
    }
    else if (val === 'health') {
      if (this.transaction.payload?.balance === 0) {
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
    } else if (val === 'delete') {
      if (this.transaction?.payload?.transactions?.length === 0) {
        Swal.fire({
          title: 'No Transactions.',
          icon: 'info',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) { }
        });
      } else {
        this.deleteModal = !this.deleteModal;
      }
    } else if (val === 'backup') {
      if (this.transaction?.payload?.balance === 0) {
        Swal.fire({
          title: "Wallet is empty.",
          icon: 'info',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) { }
        });
      } else {
        this.backupModal = !this.backupModal;
      }
    } else if (val === "rename") {
      var data = this.userLocal;
      let result: any = await this.api.walletname(data);
      var wallet_balance = result.payload?.balance;
      if (wallet_balance > 0) {
        Swal.fire({
          title: "You cannot rename wallet containing coins!",
          icon: 'info',
          confirmButtonText: 'Okay',
        })
      } else {
        this.renameModal = !this.renameModal;
        setTimeout(() => {
          this.searchElement?.nativeElement.focus();
        }, 0);
      }
    }
  }

  // async checkhealth13() {
  //   try {
  //     var data = {
  //       name: this.userLocal
  //     }
  //     let response: any = await this.api.health(data);
  //     if (response.status == "success") {
  //       this.showLoader1 = true;
  //       this.loadingMessage = "Detecting fracked coins..."
  //       this.doCheckHealth(response.payload?.id, (data: any) => { })
  //     } else {
  //       this.showLoader1 = false;
  //     }
  //   }
  //   catch (e) {
  //     this.showLoader1 = false;
  //     console.log(e);
  //   }
  // }

  // async doCheckHealth(taskID: any, xdata: any) {
  //   let task: any = await this.api.doCheck(taskID);
  //   console.log("Task done: ", task);
  //   if (task) {
  //     this.payload = task.payload;
  //     if (this.payload.status == "error" || this.payload.status == "completed") {
  //       if (this.payload.status == "completed") {
  //         this.showLoader1 = false;
  //         if (this.payload?.data?.TotalAlreadyFracked != 0 || this.payload?.data?.TotalFracked != 0) {
  //           this.fixModal = !this.fixModal;
  //         } else {
  //           Swal.fire({
  //             title: "No fracked coin found!",
  //             icon: 'info',
  //             confirmButtonText: 'Okay',
  //           }).then((result) => {
  //             if (result.value) {
  //               {
  //                 this.router.navigate(['/dashboard/home'])
  //               }
  //             }
  //           });
  //         }
  //       } else {
  //         this.showLoader1 = false;
  //         if (this.payload?.data?.message == "No coins to detect") {
  //           this.fixModal = !this.fixModal;
  //         } else {
  //           Swal.fire({
  //             title: this.payload.data.message,
  //             icon: 'error',
  //             confirmButtonText: 'Okay',
  //           }).then((result) => {
  //             if (result.value) {
  //               {
  //                 this.router.navigate(['/dashboard/home'])
  //               }
  //             }
  //           });
  //         }
  //       }
  //       return;
  //     }
  //     setTimeout(() => {
  //       this.doCheckHealth(taskID, xdata)
  //     }, 500)
  //   }
  // }
  // async checkhealth() {
  //   try {
  //     var data = this.userLocal;
  //     let response: any = await this.api.getTransaction(data);

  //     if (response.status == "success") {
  //       this.showLoader1 = true;
  //       this.loadingMessage = "Detecting fractured coins..."
  //       if (response.payload?.fracked_count > 0) {
  //         //  this.showLoader1 = false;
  //         //  this.fixlimboModal =!this.fixlimboModal;
  //         this.fixFracked()
  //         //  this.fixLimboCoins();
  //         //  this.doCheckLimbo(response.payload?.id, (data: any) => { });

  //       }
  //       else {
  //         this.showLoader1 = true;
  //         Swal.fire({
  //           title: "No fractured coin found!",
  //           icon: 'info',
  //           confirmButtonText: 'Okay',
  //         }).then((result) => {
  //           if (result.value) {
  //             {
  //               this.router.navigate(['/dashboard/home'])
  //             }
  //           }
  //         });
  //         this.showLoader1 = false;
  //       }
  //       return;

  //     }
  //     else {
  //       this.showLoader1 = false;
  //     }

  //   }
  //   catch (e) {
  //     this.showLoader1 = false;
  //     console.log(e)
  //   }
  //   setTimeout(() => {
  //     this.checkhealth()
  //   }, 500)
  // }

  // fixFracked() {
  //   this.showLoader1 = false;
  //   this.fixModal = !this.fixModal;
  // }


  async fixFracked() {
    try {
      var data = {
        name: this.userLocal
      }
      let response: any = await this.api.fix(data);
      if (response.status === "success") {
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
      // this.fixProg = this.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          // this.goTODash = true;
        } else {
          // this.goTODash = true;
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

  async checkLimbo() {
    try {
      var data = this.userLocal;
      let response: any = await this.api.getTransaction(data);

      if (response.status == "success") {
        this.showLoader1 = true;
        this.loadingMessage = "Detecting unprocessed coins..."
        if (response.payload?.limbo_count > 0) {
          //  this.showLoader1 = false;
          //  this.fixlimboModal =!this.fixlimboModal;
          this.fixLimbo()
          //  this.fixLimboCoins();
          //  this.doCheckLimbo(response.payload?.id, (data: any) => { });

        }
        else {
          this.showLoader1 = true;
          Swal.fire({
            title: "No unprocessed coin found!",
            icon: 'info',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) {
              {
                this.router.navigate(['/dashboard/home'])
              }
            }
          });
          this.showLoader1 = false;
        }
        return;

      }
      else {
        this.showLoader1 = false;
      }

    }
    catch (e) {
      this.showLoader1 = false;
      console.log(e)
    }
    setTimeout(() => {
      this.checkLimbo()
    }, 500)
  }

  fixLimbo() {
    this.showLoader1 = false;
    this.fixlimboModal = !this.fixlimboModal;
  }
  async doCheckLimbo(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    console.log("Task done: ", task);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.showLoader1 = false;
          this.fixlimboModal = !this.fixlimboModal;
          // Swal.fire({
          //   title: 'Limbo coins found. Do you wanna fix wallet?',
          //   icon: 'info',
          //   confirmButtonText: 'Okay',
          // }).then((result) =>{
          //   if(result.value){
          //     {
          //       this.router.navigate(['/dashboard/home'])
          //     }
          //   }
          // });
          return

        }
      }
      // setTimeout(() => {
      //   this.doCheckLimbo(taskID, xdata)
      // }, 500)
    }
  }

  async fixLimboCoins() {
    var data = {
      name: this.userLocal
    }
    let response: any = await this.api.fixlimbo(data);
    //if(response){

    if (response.status == "success") {
      this.doCheckLimbo(response.payload?.id, (data: any) => { });
      console.log("success")

    }
    else {
      console.log("failure")
    }
    //}
    // setTimeout(()=>{
    //   this.fixLimboCoins();
    // }, 500)
  }

  async fixNftFracked() {
    try {
      var data = {
        name: "NFTs"
      }
      let response: any = await this.api.fix(data);
      if (response.status === "success") {
        this.doCheckNftFix(response.payload?.id, (data: any) => { })
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async doCheckNftFix(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    console.log("Task done: ", task);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          // this.goTODash = true;
        } else {
          // this.goTODash = true;
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

  async deleteTransaction() {
    this.deleteModal = !this.deleteModal;
    try {
      var data = this.userLocal;
      let response: any = await this.api.deletetransaction(data);
      console.log(response);
      if (response.status === "success") {
        this.deleteTrans.reset();
        this.getTransaction();
        Swal.fire({
          title: "Transaction history has been deleted successfully!",
          icon: 'success',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) {
            // let currentUrl = this.router.url;
            // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            // this.router.onSameUrlNavigation = 'reload';
            // this.router.navigate([currentUrl]);
            // this.eventService.setItem("wallet", "localwallet", 'localdelete');
          }
        });
      } else {
        this.deleteTrans.reset();
        Swal.fire({
          title: response.payload.message,
          icon: 'error',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.value) { }
        });
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async deleteskytrans() {
    try {
      let response: any = await this.api.recHistory(this.usersky);
      console.log(response);
      if (response.status === "success") {
        // this.showLoader1 = true;
        // this.loadingMessage = "Deleting statements..."
        this.docheckrecord1(response.payload?.id, (data: any) => { })
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async docheckrecord1(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          // this.showLoader1 = false;
          // Swal.fire({
          //   title: "Statements deleted successfully",
          //   icon: 'success',
          //   confirmButtonText: 'Okay',
          // }).then((result) => {
          //   if (result.value) {
          this.sortedSkyData = [];
          this.skyDetails.statements = [];
          // this.loadingMessage = ''
          this.recordCheck = false;
        }
        //    });
        // } else {
        //   this.showLoader1 = false;
        //   // this.showLoading(false);
        //   this.recordCheck = false;
        //   Swal.fire({
        //     title: this.payload.data.message,
        //     icon: 'error',
        //     confirmButtonText: 'Okay',
        //   }).then((result) => {
        //     if (result.value) { }
        //   });
        // }
        return;
      }
      setTimeout(() => {
        this.docheckrecord1(taskID, xdata)
      }, 500)
    }
    else {
      // this.errorInfo = true;
    }
  }


  async deletewallet() {
    if (this.type == "skywallet") {
      try {
        if (this.deleteForm.valid) {
          var data = this.usersky;
          this.deletedAkyvault = this.usersky;
          let response: any = await this.api.deleteSky(data);
          this.deleteskytrans();
          this.deleteUserModal = !this.deleteUserModal
          this.showLoader1 = true;
          this.loadingMessage = "Deleting SkyVault..."

          if (response.status == 'success') {
            this.doCheck123(response.payload?.id, (data: any) => { });
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
          var data = this.userLocal;
          let response: any = await this.api.deleteWallet(data);
          this.deleteUserModal = !this.deleteUserModal;
          if (response.status == "error") {
            Swal.fire({
              title: response.payload.message,
              icon: 'error',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) {
              }
            });
          }
          else {
            var index = this.all.findIndex(x =>
              x.name === this.userLocal
            );
            this.all.splice(index, 1);
            this.eventService.changeLocaldata(this.all);
            this.deleteForm.reset();
            if (this.all?.length != 0) {
              for (let i = 0; i < this.all?.length; i++) {
                if (this.userLocal !== this.all[i].name) {
                  this.eventService.setItem('userLocal', this.all[i++].name, 'changelocal');
                  break;
                }
              }
            } else {
              this.eventService.setItem('wallet', 'skywallet', 'changesky');
            }
            Swal.fire({
              title: "Wallet deleted successfully!",
              icon: 'success',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.value) {
                {
                  // let currentUrl = this.router.url;
                  // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                  // this.router.onSameUrlNavigation = 'reload';
                  // this.router.navigate([currentUrl]);
                  // if (this.all.length != 0) {
                  //   for (let i = 0; i < this.all?.length; i++) {
                  //     if (this.userLocal !== this.all[i].name) {
                  //       this.eventService.setItem('userLocal', this.all[i++].name, 'changeLocal');
                  //     }
                  //   }
                  // } else {
                  // let currentUrl = this.router.url;
                  // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                  // this.router.onSameUrlNavigation = 'reload';
                  // this.router.navigate([currentUrl]);
                  //   this.eventService.setItem('wallet', 'skywallet', 'changeSky');
                  // }
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


  // async getList() {
  //   try {
  //     let response: any = await this.api.getList();
  //     if (response.status === 'success') {
  //       this.skyDetails = response.payload[0];
  //       this.skyLength = response?.payload?.length;
  //       localStorage.setItem('skyLength', response.payload.length);
  //     }
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }


  // }

  // async getSky() {
  //   try {
  //     let response: any = await this.api.getAllSky();
  //     if (response.status == "success") {
  //       this.doCheck10(response.payload?.id, (data: any) => {
  //       })
  //     }
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }
  // }

  async doCheck10(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.allSky = this.payload.data;
          localStorage.setItem('skyData', JSON.stringify(this.allSky));
          // for (let i = 0; i < this.allSky.length; i++) {
          //   this.totalSkyBalance = this.totalSkyBalance + Number(this.allSky[i]?.balance);
          // }
        }
        return;
      }
      setTimeout(() => {
        this.doCheck10(taskID, xdata)
      }, 500)
    }
  }

  async doCheck123(taskID: any, xdata: any) {
    let task: any = await this.api.doCheck(taskID);
    console.log("Task done: ", task);
    if (task) {
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if (this.payload.status == "completed") {
          this.showLoader1 = false;
          var index = this.allSky.findIndex(x =>
            x.name === this.usersky
          );
          this.allSky.splice(index, 1);
          this.deleteForm.reset();
          this.eventService.changeskydata(this.allSky);
          if (this.allSky?.length != 0) {
            for (let i = 0; i < this.allSky?.length; i++) {
              if (this.usersky !== this.allSky[i].name) {
                let num = i++;
                this.eventService.setItem('userSky', this.allSky[num].name, 'changesky');
                localStorage.setItem('serial', this.allSky[num].idcoin?.sn);
                break;
              }
            }
          } else {
            this.eventService.setItem('wallet', 'localwallet', 'changelocal');
          }
          Swal.fire({
            title: "SkyVault has been deleted successfully!",
            icon: 'success',
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.value) { }
          });
        } else {
          this.showLoader1 = false;
          this.deleteForm.reset();
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
        this.doCheck123(taskID, xdata)
      }, 500)
    }
  }

  async receipt(guid: any, time: any) {
    this.receiptTime = time;
    this.receipid = guid;
    if (this.receipid == '-') {
      Swal.fire({
        title: 'The balance was adjusted automatically because files were changed within the Coin Manager file structure.' +
          ' Most likely because a user added or removed coins manually to the bank or fracked folders.',
        icon: 'info',
        confirmButtonText: 'Okay',
      })
    }
    try {
      var name = this.userLocal
      let data = guid
      let response: any = await this.api.getReceipts(name, data);
      if (response.status === "success") {
        this.receiptdetails = response.payload?.transactions;
        this.totalcoins = response.payload?.total_coins;
        this.totalauthentic = response.payload?.total_authentic;
        this.totalfracked = response.payload?.total_fracked;
        this.totalcounterfeit = response.payload?.total_counterfeit;
        this.totallimbo = response.payload?.total_limbo;
        this.showreceipt = true;
      } else {
        this.showreceipt = false;
      }
    } catch (e) {
      console.log(e);
    }
  }
  async skyreceipt(guid: any, time: any) {
    this.receiptTime = time;
    this.receipid = guid;
    try {
      var name = this.usersky
      let data = guid
      let response: any = await this.api.getskyreceipt(name, data);
      if (response.status === "success") {
        this.receiptdetails = response.payload?.details;
        this.showreceipt = true;
      } else {
        if (response.payload?.code == 4132) {
          Swal.fire({
            title: "Transfer between two SkyVaults does not produce a receipt",
            icon: 'info',
            confirmButtonText: 'Okay',
          })
        }
        this.showreceipt = false;
      }
    } catch (e) {
      console.log(e);
    }
  }
  customSelector(val: string, type: string) {
    this.destName = val;
    if (type == 'local') {
      this.cSelectorText = val;
      this.customSelectorOpen = false;
      this.getWalletDetail(this.cSelectorText)
    } else if (type == 'sky') {
      this.cSelectorTextSky = val;
      this.customSelectorOpenSky = false;
      this.getSkyDetail(this.cSelectorTextSky, 'serial');
    }
  }
  customSelToggler(val: string) {
    this.customSelectorOpen = !this.customSelectorOpen;
  }

  customSelTogglerSky(val: string) {
    this.customSelectorOpenSky = !this.customSelectorOpenSky;
  }
  tabToggler(val: string, name) {
    this.tabSelector = val;
    localStorage.setItem('wallet', "localwallet")
    this.eventService.setItem('userLocal', name, "changelocal")
  }



  tabTogglerSky(val: string, name) {
    this.tabSelector = val;
    if (this.skynumber == 0) {
      Swal.fire({
        title: "You don't have a SkyVault. Create one now?",
        showConfirmButton: true,
        icon: 'info',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          console.log("resu:" + result.isConfirmed)
          this.createSkyVault(this.usersky)
          this.router.navigate(['/dashboard/create-skyvault-dash'])
        }
      })
    } else {
      localStorage.setItem('wallet', 'skywallet');
      this.eventService.setItem('userSky', name, 'changesky');
      // localStorage.setItem('serial', id);
    }
  }

  tabTogglerNft(val: string, name) {
    this.tabSelector = val
    localStorage.setItem('wallet', 'nftwallet')
    this.eventService.setItem('Nft', name, "changenft")
    this.router.navigate(["/dashboard/create-nft-gallery"])
    this.fixNftFracked()
  }

  activeTab() {
    if (this.type == 'localwallet') {
      this.tabSelector = 'wallet'
    }
    else if (this.type == 'skywallet') {
      this.tabSelector = 'skyvault'
    }
    else if (this.type == 'nftwallet') {
      this.tabSelector = 'nft'
    }

  }
}
