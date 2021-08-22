import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalMapRoutingModule } from './animal-map-routing.module';
import { FormsModule } from '@angular/forms';
import { AnimalMapComponent } from './animal-map.component';


@NgModule({
  declarations: [AnimalMapComponent],
  imports: [
    CommonModule,
    AnimalMapRoutingModule,
    FormsModule
  ]
})
export class AnimalMapModule { }


