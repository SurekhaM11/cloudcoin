import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-local-step-complete',
  templateUrl: './local-step-complete.component.html',
  styleUrls: ['./local-step-complete.component.scss']
})
export class LocalStepCompleteComponent implements OnInit {

  email: string;
  pass: string;
  user: string;
  successInfo: boolean;
  errorInfo: boolean;
  errorMsg: string;
  all: any;

  constructor(
    private api : ApiService,
  ) {
    this.email = localStorage.getItem('emailAdd');
    this.pass = localStorage.getItem('passLocal');
    this.user = localStorage.getItem('userLocal');
   }

  async ngOnInit() { 
  }

  go(){
    localStorage.removeItem('passLocal');
    localStorage.removeItem('emailAdd');
    localStorage.setItem('wallet', 'localwallet');
  }

}
