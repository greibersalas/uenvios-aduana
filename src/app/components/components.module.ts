import { NgModule } from '@angular/core';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';

import { AddOdontogramaComponent } from './add-odontograma/add-odontograma.component';
import { OdontogramasComponent } from './odontogramas/odontogramas.component';
import { ClinicHistoryNotesComponent } from './clinic-history/clinic-history-notes/clinic-history-notes.component';
import { MedicalActComponent } from './medical-act/medical-act.component';
import { AddClinicHistoryNotesComponent } from './add-clinic-history-notes/add-clinic-history-notes.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { MedicalActFilesComponent } from './medical-act-files/medical-act-files.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { ClinicHistoryFilesComponent } from './clinic-history/clinic-history-files/clinic-history-files.component';
import { ClinicHistoryQuotationsComponent } from './clinic-history/clinic-history-quotations/clinic-history-quotations.component';
import { ClinicHistoryQuotesComponent } from './clinic-history/clinic-history-quotes/clinic-history-quotes.component';
import { DashboardDoctorComponent } from './dashboards/dashboard-doctor/dashboard-doctor.component';
import { OdontogramaComponent } from './odontograma/odontograma.component';
import { DashboardAssistantComponent } from './dashboards/dashboard-assistant/dashboard-assistant.component';
import { DashboardReceptionComponent } from './dashboards/dashboard-reception/dashboard-reception.component';
import { AttentionsComponent } from './attentions/attentions.component';
import { AnamnesisComponent } from './clinic-history/anamnesis/anamnesis.component';
import { MedicalAppointmentComponent } from './medical-appointment/medical-appointment.component';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { AttentionCardComponent } from './clinic-history/attention-card/attention-card.component';
import { AttentionComponent } from './attention/attention.component';
import { ViewPdfComponent } from './view-pdf/view-pdf.component';

// Pipes
import { PipesModule } from '../pipes/pipes.module';
import { MouthBreathingComponent } from './clinic-history/mouth-breathing/mouth-breathing.component';
import { QuotationTermsComponent } from './quotation-terms/quotation-terms.component';
import { DiaryLockComponent } from './diary-lock/diary-lock.component';
import { DiaryListComponent } from './diary-list/diary-list.component';
import { AuditComponent } from './audit/audit.component';
import { ItemProgramationDashboardComponent } from './item-programation-dashboard/item-programation-dashboard.component';


@NgModule({
  declarations: [
    AddOdontogramaComponent,
    OdontogramasComponent,
    ClinicHistoryNotesComponent,
    MedicalActComponent,
    AddClinicHistoryNotesComponent,
    PrescriptionComponent,
    MedicalActFilesComponent,
    ClinicHistoryFilesComponent,
    ClinicHistoryQuotationsComponent,
    ClinicHistoryQuotesComponent,
    DashboardDoctorComponent,
    OdontogramaComponent,
    DashboardAssistantComponent,
    DashboardReceptionComponent,
    AttentionsComponent,
    AnamnesisComponent,
    MedicalAppointmentComponent,
    AppointmentDetailComponent,
    AttentionCardComponent,
    AttentionComponent,
    ViewPdfComponent,
    MouthBreathingComponent,
    QuotationTermsComponent,
    DiaryLockComponent,
    DiaryListComponent,
    AuditComponent,
    ItemProgramationDashboardComponent,

  ],
  exports: [
    AddOdontogramaComponent,
    OdontogramasComponent,
    ClinicHistoryNotesComponent,
    MedicalActComponent,
    PrescriptionComponent,
    MedicalActFilesComponent,
    ClinicHistoryFilesComponent,
    ClinicHistoryQuotationsComponent,
    ClinicHistoryQuotesComponent,
    DashboardDoctorComponent,
    OdontogramaComponent,
    DashboardAssistantComponent,
    DashboardReceptionComponent,
    AttentionsComponent,
    AnamnesisComponent,
    AttentionCardComponent,
    AttentionComponent,
    MouthBreathingComponent,
    AuditComponent,
    ItemProgramationDashboardComponent,
  ],
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
