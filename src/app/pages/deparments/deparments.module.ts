import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeparmentsRoutingModule } from './deparments-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import { DeparmentsComponent } from './deparments.component';

@NgModule({
  declarations: [DeparmentsComponent],
  imports: [
    CommonModule,
    DeparmentsRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule
  ]
})
export class DeparmentsModule { }
