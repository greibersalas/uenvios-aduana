import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../../auth.guard';
import { MedicalAttentionComponent } from './medical-attention.component';


const routes: Routes = [
  {
    path: '',
    component: MedicalAttentionComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalAttentionRoutingModule { }
