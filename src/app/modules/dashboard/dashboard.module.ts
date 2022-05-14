import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../theme/shared/shared.module';

// Components
import { DashboardBasicComponent } from './basic/dashboard-basic.component';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    DashboardBasicComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbTooltipModule
  ],
  exports: [
    DashboardBasicComponent
  ]
})
export class DashboardModule { }
