import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoinRoutingModule } from './coin-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import { CoinComponent } from './coin.component';

@NgModule({
  declarations: [CoinComponent],
  imports: [
    CommonModule,
    CoinRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule
  ]
})
export class CoinModule { }
