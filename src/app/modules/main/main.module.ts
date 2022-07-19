import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeclarationComponent } from './declaration/declaration.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MainRoutingModule } from '../main/main-routing.module';
import { ModalDeclarationComponent } from './modals/modal-declaration/modal-declaration.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGeneralComponent } from './modals/modal-declaration/forms/form-general/form-general.component';
import { FormSeriesComponent } from './modals/modal-declaration/forms/form-series/form-series.component'




@NgModule({
  declarations: [DeclarationComponent, ModalDeclarationComponent, FormGeneralComponent, FormSeriesComponent],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
    NgbModule
  ]
})
export class MainModule { }
