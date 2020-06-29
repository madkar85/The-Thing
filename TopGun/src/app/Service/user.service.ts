import { Injectable } from '@angular/core';
import { Register } from '../model/register';
import { Observable, BehaviorSubject } from 'rxjs';
import { GenericHttpService } from './generic-http.service';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private genericHttpService: GenericHttpService) { }

   private userSource: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
   public currentUser: Observable<User| null> = this.userSource.asObservable();

  public addUser(registerData: Register): Observable<any> {

    const url = environment.register_url;

    return this.genericHttpService.post<Register>(url, registerData);
  }

}
