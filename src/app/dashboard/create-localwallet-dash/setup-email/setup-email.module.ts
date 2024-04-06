import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupEmailComponent } from './setup-email.component';
import { SetupEmailRoutingModule } from './setup-email-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SetupEmailComponent],
  imports: [
    CommonModule,
    SetupEmailRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SetupEmailModule { }
