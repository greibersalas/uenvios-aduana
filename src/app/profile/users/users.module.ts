import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import {DataTablesModule} from 'angular-datatables';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersFormComponent } from './form/users-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormPasswordComponent } from './form-password/form-password.component';

@NgModule({
  declarations: [UsersComponent,UsersFormComponent, FormPasswordComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    NgbModule,
    NgbTooltipModule,
    NgSelectModule
  ]
})
export class UsersModule { }
