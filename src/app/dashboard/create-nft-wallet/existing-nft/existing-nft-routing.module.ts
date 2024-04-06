import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { BrowserModule } from '@angular/platform-browser'
import {ExistingNftComponent } from './existing-nft.component'
import { CommonModule } from '@angular/common';
const routes: Routes = [
    {
        path: '',
        component: ExistingNftComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),
        //BrowserModule,
        CommonModule
    ],
    exports: [RouterModule]
})
export class ExistingNftRoutingModule { }
