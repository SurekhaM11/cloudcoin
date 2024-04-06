import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },{
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  // {
  //   path: 'login-chose',
  //   loadChildren: () => import('./choselogin/choselogin.module').then(m => m.ChoseloginModule)
  // },
  {
    path: 'login-image',
    loadChildren: () => import('./imagelogin/imagelogin.module').then(m => m.ImageloginModule)
  },
  // {
  //   path: 'login-card',
  //   loadChildren: () => import('./cardlogin/cardlogin.module').then(m => m.CardloginModule)
  // },
  // {
  //   path: 'deposit',
  //   loadChildren: () => import('./deposit/deposit.module').then(m => m.DepositModule)
  // },
  // {
  //   path: 'wallet-details',
  //   loadChildren: () => import('./wallet-details/wallet-details.module').then(m => m.WalletDetailsModule)
  // },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: ' ',
    loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule)
  },
];



@NgModule({

  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
