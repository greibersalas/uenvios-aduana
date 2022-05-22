import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesRoutingModule } from './files-routing.module';
import { UbigeoComponent } from './ubigeo/ubigeo.component';
import { ModalUbigeoComponent } from './modals/modal-ubigeo/modal-ubigeo.component';


@NgModule({
  declarations: [UbigeoComponent, ModalUbigeoComponent],
  imports: [
    CommonModule,
    FilesRoutingModule
  ]
})
export class FilesModule { }
