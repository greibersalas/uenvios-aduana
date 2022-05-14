import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import {DashAnalyticsComponent} from './dash-analytics.component';

const routes: Routes = [
  {
    path: '',
    component: DashAnalyticsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashAnalyticsRoutingModule { }
