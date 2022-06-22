import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadChildren: () => import('./task-list/task-list.module').then(module => module.TaskListModule)
      },
      {
        path: 'board',
        loadChildren: () => import('./task-board/task-board.module').then(module => module.TaskBoardModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
