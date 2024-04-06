import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateLocalwalletDashComponent } from './create-localwallet-dash.component';

const routes: Routes = [
  {
    path: '',
    component: CreateLocalwalletDashComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./local-name/local-name.module').then(m => m.LocalNameModule)
      },
      {
        path: 'setup-mail',
        loadChildren: () => import('./setup-email/setup-email.module').then(m => m.SetupEmailModule)
      },
      {
        path: 'upload-cc',
        loadChildren: () => import('./upload-cc/upload-cc.module').then(m => m.UploadCcModule)
      },
      {
        path: 'completed',
        loadChildren: () => import('./local-completed/local-completed.module').then(m => m.LocalCompletedModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateLocalwalletDashRoutingModule { }
