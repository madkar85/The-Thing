import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnskildfirmaRoutingModule } from './enskildfirma-routing.module';
import { EnskildfirmaComponent } from './enskildfirma.component';


@NgModule({
  declarations: [EnskildfirmaComponent],
  imports: [
    CommonModule,
    EnskildfirmaRoutingModule
  ]
})
export class EnskildfirmaModule { }
