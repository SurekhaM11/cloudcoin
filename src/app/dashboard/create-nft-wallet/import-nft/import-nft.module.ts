import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportNftRoutingModule } from './import-nft-routing.module';
import { ImportNftComponent } from './import-nft.component'
import { LottieModule } from 'ngx-lottie';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@NgModule({
    declarations: [ImportNftComponent],
    imports: [
        CommonModule,
        ImportNftRoutingModule,
        LottieModule,
        ReactiveFormsModule, FormsModule
    ]
})
export class ImportNftModule { }