import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ComponentsModule } from "../components/components.module";


@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ComponentsModule
  ],
  declarations: []
})
export class ReportsModule { }
