import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { EnvironmentDoctorComponent } from './environment-doctor.component';


const routes: Routes = [
  {
    path: '',
    component: EnvironmentDoctorComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvironmentDoctorRoutingModule { }