import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path:'',
        loadChildren: () => import('./introduction/introduction.module').then(m => m.IntroductionModule)
      },
      {
        path:'skywallet',
        loadChildren: () => import('./create-skywallet/create-skywallet.module').then(m => m.CreateSkywalletModule)
      },
      {
        path: 'existing-login',
        loadChildren: () => import('./existing-wallet-login/existing-wallet-login.module').then(m => m.ExistingWalletLoginModule)
      },
      {
        path: 'localwallet',
        loadChildren: () => import('./create-localwallet/create-localwallet.module').then(m => m.CreateLocalwalletModule)
      }
      // {
      //   path: 'create-address',
      //   loadChildren: () => import('./create-skywallet/create-address/create-address.module').then(m => m.CreateAddressModule)
      // },
      // {
      //   path: 'security-setup',
      //   loadChildren: () => import('./create-skywallet/security-setup/security-setup.module').then(m => m.SecuritySetupModule)
      // },
      // {
      //   path: 'upload-cc',
      //   loadChildren: () => import('./create-skywallet/upload-cc/upload-cc.module').then(m => m.UploadCcModule)
      // },
      // {
      //   path: 'advanced-setup',
      //   loadChildren: () => import('./create-skywallet/advanced-setup/advanced-setup.module').then(m => m.AdvancedSetupModule)
      // },
      // {
      //   path: 'setup-password',
      //   loadChildren: () => import('./create-skywallet/set-password/set-password.module').then(m => m.SetPasswordModule)
      // },
      // {
      //   path: 'completed',
      //   loadChildren: () => import('./create-skywallet/completed/completed.module').then(m => m.CompletedModule)
      // },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
