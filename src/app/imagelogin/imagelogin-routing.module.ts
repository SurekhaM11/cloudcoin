import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageloginComponent } from './imagelogin.component';

const routes: Routes = [
  {
    path: '',
    component: ImageloginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageloginRoutingModule { }
