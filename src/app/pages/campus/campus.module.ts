import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampusRoutingModule } from './campus-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import { CampusComponent } from './campus.component';
import { CampusFormComponent } from './campus-form.component';

@NgModule({
  declarations: [CampusComponent,CampusFormComponent],
  imports: [
    CommonModule,
    CampusRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule
  ],
  entryComponents: [CampusFormComponent]
})
export class CampusModule { }
