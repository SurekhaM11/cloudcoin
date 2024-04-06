import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NftHealthComponent } from './nft-health.component';

const routes: Routes = [
  {
    path: '',
    component : NftHealthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NftHealthRoutingModule { }