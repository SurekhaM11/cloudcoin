import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageloginRoutingModule } from './imagelogin-routing.module';
import { ImageloginComponent } from './imagelogin.component';
import { FormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [ImageloginComponent],
  imports: [
    CommonModule,
    ImageloginRoutingModule,
    FormsModule,
    LottieModule,
    FontAwesomeModule
  ]
})
export class ImageloginModule { }
