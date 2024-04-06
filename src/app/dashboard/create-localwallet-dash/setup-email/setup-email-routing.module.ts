import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetupEmailComponent } from './setup-email.component';


const routes: Routes = [
  {
    path: '',
    component: SetupEmailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  SetupEmailRoutingModule { }
