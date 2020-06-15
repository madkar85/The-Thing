import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { InsertionDirective } from './insertion.directive';
import { ExampleComponent } from './example/example.component';



@NgModule({
  declarations: [DialogComponent, InsertionDirective, ExampleComponent],
  entryComponents: [DialogComponent],
  imports: [
    CommonModule
  ]
})
export class DialogModule { }
