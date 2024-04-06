import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSkyDashComponent } from './create-sky-dash.component';

const routes: Routes = [
  {
    path: '',
    component: CreateSkyDashComponent,
    children: [
      {
        path: 'new-address',
        loadChildren: () => import('./create-add-dash/create-add-dash.module').then(m => m.CreateAddDashModule)
      },
     
      {
        path: 'simple-setup',
        loadChildren: () => import('./simple-dash/simple-dash.module').then(m => m.SimpleDashModule)
      },
      // {
      //   path: 'upload-cc',
      //   loadChildren: () => import('./upload-dash/upload-dash.module').then(m => m.UploadDashModule)
      // },
      {
        path: 'security-setup',
        loadChildren: () => import('./security-dash/security-dash.module').then(m => m.SecurityDashModule)
      },
      {
        path: '',
        loadChildren: () => import('./advanced-dash/advanced-dash.module').then(m => m.AdvancedDashModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateSkyDashRoutingModule { }
