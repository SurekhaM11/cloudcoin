import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvancedSetupComponent } from './advanced-setup.component';

const routes: Routes = [
  {
    path: '',
    component: AdvancedSetupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvancedSetupRoutingModule { }
