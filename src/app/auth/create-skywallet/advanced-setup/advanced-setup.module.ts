import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvancedSetupRoutingModule } from './advanced-setup-routing.module';
import { AdvancedSetupComponent } from './advanced-setup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
@NgModule({
  declarations: [AdvancedSetupComponent],
  imports: [
    CommonModule,
    AdvancedSetupRoutingModule,
    ReactiveFormsModule,
    LottieModule
  ]
})
export class AdvancedSetupModule { }
