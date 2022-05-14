import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SpecialtyRoutingModule } from './specialty-routing.module';
import { SpecialtyComponent } from './specialty.component';

@NgModule({
  declarations: [SpecialtyComponent],
  imports: [
    CommonModule,
    SpecialtyRoutingModule,
    SharedModule,
    FormsModule,
    NgbTooltipModule,
    NgbModule,
    DataTablesModule
  ]
})
export class SpecialtyModule { }
