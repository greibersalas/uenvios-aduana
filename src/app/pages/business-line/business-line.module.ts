import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';

import { BusinessLineRoutingModule } from './business-line-routing.module';
import { BusinessLineComponent } from './business-line.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BusinessLineFormComponent } from './form/business-line-form.component';

@NgModule({
  declarations: [
    BusinessLineComponent,
    BusinessLineFormComponent
  ],
  imports: [
    CommonModule,
    BusinessLineRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule
  ]
})
export class BusinessLineModule { }
