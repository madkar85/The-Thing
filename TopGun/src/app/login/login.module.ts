import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { ConfirmComponent } from '../dialog-box/confirm/confirm.component';



@NgModule({
  declarations: [
    LoginComponent,
    DialogBoxComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule
  ]
})
export class LoginModule { }
