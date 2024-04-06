import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadCcComponent } from './upload-cc.component';
import { UploadCcRoutingModule } from './upload-cc-routing.module';


@NgModule({
  declarations: [UploadCcComponent],
  imports: [
    CommonModule,
    UploadCcRoutingModule
  ]
})
export class UploadCcModule { }
