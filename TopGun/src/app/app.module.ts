import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpInterceptorService } from './Service/http-interceptor.service';
import { AnimalMapComponent } from './animal-map/animal-map.component';
//import { ImageModalComponent } from './components/image-modal/image-modal.component';
//import { ImageLightboxComponent } from '../components/image-liox.component';
//import { UploadFilesComponent } from './components/upload-files/upload-files.component';


@NgModule({
  declarations: [
    AppComponent,
    AnimalMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],


})
export class AppModule { }

