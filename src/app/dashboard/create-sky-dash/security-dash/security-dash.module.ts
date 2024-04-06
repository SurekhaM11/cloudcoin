import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityDashRoutingModule } from './security-dash-routing.module';
import { SecurityDashComponent } from './security-dash.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SecurityDashComponent],
  imports: [
    CommonModule,
    SecurityDashRoutingModule,
    NgbModule,
    ReactiveFormsModule, 
    FormsModule
  ]
})
export class SecurityDashModule { }
