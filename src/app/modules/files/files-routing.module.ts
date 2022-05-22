import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UbigeoComponent } from './ubigeo/ubigeo.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ubigeo',
        component: UbigeoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilesRoutingModule { }
