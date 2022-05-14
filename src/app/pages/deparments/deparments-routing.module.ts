import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeparmentsComponent } from './deparments.component';
import { AuthGuard } from '../../auth.guard'

const routes: Routes = [
  {
    path: '',
    component: DeparmentsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class DeparmentsRoutingModule { }