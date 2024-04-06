import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadDashComponent } from './upload-dash.component';

const routes: Routes = [
  {
    path: '',
    component: UploadDashComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadDashRoutingModule { }
