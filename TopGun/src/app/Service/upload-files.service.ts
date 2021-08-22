import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { UploadFile } from '../model/upload-file';
import { Observable, BehaviorSubject } from 'rxjs';
import { GenericHttpService } from '../Service/generic-http.service';


//import { GenericHttpService } from './generic-http.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  //private baseUrl = 'http://localhost:8080';
  private baseUrl = 'https://localhost:44365/miraclemile';

  constructor(private genericHttpService: GenericHttpService, private http: HttpClient) { }

  private uploadFilesSource: BehaviorSubject<UploadFile[]> = new BehaviorSubject<UploadFile[]>([]);
  public currentUploadFiles: Observable<UploadFile[]> = this.uploadFilesSource.asObservable();
  public fileInfos: UploadFile[];

  saveUpload(animalId: number) {
    this.fileInfos.forEach(element => {
      element.animalId = animalId.toString();
      this.upload(element).subscribe()

    });

  }


  upload(uploadFile: UploadFile): Observable<UploadFile> {
    const url = `${this.baseUrl}/SaveUpload`;
    const updatedUploadFile = this.genericHttpService.post<UploadFile>(url, uploadFile);
    return updatedUploadFile;
  }

  UploadTheFileToServer(file: File, filesId: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/Upload/${filesId}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  uploadFilesSourcePush(uploadFile: UploadFile) {
    this.fileInfos.push(uploadFile)
  }

  uploadFilesSourceRemove(fileId: Number) {
    this.fileInfos = this.fileInfos.filter(h => h.id !== fileId.toString());

  }

  DeleteUploadFile(fileId: number) {
    const url = `${this.baseUrl}/DeleteUploadFile/${fileId}`;
    const updatedAnimals = this.genericHttpService.getBy(url, [])
    //.subscribe(data=>{data;})
    updatedAnimals.subscribe();
    return updatedAnimals;
  }

  getFiles(filesId: number) {

    const url = `${this.baseUrl}/files/${filesId}`;
    const uploadfiles = this.genericHttpService.getBy(url, [])
    uploadfiles.subscribe({
      next: (updated) => this.uploadFilesSource.next(updated)
    });
    return uploadfiles;
  }
}