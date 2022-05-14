import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { ReportClinicHistoryComponent } from './report-clinic-history/report-clinic-history.component';
import { ReportDiaryModule } from './report-diary/report-diary.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'reports/clinic-history',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: 'clinic-history',
        loadChildren: () => import('./report-clinic-history/report-clinic-history.module')
        .then(mod => mod.ReportClinicHistoryModule),
        canActivate: [AuthGuard],
        data:{
          permissions:'report-clinic-history'
        }
      },
      {
        path: 'quotations',
        loadChildren: () => import('./report-quotations/report-quotations.module')
        .then(mod => mod.ReportQuotationsModule),
        canActivate: [AuthGuard],
        data:{
          permissions:'report-quotations'
        }
      },
      {
        path: 'diary',
        loadChildren: () => import('./report-diary/report-diary.module')
        .then(mod => mod.ReportDiaryModule),
        canActivate: [AuthGuard],
        data:{
          permissions:'report-diary'
        }
      },
      {
        path: 'lab',
        loadChildren: () => import('./report-lab/report-lab.module')
        .then(mod => mod.ReportLabModule),
        canActivate: [AuthGuard],
        data:{
          permissions:'report-lab'
        }
      },
      {
        path: 'doctor',
        loadChildren: () => import('./report-doctor/report-doctor.module')
        .then(mod => mod.ReportDoctorModule),
        canActivate: [AuthGuard],
        data:{
          permissions:'report-doctor'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
