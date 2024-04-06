import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FixNftComponent } from './fix-nft.component';

const routes: Routes = [
  {path: '', component: FixNftComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixNftRoutingModule { }
