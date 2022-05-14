import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportQuotationsComponent } from './report-quotations.component';


const routes: Routes = [
  {
    path: '',
    component: ReportQuotationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportQuotationsRoutingModule { }
