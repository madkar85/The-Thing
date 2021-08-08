import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalOverviewRoutingModule } from './animal-overview-routing.module';
import { AnimalOverviewComponent } from './animal-overview.component';
import { FormsModule } from '@angular/forms';
import { ImageLightboxComponent } from '../components/image-lightbox/image-lightbox.component';
//import { ImageModalComponent } from '../components/image-modal/image-modal.component';

@NgModule({
  declarations: [AnimalOverviewComponent, ImageLightboxComponent],
  imports: [
    CommonModule,
    AnimalOverviewRoutingModule,
    FormsModule
  ],
  exports: [CommonModule], //add common module here
})
export class AnimalOverviewModule { }
