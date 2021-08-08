import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimalMarketComponent } from './animal-market.component';

const routes: Routes = [{ path: '', component: AnimalMarketComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalMarketRoutingModule { }
