import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AdminComponent } from './theme/layout/admin/admin.component';
import {AuthComponent} from './theme/layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(module => module.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'files',
        loadChildren: () => import('./modules/files/files.module').then(mod => mod.FilesModule),
        canActivate: [ AuthGuard ]
      },
      {
        path: 'documents',
        loadChildren: () => import('./pages/documents/documents.module').then(module => module.DocumentsModule),
        canActivate: [AuthGuard],
        data: {
          permissions: 'documents'
        }
      },
      {
        path: 'payment-method',
        loadChildren: () => import('./pages/payment-method/payment-method.module').then(module => module.PaymentMethodModule),
        canActivate: [AuthGuard],
        data: {
          permissions: 'payment-method'
        }
      },
      {
        path: 'country',
        loadChildren: () => import('./pages/country/country.module').then(module => module.CountryModule),
        canActivate: [AuthGuard],
        data: {
          permissions: 'country'
        }
      },
      {
        path: '',
        redirectTo: '/dashboard/analytics',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./demo/dashboard/dashboard.module').then(module => module.DashboardModule)
      },
      {
        path: 'layout',
        loadChildren: () => import('./demo/pages/layout/layout.module').then(module => module.LayoutModule)
      },
      {
        path: 'widget',
        loadChildren: () => import('./demo/widget/widget.module').then(module => module.WidgetModule)
      },
      {
        path: 'basic',
        loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then(module => module.UiBasicModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./demo/pages/form-elements/form-elements.module').then(module => module.FormElementsModule)
      },
      {
        path: 'tbl-bootstrap',
        loadChildren: () => import('./demo/pages/tables/tbl-bootstrap/tbl-bootstrap.module').then(module => module.TblBootstrapModule)
      },
      {
        path: 'tbl-datatable',
        loadChildren: () => import('./demo/pages/tables/tbl-datatable/tbl-datatable.module').then(module => module.TblDatatableModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./demo/pages/core-chart/core-chart.module').then(module => module.CoreChartModule)
      },
      {
        path: 'task',
        loadChildren: () => import('./demo/application/task/task.module').then(module => module.TaskModule)
      },
      {
        path: 'invoice',
        loadChildren: () => import('./demo/extension/invoice/invoice.module').then(module => module.InvoiceModule)
      },
      {
        path: 'full-calendar',
        loadChildren: () => import('./demo/extension/full-event-calendar/full-event-calendar.module')
          .then(module => module.FullEventCalendarModule)
      },
      {
        path: 'file-upload',
        loadChildren: () => import('./demo/extension/files-upload/files-upload.module').then(module => module.FilesUploadModule)
      },
      {
        path: 'coin',
        loadChildren: () => import('./pages/coin/coin.module').then(module => module.CoinModule),
        canActivate: [AuthGuard],
        data: {
          permissions: 'coin'
        }
      },
      {
        path: 'deparments',
        loadChildren: () => import('./pages/deparments/deparments.module').then(module => module.DeparmentsModule)
      },
      {
        path: 'provinces',
        loadChildren: () => import('./pages/province/province.module').then(module => module.ProvinceModule)
      },
      {
        path: 'districts',
        loadChildren: () => import('./pages/districts/districts.module').then(module => module.DistrictsModule),
        canActivate: [AuthGuard],
        data: {
          permissions: 'districts'
        }
      },
      {
        path: 'roles',
        loadChildren: () => import('./profile/roles/roles.module').then(module => module.RolesModule),
        canActivate: [AuthGuard],
        data: {
          permissions: 'roles'
        }
      },
      {
        path: 'users',
        loadChildren: () => import('./profile/users/users.module').then(module => module.UsersModule),
        canActivate: [AuthGuard],
        data: {
          permissions: 'user'
        }
      },
      {
        path: 'permissions',
        loadChildren: () => import('./profile/permissions/permissions.module').then(module => module.PermissionsModule),
        canActivate: [AuthGuard],
        data: {
          permissions: 'permissions'
        }
      },
      {
        path: 'user-profile',
        loadChildren: () => import('./profile/user/user.module').then(module => module.UserModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./reports/reports.module').then(mod => mod.ReportsModule)
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(module => module.AuthModule)
      },
      {
        path: 'maintenance',
        loadChildren: () => import('./demo/pages/maintenance/maintenance.module').then(module => module.MaintenanceModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
