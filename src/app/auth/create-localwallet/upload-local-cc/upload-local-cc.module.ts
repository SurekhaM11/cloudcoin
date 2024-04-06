import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadLocalCcRoutingModule } from './upload-local-cc-routing.module';
import { UploadLocalCcComponent } from './upload-local-cc.component';


@NgModule({
  declarations: [UploadLocalCcComponent],
  imports: [
    CommonModule,
    UploadLocalCcRoutingModule
  ]
})
export class UploadLocalCcModule { }
