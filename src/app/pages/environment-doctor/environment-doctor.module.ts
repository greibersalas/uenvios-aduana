import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvironmentDoctorComponent } from './environment-doctor.component';
import { EnvironmentDoctorRoutingModule } from './environment-doctor-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [EnvironmentDoctorComponent],
  imports: [
    CommonModule,
    EnvironmentDoctorRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    NgSelectModule
  ]
})
export class EnvironmentDoctorModule { }
