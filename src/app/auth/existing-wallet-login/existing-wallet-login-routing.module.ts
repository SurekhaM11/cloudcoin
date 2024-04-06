import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExistingWalletLoginComponent } from './existing-wallet-login.component';

const routes: Routes = [
  {
    path: '',
    component: ExistingWalletLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExistingWalletLoginRoutingModule { }
