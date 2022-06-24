import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DeclarationComponent} from '../main/declaration/declaration.component'


const routes: Routes = [
  {
    path: '',
    children: [
        {
            path: 'declaration',
            component: DeclarationComponent
        },
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }