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

    const url = `${this.baseUrl}/DeleteUploadFile`;

    const queryParams =  {fileId: fileId};

    this.getData<[]>(url, queryParams).subscribe((res) => {

      if (res) {
        //this.setDeleteSource(res);
        console.info("fil har tagit bort")
      }

    });

  }

  getFiles(filesId: number) {

    const url = `${this.baseUrl}/files`;

    const queryParams =  {filesId: filesId};

    this.getData<[]>(url, queryParams).subscribe((res) => {

      if (res) {
        this.setUploadFiles(res);
      }

    });


  }

    /**
   * Get data
   */
     public getData<T>(url: string, QueryParams: object = {}): Observable<any> {

      return this.genericHttpService.get<T>(url, QueryParams);
      
    }

    public setUploadFiles(uploadFiles: UploadFile[]) {

      this.uploadFilesSource.next(uploadFiles);
  
    }
  
  
    public getUploadFiles() {
  
      return this.uploadFilesSource.value;
  
    }

}