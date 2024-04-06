import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAddDashRoutingModule } from './create-add-dash-routing.module';
import { CreateAddDashComponent } from './create-add-dash.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';


@NgModule({
  declarations: [CreateAddDashComponent],
  imports: [
    CommonModule,
    CreateAddDashRoutingModule,
    ReactiveFormsModule,
    LottieModule
  ]
})
export class CreateAddDashModule { }
