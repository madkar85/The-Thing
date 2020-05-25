import { Injectable } from '@angular/core';
import { Register } from '../model/register';
import { Observable } from 'rxjs';
import { GenericHttpService } from './generic-http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private genericHttpService: GenericHttpService) { }

  public addUser(registerData: Register): Observable<any> {
    
    const url = environment.register_url;
    
    return this.genericHttpService.post<Register>(url, registerData);
  }

}
