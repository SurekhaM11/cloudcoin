import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { BrowserModule } from '@angular/platform-browser'

import { NftGalleryRoutingModule } from './nft-gallery-routing.module';
import { NftGalleryComponent } from './nft-gallery.component'
import { LottieModule } from 'ngx-lottie';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';
@NgModule({
    declarations: [NftGalleryComponent],
    imports: [
        CommonModule,
        //BrowserModule,
        NftGalleryRoutingModule,
        LottieModule,
        ReactiveFormsModule, FormsModule,
        NgbModule,
        ClickOutsideModule
    ]
})
export class NftGalleryModule { }
