import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { UploadFilesService } from 'src/app/service/upload-files.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UploadFile } from 'src/app/model/upload-file';
import { AnimalProfileService } from '../../Service/animal-profile.service';
//import * as uuid from 'uuid';



@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  selectedFiles: FileList;
  progressInfos = [] as any;;
  message = '';
  choosesFiles = '';
  @Input() url: string;
  @Input() buttonTitle: string;
  @Output() selectFileEvent = new EventEmitter<FileList>();
  @Input() enableUploadManyFiles: boolean = false;

  public imagePath: any;
  imgURL: any;
  buttonLabel: any;
  fileImfos: Observable<any>;
  public animalId: string = "0";
  fileInfos: any;
  constructor(private uploadService: UploadFilesService, private animalProfileService: AnimalProfileService) { }

  ngOnInit(): void {

    if (this.url != "") {
      this.imgURL = this.url;
    }

    if (this.buttonTitle != "") {
      this.buttonLabel = this.buttonTitle;
    }

    if (this.animalProfileService.existAnimalId()) {
      this.animalProfileService.currentAnimalId.subscribe(id => {
        if (id) {
          this.animalId = id;
        }
      });
    }

    if (this.enableUploadManyFiles && this.animalProfileService.existAnimalId()) {
      this.uploadService.getFiles(Number(this.animalId)).subscribe(data => {
        this.fileInfos = data;
        this.uploadService.fileInfos = data;
      })
    }

  }

  selectFiles(event: any): void {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.choosesFiles = 'Valt ' + this.selectedFiles.length + ' fil';

    var reader = new FileReader();
    this.imagePath = this.selectedFiles;
    reader.readAsDataURL(this.selectedFiles[this.selectedFiles.length - 1]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }

    this.selectFileEvent.emit(this.imagePath);
  }

  uploadFiles(event: any): void {
    this.message = '';
    this.selectedFiles = event.target.files;
    var fileSaveId = this.getRandomInt(100);
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i], fileSaveId);
    }
  }
  upload(idx: number, file: File, filesId: number): void {
    //id Todo!!!
    //const myId = uuid.v4();
    var uploadFile: UploadFile = { id: this.getRandomInt(10000000).toString(), name: "", url: "", animalId: "0" };
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      uploadFile.url = reader.result;
      this.uploadService.uploadFilesSourcePush(uploadFile);
      this.fileInfos = this.uploadService.fileInfos;
    }
    this.UploadTheFileToServer(Number(uploadFile.id), file);
  }

  UploadTheFileToServer(idx: number, file: File): void {

    this.uploadService.UploadTheFileToServer(file, idx).subscribe(
      event => {
      },
      err => {
        this.message = 'Could not upload the file:' + file.name;
      });
  }

  DeleteUploadFile(fileId: number) {
    this.uploadService.DeleteUploadFile(fileId);
    this.uploadService.uploadFilesSourceRemove(fileId);
    this.fileInfos = this.uploadService.fileInfos;
  }


  getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

}
