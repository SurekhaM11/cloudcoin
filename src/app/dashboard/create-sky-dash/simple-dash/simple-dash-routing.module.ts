import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleDashComponent } from './simple-dash.component';

const routes: Routes = [
  {
    path: '',
    component: SimpleDashComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimpleDashRoutingModule { }
