import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImportNftComponent } from './import-nft.component'
import { CommonModule } from '@angular/common';
const routes: Routes = [
    {
        path: '',
        component: ImportNftComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),
        CommonModule
    ],
    exports: [RouterModule]
})
export class ImportNftRoutingModule { }
