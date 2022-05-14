import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportDiaryRoutingModule } from './report-diary-routing.module';
import { ReportDiaryComponent } from './report-diary.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [ReportDiaryComponent],
  imports: [
    CommonModule,
    ReportDiaryRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class ReportDiaryModule { }
