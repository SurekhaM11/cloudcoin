import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { BrowserModule } from '@angular/platform-browser'
import { NftGalleryComponent } from './nft-gallery.component'
import { CommonModule } from '@angular/common';
const routes: Routes = [
    {
        path: '',
        component: NftGalleryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),
        //BrowserModule,
        CommonModule
    ],
    exports: [RouterModule]
})
export class NftGalleryRoutingModule { }
