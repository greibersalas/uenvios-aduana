import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { LabProgrammingComponent } from './lab-programming.component';
import { LabProgrammingRoutingModule } from './lab-programming-routing.module';
import { LabProgrammingFormComponent } from './form/lab-programming-form.component';


@NgModule({
  declarations: [LabProgrammingComponent, LabProgrammingFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    DataTablesModule,
    NgbModule,
    LabProgrammingRoutingModule
  ]
})
export class LabProgrammingModule { }
