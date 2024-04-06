import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FixNftLimboRoutingModule } from './fix-nft-limbo-routing.modules';
import { FixNftLimboComponent } from './fix-nft-limbo.component';
import { LottieModule } from 'ngx-lottie';

@NgModule({
  declarations: [FixNftLimboComponent],
  imports: [
    CommonModule,
    FixNftLimboRoutingModule,
    LottieModule
  ]
})
export class FixNftLimboModule { }
