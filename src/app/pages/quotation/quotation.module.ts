import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { QuotationRoutingModule } from './quotation-routing.module';
import { QuotationComponent } from './quotation.component';
import { QuotationFormComponent } from './form/quotation-form.component';
import { QuotationDetailComponent } from './detail/quotation-detail.component';

@NgModule({
  declarations: [QuotationComponent, QuotationFormComponent, QuotationDetailComponent],
  imports: [
    CommonModule,
    QuotationRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    NgSelectModule,
    NgbTooltipModule,
    ComponentsModule,
    NgbPopoverModule,
  ]
})
export class QuotationModule { }
