import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepositSkyComponent } from './deposit-sky.component';

const routes: Routes = [
  {
    path: '',
    component: DepositSkyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositSkyRoutingModule { }
