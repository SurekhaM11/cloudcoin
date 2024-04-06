import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecuritySetupRoutingModule } from './security-setup-routing.module';
import { SecuritySetupComponent } from './security-setup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SecuritySetupComponent],
  imports: [
    CommonModule,
    SecuritySetupRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class SecuritySetupModule { }
