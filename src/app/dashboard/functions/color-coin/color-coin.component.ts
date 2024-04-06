import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient, } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-color-coin',
  templateUrl: './color-coin.component.html',
  styleUrls: ['./color-coin.component.scss']
})
export class ColorCoinComponent implements OnInit {
  all: any;
  serial_no_array: any;
  hex_number: any[];
  hex: string;
  final_color :Array<string>[] =[];
  userLocal: string;
  constructor(private router: Router, private api: ApiService) {
    this.userLocal = localStorage.getItem('userLocal');
  }
  ngOnInit() {
    this.getColors();
  }

  async getColors(){
    try {
      let response: any;
      response = await this.api.getTransaction(this.userLocal);
      if (response.status == "success") {
        this.all = response.payload;
        if (this.all?.balance !== 0) {
          var serialNo = this.all.contents
          for (let i = 0; i < serialNo.length; i++) {
            this.serial_no_array = serialNo;
            var obj ={};
            obj[i] = this.hexToRgb(parseInt(this.serial_no_array[i], 10).toString(16)) ;
            this.final_color.push(obj[i]) ;
          }
        }
      }
      for(let i=0; i< this.final_color.length; i++){
        return this.final_color;
      }
      
    }
    catch (e) {
       console.log(e); 
      }
  }
    hexToRgb(hex) {
      var bigint = parseInt(hex, 16);
      var r = (bigint >> 16) & 255;
      var g = (bigint >> 8) & 255;
      var b = bigint & 255;
      //console.log("function:" +  "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1));
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      //return ([r, g, b].join());
    }

    
}



