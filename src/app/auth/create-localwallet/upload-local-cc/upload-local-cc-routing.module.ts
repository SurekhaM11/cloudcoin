import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadLocalCcComponent } from './upload-local-cc.component';

const routes: Routes = [
  {
    path: '',
    component: UploadLocalCcComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadLocalCcRoutingModule { }
