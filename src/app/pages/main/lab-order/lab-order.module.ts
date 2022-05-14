import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { LabOrderRoutingModule } from './lab-order-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { LabOrderComponent } from './lab-order.component';
import { FormLabOrderComponent } from './form/form-lab-order.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [LabOrderComponent, FormLabOrderComponent],
  imports: [
    CommonModule,
    SharedModule,
    DataTablesModule,
    NgbModule,
    AngularEditorModule,
    LabOrderRoutingModule,
    NgSelectModule,
  ]
})
export class LabOrderModule { }
