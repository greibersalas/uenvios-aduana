import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportClinicHistoryComponent } from './report-clinic-history.component';


const routes: Routes = [
  {
    path: '',
    component: ReportClinicHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportClinicHistoryRoutingModule { }
