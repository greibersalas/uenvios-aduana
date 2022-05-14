import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import { PermissionsComponent } from './permissions.component';


@NgModule({
  declarations: [PermissionsComponent],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule
  ]
})
export class PermissionsModule { }
