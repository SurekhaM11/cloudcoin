import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupMailPswRoutingModule } from './setup-mail-psw-routing.module';
import { SetupMailPswComponent } from './setup-mail-psw.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SetupMailPswComponent],
  imports: [
    CommonModule,
    SetupMailPswRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SetupMailPswModule { }
