import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-upload-dash',
  templateUrl: './upload-dash.component.html',
  styleUrls: ['./upload-dash.component.scss']
})
export class UploadDashComponent implements OnInit {

  detect:boolean = false;
  successInfo:boolean = false;
  successMsg:any='';
  errorInfo:boolean = false;
  errorMsg:any='';
  raidaCheck:boolean = false;
  payload:any=null;
  taskId:any=null;
  serversList:any;
  showError: boolean = false;
  isSelect: boolean;
  user: any;
  fileName: string = '';
  file: any;

  constructor(private raida: ApiService, 
    private router: Router) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('userSky');
  }

  onFileInput(event) {
    const file:File = event.target.files[0];
    if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
          this.file = fileReader.result;      
        }
        fileReader.readAsText(file);
        }
        console.log(this.file); 
   }

   async upload(){
    try{
      var cs = JSON.parse(this.file);
      if(cs.cloudcoin.length != 0){
        
      }
      var idata = {
        coins: [
         { 'sn':parseInt('sn'),
          'ans': String
        }]
      }
      for (let i = 0; i < cs?.cloudcoin?.length; i++) {
        let cc = cs.cloudcoin[i]
        idata.coins[i] =  {
        'sn': parseInt(cc.sn, 10),
        'ans': cc.an
      }}
      this.createSky(idata);
    }
    catch(e) {
      this.detect = false;
      this.errorInfo = true;
      this.errorMsg = "Failed to parse json";
   } 
}

async createSky(data){
  try{
    let idata = {
      name: this.user,
      coin: data.coins[0]
      }
      let wallet: any = await this.raida.createSky(idata);
      console.log(wallet, "response");
      
      if(wallet.status == 'success'){
        this.successInfo = true;
        this.errorInfo = false;
        this.successMsg = "Wallet has been created";
        this.doCheck(wallet.payload?.id, (data: any)=>{
         this.successInfo = true;
         this.successMsg  ="Done " + JSON.stringify(data)
       })
        
      }
      else{
        this.errorInfo = true;
        this.errorMsg = "Error!! " + wallet.payload.message;
      }
   }
   catch(e){
    this.errorInfo = true;
    this.errorMsg = "Create Wallet Failed";
   }
}

   async doCheck(taskID: any, xdata: any){
    let task:any = await this.raida.doCheck(taskID);
      console.log("Task done: ", task);
      
      if(task){
      this.payload = task.payload;
      if (this.payload.status == "error" || this.payload.status == "completed") {
        if( this.payload.status == "completed"){
          this.router.navigate(['/dashboard/home']);
          let data = this.payload.data;
          this.successInfo = true;
          this.errorInfo = false;
          this.successMsg = "Done: " + JSON.stringify(data);
          this.createSky(this.payload.data);
        }
        else{
          this.errorInfo = true;
          this.successInfo = false;
          this.errorMsg = this.payload.data.message;
        }
        
        let h = "";
        this.raidaCheck = true;
        this.serversList = h;
        return;
      }
      this.successInfo = true;
      this.successMsg = "Doing.... Task ID " + taskID + ", Progress " + this.payload.progress + "%";
      setTimeout(() => {
        this.doCheck(taskID, xdata)
      }, 500)

    }
    else{
      this.errorInfo = true;
      this.successInfo = false;
      this.errorMsg = "Call Failed";
    }
  }
}
