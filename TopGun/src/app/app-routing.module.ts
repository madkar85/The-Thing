import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },
  // { path: 'aktiebolag', loadChildren: () => import('./calculation/aktiebolag/aktiebolag.module').then(m => m.AktiebolagModule) },
  // { path: 'enskildfirma', loadChildren: () => import('./calculation/enskildfirma/enskildfirma.module').then(m => m.EnskildfirmaModule) },
  { path: 'mainView', loadChildren: () => import('./main-view/main-view.module').then(m => m.MainViewModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
