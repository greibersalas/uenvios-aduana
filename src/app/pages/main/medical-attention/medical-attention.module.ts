import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgbCollapseModule, NgbDropdownModule, NgbModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MedicalAttentionRoutingModule } from './medical-attention-routing.module';
import { MedicalAttentionComponent } from './medical-attention.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [MedicalAttentionComponent],
  imports: [
    CommonModule,
    MedicalAttentionRoutingModule,
    SharedModule,
    FormsModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class MedicalAttentionModule { }
