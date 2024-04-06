import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityDashComponent } from './security-dash.component';

const routes: Routes = [
  {
    path: '',
    component: SecurityDashComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityDashRoutingModule { }
