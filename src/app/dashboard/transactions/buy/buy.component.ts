import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {
  skywallet:string='';
  username:string='';
  constructor() {
    if (localStorage.getItem('skywallet')) {
      this.skywallet = localStorage.getItem('skywallet');
      this.username = (localStorage.getItem('skywallet')).split(".",1)[0];
    }
   }

  ngOnInit(): void {
  }

}
