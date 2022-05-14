import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportClinicHistoryRoutingModule } from './report-clinic-history-routing.module';
import { ReportClinicHistoryComponent } from './report-clinic-history.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [ReportClinicHistoryComponent],
  imports: [
    CommonModule,
    ReportClinicHistoryRoutingModule,
    SharedModule,
  ]
})
export class ReportClinicHistoryModule { }
