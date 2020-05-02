import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainViewComponent } from './main-view.component';

const routes: Routes = [
   { path: '', component: MainViewComponent,
   children: [
     { path: 'aktiebolag', loadChildren: () => import('../calculation/aktiebolag/aktiebolag.module').then(m => m.AktiebolagModule) },
     // tslint:disable-next-line: max-line-length
     { path: 'enskildfirma', loadChildren: () => import('../calculation/enskildfirma/enskildfirma.module').then(m => m.EnskildfirmaModule) },
   ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainViewRoutingModule { }
