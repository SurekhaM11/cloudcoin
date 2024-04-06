import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExistingWalletLoginRoutingModule } from './existing-wallet-login-routing.module';
import { ExistingWalletLoginComponent } from './existing-wallet-login.component';


@NgModule({
  declarations: [ExistingWalletLoginComponent],
  imports: [
    CommonModule,
    ExistingWalletLoginRoutingModule
  ]
})
export class ExistingWalletLoginModule { }
