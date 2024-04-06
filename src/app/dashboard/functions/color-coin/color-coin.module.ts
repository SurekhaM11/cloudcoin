import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorCoinRoutingModule } from './color-coin-routing.module';
import { ColorCoinComponent } from './color-coin.component';
import { LottieModule } from 'ngx-lottie';

@NgModule({
  declarations: [ColorCoinComponent],
  imports: [
    CommonModule,
    ColorCoinRoutingModule,
    LottieModule
  ]
})
export class ColorCoinModule { }
