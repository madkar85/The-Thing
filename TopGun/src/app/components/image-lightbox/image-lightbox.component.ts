import { Component, OnInit, ViewEncapsulation, Input, EventEmitter } from '@angular/core';
import { AnimalProfileService } from '../../Service/animal-profile.service';
import { UploadFilesService } from 'src/app/service/upload-files.service';
import { Observable } from 'rxjs';
import { UploadFile } from 'src/app/model/upload-file';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
@Component({
  selector: 'app-image-lightbox',
  templateUrl: './image-lightbox.component.html',
  styleUrls: ['./image-lightbox.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ImageLightboxComponent implements OnInit {
  images: any = [];
  slideIndex: number = 0;
  @Input() animalId: number = 0;
  aId: number = 0;

  constructor(private uploadService: UploadFilesService, private animalProfileService: AnimalProfileService) { }

  ngOnInit(): void {
   
    if (this.animalId != 0) {
      this.uploadService.getFiles(this.animalId).subscribe(data => {
        if (data) {
          this.images = data;
        }
  
      });

      /*this.uploadService.currentUploadFiles.subscribe(data => {
        if (data) {
          this.images = data;
        }
  
      });*/

    }
  }

  openModal(aid: number) {
    this.aId = aid;
    const element = document.getElementById('imgModal' + this.aId.toString());
    if (element !== null) {
      element.style.visibility = "visible"
    }
  }


  closeModal() {
    const element = document.getElementById('imgModal' + this.aId.toString());
    if (element !== null) {
      element.style.visibility = "hidden";
    }
  }
  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }
  currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n: number) {
    let i;
    const slides = document.getElementsByClassName(this.aId.toString()) as HTMLCollectionOf<HTMLElement>;
    const dots = document.getElementsByClassName("images") as HTMLCollectionOf<HTMLElement>;
    if (n > slides.length) {
      this.slideIndex = 1
    }
    if (n < 1) {
      this.slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    if (dots && dots.length > 0) {
      dots[this.slideIndex - 1].className += " active";
    }

  }

}
