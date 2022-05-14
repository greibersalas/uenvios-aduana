import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportQuotationsRoutingModule } from './report-quotations-routing.module';
import { ReportQuotationsComponent } from './report-quotations.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [ReportQuotationsComponent],
  imports: [
    CommonModule,
    ReportQuotationsRoutingModule,
    SharedModule,
  ]
})
export class ReportQuotationsModule { }
