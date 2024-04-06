import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAddDashComponent } from './create-add-dash.component';

const routes: Routes = [
  {
    path: '',
    component: CreateAddDashComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateAddDashRoutingModule { }
