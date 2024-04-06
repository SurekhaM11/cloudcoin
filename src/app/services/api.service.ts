import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable({
  providedIn: 'root'
})
export class ApiService implements HttpInterceptor {

  public baseURL = environment.base_url;
  public checkURL = environment.connection_url;
  // public headerOption = new HttpHeaders({
  //   timeout:'20000'
  // });

  constructor(private http: HttpClient, @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeoutValue = req.headers.get('timeout') || this.defaultTimeout;
    const timeoutValueNumeric = Number(timeoutValue);
    return next.handle(req).pipe(timeout(timeoutValueNumeric));
  }



  async init() {
    return await this.http.get(this.checkURL).toPromise();
  }

  async raidaEcho() {
    return await this.http.get(this.baseURL + 'echo').toPromise();
  }

  async doTaskPoll(taskID: any) {
    return await this.http.get(this.baseURL + 'tasks/' + taskID).toPromise();
  }

  async doCheck(taskID: any) {
    return await this.http.get(this.baseURL + 'tasks/' + taskID).toPromise();
  }

  async getWallet() {
    return await this.http.get(this.baseURL + 'wallets').toPromise();
  }

  async addWallet(idata: any) {
    return await this.http.post(this.baseURL + 'wallets', idata).toPromise();
  }

  async deleteWallet(data: any) {
    return await this.http.delete(this.baseURL + 'wallets/' + data).toPromise();
  }

  async detect(coin: any) {
    return await this.http.post(this.baseURL + 'detect', coin).toPromise();
  }

  async walletname(data: any) {
    return await this.http.get(this.baseURL + 'wallets/' + data).toPromise();
  }

  async getTransaction(data: any) {
    return await this.http.get(this.baseURL + 'wallets/' + data + '?contents=true').toPromise();
  }
  async import(data: any) {
    return await this.http.post(this.baseURL + 'import', data).toPromise();
  }

  async export(data: any) {
    return await this.http.post(this.baseURL + 'export', data).toPromise();
  }

  async transfer(data: any) {
    return await this.http.post(this.baseURL + 'transfer', data).toPromise();
  }

  async getVersion() {
    return await this.http.get(this.baseURL + 'info').toPromise();
  }

  async getNews() {
    return await this.http.get(this.baseURL + 'news').toPromise();
  }

  async deletetransaction(data: any) {
    return await this.http.delete(this.baseURL + 'transactions/' + data).toPromise();
  }

  async rename(name: string, data: any) {
    return await this.http.put(this.baseURL + 'wallets/' + name, data).toPromise();
  }

  async getReceipts(name: string, data: any) {
    return await this.http.get(this.baseURL + 'transactions/' + name + "/" + data).toPromise();
  }

  async readbin(data: any) {
    return await this.http.post(this.baseURL + 'unpack', data).toPromise();
  }

  async importFile() {
    return await this.http.get(this.baseURL + 'filepicker?type=file').toPromise();
  }
  async importFolder() {
    return await this.http.get(this.baseURL + 'filepicker?type=folder').toPromise();
  }

  async pastrecord() {
    return await this.http.get(this.baseURL + 'senderhistory?pattern=.*').toPromise();
  }

  async leftover(name: string) {
    return await this.http.get(this.baseURL + 'wallets/' + name + '/leftovers').toPromise();
  }

  async suspect(data: any) {
    return await this.http.post(this.baseURL + 'import?type=suspect', data).toPromise();
  }

  async convert(data: any) {
    return await this.http.post(this.baseURL + 'convert', data).toPromise();
  }

  async getColors() {
    return await this.http.get(this.baseURL + 'wallets').toPromise();
  }

  async fixlimbo(data: any) {
    return await this.http.post(this.baseURL + 'fixlost', data).toPromise();
  }
  // Skywallet apis

  async createSky(data: any) {
    return await this.http.post(this.baseURL + 'skywallets', data).toPromise();
  }

  async getAllSky() {
    return await this.http.get(this.baseURL + 'skywallets').toPromise();
  }

  async getSky(data: any) {
    return await this.http.get(this.baseURL + 'skywallets/' + data).toPromise();
  }

  async deleteSky(data: any) {
    return await this.http.delete(this.baseURL + 'skywallets/' + data).toPromise();
  }

  async freeCoin() {
    return await this.http.get(this.baseURL + 'freecoin').toPromise();
  }

  async deposit(data: any) {
    return await this.http.post(this.baseURL + 'deposit', data).toPromise();
  }

  async setting() {
    return await this.http.get(this.baseURL + 'settings').toPromise();
  }

  async settingTask(data: any) {
    return await this.http.post(this.baseURL + 'settings', data).toPromise();
  }

  async withdraw(data: any) {
    return await this.http.post(this.baseURL + 'withdraw', data).toPromise();
  }

  async transfersky(data: any) {
    return await this.http.post(this.baseURL + 'skytransfer', data).toPromise();
  }

  async fix(data: any) {
    return await this.http.put(this.baseURL + 'fix', data).toPromise();
  }

  async getFix() {
    return await this.http.get(this.baseURL + 'fix').toPromise();
  }

  async postFix(data: any) {
    return await this.http.post(this.baseURL + 'fix', data).toPromise();
  }

  async health(data: any) {
    return await this.http.post(this.baseURL + 'health', data).toPromise();
  }

  async skyhealth(data: any) {
    return await this.http.post(this.baseURL + 'skyhealth', data).toPromise();
  }

  async publicChange(name: any, data: any) {
    return await this.http.post(this.baseURL + 'skywallets/' + name, data).toPromise();
  }

  async recHistory(data: any) {
    return await this.http.delete(this.baseURL + 'statements/' + data).toPromise();
  }

  async fixSky(data: any) {
    return await this.http.post(this.baseURL + 'sync', data).toPromise();
  }

  async getList() {
    return await this.http.get(this.baseURL + 'skywallets' + '?list_only=true').toPromise();
  }

  async detectsky(data: any) {
    return this.http.post(this.baseURL + 'skydetect', data).toPromise();
  }

  async idFix(data: any) {
    return this.http.post(this.baseURL + 'skyfix', data).toPromise();
  }

  async backup(data: any) {
    return this.http.post(this.baseURL + 'backup', data).toPromise();
  }

  async skyBackup(data: any) {
    return this.http.post(this.baseURL + 'skybackup', data).toPromise();
  }

  async filePick() {
    return this.http.get(this.baseURL + 'filepicker').toPromise();
  }

  async deleteFromFolder(name: any) {
    return this.http.delete(this.baseURL + 'skywallets/' + name + '?file_only=true').toPromise();
  }

  async getskyreceipt(name: any, guid: any) {
    return await this.http.get(this.baseURL + 'skytransactions/' + name + "/" + guid).toPromise();
  }

  async pay(data: any) {
    return await this.http.post(this.baseURL + 'pay', data).toPromise();
  }

  async skypay(data: any) {
    return await this.http.post(this.baseURL + 'skypay', data).toPromise();
  }
  async exportCoinasNft(data: any) {
    return await this.http.post(this.baseURL + 'nfts/' + 'export', data).toPromise();
  }

  async exportSNs(data: any) {
    return await this.http.post(this.baseURL + 'exportsns', data).toPromise();
  }
  async nftGroups() {
    return this.http.get(this.baseURL + 'nftgroups' + '?tb_size=150').toPromise()
  }
  async displayDetails(data: any) {
    return this.http.get(this.baseURL + 'nfts/' + data).toPromise()
  }
  async deleteNfts(data: any, name: any) {
    return this.http.delete(this.baseURL + 'nfts/' + data + "/" + name).toPromise()
  }
  async checkPngValidity(data: any) {
    return await this.http.get(this.baseURL + 'nfts/' + data + '/png').toPromise();
  }
  async checkUniqueValidity(data: any) {
    return await this.http.get(this.baseURL + 'nfts/' + data + '/unique').toPromise();
  }
  async checkDescValidity(data: any) {
    return await this.http.get(this.baseURL + 'nfts/' + data + '/description').toPromise();
  }
  async syncNft(data: any) {
    return await this.http.post(this.baseURL + 'nftsync', data).toPromise();
  }
  async returnNftConf(){
    return await this.http.get(this.baseURL + 'nftconf').toPromise()
  }
  async updateNftConf(data: any){
    return await this.http.post(this.baseURL + 'nftconf', data).toPromise();
  }
}



// @Injectable()
// export class StorageService {
//   private storageSub = new Subject<String>();

//   watchStorage(): Observable<any> {
//     return this.storageSub.asObservable();
//   }

//   setItem(key: string, data: any, type:any) {
//     localStorage.setItem(key, data);
//     this.storageSub.next(type);
//   }
// }
@Injectable()
export class DataService {

  private data: string;

  setData(data: string) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  hasData() {
    return this.data && this.data.length;
  }
}
