import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import {DataTablesModule} from 'angular-datatables';

import { DistrictsRoutingModule } from './districts-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DistrictsComponent } from './districts.component';

@NgModule({
  declarations: [DistrictsComponent],
  imports: [
    CommonModule,
    DistrictsRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    NgSelectModule
  ]
})
export class DistrictsModule { }
