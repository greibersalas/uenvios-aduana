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
import { SenderComponent } from './sender/sender.component';
import { ModalSenderComponent } from './modals/modal-sender/modal-sender.component';
import { ShipperComponent } from './shipper/shipper.component';
import { ModalShipperComponent } from './modals/modal-shipper/modal-shipper.component';
import { ImporterRiskComponent } from './importer-risk/importer-risk.component';
import { ModalImporterRiskComponent } from './modals/modal-importer-risk/modal-importer-risk.component';
import { CarrierComponent } from './carrier/carrier.component';
import { ModalCarrierComponent } from './modals/modal-carrier/modal-carrier.component';
import { DepositComponent } from './deposit/deposit.component';
import { ModalDepositComponent } from './modals/modal-deposit/modal-deposit.component';
import { CustomsComponent } from './customs/customs.component';
import { ModalCustomsComponent } from './modals/modal-customs/modal-customs.component';
import { UnittypeComponent } from './unittype/unittype.component';
import { ModalUnittypeComponent } from './modals/modal-unittype/modal-unittype.component';
import { ArancelComponent } from './arancel/arancel.component';
import { ModalArancelComponent } from './modals/modal-arancel/modal-arancel.component';


@NgModule({
  declarations: [UbigeoComponent, ModalUbigeoComponent, CountryComponent, ModalCountryComponent, StatementTypeComponent, ModalStatementTypeComponent, DocumenttypeComponent, ModalDocumenttypeComponent, ShippingTypeComponent, ModalShippingTypeComponent, CategoriesComponent, ModalCategoriesComponent, TransportRouteComponent, ModalTransportRouteComponent, SenderComponent, ModalSenderComponent, ShipperComponent, ModalShipperComponent, ImporterRiskComponent, ModalImporterRiskComponent, CarrierComponent, ModalCarrierComponent, DepositComponent, ModalDepositComponent, CustomsComponent, ModalCustomsComponent, UnittypeComponent, ModalUnittypeComponent, ArancelComponent, ModalArancelComponent],
  imports: [
    CommonModule,
    FilesRoutingModule,
    SharedModule,
  ]
})
export class FilesModule { }
