import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalProfileRoutingModule } from './animal-profile-routing.module';
import { AnimalProfileComponent } from './animal-profile.component';
import { FormsModule } from '@angular/forms';
import { UploadFilesComponent } from '../components/upload-files/upload-files.component';


@NgModule({
  declarations: [AnimalProfileComponent, 
    UploadFilesComponent],
  imports: [
    CommonModule,
    AnimalProfileRoutingModule,
    FormsModule
  ],
  exports: [CommonModule], //add common module here
})
export class AnimalProfileModule { }
