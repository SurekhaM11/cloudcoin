import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvancedDashComponent } from './advanced-dash.component';

const routes: Routes = [
  {
    path: '',
    component: AdvancedDashComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvancedDashRoutingModule { }
