import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateNftWalletComponent } from './create-nft-wallet.component';
import { CommonModule } from '@angular/common';
//import { BrowserModule } from '@angular/platform-browser'
const routes: Routes = [
  { path: '', component: CreateNftWalletComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule,
    // BrowserModule
  ],
  exports: [RouterModule]
})
export class CreateNftWalletRoutingModule { }