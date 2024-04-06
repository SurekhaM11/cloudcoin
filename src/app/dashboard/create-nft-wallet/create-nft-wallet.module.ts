import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateNftWalletRoutingModule } from './create-nft-wallet-routing.module'
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import { CreateNftWalletComponent } from './create-nft-wallet.component';
@NgModule({
  declarations: [CreateNftWalletComponent],
  imports: [
    CommonModule,
    CreateNftWalletRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CreateNftWalletModule { }
