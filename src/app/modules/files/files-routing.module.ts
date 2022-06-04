import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UbigeoComponent } from './ubigeo/ubigeo.component';
import { CountryComponent } from './country/country.component';
import { StatementTypeComponent } from './statementtype/statementtype.component';
import { DocumenttypeComponent } from './documenttype/documenttype.component';
import { ShippingTypeComponent } from './shipping-type/shipping-type.component';
import { CategoriesComponent } from './categories/categories.component';
import { TransportRouteComponent } from './transport-route/transport-route.component';
import { SenderComponent } from './sender/sender.component';
import { ShipperComponent } from './shipper/shipper.component';
import { ImporterRiskComponent } from './importer-risk/importer-risk.component';
import { CarrierComponent } from './carrier/carrier.component';
import { DepositComponent } from './deposit/deposit.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ubigeo',
        component: UbigeoComponent
      },
      {
        path: 'country',
        component: CountryComponent
      },
      {
        path: 'declaration-type',
        component: StatementTypeComponent
      },
      {
        path: 'document-type',
        component: DocumenttypeComponent
      },
      {
        path: 'shipping-type',
        component: ShippingTypeComponent
      },
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'transport-route',
        component: TransportRouteComponent
      },
      {
        path: 'sender',
        component: SenderComponent
      },
      {
        path: 'shipper',
        component: ShipperComponent
      },
      {
        path: 'importer-risk',
        component: ImporterRiskComponent
      },
      {
        path: 'carrier',
        component: CarrierComponent
      },
      {
        path: 'deposit',
        component: DepositComponent
      },    
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilesRoutingModule { }
