import { NgModule } from '@angular/core';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';

import { FileUploadModule } from '@iplab/ngx-file-upload';
import { ViewPdfComponent } from './view-pdf/view-pdf.component';

// Pipes
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
    ViewPdfComponent,

  ],
  exports: [],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgbModule,
    FileUploadModule,
    NgSelectModule,
    DataTablesModule,
    NgbModule,
    NgbNavModule,
    PipesModule
  ]
})
export class ComponentsModule { }
