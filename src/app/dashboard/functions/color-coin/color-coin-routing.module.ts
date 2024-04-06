import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColorCoinComponent } from './color-coin.component';

const routes: Routes = [
  {
    path: '',
    component : ColorCoinComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColorCoinRoutingModule { }