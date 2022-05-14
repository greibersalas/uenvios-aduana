import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportDiaryComponent } from './report-diary.component';


const routes: Routes = [
  {
    path: '',
    component: ReportDiaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportDiaryRoutingModule { }
