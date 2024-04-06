import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadSkyComponent } from './download-sky.component';

const routes: Routes = [
  {
    path: '',
    component: DownloadSkyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadSkyRoutingModule { }
