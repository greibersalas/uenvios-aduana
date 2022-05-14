import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportDoctorComponent } from './report-doctor.component';


const routes: Routes = [
  {
    path: '',
    component: ReportDoctorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportDoctorRoutingModule { }
