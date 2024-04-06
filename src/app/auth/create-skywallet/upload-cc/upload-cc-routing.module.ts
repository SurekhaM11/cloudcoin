import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadCcComponent } from './upload-cc.component';

const routes: Routes = [
  {
    path: '',
    component: UploadCcComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadCcRoutingModule { }
