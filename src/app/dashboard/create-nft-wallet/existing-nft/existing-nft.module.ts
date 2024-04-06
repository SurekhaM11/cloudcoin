import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { BrowserModule } from '@angular/platform-browser'

import { ExistingNftRoutingModule } from './existing-nft-routing.module';
import { ExistingNftComponent } from './existing-nft.component'
import { LottieModule } from 'ngx-lottie';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@NgModule({
    declarations: [ExistingNftComponent],
    imports: [
        CommonModule,
        //BrowserModule,
        ExistingNftRoutingModule,
        LottieModule,
        ReactiveFormsModule, FormsModule
    ]
})
export class ExistingNftModule { }