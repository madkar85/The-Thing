import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimalMapComponent } from './animal-map.component';

const routes: Routes = [{ path: '', component: AnimalMapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalMapRoutingModule { }
