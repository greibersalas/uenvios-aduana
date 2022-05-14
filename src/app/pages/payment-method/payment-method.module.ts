import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentMethodRoutingModule } from './payment-method-routing.module';
import { PaymentMethodComponent } from './payment-method.component'
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';


@NgModule({
  declarations: [PaymentMethodComponent],
  imports: [
    CommonModule,
    PaymentMethodRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule
  ]
})
export class PaymentMethodModule { }
