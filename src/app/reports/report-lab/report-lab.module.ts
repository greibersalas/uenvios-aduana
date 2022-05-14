import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportLabRoutingModule } from './report-lab-routing.module';
import { ReportLabComponent } from './report-lab.component';
import { SharedModule } from '../../theme/shared/shared.module';


@NgModule({
  declarations: [ReportLabComponent],
  imports: [
    CommonModule,
    ReportLabRoutingModule,
    SharedModule
  ]
})
export class ReportLabModule { }
