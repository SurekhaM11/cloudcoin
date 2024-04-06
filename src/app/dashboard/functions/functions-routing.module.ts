import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FunctionsComponent } from './functions.component';

const routes: Routes = [
  {
    path: '',
    component: FunctionsComponent,
    children: [
      {
        path: 'fix',
        loadChildren:() => import('./fix/fix.module').then(m => m.FixModule)
      },
      {
        path: 'fix-limbo',
        loadChildren:() => import('./fix-limbo/fix-limbo.module').then(m => m.FixLimboModule)
      },
      {
        path: 'backup',
        loadChildren:() => import('./backup/backup.module').then(m => m.BackupModule)
      },
      {
        path: 'health_check',
        loadChildren:() => import('./health/health.module').then(m => m.HealthModule)
      },
      {
        path: 'color-coin',
        loadChildren:() => import('./color-coin/color-coin.module').then(m => m.ColorCoinModule)
      },
      {
        path: 'nft-health',
        loadChildren:() => import('./nft-health/nft-health.module').then(m => m.NftHealthModule)
      },
      {
        path: 'fix-nft-limbo',
        loadChildren:() => import('./fix-nft-limbo/fix-nft-limbo.module').then(m => m.FixNftLimboModule)
      },
      {
        path: 'fix-nft',
        loadChildren:() => import('./fix-nft/fix-nft.module').then(m => m.FixNftModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FunctionsRoutingModule { }
