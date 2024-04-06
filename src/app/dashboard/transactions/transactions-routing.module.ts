import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionsComponent } from './transactions.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent,
    children: [
      {
       path: 'import',
       loadChildren:() => import('./upload/upload.module').then(m => m.UploadModule) 
      },
      {
        path: 'export',
        loadChildren:() => import('./download/download.module').then(m => m.DownloadModule)
      },
      {
        path: 'buy',
        loadChildren:() => import('./buy/buy.module').then(m => m.BuyModule)
      },
      {
        path: 'transfer',
        loadChildren:() => import('./transfer/transfer.module').then(m => m.TransferModule)
      },
      {
        path: 'withdraw',
        loadChildren:() => import('./download-sky/download-sky.module').then(m => m.DownloadSkyModule)
      },
      {
        path: 'transfer-cc',
        loadChildren:() => import('./transfer-sky/transfer-sky.module').then(m => m.TransferSkyModule)
      },
      {
        path: 'deposit',
        loadChildren:() => import('./deposit-sky/deposit-sky.module').then(m => m.DepositSkyModule)
      },
      {
        path: 'success',
        loadChildren:() => import('./success/success.module').then(m => m.SuccessModule)
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
