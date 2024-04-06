import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransferSkyComponent } from './transfer-sky.component';

const routes: Routes = [
  {
    path: '',
    component: TransferSkyComponent,
    data: {
      shouldDetach: true, 
      title: null
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferSkyRoutingModule { }
