import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecuritySetupComponent } from './security-setup.component';

const routes: Routes = [
  {
    path: '',
    component: SecuritySetupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecuritySetupRoutingModule { }
