import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferSkyRoutingModule } from './transfer-sky-routing.module';
import { TransferSkyComponent } from './transfer-sky.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  declarations: [TransferSkyComponent],
  imports: [
    CommonModule,
    TransferSkyRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    LottieModule, 
    FontAwesomeModule, 
    TooltipModule,
    ClickOutsideModule
  ]
})
export class TransferSkyModule { }
