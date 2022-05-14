import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportDoctorRoutingModule } from './report-doctor-routing.module';
import { ReportDoctorComponent } from './report-doctor.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [ReportDoctorComponent],
  imports: [
    CommonModule,
    ReportDoctorRoutingModule,
    SharedModule,
    NgSelectModule,
  ]
})
export class ReportDoctorModule { }
