import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsibleRoutingModule } from './responsible-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import { ResponsibleComponent } from './responsible.component';

@NgModule({
  declarations: [ResponsibleComponent],
  imports: [
    CommonModule,
    ResponsibleRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule
  ]
})
export class ResponsibleModule { }
