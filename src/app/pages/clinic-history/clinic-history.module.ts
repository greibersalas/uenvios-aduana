import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ClinicHistoryRoutingModule } from './clinic-history-routing.module';
import { ClinicHistoryComponent } from './clinic-history.component';
import { ClinicHistoryFormComponent } from './form/clinic-history-form.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [ClinicHistoryComponent, ClinicHistoryFormComponent],
  imports: [
    CommonModule,
    ClinicHistoryRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    NgbModule,
    ComponentsModule,
    NgbNavModule,
    NgSelectModule
  ]
})
export class ClinicHistoryModule { }
