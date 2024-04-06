import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepositSkyRoutingModule } from './deposit-sky-routing.module';
import { DepositSkyComponent } from './deposit-sky.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  declarations: [DepositSkyComponent],
  imports: [
    CommonModule,
    DepositSkyRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    LottieModule,
    ClickOutsideModule
  ],
})
export class DepositSkyModule { }
