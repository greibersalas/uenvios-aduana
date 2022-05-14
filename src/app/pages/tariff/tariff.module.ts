import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TariffRoutingModule } from './tariff-routing.module';
import { TariffComponent } from './tariff.component';
import { TariffFormComponent } from './form/tariff-form/tariff-form.component';


@NgModule({
  declarations: [TariffComponent, TariffFormComponent],
  imports: [
    CommonModule,
    TariffRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    NgSelectModule
  ]
})
export class TariffModule { }
