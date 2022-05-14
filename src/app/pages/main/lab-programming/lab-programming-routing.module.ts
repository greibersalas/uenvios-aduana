import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../../auth.guard';
import { LabProgrammingComponent } from './lab-programming.component';


const routes: Routes = [
  {
    path: '',
    component: LabProgrammingComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabProgrammingRoutingModule { }
