import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FixNftRoutingModule } from './fix-nft-routing.module';
import { FixNftComponent } from './fix-nft.component';
import { LottieModule } from 'ngx-lottie';
@NgModule({
  declarations: [FixNftComponent],
  imports: [
    CommonModule,
    FixNftRoutingModule,
    LottieModule
  ]
})
export class FixNftModule { }