import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadDashRoutingModule } from './upload-dash-routing.module';
import { UploadDashComponent } from './upload-dash.component';


@NgModule({
  declarations: [UploadDashComponent],
  imports: [
    CommonModule,
    UploadDashRoutingModule
  ]
})
export class UploadDashModule { }
