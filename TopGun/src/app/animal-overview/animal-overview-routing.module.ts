import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimalOverviewComponent } from './animal-overview.component';
//import { AnimalProfileComponent } from '../animal-profile/animal-profile.component';
//import { AnimalProfileComponent } from './animal-profile.component';
const routes: Routes = [{ path: '', component: AnimalOverviewComponent }];
/* {path: 'animalProfile/:animalId', component: AnimalProfileComponent },
{path: 'animalProfile', component: AnimalProfileComponent }]; */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalOverviewRoutingModule { }
