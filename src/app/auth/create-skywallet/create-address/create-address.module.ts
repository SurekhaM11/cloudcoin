import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAddressRoutingModule } from './create-address-routing.module';
import { CreateAddressComponent } from './create-address.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';


@NgModule({
  declarations: [CreateAddressComponent],
  imports: [
    CommonModule,
    CreateAddressRoutingModule,
    ReactiveFormsModule,
    LottieModule
  ]
})
export class CreateAddressModule { }
