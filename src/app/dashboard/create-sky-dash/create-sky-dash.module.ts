import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateSkyDashRoutingModule } from './create-sky-dash-routing.module';
import { CreateSkyDashComponent } from './create-sky-dash.component';


@NgModule({
  declarations: [CreateSkyDashComponent],
  imports: [
    CommonModule,
    CreateSkyDashRoutingModule
  ]
})
export class CreateSkyDashModule { }
