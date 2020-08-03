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

  private userSource: BehaviorSubject<User> = new BehaviorSubject<User>(new User({ name: '' }));
  public currentUser: Observable<User> = this.userSource.asObservable();


  /**
   * Addd user to server
   */
  public addUser(registerData: Register): Observable<any> {

    const url = environment.register_url;

    return this.genericHttpService.post<Register>(url, registerData);
  }


  /**
   * Gets user from the server.
   */
  public getAuthenticatedUser(): Observable<User> {

    const url = environment.get_user_url;

    return this.genericHttpService.post<User>(url);

  }

  /**
   * Set logged in user.
   */
  public setUser(user: User) {

    this.userSource.next(user);

  }

  /**
   * Get current value from Observable without subscribing (just want value one time).
   */
  public getUser() {

    return this.userSource.value;

  }

}
