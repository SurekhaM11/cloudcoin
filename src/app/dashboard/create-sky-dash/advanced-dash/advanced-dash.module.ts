import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvancedDashRoutingModule } from './advanced-dash-routing.module';
import { AdvancedDashComponent } from './advanced-dash.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
@NgModule({
  declarations: [AdvancedDashComponent],
  imports: [
    CommonModule,
    AdvancedDashRoutingModule,
    ReactiveFormsModule,
    LottieModule
  ]
})
export class AdvancedDashModule { }
