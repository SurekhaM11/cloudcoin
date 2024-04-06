import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-local-completed',
  templateUrl: './local-completed.component.html',
  styleUrls: ['./local-completed.component.scss']
})
export class LocalCompletedComponent implements OnInit {

  email: string;
  pass: string;
  user: string;
  successInfo: boolean;
  errorInfo: boolean;
  errorMsg: string;

  constructor(
    private raida : ApiService,
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
