import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetPasswordRoutingModule } from './set-password-routing.module';
import { SetPasswordComponent } from './set-password.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SetPasswordComponent],
  imports: [
    CommonModule,
    SetPasswordRoutingModule,
    ReactiveFormsModule
  ]
})
export class SetPasswordModule { }
