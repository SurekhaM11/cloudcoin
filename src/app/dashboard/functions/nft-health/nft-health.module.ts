import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NftHealthRoutingModule } from './nft-health-routing.module';
import { NftHealthComponent } from './nft-health.component';
import { LottieModule } from 'ngx-lottie';

@NgModule({
  declarations: [NftHealthComponent],
  imports: [
    CommonModule,
    NftHealthRoutingModule,
    LottieModule
  ]
})
export class NftHealthModule { }