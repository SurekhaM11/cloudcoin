import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {

  user: string;
  email: string;
  type: string;
  pass: string;
  successInfo: boolean;
  errorInfo: boolean;
  errorMsg: string;

  constructor(
    private raida: ApiService,
    private router: Router,
    private r: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.user = localStorage.getItem('userSky');
    this.email = localStorage.getItem('emailSky');
    this.pass = localStorage.getItem('passSky');
    this.type = localStorage.getItem('setupType');
  }

  go(){
    localStorage.setItem('wallet', 'skywallet');
  }

}
