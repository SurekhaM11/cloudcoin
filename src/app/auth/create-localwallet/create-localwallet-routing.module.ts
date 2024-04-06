import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateLocalwalletComponent } from './create-localwallet.component';

const routes: Routes = [
  {
    path: '',
    component: CreateLocalwalletComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./create-name/create-name.module').then(m => m.CreateNameModule)
      },
      {
        path: 'local-setup-mail-psw',
        loadChildren: () => import('./setup-mail-psw/setup-mail-psw.module').then(m => m.SetupMailPswModule)
      },
      {
        path: 'uplaod-local-cc',
        loadChildren: () => import('./upload-local-cc/upload-local-cc.module').then(m => m.UploadLocalCcModule)
      },
      {
        path: 'localstep-completed',
        loadChildren: () => import('./local-step-complete/local-step-complete.module').then(m => m.LocalStepCompleteModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateLocalwalletRoutingModule { }
