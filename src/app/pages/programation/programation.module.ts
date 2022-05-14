import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from '@fullcalendar/timegrid'; 
import interactionPlugin from "@fullcalendar/interaction";
import { ProgramationRoutingModule } from './programation-routing.module';
import { ProgramationComponent } from './programation.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import {ColorPickerModule} from 'ngx-color-picker';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin,
  
]);

@NgModule({
  declarations: [ProgramationComponent],
  imports: [
    CommonModule,
    ProgramationRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    FullCalendarModule,
    NgSelectModule,
    ColorPickerModule,
    NgbDatepickerModule
  ]
})
export class  ProgramationModule { }
