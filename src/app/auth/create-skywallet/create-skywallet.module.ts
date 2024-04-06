import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateSkywalletRoutingModule } from './create-skywallet-routing.module';
import { CreateSkywalletComponent } from './create-skywallet.component';


@NgModule({
  declarations: [CreateSkywalletComponent],
  imports: [
    CommonModule,
    CreateSkywalletRoutingModule
  ]
})
export class CreateSkywalletModule { }
