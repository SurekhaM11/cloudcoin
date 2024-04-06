import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DownloadSkyRoutingModule } from './download-sky-routing.module';
import { DownloadSkyComponent } from './download-sky.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import { ClickOutsideModule } from 'ng-click-outside';
@NgModule({
  declarations: [DownloadSkyComponent],
  imports: [
    CommonModule,
    DownloadSkyRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    LottieModule,
    ClickOutsideModule
  ]
})
export class DownloadSkyModule { }
