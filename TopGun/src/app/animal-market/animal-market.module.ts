import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalMarketRoutingModule } from './animal-market-routing.module';
import { AnimalMarketComponent } from './animal-market.component';
import { FormsModule } from '@angular/forms';
//import { ImageLightboxComponent } from '../components/image-lightbox/image-lightbox.component';



@NgModule({
  declarations: [AnimalMarketComponent],
  imports: [
    CommonModule,
    AnimalMarketRoutingModule,
    FormsModule
  ],
  exports: [],
})
export class AnimalMarketModule { }
