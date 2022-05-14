import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangeRateRoutingModule } from './exchange-rate-routing.module';
import { SharedModule } from '../../theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import { ExchangeRateComponent } from './exchange-rates.component';



@NgModule({
  declarations: [ExchangeRateComponent],
  imports: [
    CommonModule,
    ExchangeRateRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    
  ]
})
export class ExchangeRateModule { }
