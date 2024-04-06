import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimpleDashRoutingModule } from './simple-dash-routing.module';
import { SimpleDashComponent } from './simple-dash.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SimpleDashComponent],
  imports: [
    CommonModule,
    SimpleDashRoutingModule,
    ReactiveFormsModule
  ]
})
export class SimpleDashModule { }
