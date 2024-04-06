import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupMailPswComponent } from './setup-mail-psw.component';

const routes: Routes = [
  {
    path: '',
    component: SetupMailPswComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupMailPswRoutingModule { }
