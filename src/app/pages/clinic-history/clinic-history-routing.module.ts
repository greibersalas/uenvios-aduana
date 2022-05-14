import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { ClinicHistoryComponent } from './clinic-history.component';


const routes: Routes = [
  {
    path: '',
    component: ClinicHistoryComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicHistoryRoutingModule { }
