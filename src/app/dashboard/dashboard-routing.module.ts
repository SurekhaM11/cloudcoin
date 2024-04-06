import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'news',
        loadChildren: () => import('./news/news.module').then(m => m.NewsModule)
      },
      {
        path: 'raida_status',
        loadChildren: () => import('./raida-status/raida-status.module').then(m => m.Raida_StatusModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'transactions',
        loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule)
      },
      {
        path: 'functions',
        loadChildren: () => import('./functions/functions.module').then(m => m.FunctionsModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'create-localwallet-dash',
        loadChildren: () => import('./create-localwallet-dash/create-localwallet-dash.module').then(m => m.CreateLocalwalletDashModule)
      },
      {
        path: 'create-skyvault-dash',
        loadChildren: () => import('./create-sky-dash/create-sky-dash.module').then(m => m.CreateSkyDashModule)
      },
      {
        path: 'create-nft',
        loadChildren: () => import('./create-nft-wallet/create-nft-wallet.module').then(m => m.CreateNftWalletModule)
      },
      {
        path: 'create-nft-gallery',
        loadChildren: () => import('./create-nft-wallet/nft-gallery/nft-gallery.module').then(m => m.NftGalleryModule)
      },
      {
        path: 'existing-nft',
        loadChildren: () => import('./create-nft-wallet/existing-nft/existing-nft.module').then(m => m.ExistingNftModule)
      },
      {
        path: 'import-nft',
        loadChildren: () => import('./create-nft-wallet/import-nft/import-nft.module').then(m => m.ImportNftModule)
      },
      {
        path: 'help',
        loadChildren: () => import('./help/help.module').then(m => m.HelpModule)
      },
    ],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
