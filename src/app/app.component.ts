import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { LoadEventData } from '@nativescript/core/ui/web-view';
// import { WebView } from 'tns-core-modules';
import { EventService } from './services/event.service';
// import {WebView, LoadEventData} from "tns-core-modules/ui/web-view";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cloud-wallet';
  public themeTogChanger: boolean;
  public themeDarkActive: boolean;
  public themeLightActive: boolean;
  public themeDropdwnToggler: boolean;
  showToolDropdown: boolean;

  // public url="https://www.google.com";
  // @ViewChild("webview") webview: WebView;

  constructor(private eventService: EventService,
    private router: Router){
    if(localStorage.getItem('themeLightActive')=='1'){
      this.themeTogChanger = false;
    }else if(localStorage.getItem('themeLightActive')=='0'){
      this.themeTogChanger = true;
    }else{
      this.themeTogChanger = false;
    };

    if(localStorage.getItem('themeLightActive')=='1'){
      this.themeLightActive = true;
      this.themeDarkActive = false;
    }else if(localStorage.getItem('themeLightActive')=='0'){
      this.themeLightActive = false;
      this.themeDarkActive = true;
    }else{
      this.themeLightActive = true;
      this.themeDarkActive = false;
    }
    this.themeDropdwnToggler = false;
  }

  ngOnInit(){
    this.eventService.getThemeTogEvent().subscribe(()=>{
      if(localStorage.getItem('themeLightActive')=='1'){
        this.themeTogChanger = false;
      }else if(localStorage.getItem('themeLightActive')=='0'){
        this.themeTogChanger = true;
      }else{
        this.themeTogChanger = !this.themeTogChanger;
      }
    });

//     this.webview.on(WebView.loadFinishedEvent, function (args: LoadEventData) {
//       console.log("loadFinishedEvent called");
//  });
  }

  themeDarkCaller(){
    if (this.themeDarkActive == false) {
      this.themeDarkActive = true;
      this.themeLightActive = false;
      localStorage.setItem('themeLightActive','0');
      this.eventService.emitThemeTogEvent();
    }
    this.themeDropdwnToggler = false;
  }
  themeLightCaller(){
    if (this.themeLightActive == false) {
      this.themeLightActive = true;
      this.themeDarkActive = false;
      localStorage.setItem('themeLightActive','1');
      this.eventService.emitThemeTogEvent();
    }
    this.themeDropdwnToggler = false;
  }

  themeDropDownCaller() {
    // this.themeDropdwnToggler = !this.themeDropdwnToggler;
    if(this.themeLightActive){
      this.themeDarkCaller();
     
    }
    else if (this.themeDarkActive){
      this.themeLightCaller();
    }
  }

  closeThemeDropdown() {
    this.themeDropdwnToggler = false;
  }
  toggleTools() {
    this.showToolDropdown = !this.showToolDropdown;
  }
  closeTools() {
    this.showToolDropdown = false;
  }
  getCorrectRoute(){
    this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};
  }
}
