import { EventEmitter, Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable,ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  themeTogglerEvent: EventEmitter<object> = new EventEmitter();

  constructor() { }

  //share localwallet data
  editLocal : any = []
  private localData = new  BehaviorSubject(this.editLocal);
  changeLocal = this.localData.asObservable();

  changeLocaldata(message: any) {
  this.localData.next(message)
  }

  //share skyvault data
  editSky : any = []
  private skyData = new  BehaviorSubject(this.editSky);
  changeSky = this.skyData.asObservable();

  changeskydata(message: any) {
  this.skyData.next(message)
  }
  editNft : any = []
  private nftData = new  BehaviorSubject(this.editNft);
  changeNft = this.nftData.asObservable();

  changenftdata(message: any) {
  this.nftData.next(message)
  }

  //share skyvault history
  historySky : any = []
  private skyHistory = new  BehaviorSubject(this.historySky);
  skyHistorydata = this.skyHistory.asObservable();

  changeskyhistory(message: any) {
  this.skyHistory.next(message)
  }

  // localstorage value detection 

  private storageSub = new Subject<String>();

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any, type:any) {
    localStorage.setItem(key, data);
    this.storageSub.next(type);
  }

  getThemeTogEvent(){
    return this.themeTogglerEvent;
  }

  emitThemeTogEvent(data:any = ''){
    this.themeTogglerEvent.emit(data);
  }
  

}
