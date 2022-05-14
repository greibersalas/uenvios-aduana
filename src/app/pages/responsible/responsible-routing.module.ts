import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { ResponsibleComponent } from './responsible.component';


const routes: Routes = [
  {
    path: '',
    component: ResponsibleComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class ResponsibleRoutingModule { }