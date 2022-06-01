import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesRoutingModule } from './files-routing.module';
import { UbigeoComponent } from './ubigeo/ubigeo.component';
import { ModalUbigeoComponent } from './modals/modal-ubigeo/modal-ubigeo.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CountryComponent } from './country/country.component';
import { ModalCountryComponent } from './modals/modal-country/modal-country.component';
import { StatementTypeComponent } from './statementtype/statementtype.component';
import { ModalStatementTypeComponent } from './modals/modal-statementtype/modal-statementtype.component';
import { DocumenttypeComponent } from './documenttype/documenttype.component';
import { ModalDocumenttypeComponent } from './modals/modal-documenttype/modal-documenttype.component';
import { ShippingTypeComponent } from './shipping-type/shipping-type.component';
import { ModalShippingTypeComponent } from './modals/modal-shipping-type/modal-shipping-type.component';
import { CategoriesComponent } from './categories/categories.component';
import { ModalCategoriesComponent } from './modals/modal-categories/modal-categories.component';
import { TransportRouteComponent } from './transport-route/transport-route.component';
import { ModalTransportRouteComponent } from './modals/modal-transport-route/modal-transport-route.component';


@NgModule({
  declarations: [UbigeoComponent, ModalUbigeoComponent, CountryComponent, ModalCountryComponent, StatementTypeComponent, ModalStatementTypeComponent, DocumenttypeComponent, ModalDocumenttypeComponent, ShippingTypeComponent, ModalShippingTypeComponent, CategoriesComponent, ModalCategoriesComponent, TransportRouteComponent, ModalTransportRouteComponent],
  imports: [
    CommonModule,
    FilesRoutingModule,
    SharedModule,
  ]
})
export class FilesModule { }
