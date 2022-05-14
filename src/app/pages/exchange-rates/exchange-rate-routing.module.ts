import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { ExchangeRateComponent } from './exchange-rates.component';


const routes: Routes = [
  {
    path: '',
    component: ExchangeRateComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class ExchangeRateRoutingModule { }