import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesRoutingModule } from './files-routing.module';
import { UbigeoComponent } from './ubigeo/ubigeo.component';
import { ModalUbigeoComponent } from './modals/modal-ubigeo/modal-ubigeo.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [UbigeoComponent, ModalUbigeoComponent],
  imports: [
    CommonModule,
    FilesRoutingModule,
    SharedModule,
  ]
})
export class FilesModule { }
