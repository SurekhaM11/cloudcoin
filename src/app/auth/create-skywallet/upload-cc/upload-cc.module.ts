import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadCcRoutingModule } from './upload-cc-routing.module';
import { UploadCcComponent } from './upload-cc.component';


@NgModule({
  declarations: [UploadCcComponent],
  imports: [
    CommonModule,
    UploadCcRoutingModule
  ]
})
export class UploadCcModule { }
